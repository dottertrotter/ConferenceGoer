//  This will be called by the included PAGE.js as part of the liger initialization.
PAGE.schedule = function(){
	SCHEDULE.initialize();
}

//  All of the code unique to the page's functionality
var SCHEDULE = {

	sessions: [],

	initialize: function(){
        var me = this;

        me.sessions = [];
        $.getJSON( "http://0.0.0.0:8000/sessions.json", {}, SCHEDULE.successfulFetch )
        .fail(function( jqxhr, textStatus, error ) {
            var err = textStatus + ", " + error;
            console.log( "Request Failed: " + err );
        });
    },

    successfulFetch: function(json){
    	SCHEDULE.sessions = json;
        SCHEDULE.displayUpcoming();
        SCHEDULE.addBindings();
    },

    displayUpcoming: function(){
        var me = this;

        var template = $("#sessionsTemplate").html();
        $("#page-content").html(_.template(template,{sessions:me.sessions}));
    },

    addBindings: function(){
        var me = this;

        $(".session-details-link").unbind().click(function(){
            PAGE.openPage('Details','session',{'session': me.sessions[$(this).index()] });
        });

    }
}
