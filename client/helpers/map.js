var map;
var tracks = [];

Template.map.onRendered(function (){
  if (Meteor.isClient) {
    L.Icon.Default.imagePath = '/packages/bevanhunt_leaflet/images/';
    
    map = L.map('map');
    var Loc = LocData.find().fetch();
    for(var l in Loc){
      console.log(Loc[l]);
      tracks[Loc[l].userID] = L.marker(Loc[l].last).addTo(map);
    }

    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    map.locate({watch: true, setView : true});
    map.on('locationfound', onLocationFound);
    map.on('locationerror', onLocationError);
    
    
    geoLoop();
  }
})

function onLocationFound(e) {
    var radius = e.accuracy / 2;
    
    console.log(e.latlng);
    
    Meteor.call('LocUpdate', e.latlng, function(error, result) {
    // affiche l'erreur à l'utilisateur et s'interrompt
      if (!result){
        console.error("Erreur envoie coordonnée !");
      } else {
        // console.log(result._id);
      }
    });
      
    //L.marker(e.latlng).addTo(map).bindPopup("You are within " + radius + " meters from this point").openPopup();
}

var geoLoop = function() {
  var Loc = LocData.find().fetch();
  
  for(var l in Loc){
    tracks[Loc[l].userID].setLatLng(Loc[l].last);
  }
  
  requestAnimationFrame(geoLoop);
}

function onLocationError(e) {
    console.error(e.message);
}