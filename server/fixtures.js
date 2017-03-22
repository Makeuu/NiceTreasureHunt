Meteor.users.remove({});
if (Meteor.users.find().count() === 0) {
    Accounts.createUser({
        email : "root@root.fr",
        password : "root",
        profile:  {
            role: "admin"
        }
    });
}
