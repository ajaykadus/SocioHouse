Houses = new Mongo.Collection("houses");
HouseLogistics = new Mongo.Collection("houseLogistics");
HouseComments = new Mongo.Collection("housesComments");

Meteor.startup(function () {
    Meteor.methods({
        getResults: function (params) {
            this.unblock();
            var url = 'http://dev.mapi.move.com/forsale/v1/search/?loc=' + encodeURIComponent(params.searchKey) + '&&offset=0&limit=20';
            return Meteor.http.call("GET", url);
        }
    });
});

Meteor.methods({
    AddHome: function (usrId, id, image, description, price, address) {
        Houses.insert({
            user_id: usrId,
            house_id: id,
            image: image,
            description: description,
            price: price,
            address: address,
            logistic: HouseLogistics.find({house_id: id}).fetch()
        });
    },
    removeHome: function (id) {
        Houses.remove({house_id: id});
    },
    //getMyHouses: function() {
    //    return Houses.find({user_id: Meteor.userId()}).fetch();
    //},
    commentHouse: function (usrId, fbId, usrName, id, comment, createdAt) {
        var comment = {
            usr_id: usrId,
            usr_fb_id: fbId,
            usr_name: usrName,
            house_id: id,
            comment: comment,
            createdAt: createdAt
        };
        HouseLogistics.update({house_id: id}, {$addToSet: {comments: comment}});
        Houses.update({house_id: id}, {$set: {logistic: HouseLogistics.find({house_id: id}).fetch()}});
        return HouseComments.insert(comment);
    },
    getHouseComments: function (usrId, id) {
        return HouseComments.find({
            usr_id: usrId,
            house_id: id
        }).fetch();
    },
    addHouseLogistic: function (usrId, id, type, price) {
        var temp = HouseLogistics.find({house_id: id}).fetch();
        if (temp.length === 0) {
            HouseLogistics.insert({
                house_id: id,
                usr_id: usrId,
                addCount: 1,
                rank: 0,
                comments: [],
                avgUserPrice: parseInt(price) || 0,
                numberOfBids: 1,
                myBidPrice: parseInt(price) / 2
            });
        }
        else {
            if (type === 'add') {
                HouseLogistics.update({house_id: id}, {$set: {addCount: temp[0].addCount + 1}});
            }
            else {
                HouseLogistics.update({house_id: id}, {$set: {addCount: temp[0].addCount - 1}});
            }
        }
        Houses.update({house_id: id}, {$set: {logistic: HouseLogistics.find({house_id: id}).fetch()}});
    },
    updateRank: function (usrId, id, type) {
        var temp = HouseLogistics.find({house_id: id}).fetch();
        if (type === 'up') {
            HouseLogistics.update({house_id: id}, {$set: {rank: temp[0].rank + 1}});
        }
        else {
            HouseLogistics.update({house_id: id}, {$set: {rank: temp[0].rank - 1}});
        }
        Houses.update({house_id: id}, {$set: {logistic: HouseLogistics.find({house_id: id}).fetch()}});
    },
    updateUserPrice: function (usrId, id, price) {
        var temp = HouseLogistics.find({house_id: id}).fetch();
        HouseLogistics.update({house_id: id}, {
            $set: {
                avgUserPrice: (parseInt(temp[0].avgUserPrice) + parseInt(price)) / (temp[0].numberOfBids + 1),
                numberOfBids: temp[0].numberOfBids + 1,
                myBidPrice: price
            }
        });
        Houses.update({house_id: id}, {$set: {logistic: HouseLogistics.find({house_id: id}).fetch()}});
    }
});