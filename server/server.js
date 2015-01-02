Homes = new Mongo.Collection("homes");

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
        Homes.insert({
            user_id: usrId,
            home_id: id,
            image: image,
            description: description,
            price: price,
            address: address
        });
    },
    removeHome: function (id) {
        Homes.remove({home_id:id});
    },
    getMyHomes: function() {
        return Homes.find({user_id: Meteor.userId()}).fetch();
    }
});