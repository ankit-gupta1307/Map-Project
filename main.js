
  	
	var clientID = 'P3B45WXNAGYNYO4ZFIFQUANHVAZ4RPZZ4Z0DG4S3TRJWCQGF';	
	var clientSECRET = 'R1RZ4KZQJYJJYX2F4NHWLXLXY10WIUXNKDFZU5SCNH0PBYBQ';
		
	 var locations = [
		{
			name: 'Addiction Gym & Spa',
			latlng: {
						lat: 28.639187518722093,
						lng: 77.0750160873286
					},
			id: '51a414ad498eb4e0c8c79e1e'		
		},
		
		{
			name: 'Strength Gym',
			latlng: {
						lat: 28.63951183622196,
						lng: 77.08926957394918
					},
			id: '4fef06e2e4b02af6a2356eb1'	
		},
		{
			name: 'The gym vikaspuri',
			latlng: {
						lat: 28.64290937981111,
						lng: 77.08158661505388
					},
			id: '5032112fe4b01882fa165c1c'	
		},
		{
			name: 'The world gym vikas puri',
			latlng: {
						lat: 28.64402685702688,
						lng: 77.0864032751163
					},
			id: '50cefeede4b0e6c84cbe64ff'	
		},
		{
			name: 'Radius Gym And Spa',
			latlng: {
						lat: 28.641996352813372,
						lng: 77.09651931856945
					},
			id: '4f5d633ce4b082b23ee80b13'	
					
		},
		{
			name: 'The world gym',
			latlng: {
						lat: 28.64487862367399,
						lng: 77.07923160832262
					},
			id: '50cf0636e4b0b0b98db4ae54'	
		},
		{
			name: 'Brix Gym',
			latlng: {
						lat: 28.627407338627094,
						lng: 77.08603262901306
					},
			id: '4fd58007121dc5ba007f1a11'	
		},
		{
			name: 'The Gym',
			latlng: {
						lat: 28.62630747520567,
						lng: 77.09218638430356
					},
			id: '4e2e51e5d4c058fdbee8bb78'	
		},
		{
			name: 'Multy Gym',
			latlng: {
						lat: 28.634479626908053,
						lng: 77.07248670383318
					},
			id: '50194997e4b08d7eda13885f'	
		},
		{
			name: 'Carbon gym',
			latlng: {
						lat: 28.62688669873087,
						lng: 77.09476593210454
					},
			id: '506c557de4b092ceaefec3af'	
		},
		{
			name: 'Musclemania Gym',
			latlng: {
						lat: 28.632213228257452,
						lng: 77.10194229080281
					},
			id: '4d517187994dba7a58fe14ec'	
		},
		{
			name: 'Brix gym',
			latlng: {
						lat: 28.634499063442853,
						lng: 77.1051004269293
					},
			id: '52818963498e05f204e735b9'	
		},
		{
			name: 'Gym X',
			latlng: {
						lat: 28.616414801933328,
						lng: 77.08061988756133
					},
			id: '4e676b59e4cdfdecb047334f'	
		},
		{
			name: 'Adonis fitness and Gym',
			latlng: {
						lat: 28.62156138091793,
						lng: 77.0877802311305
					},
			id: '4e6c3d9cb993061ea8b781eb'		
		},
		{
			name: "'Gold's Gym A Block Janakpuri'",
			latlng: {
						lat: 28.622431823919275,
						lng: 77.06936705764893
					},
			id: '4f8818c2e4b013a97f3b8841'	
		},
		{
			name: 'Gold Gym',
			latlng: {
						lat: 28.621837221762117,
						lng: 77.0695750365762
					},
			id: '4e24f73db0fbf642a8fac7ba'	
		},
		{
			name: 'Gymplex',
			latlng: {
						lat: 28.63941226079242,
						lng: 77.08104142666788
					},
			id: '509bd5bae4b0eaba8f4768be'	
		},
		{
			name: 'The Gym',
			latlng: {
						lat: 28.626682205745386,
						lng: 77.09179401397705
					},
			id: '4dc00c7a4159b09a64c3782a'		
		}
	];



	var Location = function(data) {
		var self = this;
		self.name = data.name;
		self.latlng = data.latlng;
		self.id = data.id;
		self.distance = ko.observable(data.distance);
	};

	var map, marker;

	var viewModel = function() {
		
		self = this;
		
		this.names = ko.observableArray([]);
		
		this.markers = ko.observableArray([]);
		
		this.locationList = ko.observableArray([]);
		
		this.foursquareApi = function() {	
		
		

		locations.forEach(function(location) {
			self.locationList.push(new Location(location));
		});
		
		var image = 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png';
		
		var largeInfoWindow = new google.maps.InfoWindow();
		
		for (var i=0; i < self.locationList().length; i++) {
			
			marker = new google.maps.Marker({
				map: map,
				position: self.locationList()[i].latlng,
				animation: null,
				title: locations[i].name,
				content: '',
				draggable: true,
				visible: true,
				icon: image,
				id: i
			});
			self.markers().push(marker);
			
			marker.addListener('click', function() {
				populateInfoWindow(this, largeInfoWindow);
			  });
			 marker.addListener('click', function() {
			   toggleBounce(this);
			  });
			self.locationList()[i].marker = marker; 
			  
		};
		
		var populateInfoWindow = function (marker, infowindow) {
			
			if (infowindow.marker != marker) {
			  infowindow.marker = marker;
			  infowindow.setContent('<div>' + '<h4>' + marker.title + '</h4>'  +  marker.content + '</div>');
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
				
		self.setMarker = function(data) {
			 self.locationList().forEach(function (location){
				  location.marker.setVisible(false);	
				}); 
				
				data.marker.setVisible(true);
				 
				 data.marker.setAnimation(google.maps.Animation.BOUNCE);
				  setTimeout (function () {
						 data.marker.setAnimation(null);
				}, 2000); 
				map.setCenter(data.marker.position);
				}
				
				
			/*	setTimeout (function () {
						location.marker.setVisible(true);
				}, 5000); 
					 
			};*/
		
		var toggleBounce= function(marker)  {
			if (marker.getAnimation() !== null) {
				marker.setAnimation(null);
			} else {
				marker.setAnimation(google.maps.Animation.BOUNCE);
				setTimeout (function () {
				marker.setAnimation(null)
				}, 1000);
			}
		};
		
		self.locationList().forEach(function(item) {
				$.ajax({
					type: 'GET',
					dataType: "jsonp",
					cache: false,
					url: 'https://api.foursquare.com/v2/venues/search',
					data: 'client_id='+clientID+'&client_secret='+clientSECRET+'&v=20130815&ll='+item.latlng.lat+','+item.latlng.lng+'&query='+item.name,
					success: function(data) {
						
								item.marker.title =  data.response.venues[0].name ; 
								item.marker.content = '	Distance: '+ (data.response.venues[0].location.distance)/1000 + " km's" + '</br>' + '	CheckinCount: ' + data.response.venues[0].stats.checkinsCount;			
							}
							
				});
			});
		};
		self.foursquareApi();
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
		center: {lat: 28.632213228257452 , lng: 77.09179401397705 },
		styles: styles
		
	  });
	
	   ko.applyBindings(new viewModel());
	}
    