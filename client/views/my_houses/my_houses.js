
Template.myHouses.helpers({
    myHomes: function () {
        Meteor.call("getMyHomes", function (error, results) {
            Session.set("myHomesList", results); //results.data should be a JSON object
        });
        return Session.get("myHomesList");
    }
});

Template.myHouses.events({
    'click .house-remove': function () {
    }
});
