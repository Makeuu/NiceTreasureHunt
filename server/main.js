import { Meteor } from 'meteor/meteor';

Accounts.onCreateUser(function (options, user) {
    user.color = "#F44336";

    if (options.profile) {
        user.profile = options.profile;
    } else {
        user.profile = {};
    }

    user.profile.role = 'user';

    return user;
});

Meteor.startup(() => {

});