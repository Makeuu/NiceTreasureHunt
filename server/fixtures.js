//Meteor.users.remove({});
if (Meteor.users.find().count() === 0) {
    var idUser = Accounts.createUser({
        email : "root@root.fr",
        password : "root"
    });
    var user = Meteor.users.findOne({_id: idUser});
    user.role = "admin";
}
