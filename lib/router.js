Router.configure({
	layoutTemplate: 'layout',
	onAfterAction: function() {
		document.title = 'Nice Treasure Hunt';
	}
});

Router.route('/', {	name: 'index'});

Router.route('/map', {
    name: 'map',
    waitOn: function(){
      return [
        Meteor.subscribe('loc')
      ];
    }
});
