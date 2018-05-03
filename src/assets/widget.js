(function() {
  var jQuery;

  if (window.jQuery === undefined || window.jQuery.fn.jquery !== '1.7.1') {
    var script_tag = document.createElement('script');
    script_tag.setAttribute("type","text/javascript");
    script_tag.setAttribute("src",
        "http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js");
    if (script_tag.readyState) {
      script_tag.onreadystatechange = function () { // For old versions of IE
          if (this.readyState == 'complete' || this.readyState == 'loaded') {
              scriptLoadHandler();
          }
      };
    } else { // Other browsers
      script_tag.onload = scriptLoadHandler;
    }
    (document.getElementsByTagName("head")[0] || document.documentElement).appendChild(script_tag);    
  } else {    
    jQuery = window.jQuery;
    main(); //our main JS functionality
  }
 
  function scriptLoadHandler() {
    jQuery = window.jQuery.noConflict(true);
 
    main(); //our main JS functionality
  }

  function main() {     
    jQuery(document).ready(function($) {
      var $container = $('#wieiswaar-container');
      var script = $("script[data-segment],[data-campus],[data-all]");
      var segmentId = script.attr('data-segment');
      var campusId = script.attr('data-campus');
      var all = script.attr('data-all');

      if(segmentId !== undefined) {
        $.ajax({ 
          type: 'GET', 
          url: 'http://localhost:3000/API/segment/' + segmentId, 
          dataType: 'json',
          success: function (segment) { 
            $.ajax({ 
              type: 'GET', 
              url: 'http://localhost:3000/API/users', 
              dataType: 'json',
              success: function (users) { 
                $container.append($('<ul>'));
                  $.each(users, function(index, user) {
                    $.each(segment.locations, function(index, location) {
                      if (user.checkin.location._id === location._id) {
                        $container.find('ul').append($('<li>' + user.name + '</li>'));
                      }
                    });
                  });
              }
            });
          }
        });
      } else if (campusId !== undefined) {
        $.ajax({ 
          type: 'GET', 
          url: 'http://localhost:3000/API/campus/' + campusId, 
          dataType: 'json',
          success: function (campus) { 
            $.ajax({ 
              type: 'GET', 
              url: 'http://localhost:3000/API/users', 
              dataType: 'json',
              success: function (users) { 
                $container.append($('<ul>'));
                  $.each(users, function(index, user) {
                    $.each(campus.segments, function(index, segment) {
                      $.each(segment.locations, function(index, location) {
                        if (user.checkin.location._id === location._id) {
                          $container.find('ul').append($('<li>' + user.name + '</li>'));
                        }
                      });
                    });
                  });
              }
            });
          }
        });
      } else if(all !== undefined && all) {
        $.ajax({ 
          type: 'GET', 
          url: 'http://localhost:3000/API/users', 
          dataType: 'json',
          success: function (users) { 
            $container.append($('<ul>'));
              $.each(users, function(index, user) {
                $container.find('ul').append($('<li>' + user.name + '</li>'));
              });
          }
        });
      } else {
        $container.append('<h1>Voorbeelden gebruik widget</h1>');
        $container.append('<p>Alle aanwezige gebruikers</p>');
        $container.append('<textarea style="width: 90%; height: 50px;"><div id="wieiswaar-container"></div>\n<script type="text/javascript" src="http://localhost:4200/assets/widget.js" data-all="true"></script></textarea></br>');
        $container.append('<p>Aanwezige gebruikers in een segment</p>');
        $container.append('<textarea style="width: 90%; height: 50px;"><div id="wieiswaar-container"></div>\n<script type="text/javascript" src="http://localhost:4200/assets/widget.js" data-segment="5ac479eac501826e88a7cc51"></script></textarea></br>');
        $container.append('<p>Aanwezige gebruikers in een campus</p>');
        $container.append('<textarea style="width: 90%; height: 50px;"><div id="wieiswaar-container"></div>\n<script type="text/javascript" src="http://localhost:4200/assets/widget.js" data-campus="5aa101b1ae6a5737bc308f0b"></script></textarea></br>');
      }
      
    });
  }

})();