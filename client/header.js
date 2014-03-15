
Content = {};
Content._dep = new Deps.Dependency;


Template.header.helpers({
  messages: function () {
    return Messages.find();
  },
  isLoggedIn: function () {
    return !!Meteor.user();
  }
})

Template.header.events({
  'click .log-out': function () {
    Meteor.logout();
  },
  'click a': function () {
      console.log('abc');
      Session.set('r', Math.random() + "");
      Messages.remove();
  }  
});

Template.yourProject.rendered = function(){
    $('#time').datetimepicker();
};

Handlebars.registerHelper('getClass',function(a){
  
	url = document.URL.split("/"); //e.g. http://test.com/something, so 3rd value will have link thing
	url = "/" + url[3];
	val = Router.path(a);
	if(Session.get('r') > Math.random())
        void(0);
        
	return url == val ? "active" : "";


});

Template.yourProject.events = {
  "click input[type=submit]": function(event){
    event.preventDefault();

    var project = {
      username: Meteor.user().username,
      scout: Meteor.user().profile.first + " " + Meteor.user().profile.last,
      name: $('#pname').val(),
      address: $('#address').val(),
      troop: Meteor.user().profile.troop,
      state: $('#state').val(),
      city: $('#city').val(),
      zip: $('#zip').val(),
      date: $('#time').val(),
      description: $('#desc').val()
    }
    
    
    var missing = false;
    for(var i in project)
    {
        if(!project[i] || project[i] === undefined || project[i] === "" || project[i] === null)
            missing = true;
    }

    if(missing){
      flash('Please fill in all fields');
    }else{
      if(Items.findOne({username:Meteor.user().username}))
        flash('You already have a project!');
      else
      {
        Items.insert(project);
        Meteor.call('setProject');
      }
    }

  }
};

Handlebars.registerHelper('getProject',function(){
    if(!Meteor.user().profile.project)
        return null;
    
    return Items.find({username: Meteor.user().username});
});

Handlebars.registerHelper('hasProject',function(){
    return Items.find({username: Meteor.user().username}).count() > 0;
});

Handlebars.registerHelper('toProject',function(){
    Router.go('/projects/' + Meteor.user().username)
});

Template.yourProject.helpers({
  showProject: function (){
    var find = Items.findOne({username: Meteor.user().username});
    console.log(find);
    var data = {project: find};
    return Template["project"](data)
  }
})