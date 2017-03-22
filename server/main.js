import {Meteor} from 'meteor/meteor';

Accounts.onCreateUser(function (options, user) {
    user.color = "#F44336";
    user.username = user.emails[0].address;

    if (options.profile) {
        user.profile = options.profile;
    } else {
        user.profile = {};
    }

    user.profile.role = 'user';

    return user;
});

Meteor.users.allow({
    update: function () {
        return true;
    }
});

Meteor.startup(() => {
});