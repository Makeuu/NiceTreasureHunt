Template.header.helpers ({
    "isAdmin" : function() {
        return Meteor.user().role=="admin";
    },
});