// counter starts at 0
Session.setDefault("counter", 0);
Session.setDefault("searchList", []);


Template.search_item.helpers({
    counter: function () {
        return Session.get("counter");
    }
});

Template.search_list.helpers({
    searchList: function() {
        console.log(Session.get("searchList"),"erfre");
        return Session.get("searchList");

    }
});

Template.search_item.events({
    'click .house-like': function () {
        // increment the counter when button is clicked
        Session.set("counter", Session.get("counter") + 10);
    }
})/**
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
})/**
 * Created by akadus on 12/22/14.
 */
