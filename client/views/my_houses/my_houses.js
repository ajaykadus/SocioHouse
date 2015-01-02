
Template.myHouses.helpers({
    myHomes: function () {
        return Homes.find();
    }
});
Template.myHousesItem.helpers({
    fbAccount: function() {
        return Session.get("fbAccountDetails");
    }
});

Template.myHouses.events({
    'click .house-remove': function () {
    }
});

Template.myHousesItem.events({
    'click .house-remove-btn': function(event, template) {
        event.preventDefault();
        var home = {
            id: template.find('.home-id').value
        };
        template.firstNode.remove();
        Meteor.call('removeHome', home.id);

    }
});
