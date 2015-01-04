/**
 * Created by akadus on 12/28/14.
 */
Meteor.publish("myHomesList", function () {
    return Houses.find({user_id: this.userId});
});

Meteor.publish("houseLogisticsData", function (houseId) {
    return HouseLogistics.find({house_id: houseId});
});


