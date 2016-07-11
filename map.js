const SORTED_COLOR_CODE = [{"name":"navy","value":"#000080"},{"name":"darkblue","value":"#00008B"},{"name":"mediumblue","value":"#0000CD"},{"name":"blue","value":"#0000FF"},{"name":"darkgreen","value":"#006400"},{"name":"green","value":"#008000"},{"name":"teal","value":"#008080"},{"name":"darkcyan","value":"#008B8B"},{"name":"deepskyblue","value":"#00BFFF"},{"name":"darkturquoise","value":"#00CED1"},{"name":"mediumspringgreen","value":"#00FA9A"},{"name":"lime","value":"#00FF00"},{"name":"springgreen","value":"#00FF7F"},{"name":"cyan","value":"#00FFFF"},{"name":"aqua","value":"#00FFFF"},{"name":"midnightblue","value":"#191970"},{"name":"dodgerblue","value":"#1E90FF"},{"name":"lightseagreen","value":"#20B2AA"},{"name":"forestgreen","value":"#228B22"},{"name":"seagreen","value":"#2E8B57"},{"name":"darkslategrey","value":"#2F4F4F"},{"name":"darkslategray","value":"#2F4F4F"},{"name":"limegreen","value":"#32CD32"},{"name":"mediumseagreen","value":"#3CB371"},{"name":"turquoise","value":"#40E0D0"},{"name":"royalblue","value":"#4169E1"},{"name":"steelblue","value":"#4682B4"},{"name":"darkslateblue","value":"#483D8B"},{"name":"mediumturquoise","value":"#48D1CC"},{"name":"indigo","value":"#4B0082"},{"name":"darkolivegreen","value":"#556B2F"},{"name":"cadetblue","value":"#5F9EA0"},{"name":"cornflowerblue","value":"#6495ED"},{"name":"rebeccapurple","value":"#663399"},{"name":"mediumaquamarine","value":"#66CDAA"},{"name":"dimgrey","value":"#696969"},{"name":"dimgray","value":"#696969"},{"name":"slateblue","value":"#6A5ACD"},{"name":"olivedrab","value":"#6B8E23"},{"name":"slategray","value":"#708090"},{"name":"slategrey","value":"#708090"},{"name":"lightslategrey","value":"#778899"},{"name":"lightslategray","value":"#778899"},{"name":"mediumslateblue","value":"#7B68EE"},{"name":"lawngreen","value":"#7CFC00"},{"name":"chartreuse","value":"#7FFF00"},{"name":"aquamarine","value":"#7FFFD4"},{"name":"maroon","value":"#800000"},{"name":"purple","value":"#800080"},{"name":"olive","value":"#808000"},{"name":"gray","value":"#808080"},{"name":"grey","value":"#808080"},{"name":"skyblue","value":"#87CEEB"},{"name":"lightskyblue","value":"#87CEFA"},{"name":"blueviolet","value":"#8A2BE2"},{"name":"darkred","value":"#8B0000"},{"name":"darkmagenta","value":"#8B008B"},{"name":"saddlebrown","value":"#8B4513"},{"name":"darkseagreen","value":"#8FBC8F"},{"name":"lightgreen","value":"#90EE90"},{"name":"mediumpurple","value":"#9370D8"},{"name":"darkviolet","value":"#9400D3"},{"name":"palegreen","value":"#98FB98"},{"name":"darkorchid","value":"#9932CC"},{"name":"yellowgreen","value":"#9ACD32"},{"name":"sienna","value":"#A0522D"},{"name":"brown","value":"#A52A2A"},{"name":"darkgray","value":"#A9A9A9"},{"name":"darkgrey","value":"#A9A9A9"},{"name":"lightblue","value":"#ADD8E6"},{"name":"greenyellow","value":"#ADFF2F"},{"name":"paleturquoise","value":"#AFEEEE"},{"name":"lightsteelblue","value":"#B0C4DE"},{"name":"powderblue","value":"#B0E0E6"},{"name":"firebrick","value":"#B22222"},{"name":"darkgoldenrod","value":"#B8860B"},{"name":"mediumorchid","value":"#BA55D3"},{"name":"rosybrown","value":"#BC8F8F"},{"name":"darkkhaki","value":"#BDB76B"},{"name":"silver","value":"#C0C0C0"},{"name":"mediumvioletred","value":"#C71585"},{"name":"indianred","value":"#CD5C5C"},{"name":"peru","value":"#CD853F"},{"name":"chocolate","value":"#D2691E"},{"name":"tan","value":"#D2B48C"},{"name":"lightgrey","value":"#D3D3D3"},{"name":"lightgray","value":"#D3D3D3"},{"name":"palevioletred","value":"#D87093"},{"name":"thistle","value":"#D8BFD8"},{"name":"orchid","value":"#DA70D6"},{"name":"goldenrod","value":"#DAA520"},{"name":"crimson","value":"#DC143C"},{"name":"gainsboro","value":"#DCDCDC"},{"name":"plum","value":"#DDA0DD"},{"name":"burlywood","value":"#DEB887"},{"name":"lightcyan","value":"#E0FFFF"},{"name":"lavender","value":"#E6E6FA"},{"name":"darksalmon","value":"#E9967A"},{"name":"violet","value":"#EE82EE"},{"name":"palegoldenrod","value":"#EEE8AA"},{"name":"lightcoral","value":"#F08080"},{"name":"khaki","value":"#F0E68C"},{"name":"aliceblue","value":"#F0F8FF"},{"name":"honeydew","value":"#F0FFF0"},{"name":"azure","value":"#F0FFFF"},{"name":"sandybrown","value":"#F4A460"},{"name":"wheat","value":"#F5DEB3"},{"name":"beige","value":"#F5F5DC"},{"name":"whitesmoke","value":"#F5F5F5"},{"name":"mintcream","value":"#F5FFFA"},{"name":"ghostwhite","value":"#F8F8FF"},{"name":"salmon","value":"#FA8072"},{"name":"antiquewhite","value":"#FAEBD7"},{"name":"linen","value":"#FAF0E6"},{"name":"lightgoldenrodyellow","value":"#FAFAD2"},{"name":"oldlace","value":"#FDF5E6"},{"name":"red","value":"#FF0000"},{"name":"fuchsia","value":"#FF00FF"},{"name":"magenta","value":"#FF00FF"},{"name":"deeppink","value":"#FF1493"},{"name":"orangered","value":"#FF4500"},{"name":"tomato","value":"#FF6347"},{"name":"hotpink","value":"#FF69B4"},{"name":"coral","value":"#FF7F50"},{"name":"darkorange","value":"#FF8C00"},{"name":"lightsalmon","value":"#FFA07A"},{"name":"orange","value":"#FFA500"},{"name":"lightpink","value":"#FFB6C1"},{"name":"pink","value":"#FFC0CB"},{"name":"gold","value":"#FFD700"},{"name":"peachpuff","value":"#FFDAB9"},{"name":"navajowhite","value":"#FFDEAD"},{"name":"moccasin","value":"#FFE4B5"},{"name":"bisque","value":"#FFE4C4"},{"name":"mistyrose","value":"#FFE4E1"},{"name":"blanchedalmond","value":"#FFEBCD"},{"name":"papayawhip","value":"#FFEFD5"},{"name":"lavenderblush","value":"#FFF0F5"},{"name":"seashell","value":"#FFF5EE"},{"name":"cornsilk","value":"#FFF8DC"},{"name":"lemonchiffon","value":"#FFFACD"},{"name":"floralwhite","value":"#FFFAF0"},{"name":"snow","value":"#FFFAFA"},{"name":"yellow","value":"#FFFF00"},{"name":"lightyellow","value":"#FFFFE0"},{"name":"ivory","value":"#FFFFF0"}];
const SORTED_COLOR_CODE_NUM = 146;    // DO NOT MODIFY THIS ALONE (affects the distribution of random color picking)
const RANDOM_COLOR_PICKING_STEPSIZE = 10; // modify this along with SORTED_COLOR_CODE_NUM if needed;

