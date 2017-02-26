Router.configure({
  layoutTemplate: 'layout',
});

Router.route('/', {name: 'index'});
Router.route('/map', {
    name: 'map',
    waitOn: function(){
      return [
        Meteor.subscribe('loc')
      ];
    }
});
