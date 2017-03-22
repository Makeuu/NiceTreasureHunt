import { Meteor } from 'meteor/meteor';

Accounts.onCreateUser(function (options, user) {
    user.color = "#F44336";
    user.role = 'user';

    return user;
});

Meteor.startup(() => {

});