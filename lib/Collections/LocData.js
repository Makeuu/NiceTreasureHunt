/*
{
  "userID" : ####,
  
  "last" : {
    "lat" : ##,
    "lng" : ##
  },
  
  "locs" : [
    { 
      "date" : Date(),
      "coords" : 
      {
        "lat" : ##,
        "lng" : ##
      }
    },
    {...}
  ]
}
*/
LocData = new Mongo.Collection('localisation');

Meteor.methods({
    LocUpdate: function(postAttributes) {
      // Vérification à faire
        LocData.update(Meteor.userId(), {
          $set:{
            "userID" : Meteor.userId(),
            "last" : {
              "lat" : postAttributes.lat,
              "lng" : postAttributes.lng
            }
          },
          $push:{
            "locs" : {
              "date": new Date(),
              "coords" : {
                "lat" : postAttributes.lat,
                "lng" : postAttributes.lng
              }
            }
          }
        },
        {upsert : true}
        );
        
        return true;
    }
});