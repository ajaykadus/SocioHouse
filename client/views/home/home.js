Template.home.events({
    'click #btn-user-data': function (e) {
        Meteor.call('getUserData', function (err, data) {
            console.log("data", data, err)

            $('#result').text(JSON.stringify(data, undefined, 4));
        });
        Meteor.call('getFriendsData', function (err, data) {
            $('#result').append(JSON.stringify(data, undefined, 4));
        });

    },
    'click .my-houses-link': function () {
        Router.go('my_houses');
    }

});

Template.home.helpers({
    accountDetails: function (e) {
        return Session.get("fbAccountDetails");
    },
    myHouseCount: function () {
        return Houses.find().count();
    }
});