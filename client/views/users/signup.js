Template.signup.events = {
  'click input[type=submit]': function(event){
    event.preventDefault();

    var user = {
      username: $('#username').val(),
      email: $('#email').val(),
      password: $('#password').val()
    };

    if(!user.username || !user.email || !user.password){
      flash('Please fill in all fields');
    }else{
      Accounts.createUser(user, function(error){
        if(error){
          signupflash(error.reason, 'error');
        }else{
          Router.go('/');
          signupflash('Thanks for signing up!');
        }  
      });
    }

  }
};

Template.signup.helpers({
  messages: function () {
    return signUpMessages.find();
  },
})