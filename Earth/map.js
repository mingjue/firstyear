//var autocomplete;
var map = new google.maps.Map(document.getElementById("map"), {
          center: {lat: -34.397, lng: 150.644},
          zoom: 5});
var markArray =new Array;
myFunction();
// //Get the HTML input element for the autocomplete search box
var input =document.getElementById('pac-input');
map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

var infowindow = new google.maps.InfoWindow();


// //Create the autocomplete object
var autocomplete = new google.maps.places.Autocomplete(input);
autocomplete.bindTo('bounds',map);
autocomplete.addListener('place_changed', function(){
	var place = autocomplete.getPlace();
	if (!place.geometry) {
      window.alert("Autocomplete's returned place contains no geometry");
      return;
    }
    if (place.geometry.viewport) {
      map.fitBounds(place.geometry.viewport);
      map.setZoom(4);
    }
    removeMarker();
  
    //set the bounds
      var data ={
      	'north': map.getBounds().getNorthEast().lat(),
		'south': map.getBounds().getSouthWest().lat(),
		'east': map.getBounds().getNorthEast().lng(),
		'west': map.getBounds().getSouthWest().lng(),
		};
		console.log(data);
		var url= "http://api.geonames.org/earthquakesJSON?"+"&username=jxgx167149";
		$.ajax({
			url:url,
			type:'GET',
			dataType:'json',
			data:data
		})
		.done(function(result){
			//console.log(result['earthquakes']);
			//put the marker function
			var locat = result['earthquakes'];
			for (var i =0; i<locat.length;i++){
				setMarker(locat[i]);
				//contentString(locat[i]);
				//console.log(locat[i]);
			}
			//pass result into contentString function
			
		})
		.fail(function(){
			console.log('error');
		});
		// end the passing
	});
	//set marker


var setMarker = function(info){
	//console.log(info.lat);
	//console.log(setM.lat);
	var uluru = {'lat':info.lat,'lng':info.lng};
	var marker =new google.maps.Marker({
				position:uluru,
				map:map,
			});
	markArray.push(marker);
	//add click here
	var zhenji ='<div id = "content">' + info.datetime+'<br>' + info.depth+'<br>' + info.magnitude + '</div>';
	marker.addListener('click',function(){
		infowindow.setContent(zhenji);
		infowindow.open(map,marker);
	});
};

var setMapOnAll = function(map){
	for(var i=0; i<markArray.length; i++){
		markArray[i].setMap(map);
	}
};

var removeMarker = function(){
	for(var i=0; i<markArray.length; i++){
		setMapOnAll(null);
	}
	markArray=[];
};


//var myClick = document.getElementById('ten');
//myClick.addEventListener('click',myFunction);
// $('.ten').on('click',function(){
// 	myFunction();
//  });
function myFunction(){
	var data ={
 		'east':-62.5,
    	'west':-125.4,
    	'north':52.1,
    	'south':24.7,
 	};
 	var url= "http://api.geonames.org/earthquakesJSON?"+"&username=jxgx167149";
		$.ajax({
			url:url,
			type:'GET',
			dataType:'json',
			data:data
		})
		.done(function(result){
			console.log(result['earthquakes']);
			var locat = result['earthquakes'];
			for (var i =0; i<locat.length;i++){
				//contentString(locat[i]);
				//console.log(locat[i]);
			 	$('.test').append('<div>'+ locat[i].datetime + '<br>'+ locat[i].depth+'<br>'+locat[i].magnitude+'</div>');
			}
		})
		.fail(function(){
			console.log('error');
		});
}




