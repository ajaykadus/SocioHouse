/**
 * Created by akadus on 12/26/14.
 */
Template.login.events({
    'click #btn-fblogin': function() {
        Meteor.loginWithFacebook(function (error) {
                console.log(error);
            }
        )
    },
    'click #btn-login': function (e, t) {
        e.preventDefault();
        // retrieve the input field values
        var email = t.find('#login-username').value
            , password = t.find('#login-password').value;

        // Trim and validate your fields here....

        // If validation passes, supply the appropriate fields to the
        // Meteor.loginWithPassword() function.
        Meteor.loginWithPassword(email, password, function (err) {
            if (err) {
            }
            // The user might not have been found, or their passwword
            // could be incorrect. Inform the user that their
            // login attempt has failed.
            else {
                Router.go('search');
            }
            // The user has been logged in.
        });
        return false;
    },
    'click #btn-signup': function (e, t) {
        e.preventDefault();
        var email = t.find('#account-email').value
            , password = t.find('#account-password').value
        , firstName = t.find('#first-name').value
        , lastName = t.find('#last-name').value;

        // Trim and validate the input
        var email = Helper.trimInput(email);

        if (Helper.isValidPassword(password)) {

            Accounts.createUser({profile: {name: firstName + ' ' + lastName},email: email, password: password}, function (err) {
                if (err) {
                    console.log(err,"error")
                    Router.go('login');
                    // Inform the user that account creation failed
                } else {
                    // Success. Account has been created and the user
                    // has logged in successfully.
                    Router.go('search');
                }

            });
        }
        return false;
    }

});


Template.forgotPassword.helpers({
    resetPassword: function (t) {
        if (Accounts._resetPasswordToken) {
            Session.set('resetPassword', Accounts._resetPasswordToken);
        };
        return Session.get('resetPassword');
    }
});

Template.forgotPassword.events({

    'submit #recovery-form': function (e, t) {
        e.preventDefault();
        var email = Helper.trimInput(t.find('#recovery-email').value)

        if (!_.isEmpty(email) && Helper.isEmail(email)) {
            Session.set('loading', true);
            Accounts.forgotPassword({email: email}, function (err) {
                if (err)
                    Session.set('displayMessage', 'Password Reset Error &amp; Doh')
                else {
                    Session.set('displayMessage', 'Email Sent &amp; Please check your email.')
                }
                Session.set('loading', false);
            });
        }
        return false;
    },

    'submit #new-password': function (e, t) {
        e.preventDefault();
        var pw = t.find('#new-password-password').value;
        if (!_.isEmpty(pw) && Helper.isValidPassword(pw)) {
            Session.set('loading', true);
            Accounts.resetPassword(Session.get('resetPassword'), pw, function (err) {
                if (err)
                    Session.set('displayMessage', 'Password Reset Error &amp; Sorry');
                else {
                    Session.set('resetPassword', null);
                }
                Session.set('loading', false);
            });
        }
        return false;
    }

});