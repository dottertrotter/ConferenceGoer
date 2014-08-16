//  This will be called by the included PAGE.js as part of the liger initialization.
PAGE.session = function(){
	SESSION.initialize();
}

//  All of the code unique to the page's functionality
var SESSION = {

    session: null,

	initialize: function(){
        var me = this;

        if(PAGE.args){
            if("session" in PAGE.args){
                me.session = PAGE.args.session;
                me.displayDetails();
                me.addBindings();
            }
        }
    },

    displayDetails: function(){
        var me = this;

        var template = $("#sessionTemplate").html();
        $("#page-content").html(_.template(template,{session:me.session}));
    },

    addBindings: function(){
        var me = this;

        $(".session-details-link").unbind().click(function(){
            PAGE.openPage('Details','session',{'session': me.sessions[$(this).index()] });
        });

    }
}