const TEAM_ICON_NUM = 2;
const RANDOM_TEAM_ICON_PICKING_STEPSIZE = 1;

var teams = [];
var teamsColorTable = [];
var events = [];
var eventsColorTable = [];

var data = [];
var map;
var markerCluster;
var markers = [];
var markersInfo = [];
var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
var labelIndex = 0;
//const imgThumbUrlPrefix = 'img/thumb/';
const imgThumbUrlPrefix = '';



function initData(){	
    // getStoryData();
    var limit = TEST_DATA.length;
    for(var i = 0 ; i < limit ; ++i){
        var newData = {};
        newData.location = {lat: TEST_DATA[i].lat, lng: TEST_DATA[i].lon};
        var splitAnchor = TEST_DATA[i].iconURL.lastIndexOf('/');
        newData.imgScr = 'img/thumb'+TEST_DATA[i].iconURL.substr(splitAnchor);
        newData.team = TEST_DATA[i].userID;       // temporary: user uploader ID as team data
        if(teams.indexOf(newData.team)<0){
            teams.push(newData.team);
        }
        newData.team = teams.indexOf(newData.team);
        
        
        
        var tmp = TEST_DATA[i].tagList.split(','); 
        console.log(tmp);
        if(tmp[0] != ''){                               // temporary: find one event to represent the story
            newData.event = tmp[0];
        } else {
            newData.event = "%NOEVENT%";
        }
        
        if(events.indexOf(newData.event)<0){
            events.push(newData.event);
        }
        newData.event = events.indexOf(newData.event);
        
//        for(var j = 0 ; j < newData.event.length ; ++j){
//            if(events.indexOf(newData.event[j])<0){
//                newData.push(newData.event[j]);
//            }
//        }
            
        data.push(newData);
    }
    
    /* generate color table for teams and events */ /* and Generate filter check boxes */
    var randonPicking = Math.floor(Math.random()*SORTED_COLOR_CODE_NUM);
    
    var filter_event = '';
    var filter_team = '';
    for(var i= 0 ; i < events.length ; ++i){
        eventsColorTable[i] = randonPicking;
        randonPicking = (randonPicking + RANDOM_COLOR_PICKING_STEPSIZE) % SORTED_COLOR_CODE_NUM;
        
        if(i==0)continue;
        filter_event += '<input type="checkbox" name="event" value="'+i+'" checked>'+events[i];
        filter_event += '<br>';
        
    }
    
    randonPicking = Math.floor(Math.random()*TEAM_ICON_NUM);
    for(var i= 0 ; i < teams.length ; ++i){
        teamsColorTable[i] = randonPicking;
        randonPicking = (randonPicking + RANDOM_TEAM_ICON_PICKING_STEPSIZE) % TEAM_ICON_NUM;
        
        filter_team += '<br>';
        filter_team += '<input type="checkbox" name="team" value="'+i+'" checked>'+teams[i];
    }
    
    // update html
    $('#filters').html(filter_event+filter_team);
    
    
//	data.push({location: {lat: 25.02029453006571, lng: 121.54103243189436}, imgScr: 'p1.jpg', borderColor: '#AA3', event: 'EventA',team: 'Team1'});
//	data.push({location:{lat: 25.01930453006571, lng: 121.54123243189436}, imgScr: 'p2.jpg', borderColor: '#AA3', event: 'EventB',team: 'Team2'});
//	data.push({location:{lat: 25.0229453006571, lng: 121.5353243189436}, imgScr: 'p3.jpg', borderColor: '#27A', event: 'EventA',team: 'Team2'});
//	data.push({location:{lat: 25.03006571, lng: 121.5203189436}, imgScr: 'p4.jpg', borderColor: '#2A7', event: 'EventC',team: 'Team2'});
//	data.push({location:{lat: 25.0229453006571, lng: 121.5103243189436}, imgScr: 'p5.jpg', borderColor: '#27A', event: 'EventA',team: 'Team1'});
//	data.push({location:{lat: 25.03006571, lng: 121.5243189436}, imgScr: 'p6.jpg', borderColor: '#AA3', event: 'EventB',team: 'Team2'});
//	data.push({location:{lat:25.017652, lng: 121.539720}, imgScr: 'p7.jpg', borderColor: '#2A7', event: 'EventD',team: 'Team2'});
//	data.push({location:{lat:25.006018, lng:121.509839}, imgScr: 'p8.jpg', borderColor: '#AA3', event: 'EventA', team: 'Team1'});
//	data.push({location:{lat:25.015322, lng:121.494256}, imgScr: 'p10.jpg',borderColor: '#27A', event: 'EventB', team: 'Team2'});
//	data.push({location:{lat:25.033701, lng:121.515902}, imgScr: 'p10.jpg',borderColor: '#2A7', event: 'EventD', team: 'Team2'});
}

