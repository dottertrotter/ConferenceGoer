//  This will be called by the included PAGE.js as part of the liger initialization.
PAGE.speakers = function(){
	SPEAKERS.initialize();
}

//  All of the code unique to the page's functionality
var SPEAKERS = {

	speakers: [],

	initialize: function(){
        var me = this;

        me.speakers = [];
        $.getJSON( "http://0.0.0.0:8000/speakers.json", {}, SPEAKERS.successfulFetch )
        .fail(function( jqxhr, textStatus, error ) {
            var err = textStatus + ", " + error;
            console.log( "Request Failed: " + err );
        });
    },

    successfulFetch: function(json){
    	SPEAKERS.speakers = json;
        SPEAKERS.displayUpcoming();
        SPEAKERS.addBindings();
    },

    displayUpcoming: function(){
        var me = this;

        var template = $("#speakersTemplate").html();
        $("#page-content").html(_.template(template,{speakers:me.speakers}));
    },

    addBindings: function(){
        var me = this;

        $(".session-details-link").unbind().click(function(){
            PAGE.openPage('Speaker','speaker',{'speaker': me.speakers[$(this).index()] });
        });

    }
}
