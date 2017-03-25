ChatRoom = new Mongo.Collection('chatRoom');
Message = new Mongo.Collection('message');

Meteor.methods({
    USendMessage: function (postAttributes) {
        if (Meteor.isServer) {
        var eq = Equipe.findOne({team : this.userId});
        var who = Meteor.users.findOne(this.userId);
        var msg = postAttributes.msg;
        var date = new Date();
        // Vérification à faire    
        var msgID = Message.insert({
          "equipeID" : eq._id,
          "date": date,
          "from": who.username,
          "msg" : msg,
          "type": 0
        });
        
        ChatRoom.update(eq._id, {
              $set: {
                  "last": {
                      "date": date,
                      "uRead": [this.userId],
                      "aRead": false,
                      "msgID": msgID
                  }
              }
            },
            {upsert: true}
        );
        }
        return true;
    },
    UserReadIt: function () {
      if (Meteor.isServer) {
        var eq = Equipe.findOne({team : this.userId});
        ChatRoom.update(eq._id, {
          $push: {
            "last.uRead": this.userId
          }
        });
      }
    },
    
    ASendMessage: function (postAttributes) {
        var eq_id = postAttributes.equipe;
        var msg = postAttributes.msg;
        var date = new Date();
        // Vérification à faire
        var msgID = Message.insert({
          "equipeID" : eq_id,
          "date": date,
          "from": "Organisateur",
          "msg" : msg,
          "type": 1
        });
        
        ChatRoom.update(eq_id, {
              $set: {
                  "last": {
                      "date": date,
                      "uRead": [],
                      "aRead": true,
                      "msgID": msgID
                  }
              }
            },
            {upsert: true}
        );

        return true;
    },
    AdminReadIt: function (postAttributes) {
      var eq_id = postAttributes.equipe;
      ChatRoom.update(eq_id, {
        $set: {
          "last.aRead": true
        }
      });
    }
});