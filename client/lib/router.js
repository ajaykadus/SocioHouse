
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
        Router.go('home');
        this.next();
    }
});
Router.map( function () {
    this.route('login');
    this.route('home');
    this.route('search');
    this.route('my_houses');
    this.route('forgot_password');
});
