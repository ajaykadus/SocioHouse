/**
 * Created by akadus on 2/21/15.
 */
Template.myBidding.rendered = function () {
};
Template.myBidding.events({
    "input #js-bid-range": function (event, template) {
        $(template.find("output#range")).html($(event.currentTarget).val());
    }
});