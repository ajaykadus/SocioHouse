Accounts.ui.config({
    requestPermissions: {
        facebook: ['email', 'user_friends', 'user_location', 'user_events',
            'friends_events', 'friends_location', 'friends_about_me',
            'user_status', 'friends_status', 'read_friendlists']
    }
});

//Accounts.loginServiceConfiguration.insert({
//    service: "facebook",
//    appId: "1292962797",
//    secret: "75a730b58f5691de5522789070c319bc"
//});