Houses = new Mongo.Collection("houses");
HouseLogistics = new Mongo.Collection("houseLogistics");

Meteor.subscribe("myHomesList");
Meteor.subscribe("houseLogisticsData");

//Meteor.call("getMyHomes", function (error, results) {
//    Session.set("myHomesList", results); //results.data should be a JSON object
//});
Meteor.call('getUserData', function (err, data) {
    Session.set("fbAccountDetails", data);
});