Template.organisateur.helpers({
    "list": function () {
        return Meteor.users.find({'profile.role': {$in: ["user","gest"]}}).fetch();
    },
    "isUser"(role) {
        if(this.profile.role===role) {
            return {
                selected: true
            }
        } else {
            return {
            }
        }
    }
});
Template.organisateur.events({
    'change select': function (event) {
        event.preventDefault();

        const profileProperties = {
            profile: {role: event.target.selectedOptions[0].value},
        };

        Meteor.users.update({_id: event.target.id}, {$set: profileProperties}, function (error) {
            if (error) {
                console.log(error.reason);
            } else {
                Router.go('organisateur');
            }
        });
    }
});