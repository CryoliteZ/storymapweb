var markersInfo = [];

$(function(){
    var mapManager = new MapManager();
    var mapDataManager = new MapDataManager();
    var clusterPreviewSlide = new BottomSlider();
    

    // Initialize the map and markers
    initMap();
    // Initialize UI components 
    initUI();
    
    clusterPreviewSlide.init(mapDataManager, mapManager.map);
    
    
    function initUI(){
        setTimeout(function(){
            $('#welcomeCover').addClass('bgToTransparentWhite');
            $('#welcomeCover .loadingHint').addClass('textToBlue');;
        }, 1000);

        setTimeout(function(){
            $('#welcomeCover, #welcomeCover .loadingHint').hide();
        }, 7000);

        var filterDrawerOpened = false;
        $('#filtersWrapper').css({right: "0px"}).delay(7000).animate({right: "-240px"}, 500);
        $('.close').hide();
        $('#filtersWrapper').on("click", function(e){
          e.stopPropagation();
        });
        $('#filtersWrapper .drawer').click(function(){
            if(filterDrawerOpened){
                $('#filtersWrapper').animate({right: "-240px"}, 700);
                $('.close').hide();
                $('.alternativeRLToggle').show();
            } else {
                $('#filtersWrapper').animate({right: "0px"}, 700);
                $('.close').show();
                $('.alternativeRLToggle').hide();

            }

            filterDrawerOpened = !filterDrawerOpened;
        });
        
        $('#dayNightOnOffSwitch').click(function(){
            mapManager.updateMapStyle();
          });
        $(".homeBtn").click(function (e) {
  
          // Remove any old one
          $(".ripple").remove();

          // Setup
          var posX = $(this).offset().left,
              posY = $(this).offset().top,
              buttonWidth = $(this).width(),
              buttonHeight =  $(this).height();
          
          // Add the element
          $(this).prepend("<span class='ripple'></span>");

          
         // Make it round!
          if(buttonWidth >= buttonHeight) {
            buttonHeight = buttonWidth;
          } else {
            buttonWidth = buttonHeight; 
          }
          
          // Get the center of the element
          var x = e.pageX - posX - buttonWidth / 2;
          var y = e.pageY - posY - buttonHeight / 2;
          
         
          // Add the ripples CSS and start the animation
          $(".ripple").css({
            width: buttonWidth,
            height: buttonHeight,
            top: y + 'px',
            left: x + 'px'
          }).addClass("rippleEffect");
        });
    
        google.maps.event.addListener(mapManager.map, 'zoom_changed', function() {
          var zoom = mapManager.map.getZoom();
          if (zoom >= 12 ) {
            $('.homeBtn').addClass('open');
          } else{
            $('.homeBtn').removeClass('open');
          }
        });
        $('.homeBtn').click(function(){
          mapManager.initMapFocus();
        })

        
    }

    function initMap(){
        mapDataManager.requestData();
        mapDataManager.generateRandomColorAndFilter();


        mapManager.initMap(mapDataManager.data);
        mapManager.updateFilterStatus(mapDataManager.data, mapDataManager.eventsColor);
        mapManager.initMapFocus();

        mapManager.setRoute(mapDataManager.data);
        mapManager.setOverlappingMarkerSpiderfier();

        /* filter update init */
        $('#filters input[type="checkbox"]').click(function(){
            $('#filtersWrapper .rightPart .loadingHint').fadeIn({ duration: 100, complete: function(){
                mapManager.updateFilterStatus(mapDataManager.data, mapDataManager.eventsColor, function(){
                       $('#filtersWrapper .rightPart .loadingHint').fadeOut(400);
                   });
                }
            });
           
        }); 
        
        $('#chooseAll').click(function(){
            $('#filters input[type="checkbox"]').prop('checked', false); // Checks it
            $('#filtersWrapper .rightPart .loadingHint').fadeIn({ duration: 100, complete: function(){
                mapManager.updateFilterStatus(mapDataManager.data, mapDataManager.eventsColor, function(){
                       $('#filtersWrapper .rightPart .loadingHint').fadeOut(700);
                   });
                }
            });
        })


    //   /* detect google street view */
    //  var thePanorama = map.getStreetView();
    //
    //	google.maps.event.addListener(thePanorama, 'visible_changed', function() {
    //
    //	    if (thePanorama.getVisible()) {
    //	    	alert("Hi");
    //
    //	        // Display your street view visible UI
    //
    //	    } else {
    //
    //	        // Display your original UI
    //
    //	    }
    //
    //	});
    }

});


