Template.login.events = {
  "click input[type=submit]": function(event){
    event.preventDefault();
    var username = $('#username').val();
    var password = $('#password').val();
    Meteor.loginWithPassword(username, password, function(error){
      if(error){
        flash(error.reason, 'error');
      }else{
        Router.go('/');
        flash('You are now logged in.');
      }
    });
  }
};

Template.forgot.events = {
  "click input[type=submit]": function(e){
    e.preventDefault();

    var options = {
      email: $('#email').val()
    };

    Accounts.forgotPassword(options, function(error){
      if(error){
        flash(error.reason, "error");
      }else{
        Router.go('/signin');
        flash("Password reset link sent!");
      }
    });

  }
};

Template.signup.events = {
  "click input[type=submit]": function(event){
    event.preventDefault();

    var user = {
      username: $('#username').val(),
      email: $('#email').val(),
      password: $('#password').val(),
      profile: {
        first: $('#first').val(),
        last: $('#last').val(),
        troop: $('#troop').val(),
        state: $('#state').val(),
        city: $('#city').val()
        // Other required field values can go here
      }
    };
    var missing = false;
    for(var i in user.profile)
    {
        if(!user.profile[i] || user.profile[i] === undefined || user.profile[i] === "" || user.profile[i] === null)
            missing = true;
    }

    if(!user.username || !user.email || !user.password || missing){
      flash('Please fill in all fields');
    }else{
      Accounts.createUser(user, function(error){
        if(error){
          flash(error.reason, 'error');
        }else{
          Router.go('/');
          flash('Thanks for signing up!');
        }  
      });
    }

  }
};
