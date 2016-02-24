jQuery(function($) {
    // Asynchronously Load the map API 
    var script = document.createElement('script');
    script.src = "http://maps.googleapis.com/maps/api/js?sensor=false&callback=initialize";
    document.body.appendChild(script);
});

function initialize() {
    var map;
    var bounds = new google.maps.LatLngBounds();
    var mapOptions = {
        mapTypeId: 'roadmap'
    };
                    
    // Display a map on the page
    map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
    map.setTilt(45);
        
    // Multiple Markers
    var markers = [
        ['Ukraine', 50.401699,30.2525068],
        ['Lviv, Ukraine', 49.8326679,23.9421956]
    ];
                        
    // Info Window Content
    var infoWindowContent = [
        ['<div class="info_content">' +
        '<h3><a target="_blank" href="https://www.google.com/maps/place/Ukraine/@48.2956339,26.6946547,6z/data=!3m1!4b1!4m2!3m1!1s0x40d1d9c154700e8f:0x1068488f64010?hl=en-US"> Ukraine </a></h3>' +
        '<p>Ukraine my Homeland.</p>' +        '</div>'],
        ['<div class="info_content">' +
        '<h3> <a target="_blank" href = "https://www.google.com/maps/place/Lviv,+Lviv+Oblast,+Ukraine/@49.8326679,23.9421956,12z/data=!3m1!4b1!4m2!3m1!1s0x473add7c09109a57:0x4223c517012378e2?hl=en-US">Lviv</a></h3>' +
        '<p>My Hometown.</p>' +
        '</div>']
    ];
        
    // Display multiple markers on a map
    var infoWindow = new google.maps.InfoWindow(), marker, i;
    
    // Loop through our array of markers & place each one on the map  
    for( i = 0; i < markers.length; i++ ) {
        var position = new google.maps.LatLng(markers[i][1], markers[i][2]);
        bounds.extend(position);
        marker = new google.maps.Marker({
            position: position,
            map: map,
            title: markers[i][0]
        });
        
        // Allow each marker to have an info window    
        google.maps.event.addListener(marker, 'click', (function(marker, i) {
            return function() {
                infoWindow.setContent(infoWindowContent[i][0]);
                infoWindow.open(map, marker);
            }
        })(marker, i));

        // Automatically center the map fitting all markers on the screen
        map.fitBounds(bounds);
    }

    // Override our map zoom level once our fitBounds function runs (Make sure it only runs once)
    var boundsListener = google.maps.event.addListener((map), 'bounds_changed', function(event) {
        this.setZoom(5);
        google.maps.event.removeListener(boundsListener);
    });
    
}