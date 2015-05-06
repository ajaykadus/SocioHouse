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
    houseLogistics: function() {
        return this.logistic[0];
    },
    formatPrice: function(price) {
        return Helper.formatPrice(price);
    },
    minBidPrice: function () {
        var logistic = this.logistic[0];
        var minPrice = parseInt(this.price) - logistic.avgUserPrice / 4;
        return minPrice;
    },
    maxBidPrice: function () {
        var logistic = this.logistic[0];
        var maxPrice = parseInt(this.price) + logistic.avgUserPrice / 4;
        return maxPrice;
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
    'click .bid-up-house' : function (event, template) {
        var priceValue = template.find('.js-my-bid-price').value,
            houseId = template.find('.house-id').value;

        Meteor.call('updateUserPrice', Meteor.user()._id, houseId, priceValue, function (err, data) {
        });
    },
    "input #js-bid-range": function (event, template) {
        var p = Helper.formatPrice($(event.currentTarget).val());
        $(template.find("output#range")).html(p);
    },
    'submit form#commentForm': function (event, template) {

        var Comment = {
            house_id: template.find('.house-id').value,
            content: template.find('.comment-content').value,
            createdAt: new Date()
        };

        // Clear form
        $(template.find('.comment-content')).val("");

        // Prevent default form submit
        Meteor.call('commentHouse', Meteor.user()._id, (Session.get("fbAccountDetails") || {id:''}).id, Meteor.user().profile.name, Comment.house_id, Comment.content, Comment.createdAt, function (data) {
        });

        return false;
    },

    'click .show-house-comments': function (event, template) {
        event.preventDefault();

        //var paramsData = {
        //    house_id: template.find('.house-id').value
        //};
        //if (Session.get('houseComments').length === 0) {
        //    Meteor.call('getHouseComments', Meteor.user()._id, paramsData.house_id, function (err, data) {
        //        Session.set('houseComments', data);
        //        console.log("callback", Session.get('houseComments'));
        //    });
        //}
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
            Meteor.call('updateRank', Meteor.user()._id, paramsData.house_id,'up', function (err, data) {
            });
            $obj.removeClass('glyphicon-thumbs-up').addClass('glyphicon-thumbs-down');
            $(event.currentTarget).removeClass('btn-success').addClass('btn-danger');
        }
        else {
            Meteor.call('updateRank', Meteor.user()._id, paramsData.house_id,'down', function (err, data) {
            });
            $obj.removeClass('glyphicon-thumbs-down').addClass('glyphicon-thumbs-up');
            $(event.currentTarget).removeClass('btn-danger').addClass('btn-success');
        }
    }
});

Template.houseComment.helpers({});

Template.houseComment.events({});
