//  This will be called by the included PAGE.js as part of the liger initialization.
PAGE.speaker = function(){
	SPEAKER.initialize();
}

//  All of the code unique to the page's functionality
var SPEAKER = {

    speaker: null,

	initialize: function(){
        var me = this;

        if(PAGE.args){
            if("speaker" in PAGE.args){
                me.speaker = PAGE.args.speaker;
                me.displayDetails();
            }
        }
    },

    displayDetails: function(){
        var me = this;

        var template = $("#speakerTemplate").html();
        $("#page-content").html(_.template(template,{speaker:me.speaker}));
    }
}
