Meteor.publish('loc', function () {
  if (this.userId) { 
    var equipe = Equipe.findOne({team : this.userId});
    if (!equipe) this.stop();
    return LocData.find({"_id" : {$in : equipe.team}}, {fields: {last: 1, userID: 1}});
  } else {
      this.ready();
  }
});

Meteor.publish("userData", function () {
    if (this.userId) {
        return Meteor.users.find({_id: this.userId},
            {fields: {'color': 1}});
    } else {
        this.ready();
    }
});

Meteor.publish("userEquipe", function () {
  if (this.userId) {
    return Equipe.find({team : this.userId});
  } else {
    this.ready();
  }
});

Meteor.publish("userList", function () {
    return Meteor.users.find();
});

Meteor.publish("equipeList", function () {
    return Equipe.find();
});

Meteor.publish("chatRoomList", function () {
  return ChatRoom.find();
});

Meteor.publish("userChatRoom", function () {
  if (this.userId) { 
    var equipe = Equipe.findOne({team : this.userId});
    if (!equipe) this.stop();
    return ChatRoom.find({"_id" : equipe._id});
  } else {
      this.ready();
  }
});

Meteor.publish("chatRoomMessages", function (id) {
  return Message.find({"equipeID": id}, {sort: {date: -1}, limit:10});
});

Meteor.publish("userMessages", function () {
  if (this.userId) { 
    var equipe = Equipe.findOne({team : this.userId});
    if (!equipe) this.stop();
    return Message.find({"equipeID": equipe._id}, {sort: {date: -1}, limit:10});
  } else {
      this.ready();
  }
});

Meteor.publish("chasseList", function () {
    return Chasse.find();
});
Meteor.publish("parcoursList", function (id) {
    if (this.userId) {
        var list = Chasse.findOne({_id: id});
        if (!list) this.stop();
        return Parcours.find({_id: {$in: list.listParcours}});
    } else {
        this.ready();
    }
});
Meteor.publish("etapesList", function () {
    return Etapes.find();
});