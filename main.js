
   
	var latit = 28.6368300;
	var lngit = 77.0938320;
	var latitlngit = latit +','+ lngit;
		
	
		
 var locations = [
	{
		name: 'Tilak nagar',
		latlng: {
					lat: 28.628472,
					lng: 76.578614
				}
	},
	
	{
		name: 'Janakpuri',
		latlng: {
					lat: 28.608472,
					lng: 77.078614
				}
	},
	
	{
		name: 'Rajouri Garden',
		latlng: {
					lat: 28.658472,
					lng: 76.878614
				}
	}
];

var Location = function(data) {
	this.name = data.name;
	this.latlng = data.latlng;
	
	
};



var map, marker;

var viewModel = function() {
	
	self = this;
	this.names =  ko.observableArray([]);
	self.sortLocations = ko.observableArray(locations.slice());
	
	this.markers = ko.observableArray([]);
	
	this.locationList = ko.observableArray([]);
	
	locations.forEach(function(location) {
		self.locationList.push(new Location(location));
	});
	
	console.log(self.locationList()[0]);
	
	var image = 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png';
	
	var largeInfoWindow = new google.maps.InfoWindow();
	
	for (var i=0; i < self.locationList().length; i++) {
		
		marker = new google.maps.Marker({
			map: map,
			position: self.locationList()[i].latlng,
			animation: google.maps.Animation.DROP,
			title: self.locationList()[i].name,
			draggable: true,
			visible: true,
			icon: image,
			id: i
		});
		self.markers().push(marker);
		
		marker.addListener('click', function() {
            populateInfoWindow(this, largeInfoWindow);
          });
		self.locationList()[i].marker = marker; 
		  
    };
	console.log(self.markers()[0]);
	var populateInfoWindow = function (marker, infowindow) {
        
        if (infowindow.marker != marker) {
          infowindow.marker = marker;
          infowindow.setContent('<div>' + marker.title + '</div>');
          infowindow.open(map, marker);
          
          infowindow.addListener('closeclick', function() {
            infowindow.marker = null;
          });
        }
      };
	  
	self.query = ko.observable('');

	self.filteredPlaces = ko.computed(function () {
    return ko.utils.arrayFilter(self.locationList(), function (rec) {
            if ( self.query().length === 0 || rec.name.toLowerCase().indexOf(self.query().toLowerCase()) > -1) {
					rec.marker.setVisible(true);
					return true; 
					} else {
					rec.marker.setVisible(false);
					return false;
					}
				});
			});
			

	
	
	this.setMarker = function(data) {
		console.log(data);
		 self.locationList().forEach(function (location){
         location.marker.setVisible(false);
        });
	
  //set the marker for the clicked location visible
        data.marker.setVisible(true);
	};
	
	
	var basicInfoUrl = "https://api.foursquare.com/v2/venues/search?client_id=P3B45WXNAGYNYO4ZFIFQUANHVAZ4RPZZ4Z0DG4S3TRJWCQGF&client_secret=R1RZ4KZQJYJJYX2F4NHWLXLXY10WIUXNKDFZU5SCNH0PBYBQ&v=20130815&ll=28.639069,77.086774&query=gym&radius=1000" ;
	$.ajax({
		type: 'GET',
		dataType: "jsonp",
		cache: false,
		url: basicInfoUrl,
		success: function(data) {
					self.names().push(data.response.venues[0].name);	
				}
		});
		
		self.koComputedExercise = ko.computed(function() {
			console.log(self.names()[0]);
		});
	
};
var styles = [
    {
      stylers: [
        { hue: "#00ffe6" },
        { saturation: -20 }
      ]
    },{
      featureType: "road",
      elementType: "geometry",
      stylers: [
        { lightness: 100 },
        { visibility: "simplified" }
      ]
    },{
      featureType: "road",
      elementType: "labels",
      stylers: [
        { visibility: "off" }
      ]
    }
  ];




 function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 4,
    center: {lat: 28.628472 , lng: 77.078614 },
	styles: styles
	
  });
  
  var bounds = {
    north: 28,
    south: 29,
    east: 77.2,
    west: 76.5
  };
  
   map.fitBounds(bounds);
   ko.applyBindings(new viewModel());
}
    
 
 

  