function initMap() { 
	initData();
  var myLatLng = {lat:25.017652, lng: 121.539720};
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 15,
    center: myLatLng,
    
  });
  
    
  updateFilterStatus();
  $('input').click(function(){
       updateFilterStatus();
    }); 
}


function setMarkersWithFilter(filter){
    
    if(!filter){
        filter = {};
    }
    if(!filter.team){
        filter.team = [];
    }
    if(!filter.event){
        filter.event = [];
    }

  // Add Marker
  for(var i = 0; i < data.length; ++i){
      console.log(data[i].team)
      if(filter.team.indexOf(data[i].team.toString())>=0 && filter.event.indexOf(data[i].event.toString())>=0 ){
          
          addMarker(data[i].location, data[i].imgScr, SORTED_COLOR_CODE[  eventsColorTable[data[i].event] ].value ,data[i].team); 
      }
    
  }  
  addCluster();

  // Add infoWindow
  for(var i = 0; i < markers.length; ++i){
    // InfoWindow content
    var content = '<div id="iw-container">' +
    '<div class="iw-title" style = "background-color:' + SORTED_COLOR_CODE[  eventsColorTable[data[i].event] ].value +  '">Taiwan Space</div>' +
    '<div class="iw-content">' +
    '<div class="iw-subTitle">IM is good</div>' +
    '<img src="' + data[i].imgScr + '" alt="info img"  width="190" height="120">' +
    '<p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p>' +
    '<div class="iw-subTitle">Repsonse</div>' +
    '<p>This looks fun and challenging!</p>'+
    '</div>' +
    '<div class="iw-bottom-gradient"></div>' +
    '</div>';
    addInfoWindow(markers[i], content, data[i][2]);
  }

  displayRoute();

}

