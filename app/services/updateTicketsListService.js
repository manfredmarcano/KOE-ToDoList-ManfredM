app.service('updateTicketsListService', function(){
    var ticket = {};

    this.getTicket = function() {
        return ticket;
    };

    this.setTicket = function(newTicket) {
        ticket = newTicket;
    };
});