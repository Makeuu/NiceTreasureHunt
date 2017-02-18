Meteor.publish('loc', function() {
  return LocData.find({}, {fields: {last:1, userID:1}});
});