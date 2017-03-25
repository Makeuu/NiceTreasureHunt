// TODO Penser à l'enlever une fois les tests terminées
Meteor.users.remove({});
LocData.remove({});
Equipe.remove({});
Chasse.remove({});
Parcours.remove({});
Etapes.remove({});
ChatRoom.remove({});
Message.remove({});

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
    const user1 = Accounts.createUser({
        email: "user@user.fr",
        username: "user",
        password: "user",
        profile: {
            role: "user"
        }
    });
    const user2 = Accounts.createUser({
        email: "user2@user.fr",
        username: "user2",
        password: "user2",
        profile: {
            role: "user"
        }
    });
    const eq1 = Equipe.insert({
        nom: "test du nom",
        team: [user1, user2]
    });
    const eq2 = Equipe.insert({
        nom: "le second ",
        team: []
    });

    const idP1 = Parcours.insert({
        nom: "Parcours 1",
        listEtapes: []
    });
    const idP2 = Parcours.insert({
        nom: "Parcours 2",
        listEtapes: []
    });
    Chasse.insert({
        nom: "Chasse à Evry",
        listParcours : [idP1, idP2]
    });
    Chasse.insert({
        nom: "Chasse à Nice",
        listParcours : []
    });
    
    
    Message.insert({
      "equipeID" : eq1,
      "date": new Date(),
      "from": "Organisateur",
      "msg" : "First Message to test",
      "type": 0
    });
    
    var msgID = Message.insert({
      "equipeID" : eq1,
      "date": new Date(),
      "from": "Organisateur",
      "msg" : "Second Message to test",
      "type": 0
    });
    
    ChatRoom.insert({
      "_id" : eq1,
      "last": {
        "date": new Date(),
        "uRead": false,
        "aRead": true,
        "msgID": msgID
      }
    });
    
    console.log("Fixtures chargé !");
}