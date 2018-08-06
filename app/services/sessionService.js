app.factory('sessionService', function($window) {
    var data = "";
    return {
        set: function(session) {
            data = session;
        },
        get: function() {
            return data;
        }
    };
});