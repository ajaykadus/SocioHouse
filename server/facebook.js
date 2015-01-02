function Facebook(accessToken) {
    this.fb = Meteor.require('fbgraph');
    this.accessToken = accessToken;
    this.fb.setAccessToken(this.accessToken);
    this.options = {
        timeout: 3000,
        pool: {maxSockets: Infinity},
        headers: {connection: "keep-alive"}
    };
    this.fb.setOptions(this.options);
}

Facebook.prototype.query = function(query, method) {
    var self = this;
    var method = (typeof method === 'undefined') ? 'get' : method;
    var data = Meteor.sync(function(done) {
        self.fb[method](query, function(err, res) {
            done(null, res);
        });
    });
    return data.result;
};

Facebook.prototype.getUserData = function() {
    return this.query('me?fields=id,cover,context,email,name');
};

Meteor.methods({
    getUserData: function() {
        console.log(Meteor.user().services.facebook,":eeih")
        var fb = new Facebook(Meteor.user().services.facebook.accessToken);
        console.log(fb,"what is this");
        var data = fb.getUserData();
        console.log(data,"thisis g")
        return data;
    },
    getFriendsData: function() {
        var fb = new Facebook(Meteor.user().services.facebook.accessToken);
        var data = fb.getFriendsData();
        return data;
    }
});
Facebook.prototype.getFriendsData = function() {
    return this.query('/me/friends');
};