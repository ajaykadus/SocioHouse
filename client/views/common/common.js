Template.menu.events({
    "click .usr-logout" : function(t) {
        Meteor.logout(function() {
            Router.go('/');
        });
    },
    "click .navbar-nav li": function(event, template) {
        $(template.find(".navbar-collapse")).removeClass('in')
    }
});