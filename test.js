$(document).ready(function() {

var locate = ko.observable(
	{
		name: ko.observableArray([]),
		latlng: {
			lat: ko.observableArray([]),
			lng: ko.observableArray([])
			}
	}
);

this.excercise = ko.computed(function() {
	console.log(locate().name());
	console.log(locate().latlng.lat());
});

var Location = function(data) {
	this.name = ko.computed(function() {
	return (data.name());
});

	this.latlng = data.latlng;
};

var viewModel = function() {
	
	self = this;
	
	this.locationList = ko.observableArray([]);
	
	locate().forEach(function(location) {
		self.locationList.push(new Location(location));
	});
	
	var basicInfoUrl = "https://api.foursquare.com/v2/venues/search?client_id=P3B45WXNAGYNYO4ZFIFQUANHVAZ4RPZZ4Z0DG4S3TRJWCQGF&client_secret=R1RZ4KZQJYJJYX2F4NHWLXLXY10WIUXNKDFZU5SCNH0PBYBQ&v=20130815&ll=28.639069,77.086774&query=gym&radius=1000" ;
	$.ajax({
		type: 'GET',
		dataType: "jsonp",
		cache: false,
		url: basicInfoUrl,
		success: function(data) {
			for(var i=0; i < data.response.venues.length; i++) {
				
					locate().name.push(data.response.venues[i].name);	
					locate().latlng.lat.push(data.response.venues[i].location.lat);
					locate().latlng.lng.push(data.response.venues[i].location.lng);
				}
			}
		});
		
};

ko.applyBindings(new viewModel());	

});