function MapDataManager(){
    this.teams = [];
    this.teamsColorTable = [];
    this.events = [];
    this.eventsColorTable = [];
    this.eventsColor = [];

    this.data = [];
    
    
    MapDataManager.prototype.requestData = function(){
        // Get program data here <-
        this.processRawData(TEST_DATA);
    }
    MapDataManager.prototype.processRawData = function(rawData){
        var limit = rawData.length;
        this.events.push("%NOEVENTS%");
        for(var i = 0 ; i < limit ; ++i){
            if(rawData[i].lat * rawData[i].lon == 0){
                continue;
            } 
            var newData = rawData[i];
            newData.location = {lat: rawData[i].lat, lng: rawData[i].lon};
            var splitAnchor = rawData[i].iconURL.lastIndexOf('/');
            newData.imgSrc = rawData[i].iconURL;
            newData.team = rawData[i].userID;       // temporary: user uploader ID as team data
            if(this.teams.indexOf(newData.team)<0){
                this.teams.push(newData.team);
            }
            newData.team = this.teams.indexOf(newData.team);

            // the events for a program
            newData.events = [];

            var tmp = rawData[i].tagList.split(','); 
            for(var j = 0; j < tmp.length; ++j){
              if(tmp[j] != ''){                               
                  newData.events.push(tmp[j]);
                  if(this.events.indexOf(tmp[j]) < 0){
                    this.events.push(tmp[j]);
                  }
              }
            }

            if(newData.events.length <= 0){
              newData.events.push("%NOEVENTS%");
            }
            // index events for a program
            for(var j = 0; j < newData.events.length; ++j){
              newData.events[j] = this.events.indexOf(newData.events[j]);
            }
            // console.log("event length " + newData.events.length + " " + newData.events);

            
            // newData.event = newData.events[0];
            // console.log(newData.event);





            // if(tmp[0] != ''){            // temporary: find one event to represent the story
            //   newData.event = tmp[0];
            // } else {
            //     newData.event = "%NOEVENT%";
            // }

           
            // newData.event = this.events.indexOf(newData.event);
            // console.log(newData.event);

    //        for(var j = 0 ; j < newData.event.length ; ++j){
    //            if(events.indexOf(newData.event[j])<0){
    //                newData.push(newData.event[j]);
    //            }
    //        }

            this.data.push(newData);
        }
    }
    

    MapDataManager.prototype.generateRandomColorAndFilter = function(){
        /* generate color table for teams and events */ /* and Generate filter check boxes */
        var randonPicking = Math.floor(Math.random()*13);


        var filter_event = '';
        var filter_team = '';
        for(var i= 0 ; i < this.events.length ; ++i){


             // new color
            this.eventsColor[i] = colorPalette[i % colorPalette.length];

         
            if(this.events[i][0]=='%'){
                filter_event += '<input style="display: none;" type="checkbox" name="event" value="'+i+'" >';
                continue;
            }
            filter_event += '<input type="checkbox" id="filterEvent'+i+'" name="event" value="'+i+'" >';
            filter_event += '<label for="filterEvent'+i+'" style="border-color:'+ palette.get(this.eventsColor[i],'2')+';"> '+ this.events[i] +'</label>';
//            filter_event += '<br>';


        }

        for(var i= 0 ; i < this.teams.length ; ++i){

//            filter_team += '<br>';
//            filter_team += '<input style="display: none;" type="checkbox" name="team" value="'+i+'" >'+this.teams[i];
        }

        // update html
        $('#filters').html(filter_event+filter_team);
        
        /* filter UI effect */
        $('#filters input').click(function(){
           
        }); 
    }
    
    MapDataManager.prototype.findDataByOpID = function (opid){
        for(var i = 0; i < this.data.length; ++i){
            if(opid == this.data[i]['opID']) return this.data[i];
        }
        return null;
    }
    
}


