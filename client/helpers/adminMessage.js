Template.adminMessage.helpers({
    "list": function () {
        return Equipe.find().fetch();
    }
});

Template.adminMessage.events({
    'click #ACR_Submit': function (event) {
        event.preventDefault();
        SendAdminMessage();
    },
    'keypress #ACR_Input': function (event) {
        if (event.which === 13) {
            SendAdminMessage();
        }
    },
    'mousemove': function (event) {
        IveReadIt("admin");
    }
});

function SendAdminMessage() {
    var acrInput = $("#ACR_Input")[0];
    const message = acrInput.value;
    const equipe = Router.current().params.id;

    if (!equipe || message === "") return;

    const postAttributes = {
        "equipe": equipe,
        "msg": message
    };

    Meteor.call("ASendMessage", postAttributes, (err, res) => {
        if (err) {
            console.error(err);
        } else {
            acrInput.value = "";
        }
    });
}

function IveReadIt(who) {
    switch (who) {
        case "admin" :
            var chat = ChatRoom.findOne(Router.current().params.id);
            if (chat && !chat.last.aRead)
                Meteor.call("AdminReadIt", {"equipe": Router.current().params.id});
            break;
        case "user" :
            var chat = ChatRoom.findOne();
            if (chat && chat.last.uRead.indexOf(Meteor.userId()) === -1)
                Meteor.call("UserReadIt");
            break;
    }
}

Template.AMEquipe.helpers({
    "lastMessage": function () {
        const infoChat = ChatRoom.findOne(this._id);
        if (infoChat) {
            return infoChat.last.date.toLocaleString();
        }
        return "Aucun message";
    },
    "new": function () {
        const infoChat = ChatRoom.findOne(this._id);
        if (infoChat) {
            return !infoChat.last.aRead;
        }
        return false;
    }
});

Template.userMessage.events({
    'click #UCR_Submit': function (event) {
        event.preventDefault();
        SendUserMessage();
    },
    'keypress #UCR_Input': function (event) {
        if (event.which === 13) {
            SendUserMessage();
        }
    },
    'mousemove': function (event) {
        IveReadIt("user");
    }
});

Template.userMessage.onRendered(function () {
    resizePanel();
    window.onresize = function () {
        resizePanel();
    };
    element = document.querySelector("#panelMessage");
    element.scrollTop = element.scrollHeight;
});

function SendUserMessage() {
    const message = $("#UCR_Input")[0].value;

    if (message === "") return;

    const postAttributes = {
        "msg": message
    };

    Meteor.call("USendMessage", postAttributes, (err, res) => {
        if (err) {
            console.error(err);
        } else {
            $("#UCR_Input")[0].value = "";
        }
    });
}

function resizePanel() {
    const w = window.innerWidth;
    const h = window.innerHeight-40;
    var newDimW = 0;
    var newDimH = 0;

    if(w <= 600) {
        newDimW = w;
        newDimH = h-88;
    } else {
        newDimW = w/2;
        newDimH = h-69;
    }


    document.querySelector(".js-userPanel").style.width = newDimW + "px";
    document.querySelector(".js-userPanel").style.height = newDimH + "px";
}

Template.messagePanel.helpers({
    "typeMessage": function () {
        return this.type === 1;
    }
})