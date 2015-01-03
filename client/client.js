Houses = new Mongo.Collection("houses");
Meteor.subscribe("myHomesList");

//Meteor.call("getMyHomes", function (error, results) {
//    Session.set("myHomesList", results); //results.data should be a JSON object
//});
Meteor.call('getUserData', function (err, data) {
    Session.set("fbAccountDetails", data);
});