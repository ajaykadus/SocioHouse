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
    },
    getUsrImageURL : function(url, size) {
        return "img/user_default.png"
    }

});

Template.search_list.helpers({
    searchList: function () {
        console.log(Session.get("searchList"), "erfre");
        return Session.get("searchList");

    }
});

Template.search_item.events({
    'click .house-like': function () {
        // increment the counter when button is clicked
        Session.set("counter", Session.get("counter") + 10);
    }
});
/**
 * Created by akadus on 12/22/14.
 */

Template.search_list.events({
    'keyup .search-houses': function (e) {
        var searcKey = $(e.currentTarget).val();
        if (e.which === 13) {
            Meteor.call("getResults", {searchKey: searcKey}, function (error, results) {
                Session.set("searchList", JSON.parse(results.content).listings); //results.data should be a JSON object
            });
        }
    }
})
/**
 * Created by akadus on 12/22/14.
 */
