Session.setDefault('houseComments', []);

Template.myHouses.helpers({
    myHomes: function () {
        return Houses.find();
    }
});
Template.myHousesItem.helpers({
    fbAccount: function () {
        return Session.get("fbAccountDetails");
    },
    houseComments: function () {
        return Session.get('houseComments');
    },
    houseLogistics: function() {
        return HouseLogistics.find();
    }
});

Template.myHouses.events({});

Template.myHousesItem.events({
    'click .house-remove-btn': function (event, template) {
        event.preventDefault();
        var house = {
            id: template.find('.house-id').value
        };
        template.firstNode.remove();
        Meteor.call('removeHome', house.id);

    },

    'submit #commentForm': function (event, template) {

        var Comment = {
            house_id: template.find('.house-id').value,
            content: template.find('#comment-content').value,
            createdAt: new Date()
        };

        // Clear form
        $(template.find('#comment-content')).val("");

        // Prevent default form submit
        Meteor.call('commentHouse', Meteor.user()._id, Session.get("fbAccountDetails").id, Meteor.user().profile.name, Comment.house_id, Comment.content, Comment.createdAt, function () {
            console.log("callback", Session.get('houseComments'));
        });

        return false;
    },

    'click .show-house-comments': function (event, template) {
        event.preventDefault();

        var paramsData = {
            house_id: template.find('.house-id').value
        };
        if (Session.get('houseComments').length === 0) {

            Meteor.call('getHouseComments', Meteor.user()._id, paramsData.house_id, function (err, data) {
                Session.set('houseComments', data);
                console.log("callback", Session.get('houseComments'));
            });
        }
        $(template.find(".house-comments")).toggleClass('in');
    },

    'click .show-house-comment-form': function (event, template) {
        event.preventDefault();
        $(template.find(".house-comment-form")).toggle();
    },

    'click .rank-up-house': function (event, template) {
        event.preventDefault();
        var paramsData = {
            house_id: template.find('.house-id').value
        };
        var $obj = $(template.find(".rank-up-down-house"));
        if($obj.hasClass('glyphicon-thumbs-up')) {
            Meteor.call('insertOrUpdateHouseLogistics', Meteor.user()._id, paramsData.house_id,'up', function (err, data) {
            });
            $obj.removeClass('glyphicon-thumbs-up').addClass('glyphicon-thumbs-down');
        }
        else {
            Meteor.call('insertOrUpdateHouseLogistics', Meteor.user()._id, paramsData.house_id,'down', function (err, data) {
            });
            $obj.removeClass('glyphicon-thumbs-down').addClass('glyphicon-thumbs-up');
        }

    }
});

Template.houseComment.helpers({});

Template.houseComment.events({});
