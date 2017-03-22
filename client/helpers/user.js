Template.headerNormal.helpers({
    "isAdmin": function () {
        return Meteor.user().profile.role == "admin";
    },
});
Template.headerSidebar.helpers({
    "isAdmin": function () {
        return Meteor.user().profile.role == "admin";
    },
});