function MapManager(){
    //const imgThumbUrlPrefix = 'img/thumb/';
    this.imgThumbUrlPrefix = '';
    
    this.map = null;
    this.markerCluster = null;
    this.markers = [];
    this.labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    this.labelIndex = 0;
    this.directionsDisplay = [];
    
    // Sets the map on all markers in the array.
    MapManager.prototype.setMapOnAll = function () {
      for (var i = 0; i < this.markers.length; i++) {
        this.markers[i].setMap(this.map);
      }
    }

    // Removes the markers from the map, but keeps them in the array.
    MapManager.prototype.clearMarkers= function () {
      this.setMapOnAll(null);

    }

    // Shows any markers currently in the array.
    MapManager.prototype.showMarkers = function () {
      this.setMapOnAll(map);
    }

    // Deletes all markers in the array by removing references to them.
    MapManager.prototype.deleteMarkers = function () {
      this.clearMarkers();
        for(var i = 0 ; i < this.markers.length ; ++i){
            this.markerCluster.removeMarker(this.markers[i]);
        }
      this.markers = [];
      this.markersInfo = [];
      this.labelIndex = 0;
    }
    
    
    MapManager.prototype.initMap = function(data){
        /* find and locate map to central */
        var limit = data.length;
        var mycenter={lat:0.0, lng:0.0};
        for(var i = 0; i < limit; ++i){
            mycenter.lat += data[i].location.lat;
            mycenter.lng += data[i].location.lng;
        }
        mycenter.lat /= limit;
        mycenter.lng /= limit;


        /* init map  */
      this.map = new google.maps.Map(document.getElementById('map'), {
        zoom: 15,
        center: mycenter,


          /* set style */
        styles:[{"featureType":"water","elementType":"all","stylers":[{"hue":"#7fc8ed"},{"saturation":55},{"lightness":-6},{"visibility":"on"}]},{"featureType":"water","elementType":"labels","stylers":[{"hue":"#7fc8ed"},{"saturation":55},{"lightness":-6},{"visibility":"off"}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"hue":"#83cead"},{"saturation":1},{"lightness":-15},{"visibility":"on"}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"hue":"#f3f4f4"},{"saturation":-84},{"lightness":59},{"visibility":"on"}]},{"featureType":"landscape","elementType":"labels","stylers":[{"hue":"#ffffff"},{"saturation":-100},{"lightness":100},{"visibility":"off"}]},{"featureType":"road","elementType":"geometry","stylers":[{"hue":"#ffffff"},{"saturation":-100},{"lightness":100},{"visibility":"on"}]},{"featureType":"road","elementType":"labels","stylers":[{"hue":"#bbbbbb"},{"saturation":-100},{"lightness":26},{"visibility":"on"}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"hue":"#ffcc00"},{"saturation":100},{"lightness":-35},{"visibility":"simplified"}]},{"featureType":"road.highway","elementType":"geometry","stylers":[{"hue":"#ffcc00"},{"saturation":100},{"lightness":-22},{"visibility":"on"}]},{"featureType":"poi.school","elementType":"all","stylers":[{"hue":"#d7e4e4"},{"saturation":-60},{"lightness":23},{"visibility":"on"}]}]

      });
        
        
        
    }
    
    MapManager.prototype.initMapFocus = function(){
        /* init map position: contain all marker */
      var bounds = new google.maps.LatLngBounds(); // set map to fit all markers
        for(var i = 0 ; i < this.markers.length ; i++){
            bounds.extend(this.markers[i].getPosition());
        }
        if(bounds)
           this.map.fitBounds(bounds);
    }
    
    
    MapManager.prototype.setRoute = function(data){
        for(var i = 0; i < data.length - 10; i+=9)
            this.displayRoute(i, i + 9,data);
    }

    MapManager.prototype.hideRoute = function(){
      for(var i = 0; i < this.directionsDisplay.length; ++i){
         this.directionsDisplay[i].setMap(null);
      }
      this.directionsDisplay = [];
    }


    
    MapManager.prototype.setOverlappingMarkerSpiderfier = function(){
        // var oms = new OverlappingMarkerSpiderfier(this.map);
        // for (var i = 0; i < this.markers.length; i ++) {	  
        //       oms.addMarker(this.markers[i]);  // <-- here
        // }
    }
    
    
    
    MapManager.prototype.addCluster = function (){
      this.markerCluster = new MarkerClusterer(this.map, this.markers, {imagePath: 'asset/m'});
    }
    
    
    // Adds a marker to the map and push to the array.
    MapManager.prototype.addMarker = function (location, markerImg, borderColor, team, popularity, opTitle, opID) {
      if(!markerImg)
        markerImg = "asset/markerIcon.png";
      else
        markerImg = this.imgThumbUrlPrefix+ markerImg;

      var icon = {
        url: markerImg, // url
        size: new google.maps.Size(150, 50), 
        scaledSize: new google.maps.Size(150, 50), // scaled size
        origin: new google.maps.Point(0,0), // origin
        anchor: new google.maps.Point(0, 0) // anchor
        };
      var marker = new google.maps.Marker({
        position: location,
        label: this.labels[this.labelIndex++ % this.labels.length],
        map: this.map,
        icon: markerImg,
        animation: google.maps.Animation.DROP,
        opID: opID
      });
      this.markers.push(marker);
      markersInfo.push({src: markerImg, borderColor: borderColor, team: team, popularity: popularity, opTitle:opTitle, });
      setInterval(function(){setMarkerBorderColor(markerImg, borderColor);},700);
        
      // Set color of a marker
      function setMarkerBorderColor(src, color){
          var which = $('img[src="' + src+'"]');
      //    if(which.parent().hasClass('gm-style-iw'))return;
      //  which.css({ height: ''}).css({maxHeight: '120px',width: '128px'}).parent().css({ height: which.height()+'px'}).css({ width: '128px', border: 'solid 3px '+color});
          which.parent().css({ border: 'solid 3px '+color});

      }
        
    }
    
    MapManager.prototype.setMarkersWithFilter = function (filter, data, eventsColor){
        if(!filter){
            filter = {};
        }
        if(!filter.team){
            filter.team = [];
        }
        if(!filter.event){
            filter.event = [];
        }
      console.log(filter.event.length);

      // Add Marker
    
      for(var i = 0; i < data.length; ++i){         
          var flag = true;
          if(filter.event.length > 0){
            for(var j = 0; j < filter.event.length; ++j){
              if(data[i].events.indexOf(parseInt(filter.event[j]))<0){
                flag = false;
                break;
              }
            }
          }
          
          // if(
          //     (!filter.team.length || filter.team.indexOf(data[i].team.toString())>=0) &&
          //     (!filter.event.length || filter.event.indexOf(data[i].event.toString())>=0) && (data[i].events.length > 0))
          if(flag)
          {
            var colorIndex = Math.min(Math.round(data[i].popularity / colorPalette.length), colorPalette.length);
            this.addMarker(data[i].location, data[i].imgSrc,   palette.get(eventsColor[data[i].events[0]], colorIndex.toString()) ,data[i].team, data[i].popularity, data[i].opTitle, data[i].opID); 

              this.addInfoWindow(this.markers[this.markers.length-1], data[i]);
          }

      }  
      this.addCluster();

      // for(var i = 0; i < this.markers.length; ++i){
      //   InfoWindow content
      //   var content = '<div id="iw-container">' +
      //   '<div class="iw-title" style = "background-color:' +  "#555" +  '">' +  markersInfo[i].opTitle +'</div>' +
      //   '<div class="iw-content">' +
      //   '<div class="iw-subTitle">'+ markersInfo[i].opTitle +'</div>' +
      //   '<img src="' + this.markers[i].icon + '" alt="info img"  width="190" height="120">' +
      //   '<p>' + 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.' + '</p>' +
      //   '<div class="iw-subTitle">Repsonse</div>' +
      //   '<p>This looks fun and challenging!</p>'+
      //   '</div>' +
      //   '<div class="iw-bottom-gradient"></div>' +
      //   '</div>';
        
      // }

        

    }      

    
    /**
    * 
    *
    * @author  ITRI
    * @version beta
    * @param marker The marker object of Google Map 
    * @param data Program data corresponds to the marker
    */
    MapManager.prototype.addInfoWindow = function (marker, data) {

    
   
      // create a click listener of a marker
      google.maps.event.addListener(marker, 'click', function (event) {
        // <-- Call the lightbox here

       // console.log(data);
       // alert(data.opTitle );


        // DEPRECATED LIGHTBOX
        // function startInfoWindow(){
        //   infoWindow.open(this.map, marker);
        // }
        
        // DEPRECATED Click event
        // document.addEventListener("markerRealClickEvent", startInfoWindow);
        // setTimeout(function(){
        //     document.removeEventListener("markerRealClickEvent", startInfoWindow);
        // },700);

      });

      // DEPRECATED LIGHTBOX CONTENT
      // var infoWindow = new google.maps.InfoWindow({
      //   content: message
      // });   

      // Close infoWindow
      // google.maps.event.addListener(this.map, "click", function(event) {
      //   infoWindow.close();
      // });


      // WILL BE REOMOVED, TEMPORARY LIGHTBOX
      // This removes the right margin of the infowindow (Dark-magic)
      // google.maps.event.addListener(infoWindow, 'domready', function() {

      //  // Reference to the DIV which receives the contents of the infowindow using jQuery
      //  var iwOuter = $('.gm-style-iw');

      //  /* The DIV we want to change is above the .gm-style-iw DIV.
      //   * So, we use jQuery and create a iwBackground variable,
      //   * and took advantage of the existing reference to .gm-style-iw for the previous DIV with .prev().
      //   */
      //   var iwBackground = iwOuter.prev();

      //  // Remove the background shadow DIV
      //  iwBackground.children(':nth-child(2)').css({'display' : 'none'});

      //  // Remove the white background DIV
      //  iwBackground.children(':nth-child(4)').css({'display' : 'none'});

      //   // Taking advantage of the already established reference to
      //   // div .gm-style-iw with iwOuter variable.
      //   // You must set a new variable iwCloseBtn.
      //   // Using the .next() method of JQuery you reference the following div to .gm-style-iw.
      //   // Is this div that groups the close button elements.
      //   var iwCloseBtn = iwOuter.next();
      //     // console.log(color);
      //   // Apply the desired effect to the close button
      //   iwCloseBtn.css({
      //     opacity: '1', // by default the close button has an opacity of 0.7
      //     right: '38px', top: '3px', // button repositioning
      //     border: '7px solid #424242'  , // increasing button border and new color
      //     'border-radius': '13px', // circular effect
      //     'box-shadow': '0 0 5px #EEEEEE' // 3D effect to highlight the button
      //   });

      //   // The API automatically applies 0.7 opacity to the button after the mouseout event.
      //   // This function reverses this event to the desired value.
      //   iwCloseBtn.mouseout(function(){
      //     $(this).css({opacity: '1'});
      //   });

      // });

      
      // // Street view
      // var panorama = this.map.getStreetView();
      
      // // Detect streetview
      // google.maps.event.addListener(panorama, 'visible_changed', function() {

      //       if (panorama.getVisible()) {
      //           // alert("Hi");
      //       }
      //   });

      // // for streetview only
      // google.maps.event.addListener(marker, 'click', function (event) {

      //   if(panorama.getVisible()){
      //    console.log("panorama marker open!");

      //     infoWindow.open(this.map.getStreetView(), marker);
      //   }
        
      // });
    }
    
    
    
    MapManager.prototype.displayRoute = function (startIndex, endIndex, data) {
      var start = data[startIndex].location;
      var end = data[endIndex].location;
        // var randonColorPicking = Math.floor(Math.random()*colorPalette.length);
 //  var randonGradientPicking = Math.floor(Math.random()*13);

      var directionDisplay = new google.maps.DirectionsRenderer({
        suppressMarkers: true,
        polylineOptions: { 
            strokeColor: palette.get('Cyan', '4'),
            // icons:[{
            //     repeat:'50px',
            //     icon:{path:google.maps.SymbolPath.FORWARD_OPEN_ARROW}
            // }]
        }
      });
      this.directionsDisplay.push(directionDisplay);
      directionDisplay.setMap(this.map); 
      var waypts = [];

        for (var i = startIndex + 1; i < startIndex + 9; ++i) {
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
              directionDisplay.setDirections(response);
          }
      });
    }
    
    
    MapManager.prototype.updateFilterStatus = function (data, eventsColor, afterEffect){
        
        this.deleteMarkers();
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

        this.setMarkersWithFilter(newFilter, data, eventsColor);
        if(!newFilter.event.length){
          this.setRoute(data);
        }
        else{
          this.hideRoute();
        }
        if(afterEffect)afterEffect();
    }
    
    MapManager.prototype.updateMapStyle = function (){
        if(!$("#dayNightOnOffSwitch").prop("checked")){
            // Midnight
            this.map.setOptions({styles: [{"featureType":"all","elementType":"labels.text.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"all","elementType":"labels.text.stroke","stylers":[{"color":"#000000"},{"lightness":13}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#000000"}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#144b53"},{"lightness":14},{"weight":1.4}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#08304b"}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#0c4152"},{"lightness":5}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#000000"}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#0b434f"},{"lightness":25}]},{"featureType":"road.arterial","elementType":"geometry.fill","stylers":[{"color":"#000000"}]},{"featureType":"road.arterial","elementType":"geometry.stroke","stylers":[{"color":"#0b3d51"},{"lightness":16}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#000000"}]},{"featureType":"transit","elementType":"all","stylers":[{"color":"#146474"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#021019"}]}]});
        } else {
            // Flat with label
            this.map.setOptions({styles:[{"featureType":"water","elementType":"all","stylers":[{"hue":"#7fc8ed"},{"saturation":55},{"lightness":-6},{"visibility":"on"}]},{"featureType":"water","elementType":"labels","stylers":[{"hue":"#7fc8ed"},{"saturation":55},{"lightness":-6},{"visibility":"off"}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"hue":"#83cead"},{"saturation":1},{"lightness":-15},{"visibility":"on"}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"hue":"#f3f4f4"},{"saturation":-84},{"lightness":59},{"visibility":"on"}]},{"featureType":"landscape","elementType":"labels","stylers":[{"hue":"#ffffff"},{"saturation":-100},{"lightness":100},{"visibility":"off"}]},{"featureType":"road","elementType":"geometry","stylers":[{"hue":"#ffffff"},{"saturation":-100},{"lightness":100},{"visibility":"on"}]},{"featureType":"road","elementType":"labels","stylers":[{"hue":"#bbbbbb"},{"saturation":-100},{"lightness":26},{"visibility":"on"}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"hue":"#ffcc00"},{"saturation":100},{"lightness":-35},{"visibility":"simplified"}]},{"featureType":"road.highway","elementType":"geometry","stylers":[{"hue":"#ffcc00"},{"saturation":100},{"lightness":-22},{"visibility":"on"}]},{"featureType":"poi.school","elementType":"all","stylers":[{"hue":"#d7e4e4"},{"saturation":-60},{"lightness":23},{"visibility":"on"}]}]});
        }
    }
    
    
}


