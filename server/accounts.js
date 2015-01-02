//Accounts.loginServiceConfiguration.remove({
//    service: "facebook"
//});
ServiceConfiguration.configurations.remove({
        service: "facebook"
    }
);
ServiceConfiguration.configurations.insert({
    service: "facebook",
    appId: "1394892857474221",
    secret: "27086f88701987696d061a1441a96ac1"
});

