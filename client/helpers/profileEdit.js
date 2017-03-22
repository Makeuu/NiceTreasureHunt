Template.profileEdit.helpers({
    profileUser() {
        return {
            email: Meteor.user().emails[0].address,
            username: Meteor.user().username,
            color: Meteor.user().color
        }
    }
});

Template.profileEdit.events({
    'submit form': function (event) {
        event.preventDefault();
        var email = event.target.email.value;
        var username = event.target.username.value;
        var color = event.target.color.value;
        var password = event.target.password.value;

        console.log(email, username, color, password);
        /*Meteor.users.update(
            {_id: Meteor.userId()},
            {$set: {
                "profile.name": "yogi"
            }}
        );*/
    }
});