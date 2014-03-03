Template.forgot.events = {
  'click input[type=submit]': function(e){
    e.preventDefault();

    var options = {
      email: $('#email').val()
    };

    Accounts.forgotPassword(options, function(error){
      if(error){
        forgotflash(error.reason, "error");
      }else{
        Router.go('/signin');
        forgotflash("Password reset link sent!");
      }
    });

  }
};

Template.forgot.helpers({
  messages: function () {
    return forgotMessages.find();
  },
})