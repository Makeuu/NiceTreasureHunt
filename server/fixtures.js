// TODO Penser à l'enlever une fois les tests terminées
Meteor.users.remove({});
LocData.remove({});

if (Meteor.users.find().count() === 0) {
    Accounts.createUser({
        email: "root@root.fr",
        password: "root",
        profile: {
            role: "admin"
        }
    });
    Accounts.createUser({
        email: "gest@gest.fr",
        password: "gest",
        profile: {
            role: "gest"
        }
    });
}

