// define globals
var weekly_quakes_endpoint = "http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson";
var $quakesList;
var map;
var template;

$(document).on("ready", function() {
	initMap();
	$quakesList = $.ajax({
		method: "GET",
		url: weekly_quakes_endpoint	
	})
	.done(function(data) {
		onSuccess(data);
	})
	.fail(function(data) {
		console.log("Error: ", response);
	});
});

// the success function	

function onSuccess(dataQuake) {
	var earthquake = dataQuake.features;
	// need to create markers that we will call in the next function
	createMarkers(earthquake);
	compileHandlebarTemplate(earthquake, "#info", "#quakes-template");
}

// Function getting the location of each earthquake 

function createMarkers(locationArray){
	locationArray.forEach(function(quake){
		var tempLat = quake.geometry.coordinates[1];
		var tempLng = quake.geometry.coordinates[0];
		new google.maps.Marker ({
			position: new google.maps.LatLng(tempLat, tempLng),
			map: map,
			title: quake.properties.title
		});
	})
}

// Next funtion will need to take the data that we have pulled and append it to the index.html page

function compileHandlebarTemplate(dataQuake, targetHTML, targetScript) {
	var source = $("#quakes-template").html();
	template = Handlebars.compile(source);
	var quakesTemplate = template({quakes: dataQuake});
	$("#info").append(quakesTemplate);
}

// Mapping Funtion 

// function initMap() {
// 		var myLatLng = {lat: 37.78, lng: -122.44};

//         map = new google.maps.Map(document.getElementById('map'), {
//         zoom: 2,
//         center: myLatLng
//  		});

// 		var marker = new google.maps.Marker({
// 		position: myLatLng,
// 		map: map,
// 		title: 'Hello World!'
//   	});
// }


// OLD CODE - DISREGUARD

		// var earthquake = data.features;
		// var occTime = data.features / (24*60*60*1000);
		// a = data.features[0].properties.updated
		// b = data.features[0].properties.time
		// console.log(a - b);
		// var	source = $("#quakes-template").html(); 
		// template = Handlebars.compile(source);
		// var quakesTemplate = template({quakes: earthquake});
		// $("#info").append(quakesTemplate);

		// for (var i = 0; i < earthquakes.lenght; i++) {
		// 	var quakesTemplate = "<p>" + earthquakes[i].properties.title "</p>";
		// 	$("#info").append(quakesTemplate);
		// }
		// if we were to build it out ourselves -- but the downside is that each one is being iterated over when then other is calling each objectig and creating variables
		// earthquake.forEach(function(quake){
		// 	var tempLat = quake.geometry.coordinates[1];
		// 	var tempLng = quake.geometry.coordinates[0];
		// 	new google.maps.Marker ({
		// 		position: new google.maps.LatLng(tempLat, tempLng),
		// 		map: map,
		// 		title: quake.properties.title
		// 	});
		// })

// 	})
// 	.fail(function(response){
// 		console.log("Error: ", response);
// 	})
// });
function initMap() {
		var myLatLng = {lat: 37.78, lng: -122.44};

        map = new google.maps.Map(document.getElementById('map'), {
        zoom: 2,
        center: myLatLng
 		});

		var marker = new google.maps.Marker({
		position: myLatLng,
		map: map,
		title: 'Hello World!'
  	});
}