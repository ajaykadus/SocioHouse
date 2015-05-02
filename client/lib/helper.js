Helper = (function () {
    return {
        trimInput: function (val) {
            return val.replace(/^\s*|\s*$/g, "");
        },
        isValidPassword: function (val) {
            return val.length >= 1 ? true : false;
        },
        isEmail: function (email) {
            var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email);
        },
        formatPrice: function (price) {
            var intPrice = parseInt(price);
            var dollarPrice = intPrice.toFixed(1).replace(/\d(?=(\d{3})+\.)/g, '$&,');
            return dollarPrice;
        }
    }
})();

Handlebars.registerHelper('if_eq', function (context, options) {
    if (context == options.hash.compare)
        return options.fn(this);
    return options.inverse(this);
});

Handlebars.registerHelper('truncate', function (text, size) {
    if (text.length <= size) {
        return text;
    }
    else {
        return text.substring(0, size) + '...'
    }
});

Handlebars.registerHelper('getUsrImageURL', function (url, size) {
    var fbAccount = Session.get("fbAccountDetails");
    if (fbAccount) {
        return "http://graph.facebook.com/" + fbAccount.id + "/picture?type=large"
    }
    else {
        return "img/default_user.png"
    }
});

Handlebars.registerHelper("prettifyDate", function(timestamp) {
    return moment(timestamp).fromNow();

});
