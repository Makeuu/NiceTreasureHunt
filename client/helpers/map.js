var map;

Template.map.onRendered(function (){
  if (Meteor.isClient) {
    L.Icon.Default.imagePath = '/packages/bevanhunt_leaflet/images/';
    
    map = L.map('map').setView([51.505, -0.09], 13);

    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    map.locate({watch: true, setView : true});
    map.on('locationfound', onLocationFound);
    map.on('locationerror', onLocationError);
  }
})

function onLocationFound(e) {
    var radius = e.accuracy / 2;

    L.marker(e.latlng).addTo(map)
        .bindPopup("You are within " + radius + " meters from this point").openPopup();

    L.circle(e.latlng, radius).addTo(map);
}

function onLocationError(e) {
    alert(e.message);
}