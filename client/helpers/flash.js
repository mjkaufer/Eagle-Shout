// create new local collections for messages
Messages = new Meteor.Collection(null);

Messages.allow({

    remove: function (){
        return true;    
    }

});

flash = function (message, messageType) {
	var type = typeof messageType === 'undefined' ? 'success' : messageType;
	Messages.remove({});
	Messages.insert({
		message: message,
		type: type
	});
	Meteor.setTimeout(function(){
	    $('#alert').fadeOut();
	    $('#alert').show();
	    
	    Meteor.setTimeout(function(){
	        Messages.remove({});
	    }, 500);
	    
	}, 1000);
}

Handlebars.registerHelper('areMessages',function(){

    return Messages.find().count() > 0;

});