Meteor.publish('loc', function() {
  return LocData.find({}, {fields: {last:1, userID:1}});
});

Meteor.publish("userData", function () {
    if (this.userId) {
        return Meteor.users.find({ _id: this.userId },
            { fields: { 'role': 1, 'color': 1 } });
    } else {
        this.ready();
    }
});