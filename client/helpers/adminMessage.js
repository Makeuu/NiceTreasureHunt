Template.adminMessage.helpers({
        "list": function () {
            return Equipe.find().fetch();
        }
    }
);

Template.adminMessage.events({
    'click #ACR_Submit': function (event) {
        event.preventDefault();
        var message = $("#ACR_Input")[0].value;
        var equipe = Router.current().params.id;
        
        if (!equipe || message == "") return;
        
        var postAttributes = {
          "equipe": equipe,
          "msg" : message
        };
        
        Meteor.call("ASendMessage", postAttributes, (err, res) => {
            if (err) {
              console.error(err);
            } else {
              $("#ACR_Input")[0].value = "";
            }
          });
    }
});

Template.AMEquipe.helpers({
        "lastMessage": function () {
            var infoChat = ChatRoom.findOne(this._id);
            if (infoChat) {
              return infoChat.last.date.toLocaleString();
            }
            return "Aucun message";
        },
    }
);


Template.userMessage.events({
    'click #UCR_Submit': function (event) {
        event.preventDefault();
        var message = $("#UCR_Input")[0].value;
        
        if (message == "") return;
        
        var postAttributes = {
          "msg" : message
        };
        
        Meteor.call("USendMessage", postAttributes, (err, res) => {
            if (err) {
              console.error(err);
            } else {
              $("#UCR_Input")[0].value = "";
            }
          });
    }
});