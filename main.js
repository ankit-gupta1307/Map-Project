
   
	


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
			position: self.locationList()[i].latlng,
			animation: google.maps.Animation.DROP,
			title: self.locationList()[i].name,
			draggable: true,
			icon: image,
			id: i
		});
		self.markers().push(marker);
		
		self.locationList()[i].marker = marker;
		
		marker.addListener('click', function() {
            populateInfoWindow(this, largeInfoWindow);
          });
		  
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
	  

	this.currentMarker = ko.observable(this.locationList()[0].marker.setMap(map));
	
	this.setMarker = function(clickedMarker) {
		
		self.currentMarker(clickedMarker);
		
	};

	this.setMapOnAll = function() {
		for (var i=0; i < self.markers().length; i++ ) {
		self.markers()[i].setMap(map);
		}; 
		
	} 
	
	
		
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
    
 
 

  


