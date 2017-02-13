Template.map.onCreated(function (){
  if (Meteor.isClient) {
    L.Icon.Default.imagePath = '/packages/bevanhunt_leaflet/images/';
    var map = L.map('map');
    
    map.locate({wtch: true, setView : true});
  }
})