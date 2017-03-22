Template.header.helpers({
    "isAdmin": function () {
        return Meteor.user().profile.role === "admin";
    },
});