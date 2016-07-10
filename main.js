
   
var latit = 28.6368300;
	var lngit = 77.0938320;
	var latitlngit = latit +','+ lngit;
		
	
		
 var locations = [
	{
		name: 'Addiction Gym & Spa',
		latlng: {
					lat: 28.639187518722093,
					lng: 77.0750160873286
				}
	},
	
	{
		name: 'Strength Gym',
		latlng: {
					lat: 28.63951183622196,
					lng: 77.08926957394918
				}
	},
	{
		name: 'The gym vikaspuri',
		latlng: {
					lat: 28.64290937981111,
					lng: 77.08158661505388
				}
	},
	{
		name: 'the world gym vikas puri',
		latlng: {
					lat: 28.64402685702688,
					lng: 77.0864032751163
				}
	},
	{
		name: 'Radius Gym And Spa',
		latlng: {
					lat: 28.641996352813372,
					lng: 77.09651931856945
				}
	},
	{
		name: 'the world gym',
		latlng: {
					lat: 28.64487862367399,
					lng: 77.07923160832262
				}
	},
	{
		name: 'Brix Gym',
		latlng: {
					lat: 28.627407338627094,
					lng: 77.08603262901306
				}
	},
	{
		name: 'The Gym',
		latlng: {
					lat: 28.62630747520567,
					lng: 77.09218638430356
				}
	},
	{
		name: 'Multy Gym',
		latlng: {
					lat: 28.634479626908053,
					lng: 77.07248670383318
				}
	},
	{
		name: 'carbon gym',
		latlng: {
					lat: 28.62688669873087,
					lng: 77.09476593210454
				}
	},
	{
		name: 'Musclemania Gym',
		latlng: {
					lat: 28.632213228257452,
					lng: 77.10194229080281
				}
	},
	{
		name: 'Brix gym',
		latlng: {
					lat: 28.634499063442853,
					lng: 77.1051004269293
				}
	},
	{
		name: 'Gym X',
		latlng: {
					lat: 28.616414801933328,
					lng: 77.08061988756133
				}
	},
	{
		name: 'Adonis fitness and Gym',
		latlng: {
					lat: 28.62156138091793,
					lng: 77.0877802311305
				}
	},
	{
		name: "'Gold's Gym A Block Janakpuri'",
		latlng: {
					lat: 28.622431823919275,
					lng: 77.06936705764893
				}
	},
	{
		name: 'Gold Gym',
		latlng: {
					lat: 28.621837221762117,
					lng: 77.0695750365762
				}
	},
	{
		name: 'gymplex',
		latlng: {
					lat: 28.63941226079242,
					lng: 77.08104142666788
				}
	},
	{
		name: 'TheGym',
		latlng: {
					lat: 28.626682205745386,
					lng: 77.09179401397705
				}
	}
	
];
console.log(locations[1]);
console.log(locations[0].id);

var Location = function(data) {
	var self = this;
	self.name = data.name;
	self.latlng = data.latlng;
	self.id = ko.observable(data.id);
};

var map, marker;

var viewModel = function() {
	
	self = this;
	
	this.names = ko.observableArray([]);
	
	self.availableIds = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}];
	
	this.markers = ko.observableArray([]);
	
	this.locationList = ko.observableArray([]);
	
	
	locations.forEach(function(location) {
		self.locationList.push(new Location(location));
	});
	
	
	
	console.log(this.locationList()); 
	console.log(this.locationList()[1]); 
	console.log(this.locationList()[1].id());
	
	
	var image = 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png';
	
	var largeInfoWindow = new google.maps.InfoWindow();
	
	for (var i=0; i < self.locationList().length; i++) {
		
		marker = new google.maps.Marker({
			map: map,
			position: self.locationList()[i].latlng,
			animation: google.maps.Animation.DROP,
			title: self.locationList()[i].id(),
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
		 self.locationList().forEach(function (location){
         location.marker.setVisible(false);
        });
	
  //set the marker for the clicked location visible
        data.marker.setVisible(true);
	};
	
	
	var basicInfoUrl = "https://api.foursquare.com/v2/venues/search?client_id=P3B45WXNAGYNYO4ZFIFQUANHVAZ4RPZZ4Z0DG4S3TRJWCQGF&client_secret=R1RZ4KZQJYJJYX2F4NHWLXLXY10WIUXNKDFZU5SCNH0PBYBQ&v=20130815&ll=28.639069,77.086774&query=gym&radius=2000" ;
	$.ajax({
		type: 'GET',
		dataType: "jsonp",
		cache: false,
		url: basicInfoUrl,
		success: function(data) {
			
			for(var i=0; i < data.response.venues.length; i++) {
					
					locations[i].id = data.response.venues[i].id ;
					
				};
				}
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
    zoom: 14,
    center: {lat: 28.634479626908053 , lng: 77.07248670383318 },
	styles: styles
	
  });
  
  /* var bounds = {
    north: 28.5,
    south: 29,
    east: 76.9,
    west: 77.2
  };
  
   map.fitBounds(bounds);  */
   ko.applyBindings(new viewModel());
}
    
 
/*

// Class to represent a row in the seat reservations grid
function SeatReservation(name, initialMeal) {
    var self = this;
    self.name = name;
    self.meal = ko.observable(initialMeal);
}

// Overall viewmodel for this screen, along with initial state
function ReservationsViewModel() {
    var self = this;

    // Non-editable catalog data - would come from the server
    self.availableMeals = [
        { mealName: "Standard (sandwich)", price: 0 },
        { mealName: "Premium (lobster)", price: 34.95 },
        { mealName: "Ultimate (whole zebra)", price: 290 }
    ];    

    // Editable data
    self.seats = ko.observableArray([
        new SeatReservation("Steve", self.availableMeals[1]),
        new SeatReservation("Bert", self.availableMeals[1])
    ]);
	console.log(self.seats()[0].meal().mealName);
}

ko.applyBindings(new ReservationsViewModel());

*/