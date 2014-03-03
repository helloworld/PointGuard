Template.login.events = {
  'click input[type=submit]': function(event){
    event.preventDefault();
    var username = $('#username').val();
    var password = $('#password').val();
    Meteor.loginWithPassword(username, password, function(error){
      if(error){
        loginflash(error.reason, 'error');
      }else{
        Router.go('/');
        loginflash('You are now logged in.');
      }
    });
  }
};

Template.login.helpers({
  messages: function () {
    return loginMessages.find();
  },
})