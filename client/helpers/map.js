var map;
var tracks = [];

var style_mapicon = L.AwesomeMarkers.icon({ 
        prefix:'fa',
        icon: 'android',
        markerColor:'green', 
        spin: false,
        iconColor:"white"
      });
      
var user_mapicon = L.AwesomeMarkers.icon({ 
        prefix:'fa',
        icon: 'android',
        markerColor:'red', 
        spin: false,
        iconColor:"white"
      });
      
var locView = true;

Template.map.onRendered(function (){
  if (Meteor.isClient) {

    resizeMap();

    window.onresize = function() {
      resizeMap();
    };
    
    L.Icon.Default.imagePath = '/packages/bevanhunt_leaflet/images/';
    
    map = L.map('map');
    var Loc = LocData.find().fetch();
    for(var l in Loc){
      /*console.log(Loc[l]);*/
      //tracks[Loc[l].userID] = L.marker(Loc[l].last).addTo(map);
      if (Loc[l].userID == Meteor.userId())
        tracks[Loc[l].userID] = L.marker(Loc[l].last,{icon:user_mapicon}).addTo(map);
      else
        tracks[Loc[l].userID] = L.marker(Loc[l].last,{icon:style_mapicon}).addTo(map);
    }

    L.tileLayer.provider("OpenStreetMap.France").addTo(map);
    
    
    // custom zoom bar control that includes a Zoom Home function
    L.Control.zoomHome = L.Control.extend({
        options: {
            position: 'topleft',
            zoomHomeText: '<i class="fa fa-map-marker" style="line-height:1.65;"></i>',
            zoomHomeTitle: 'Recentrer sur moi'
        },

        onAdd: function (map) {
            var controlName = 'gin-control-zoom',
                container = L.DomUtil.create('div', controlName + ' leaflet-bar'),
                options = this.options;

            this._zoomHomeButton = this._createButton(options.zoomHomeText, options.zoomHomeTitle,
            controlName + '-home', container, this._zoomHome);

            return container;
        },

        _zoomHome: function (e) {
            if (tracks[Meteor.userId()]) map.setView(tracks[Meteor.userId()].getLatLng(), 20);
            locView = true;
        },

        _createButton: function (html, title, className, container, fn) {
            var link = L.DomUtil.create('a', className, container);
            link.innerHTML = html;
            link.href = '#';
            link.title = title;

            L.DomEvent.on(link, 'mousedown dblclick', L.DomEvent.stopPropagation)
                .on(link, 'click', L.DomEvent.stop)
                .on(link, 'click', fn, this)
                .on(link, 'click', this._refocusOnMap, this);

            return link;
        },
    });
    // add the new control to the map
    var zoomHome = new L.Control.zoomHome();
    zoomHome.addTo(map);
    
    map.on('locationfound', onLocationFound);
    map.on('locationerror', onLocationError);
    map.on('movestart', function(e){locView = false});
    map.on('zoomstart', function(e){locView = false});
    
    console.log("Start Locate");
    map.locate({watch : true});
    
    geoLoop();

  }
})

function onLocationFound(e) {
    var radius = e.accuracy / 2;
    
    console.log("Founded at :" + e.latlng);
    
    Meteor.call('LocUpdate', e.latlng, function(error, result) {
    // affiche l'erreur à l'utilisateur et s'interrompt
      if (!result){
        console.error("Erreur envoie coordonnée !");
      } else {
        // console.log(result._id);
      }
    });
    
    if (locView){
      if (tracks[Meteor.userId()])
        map.setView(tracks[Meteor.userId()].getLatLng(), 20);
      else {
        map.setView(e.latlng, 20);
      }
    }
    
    //L.marker(e.latlng).addTo(map).bindPopup("You are within " + radius + " meters from this point").openPopup();
}

var geoLoop = function() {
  var Loc = LocData.find().fetch();
  
  for(var l in Loc){
    if (tracks[Loc[l].userID]){
      tracks[Loc[l].userID].setLatLng(Loc[l].last);
    } else {
      tracks[Loc[l].userID] = L.marker(Loc[l].last,{icon:style_mapicon}).addTo(map);
    }
  }
  
  requestAnimationFrame(geoLoop);
}

function onLocationError(e) {
    console.error(e.message);
}

function resizeMap() {
  var w = window.innerWidth;
  var h = window.innerHeight-40;
  var newDimW = 0;
  var newDimH = 0;

  if(w <= 600) {
    newDimW = w;
    newDimH = h;
  } else {
    newDimW = w/2;
    newDimH = h-18.233;
  }

  document.querySelector("#map").style.width = newDimW + "px";
  document.querySelector("#map").style.height = newDimH + "px";
  console.log("Map Rezised");
}
