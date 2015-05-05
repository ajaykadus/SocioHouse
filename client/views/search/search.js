// counter starts at 0
Session.setDefault("counter", 0);
Session.setDefault("searchList", []);


Template.search_item.helpers({
    counter: function () {
        return Session.get("counter");
    },
    getImageURL: function (url, size,w, h) {
        if (!url) return url;

        var imageURL = url;
        var p;

        // RDC pix URLs do dynamic sizing; otherwise, simply return the original.
        if (url.indexOf('.rdcpix.com') < 0)
            return url;

        if (!url || ((p = url.lastIndexOf('.')) < 0))
            return url;

        if (w && h) {
            imageURL = url.substr(0, p - 1) + 'od-w' + w + '_h' + h + '_q80_r1' + url.substring(p);
        }
        else {
            switch (size) {
                case 'm':
                case 's':
                case 't':
                case 'o':
                case 'r':
                    imageURL = url.substr(0, p - 1) + size + url.substring(p);
                    break;

                default:
                    imageURL = url;
            }
        }
        return imageURL;
    }

});

Template.search_list.helpers({
    searchList: function () {
        return Session.get("searchList");

    }
});

Template.search_item.events({
    'click .house-like': function () {
        // increment the counter when button is clicked
        Session.set("counter", Session.get("counter") + 10);
    }
});

Session.setDefault("usrAuthenticated", false);

Template.search.events({
    'keyup .search-houses': function (e) {
        var searcKey = $(e.currentTarget).val();
        if (e.which === 13) {
            Meteor.call("getResults", {searchKey: searcKey}, function (error, results) {
                Session.set("searchList", JSON.parse(results.content).listings); //results.data should be a JSON object
            });
        }
    },
    'click .usr-login': function () {
        // increment the counter when button is clicked
        Session.set("usrAuthenticated", true);
    },
    'click .usr-logout': function () {
        // increment the counter when button is clicked
        Session.set("usrAuthenticated", false);
    }

});

Template.search_item.events({
    'click .house-add-btn': function(event, template) {
        event.preventDefault();

        var home = {
            id: template.find('.home-id').value,
            image: template.find('.home-photo').value,
            description: template.find('.home-description').value,
            price: template.find('.home-price').value,
            address: template.find('.home-address').value
        };

        $(event.currentTarget).removeClass('house-add-btn');
        $(event.currentTarget).addClass('house-remove-btn').text('Remove');
        Meteor.call('addHouseLogistic', Meteor.user()._id, home.id, "add", home.price);
        Meteor.call('AddHome', Meteor.user()._id, home.id, home.image, home.description, home.price, home.address);

    },
    'click .house-remove-btn': function(event, template) {
        event.preventDefault();

        var home = {
            id: template.find('.home-id').value
        };

        $(event.currentTarget).removeClass('house-remove-btn');
        $(event.currentTarget).addClass('house-add-btn').text('Add');
        Meteor.call('addHouseLogistic', Meteor.user()._id, home.id, "remove");
        Meteor.call('removeHome', home.id);

    }
});

