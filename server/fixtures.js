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

    const idC1 = Chasse.insert({
        nom: "Chasse à Evry"
    });
    Chasse.insert({
        nom: "Chasse à Nice"
    });
    const idP1 = Parcours.insert({
        nom: "Parcours 1",
        chasseId: [idC1],
        parcous: ""
    });
    const idP2 = Parcours.insert({
        nom: "Parcours 2",
        chasseId: [idC1],
        parcous: ""
    });
    const idE1 = Etapes.insert({
        nom: "Pigeon",
        type: "Question",
        question: "Quel est la différence entre un pigeon ?",
        reponse: "Il a les deux pattes identiques, surtout la gauche.",
        position: 1,
        parcoursId: [idP1]
    });
    Etapes.insert({
        nom: "Voix",
        type: "Question",
        question: "Quel est la différence entre un tunnel ?",
        reponse: "Il a les deux routes identiques, surtout la gauche.",
        position: 2,
        parcoursId: [idP1]
    });
    Etapes.insert({
        nom: "Saut",
        type: "Question",
        question: "Quel est la différence entre un sauteur ?",
        reponse: "Il a les deux jambes identiques, surtout la gauche.",
        position: 2,
        parcoursId: [idP2]
    });
    const prams = {valide:0, reponse:"bonjour"};
    var validate ={};
    validate[idE1] = prams;
    const eq1 = Equipe.insert({
        nom: "test du nom",
        team: [user1, user2],
        parcours: [idP1],
        validate: validate
    });
    const eq2 = Equipe.insert({
        nom: "le second ",
        team: [],
        parcours: [idP2],
        validate: {}
    });

    Message.insert({
        "equipeID" : eq1,
        "date": new Date(),
        "from": "Organisateur",
        "msg" : "First Message to test",
        "type": 0
    });
    Message.insert({
        "equipeID" : eq1,
        "date": new Date(),
        "from": "Organisateur",
        "msg" : "Ok, I saw it",
        "type": 1
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
        "uRead": [],
        "aRead": true,
        "msgID": msgID
      }
    });
    
    console.log("Fixtures chargé !");
}
