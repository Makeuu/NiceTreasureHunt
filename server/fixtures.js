// TODO Penser à l'enlever une fois les tests terminées
Meteor.users.remove({});
LocData.remove({});
Equipe.remove({});

if (Meteor.users.find().count() === 0) {
    console.log("Fixtures update !");
    Accounts.createUser({
        email: "root@root.fr",
        username: "root",
        password: "root",
        profile: {
            role: "admin"
        }
    });
    Accounts.createUser({
        email: "gest@gest.fr",
        username: "gest",
        password: "gest",
        profile: {
            role: "gest"
        }
    });
    Accounts.createUser({
        email: "user@user.fr",
        username: "user",
        password: "user",
        profile: {
            role: "user"
        }
    });
    Accounts.createUser({
        email: "user2@user.fr",
        username: "user2",
        password: "user2",
        profile: {
            role: "user"
        }
    });
    Equipe.insert({
        nom: "test du nom",
        team: []
    });
    Equipe.insert({
        nom: "le second ",
        team: []
    });
}