function addCluster(){
  markerCluster = new MarkerClusterer(map, markers, {imagePath: 'asset/m'});
}
// Adds a marker to the map and push to the array.
function addMarker(location, markerImg, borderColor, team) {
  if(!markerImg)
    markerImg = "asset/markerIcon.png";
  else
    markerImg = imgThumbUrlPrefix+ markerImg;

  var icon = {
    url: markerImg, // url
    scaledSize: new google.maps.Size(150, 50), // scaled size
    origin: new google.maps.Point(0,0), // origin
    anchor: new google.maps.Point(0, 0) // anchor
};
  var marker = new google.maps.Marker({
    position: location,
    label: labels[labelIndex++ % labels.length],
    map: map,
    icon: markerImg
  });
  markers.push(marker);
  markersInfo.push({src: markerImg, borderColor: borderColor, team: team});
  setInterval(function(){setMarkerBorderColor(markerImg, borderColor);},700);
}

// Sets the map on all markers in the array.
function setMapOnAll(map) {
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(map);
  }
}

// Removes the markers from the map, but keeps them in the array.
function clearMarkers() {
  setMapOnAll(null);
  
}

// Shows any markers currently in the array.
function showMarkers() {
  setMapOnAll(map);
}

// Deletes all markers in the array by removing references to them.
function deleteMarkers() {
  clearMarkers();
    for(var i = 0 ; i < markers.length ; ++i){
        markerCluster.removeMarker(markers[i]);
    }
  markers = [];
  markersInfo = [];
  labelIndex = 0;
}

