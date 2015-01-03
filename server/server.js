Houses = new Mongo.Collection("houses");
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
            address: address
        });
    },
    removeHome: function (id) {
        Houses.remove({house_id:id});
    },
    getMyHouses: function() {
        return Houses.find({user_id: Meteor.userId()}).fetch();
    },
    commentHouse: function (usrId, id, comment, createdAt) {
        HouseComments.insert({
            user_id: usrId,
            house_id: id,
            comment: comment,
            createdAt: createdAt
        });
    }
});