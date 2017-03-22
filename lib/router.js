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
            Meteor.subscribe('userData')
        ];
    }
});

Router.route('/login', {name: 'login'});
Router.route('/signup', {name: 'signup'});

Router.route('/map', {
    name: 'map',
    waitOn: function () {
        return [
            Meteor.subscribe('loc'),
            Meteor.subscribe('userData')
        ];
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
})