// Set color of a marker
function setMarkerBorderColor(src, color){
    var which = $('img[src="' + src+'"]');
//    if(which.parent().hasClass('gm-style-iw'))return;
//  which.css({ height: ''}).css({maxHeight: '120px',width: '128px'}).parent().css({ height: which.height()+'px'}).css({ width: '128px', border: 'solid 3px '+color});
    which.parent().css({ border: 'solid 3px '+color});
    
}

// Find a marker's index by img src
function findInMarkersInfo(src){
  for(var i = 0 ; i < markersInfo.length ; ++i){
    if(markersInfo[i].src==src) return i;
  }
  return -1;
}

// Add an InfoWindow to a marker
function addInfoWindow(marker, message, color) {

  var infoWindow = new google.maps.InfoWindow({
    content: message
  });


  google.maps.event.addListener(marker, 'click', function () {
    infoWindow.open(map, marker);
  });

  google.maps.event.addListener(map, "click", function(event) {
    infoWindow.close();
  });

  // This removes the right margin of the infowindow (Dark-magic)
  google.maps.event.addListener(infoWindow, 'domready', function() {

   // Reference to the DIV which receives the contents of the infowindow using jQuery
   var iwOuter = $('.gm-style-iw');

   /* The DIV we want to change is above the .gm-style-iw DIV.
    * So, we use jQuery and create a iwBackground variable,
    * and took advantage of the existing reference to .gm-style-iw for the previous DIV with .prev().
    */
    var iwBackground = iwOuter.prev();

   // Remove the background shadow DIV
   iwBackground.children(':nth-child(2)').css({'display' : 'none'});

   // Remove the white background DIV
   iwBackground.children(':nth-child(4)').css({'display' : 'none'});

    // Taking advantage of the already established reference to
    // div .gm-style-iw with iwOuter variable.
    // You must set a new variable iwCloseBtn.
    // Using the .next() method of JQuery you reference the following div to .gm-style-iw.
    // Is this div that groups the close button elements.
    var iwCloseBtn = iwOuter.next();
      // console.log(color);
    // Apply the desired effect to the close button
    iwCloseBtn.css({
      opacity: '1', // by default the close button has an opacity of 0.7
      right: '38px', top: '3px', // button repositioning
      border: '7px solid #424242'  , // increasing button border and new color
      'border-radius': '13px', // circular effect
      'box-shadow': '0 0 5px #EEEEEE' // 3D effect to highlight the button
    });

    // The API automatically applies 0.7 opacity to the button after the mouseout event.
    // This function reverses this event to the desired value.
    iwCloseBtn.mouseout(function(){
      $(this).css({opacity: '1'});
    });

  });
}

function customerExitBtn(){

}


function updateFilterStatus(){
    deleteMarkers();
    var newFilter = {};
    newFilter.team = [];
    newFilter.event = [];
    $( "input[name=team]" ).each(function( index ) {
        if($(this).prop("checked") )
            (newFilter.team).push($(this).val());
    });
    $( "input[name=event]" ).each(function( index ) {
        if($(this).prop("checked") )
            (newFilter.event).push($(this).val());
    });
    console.log(newFilter);
    setMarkersWithFilter(newFilter);
}


function displayRoute() {

  var start = new google.maps.LatLng(25.02029453006571, 121.54103243189436);
  var end = new google.maps.LatLng(25.0229453006571, 121.5103243189436);

  var directionsDisplay = new google.maps.DirectionsRenderer({suppressMarkers: true});// also, constructor can get "DirectionsRendererOptions" object
  directionsDisplay.setMap(map); // map should be already initialized.

  var waypts = [];

	for (var i = 0; i < 6; i++) {
    	waypts.push({
      	location: data[i].location,
      	stopover: true
    	});
	}

  var request = {
      origin : start,
      destination : end,
      waypoints: waypts,
  		optimizeWaypoints: true,
      travelMode : google.maps.TravelMode.DRIVING
  };
  var directionsService = new google.maps.DirectionsService(); 
  directionsService.route(request, function(response, status) {
      if (status == google.maps.DirectionsStatus.OK) {
          directionsDisplay.setDirections(response);
      }
  });
}