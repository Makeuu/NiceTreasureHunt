Router.configure({
    layoutTemplate: 'layout',
    onAfterAction: function () {
        document.title = 'Nice Treasure Hunt';
    }
});

Router.route('/', {
    name: 'index',
    waitOn: function () {
        return [
            Meteor.subscribe('userData'),
            Meteor.subscribe('userEquipe'),
            Meteor.subscribe('userChatRoom'),
        ];
    },
    data: function () {
        return {
            isInEquipe: function () {
                return Equipe.find().count() == 1;
            },
            newMessage: function () {
                var chat = ChatRoom.findOne();
                if (chat)
                    return chat.last.uRead.indexOf(Meteor.userId()) == -1;
            },
        }
    }
});
Router.route('/login', {name: 'login'});
Router.route('/signup', {name: 'signup'});

Router.route('/GestChasses', {
    name: 'gestChasse',
    waitOn: function () {
        return [
            Meteor.subscribe('chasseList')
        ];
    }
});
Router.route('/GestParcours/:id', {
    name: 'GestParcours',
    waitOn: function () {
        return [
            Meteor.subscribe('parcoursList', this.params.id)
        ];
    }
});
Router.route('/GestEtapes/:id', {
    name: 'gestEtape',
    waitOn: function () {
        return [
            Meteor.subscribe('etapesList', this.params.id)
        ];
    }
});
Router.route('/ModifEtape/:id', {
    name: 'modifEtape',
    waitOn: function () {
        return [
            Meteor.subscribe('etapeData', this.params.id)
        ];
    }
});
Router.route('/AddEtape/:id/:type', {name: 'addEtape'});

Router.route('/equipe', {
    name: 'equipe',
    waitOn: function () {
        return [
            Meteor.subscribe('equipeList'),
            Meteor.subscribe('userList'),
            Meteor.subscribe('chasseList'),
            Meteor.subscribe('parcoursAllList'),
        ];
    }
});

Router.route('/organisateur', {
    name: 'organisateur',
    waitOn: function () {
        return [
            Meteor.subscribe('userList')
        ];
    }
});

Router.route('/profileEdit', {
    name: 'profileEdit',
    waitOn: function () {
        return [
            Meteor.subscribe('userData'),
            Meteor.subscribe('userEquipe'),
            Meteor.subscribe('userChatRoom'),
        ];
    },
    data: function () {
        return {
            isInEquipe: function () {
                return Equipe.find().count() == 1;
            },
            newMessage: function () {
                var chat = ChatRoom.findOne();
                if (chat)
                    return chat.last.uRead.indexOf(Meteor.userId()) == -1;
            },
        }
    }
});

Router.route('/map', {
    name: 'map',
    waitOn: function () {
        return [
            Meteor.subscribe('loc'),
            Meteor.subscribe('userData'),
            Meteor.subscribe('userEquipe'),
            Meteor.subscribe('userChatRoom'),
        ];
    },
    data: function () {
        return {
            isInEquipe: function () {
                return Equipe.find().count() == 1;
            },
            newMessage: function () {
                var chat = ChatRoom.findOne();
                if (chat)
                    return chat.last.uRead.indexOf(Meteor.userId()) == -1;
            },
        }
    }
});

Router.route('/chatroom/:id?', {
    name: 'adminMessage',
    waitOn: function () {
        return [
            Meteor.subscribe('equipeList'),
            Meteor.subscribe('chatRoomList'),
            Meteor.subscribe('chatRoomMessages', this.params.id)
        ];
    },
    data: function () {
        return {
            messages: Message.find({}, {sort: {date: 1}}).fetch()
        }
    }
});

Router.route('/needHelp', {
    name: 'userMessage',
    waitOn: function () {
        return [
            Meteor.subscribe('userMessages'),
            Meteor.subscribe('userEquipe'),
            Meteor.subscribe('userChatRoom'),
        ];
    },
    data: function () {
        return {
            messages: Message.find({}, {sort: {date: 1}}).fetch(),
            isInEquipe: function () {
                return Equipe.find().count() == 1;
            },
            newMessage: function () {
                var chat = ChatRoom.findOne();
                if (chat)
                    return chat.last.uRead.indexOf(Meteor.userId()) == -1;
            },
        }
    }
});

Router.onBeforeAction(function () {
    if (!Meteor.user() && !Meteor.loggingIn()) {
        this.redirect('/login');
    } else {
        this.next();
    }
}, {
    except: ['index', 'login', 'signup']
});

Accounts.onLogin(function () {
    if (Meteor.isClient) { // only works on client
        document.querySelector("#accueil").click();
    }
});
