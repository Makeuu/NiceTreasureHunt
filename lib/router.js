Router.configure({
	layoutTemplate: 'layout',
	onAfterAction: function() {
		document.title = 'Nice Treasure Hunt';
	}
});

Router.route('/', {	name: 'index'});
Router.route('/login', {	name: 'login'});
Router.route('/signup', {	name: 'signup'});

Router.route('/map', {
    name: 'map',
    waitOn: function(){
      return [
        Meteor.subscribe('loc')
      ];
    }
});

Router.onBeforeAction(function () {
    if (!Meteor.user() && !Meteor.loggingIn()) {
        this.redirect('/login');
    } else {
        // required by Iron to process the route handler
        this.next();
    }
}, {
    except: ['index','login','signup']
});

Accounts.onLogin(function(){
    if(Meteor.isClient) { // only works on client
        document.querySelector("#accueil").click();
    }
})