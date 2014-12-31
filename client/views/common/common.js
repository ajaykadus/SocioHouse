Template.menu.events({
    "click .usr-logout" : function(t) {
        Meteor.logout(function() {
            Router.go('/');
        });
    }
});