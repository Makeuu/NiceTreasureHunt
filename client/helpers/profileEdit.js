Template.profileEdit.helpers({
    profileUser() {
        try {
            return {
                email: Meteor.user().emails[0].address,
                username: Meteor.user().username,
                color: Meteor.user().color
            }
        } catch (e) {}
    }
});

Template.profileEdit.events({
    'submit form': function (event) {
        event.preventDefault();

        var email = [{address: event.target.email.value, verified: false}];

        const profileProperties = {
            emails: email,
            username: event.target.username.value,
            color: event.target.color.value,
        };

        Meteor.users.update({_id: Meteor.userId()}, {$set: profileProperties}, function (error) {
            if (error) {
                console.log(error.reason);
            } else {
                Router.go('profileEdit');
            }
        });
    }
});