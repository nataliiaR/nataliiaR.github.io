        function getLocation() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(showPosition);
            } else {
                document.getElementById("geoPosBox").innerHTML = "Geolocation is not supported by this browser.";
            }
        }
        function showPosition(position) {
            var lat = position.coords.latitude;
            var lon = position.coords.longitude;
            performSearch(2, lat,lon);
            getDegree(2);           
            document.getElementById("geoPosBox").innerHTML = "Your coordinates (Latitude: " + position.coords.latitude +
            "&nbsp; Longitude: " + position.coords.longitude + ")&nbsp; might be used for the search result ordering";
            
        }
        
        function performSearch(id, x,y) {
        
            //var q = $("#search").val();
            $("#coor").innerHTML = "Latitude: " + x + "&nbsp; Longitude: " + y + "&nbsp";
            //q = q.trim();
            // perform AJAX request to search API
            $.ajax({
                url: "http://api.openweathermap.org/data/2.5/weather?lat="+x+"&lon="+y+"&appid=1c87a7a7f766cd5b4d9e91dfdf1d3ed2",
                type: "get",
                success: function(response, textStatus, jqXHR){
                    
                    respObj = JSON.parse(jqXHR.responseText);
                    //document.getElementById("button").disabled = "disabled";
                    var searchOut = _.template( $('#search-output').html())( {weather: respObj, link2: "http://openweathermap.org/Maps?zoom=12&lat="+x+"&lon="+y+"&layers=B0FTTFF", id: id } );
                    $("#searchResult").append( searchOut );
                    setWeatherImg(respObj,id);


                },
                error: function(jqXHR, textStatus, errorThrown){
                    alert(jqXHR.status);
                }
            });
            }
        function setWeatherImg(reOb,id){
          var currentTime = new Date();

          var hours = currentTime.getHours();

          if (hours >8&&hours<20){
            if(reOb.weather[0].main=="Clear"){
              $("#imgi-"+id).attr("src","static/weather/Sun.png");
            } else if (reOb.weather[0].main=="Clouds"){
              $("#imgi-"+id).attr("src","static/weather/Clouds.png");
            } else if (reOb.weather[0].main=="Rain"){
              $("#imgi-"+id).attr("src","static/weather/Rain.png");
            } else if (reOb.weather[0].main=="Snow"){
              $("#imgi-"+id).attr("src","static/weather/Snow.png");
            }  else if (reOb.weather[0].main=="Sleet"){
              $("#imgi-"+id).attr("src","static/weather/Sleet.png");
            } else if (reOb.weather[0].main=="Storm"){
              $("#imgi-"+id).attr("src","static/weather/Storm.png");
            } 
          }else{
            if(reOb.weather[0].main=="Clear"){
              $("#imgi-"+id).attr("src","static/weather/Bright_Moon.png");
            } else if (reOb.weather[0].main=="Clouds"){
              $("#imgi-"+id).attr("src","static/weather/Cloudy_Night.png");
            } else if (reOb.weather[0].main=="Rain"){
              $("#imgi-"+id).attr("src","static/weather/Rain.png");
            } else if (reOb.weather[0].main=="Snow"){
              $("#imgi-"+id).attr("src","static/weather/Snow.png");
            }  else if (reOb.weather[0].main=="Sleet"){
              $("#imgi-"+id).attr("src","static/weather/Sleet.png");
            } else if (reOb.weather[0].main=="Storm"){
              $("#imgi-"+id).attr("src","static/weather/Storm.png");
            } 
          }
        }

        function hide() {
            document.getElementById("button").style.visibility="hidden";
        }
        function showGYW() {
            document.getElementById("button").style.visibility="visible";
        }
        function show() {
            document.getElementById("temp").style.visibility="visible";
        }
        function clearF(){
           $("#searchResult").empty();
        }  

        function getDegree(id){

          $("#degTC").click(function(event){
              if ($("#degC"+id).css("display")=="none"){
                $("#degF"+id).css("display","none");
                $("#degC"+id).css("display","initial");
              }  else{
                  $("#degF"+id).css("display","none");
              }    // $("#degC").attr("visibility","vissible");  
              var scale=$("#degTC").val();
              setCookie("deg",scale);
             });
              
          $("#degTF").click(function(event){
              if ($("#degF"+id).css("display")=="none")
              {
                $("#degF"+id).css("display","initial");
                $("#degC"+id).css("display","none");
              }else{
                    $("#degC"+id).css("display","none");
              }  // $("#degC").attr("visibility","vissible");  
              var scale=$("#degTF").val();
              setCookie("deg",scale);
             });
        }
              //set cookies for task status
        function setCookie(cname,cvalue) {
          var d = new Date();
          d.setTime(d.getTime() + (30*24*60*60*1000));
          var expires = "expires=" + d.toGMTString();
          document.cookie = cname+"="+cvalue+"; "+expires;
        }

        function getCookie(cname) {
          var name = cname + "=";
          var ca = document.cookie.split(';');
          for(var i=0; i<ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0)==' ') c = c.substring(1);
            if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
          }
          return "";
        }
        // check browser and set value/color for task status based on cookies during page reloading
        function gg() {
            if (getCookie("deg")=="C"){
              $("#degF"+2).css("display","none");
              $("#degC"+2).css("display","initial");
            }
            else if (getCookie("deg")=="F"){
              $("#degC"+2).css("display","none");
              $("#degF"+2).css("display","initial");
            }

          }