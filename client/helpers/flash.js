// create new local collections for messages
loginMessages = new Meteor.Collection(null);
signUpMessages = new Meteor.Collection(null);
forgotMessages = new Meteor.Collection(null);


loginflash = function (message, messageType) {
	var type = typeof messageType === 'undefined' ? 'success' : messageType;
	loginMessages.remove({});
	loginMessages.insert({
		message: message,
		type: type
	});
}

signupflash = function (message, messageType) {
	var type = typeof messageType === 'undefined' ? 'success' : messageType;
	signUpMessages.remove({});
	signUpMessages.insert({
		message: message,
		type: type
	});
}

forgotflash = function (message, messageType) {
	var type = typeof messageType === 'undefined' ? 'success' : messageType;
	forgotMessages.remove({});
	forgotMessages.insert({
		message: message,
		type: type
	});
}