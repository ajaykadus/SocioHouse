Helper = (function () {
    return {
        trimInput: function (val) {
            return val.replace(/^\s*|\s*$/g, "");
        },
        isValidPassword: function (val) {
            return val.length >= 6 ? true : false;
        },
        isEmail: function (email) {
            var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email);
        }
    }
}
)();

Handlebars.registerHelper('if_eq', function(context, options) {
    if (context == options.hash.compare)
        return options.fn(this);
    return options.inverse(this);
});

Handlebars.registerHelper('getUsrImageURL', function(url, size) {
    return "img/default_user.png"
});