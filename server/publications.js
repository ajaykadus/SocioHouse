/**
 * Created by akadus on 12/28/14.
 */
Meteor.publish("myHomesList", function () {
    return Homes.find({user_id: this.userId});
});