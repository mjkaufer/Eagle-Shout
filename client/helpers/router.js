/* ---------------------------------------------------- +/

## Client Router ##

Client-side Router.

/+ ---------------------------------------------------- */

// Config

Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound',
});

// Filters

var filters = {

  myFilter: function () {
    // do something
  },

  isLoggedIn: function() {
    if (!(Meteor.loggingIn() || Meteor.user())) {
      alert('Please Log In First.')
      this.stop(); 
    }
  }

}

Router.before(filters.myFilter, {only: ['items']});

// Routes

Router.map(function() {

  // Items

  this.route('items', {
    waitOn: function () {
      return Meteor.subscribe('allItems');
    },
    data: function () {
      return {
        items: Items.find()
      }
    }
  });

  this.route('item', {
    path: '/items/:_username',
    waitOn: function () {
      return Meteor.subscribe('singleItem', this.params._username);
    },
    data: function () {
      return {
        item: Items.findOne({username: this.params._username})
      }
    }
  });


  // Pages

  this.route('homepage', {
    path: '/'
  });

  this.route('new');

  this.route('content');

  // Users

  this.route('login'); 

  this.route('signup'); 

  this.route('forgot'); 

});
