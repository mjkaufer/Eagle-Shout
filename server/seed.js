/* ---------------------------------------------------- +/

## Fixtures ##

Fill in the app with dummy data if database is empty.

/+ ---------------------------------------------------- */

// Fixture data 
// if (Items.find().count() === 0) {
 
//   Items.insert({
//     title: "Bob's Project",
//     by: "Bob Job",
//     body: "Bob's project is fun!",
//     date: "",
//     username: "test1"
//   });

// }

Meteor.methods({
   
   setProject : function(){
    
    if(!Meteor.user())
        return;
    
    Meteor.users.update({_id: Meteor.user()._id}, {$set:{"profile.project":true}});
       
   }
    
});