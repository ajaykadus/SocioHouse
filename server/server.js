Meteor.startup(function () {
    Meteor.methods({
        getResults: function (params) {
            this.unblock();
            var url = 'http://dev.mapi.move.com/forsale/v1/search/?loc='+encodeURIComponent(params.searchKey)+'&&offset=0&limit=20';
            return Meteor.http.call("GET", url);
        }
    });
});