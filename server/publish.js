Meteor.publish('loc', function () {
    if (this.userId) {
        const equipe = Equipe.findOne({team: this.userId});
        if (equipe)
            return LocData.find({"_id": {$in: equipe.team}}, {fields: {last: 1, userID: 1}});
    }

    this.ready();
});

Meteor.publish("userData", function () {
    if (this.userId) {
        return Meteor.users.find({_id: this.userId},
            {fields: {'color': 1}});
    }

    this.ready();
});

Meteor.publish("userEquipe", function () {
    if (this.userId) {
        return Equipe.find({team: this.userId});
    }

    this.ready();
});

Meteor.publish("userList", function () {
    if (this.userId) {
        return Meteor.users.find();
    }

    this.ready();
});

Meteor.publish("equipeList", function () {
    if (this.userId) {
        return Equipe.find();
    }
    this.ready();
});
Meteor.publish("findEquipe", function () {
    if (this.userId) {
        return Equipe.find({team: this.userId});
    }

    this.ready();
});

Meteor.publish("chatRoomList", function () {
    if (this.userId) {
        return ChatRoom.find();
    }

    this.ready();
});

Meteor.publish("userChatRoom", function () {
    if (this.userId) {
        const equipe = Equipe.findOne({team: this.userId});
        if (equipe)
            return ChatRoom.find({"_id": equipe._id});
    }

    this.ready();
});

Meteor.publish("chatRoomMessages", function (id) {
    if (this.userId)
        return Message.find({"equipeID": id}, {sort: {date: -1}, limit: 10});

    return this.ready();
});

Meteor.publish("userMessages", function () {
    if (this.userId) {
        const equipe = Equipe.findOne({team: this.userId});
        if (equipe)
            return Message.find({"equipeID": equipe._id}, {sort: {date: -1}, limit: 10});
    }

    this.ready();
});

Meteor.publish("chasseList", function () {
    if (this.userId)
        return Chasse.find();
    else
        return this.ready();
});
Meteor.publish("parcoursAllList", function () {
    return Parcours.find();
});

Meteor.publish("parcoursList", function (id) {
    return Parcours.find({chasseId: id});
});

Meteor.publish("etapesList", function (id) {
    if (this.userId)
        return Etapes.find({parcoursId: id},{sort: {position: 1}});
    else
        return this.ready();
});
Meteor.publish("etapesAllList", function () {
    if (this.userId)
        return Etapes.find();
    else
        return this.ready();
});

Meteor.publish("etapeData", function (id) {
    if (this.userId)
        return Etapes.find({_id: id});
});