Meteor.publish('loc', function () {
    return LocData.find({}, {fields: {last: 1, userID: 1}});
});

Meteor.publish("userData", function () {
    if (this.userId) {
        return Meteor.users.find({_id: this.userId},
            {fields: {'color': 1}});
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
Meteor.publish("chatRoomMessages", function (id) {
  return Message.find({"equipeID": id}, {sort: {date: -1}, limit:10});
});
Meteor.publish("userMessages", function () {
  var equipe = Equipe.findOne({team : this.userId});
  if (!equipe) this.stop();

  return Message.find({"equipeID": equipe._id}, {sort: {date: -1}, limit:10});
});

Meteor.publish("chasseList", function () {
    return Chasse.find();
});
Meteor.publish("parcoursList", function (id) {
    const listP = Chasse.find({_id: id}).fetch()[0];

    if(listP !== undefined) {
        return Parcours.find({_id: {$in: listP.listParcours}});
    } else {
        this.ready();
    }
});
Meteor.publish("etapesList", function () {
    return Etapes.find();
});