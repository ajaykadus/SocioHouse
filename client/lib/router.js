
Router.route('/', {
    onBeforeAction: function () {
        if (! Meteor.user()) {
            if (Meteor.loggingIn()) {
                Router.go('search');
            }
            else{
                Router.go('login');
            }
        }
        this.next();
    }
});
Router.map( function () {
    this.route('login');
    this.route('search');
    this.route('my_houses');
    this.route('forgot_password');
});
