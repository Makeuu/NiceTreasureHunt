Template.seeEtapes.helpers({
    "isRole": function (role) {
        return Meteor.user().profile.role === role;
    }
});