function BottomSlider(){
    
    
    this.swiper = new Swiper('.swiper-container', {
        pagination: '.swiper-pagination',
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        slidesPerView: 3,
        centeredSlides: true,
        paginationClickable: true,
        spaceBetween: 30,
        mousewheelControl: true,
    });
    this.justOn = false;
    
    
    BottomSlider.prototype.close = function(){
        $('.swiper-container').hide();
    }
    BottomSlider.prototype.reset = function(){
        this.swiper.removeAllSlides();
        $('.swiper-container').show();
    }
    BottomSlider.prototype.addSlide = function(info, eventsNameTable){ 

        // Convert UNIX_time to time
        function timeConverter(UNIX_timestamp){
          var a = new Date(UNIX_timestamp * 1000);
          // var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
          var year = a.getFullYear();
          var month = a.getMonth();
          var date = a.getDate();
          var hour = a.getHours();
          var min = a.getMinutes();
          var sec = a.getSeconds();
          var time = year + '/' + month + '/' + date + ' ' + hour + ':' + min + ':' + sec ;
          return time;
        }

        var typeIconSrc,min,sec, mediaLabel;
        min = (Math.floor((info.duration)/60)).toString();
        sec = ((info.duration) % 60) >= 10 ? ((info.duration) % 60).toString() : '0' +((info.duration) % 60).toString() ;;
        if(info.opType == "IMAGE"){
          typeIconSrc = "https://edu.cloudplay.tw/images/png/pic.png";
          mediaLabel = info.photoCount;
        }     
        else{
          typeIconSrc = "https://edu.cloudplay.tw/images/png/video.png";
          mediaLabel = min + ':' + sec;
        }
        var sliderContent = '<div class="swiper-slide">';
        sliderContent += '<div class ="sliderImgWrapper" >';
        sliderContent +=  '<img class ="sliderImg" src="'+ info.iconURL + '">';
        sliderContent += '</div>';
        sliderContent += '<span class="video_type_tag">';
        sliderContent += '<span class="op_type_label"><img class="m-r-5" src="';
        sliderContent += typeIconSrc + '" height="14" > ' + mediaLabel +' </span> </span>';
        sliderContent += ' <div class="info-area">';
        sliderContent += ' <h4 class="title">'+ info.opTitle+'</h4>';
        sliderContent +=  '<h5 class="chanel-title">';
        for (var i = 0; i < info.events.length ; ++i) { 
          sliderContent +=  '<span class = "tagWrapper">';
          sliderContent +=  '<div class = "arrowLeft"> </div> ' + '<div class = "sliderTag">';         
          sliderContent += ' <a href="#">';
          if(!info.events[i]){ 
            sliderContent += '沒有標籤:( </a></div></span>';
            break;
          }
          else{
           sliderContent += eventsNameTable[ info.events[i] ] + '</a></div></span>';
          }
         ;   
        }
        
        sliderContent += '</h5>';
        sliderContent += '<div class="extra_info">';
        sliderContent += '<span class="start-time m-l-10 pull-left">' + timeConverter(info.createDate) + '　</span>';
          
        sliderContent +='<span class="view m-r-10 pull-right">';
        sliderContent +=   '<img class="m-r-5" src="https://edu.cloudplay.tw/images/png/eye.png" width="16" alt="瀏覽人數">' + info.popularity+ '</span>';  



          //   </div>
          //   <div class="clearfix"></div>
          // </div> '
        
        
        sliderContent += '</div>';
        this.swiper.appendSlide(sliderContent);
    };
    BottomSlider.prototype.init = function(mapDataManager ,map){
        var that = this;
        this.close();
        
        window.addEventListener('startClusterPreviewSlider', 恭喜發財, false);

        document.addEventListener("startClusterPreviewSlider", 恭喜發財);
        
        google.maps.event.addListener(map, 'zoom_changed', function(event) {
            if(that.justOn)return;
          that.close();
        });
        google.maps.event.addListener(map, 'center_changed', function(event) {
            if(that.justOn)return;
          that.close();
        });


        function 恭喜發財(event){
            var markersToShow = event.detail.markers;
            that.reset();
            for(var i = 0 ; i < markersToShow.length ;++i){
                
                var info = mapDataManager.findDataByOpID(markersToShow[i].opID);

                that.addSlide(info, mapDataManager.events);

                fancyBoxRegister(markersToShow[i].opID);

            }
            that.justOn = true;
            setTimeout(function(){
                that.justOn = false;
            }, 1000);
        }
    }
    
}



// Find a marker's index by img src
function findInMarkersInfo(src){
  for(var i = 0 ; i < markersInfo.length ; ++i){
    if(markersInfo[i].src==src) return i;
  }
  return -1;
}


function fancyBoxRegister(opID){
    $('img[data-opID="'+opID+'"]').click(function(){
       $('.video_block[data-id="'+opID+'"] a').click(); 
    });
}
