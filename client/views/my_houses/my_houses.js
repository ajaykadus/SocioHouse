Template.myHouses.helpers({
    myHomes: function () {
        return Houses.find();
    }
});
Template.myHousesItem.helpers({
    fbAccount: function () {
        return Session.get("fbAccountDetails");
    }
});

Template.myHouses.events({});

Template.myHousesItem.events({
    'click .house-remove-btn': function (event, template) {
        event.preventDefault();
        var home = {
            id: template.find('.home-id').value
        };
        template.firstNode.remove();
        Meteor.call('removeHome', home.id);

    },

    'submit #commentForm': function (event, template) {

        var Comment = {
            house_id: template.find('.house-id').value,
            content: template.find('#comment-content').value,
            createdAt: new Date()
        };

        // Clear form
        $(template.find('#comment-content')).val("");

        console.log(Comment,"what sit comment")
        // Prevent default form submit
        Meteor.call('commentHouse', Meteor.user()._id, Comment.house_id, Comment.content, Comment.createdAt);
        return false;

    },

    'click .show-house-comments': function (event, template) {
        event.preventDefault();
        $(template.find(".house-comments")).toggleClass('in');
    },

    'click .show-house-comment-form': function (event, template) {
        event.preventDefault();
        $(template.find(".house-comment-form")).toggle();
    }
});
