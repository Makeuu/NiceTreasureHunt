Template.layout.events({
    'click #logout': function (event) {
        Meteor.logout();
    }
});