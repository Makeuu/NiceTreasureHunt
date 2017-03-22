Template.headerNormal.helpers({
    "isRole": function (role) {
        return Meteor.user().profile.role === role;
    }
});
Template.headerSidebar.helpers({
    "isRole": function (role) {
        return Meteor.user().profile.role === role;
    }
});