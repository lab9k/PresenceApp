(function() {
  var jQuery;
  var socket;

  //insert socket.io
  let script_socket = document.createElement('script');
  script_socket.setAttribute("type","text/javascript");
  script_socket.setAttribute("src", "https://agile-everglades-38755.herokuapp.com/socket.io/socket.io.js");

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
    (document.getElementsByTagName("head")[0] || document.documentElement).appendChild(script_socket);  
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
      socket = io('https://agile-everglades-38755.herokuapp.com');
      var base = 'https://agile-everglades-38755.herokuapp.com';
      //var base = 'http://localhost:4200';
      var $container = $('#wieiswaar-container');
      var script = $("script[data-segment],[data-campus],[data-all]");
      var segmentId = script.attr('data-segment');
      var campusId = script.attr('data-campus');
      var hours = script.attr('data-hours');
      var all = script.attr('data-all');
      var hoursUrl = ''

      if (hours !== undefined) {
        hoursUrl = '?hours=' + hours;
      }

      if(segmentId !== undefined) {
        $.ajax({ 
          type: 'GET', 
          url: base + '/API/segment/name/' + segmentId, 
          dataType: 'json',
          success: function (segment) { 
            $.ajax({ 
              type: 'GET', 
              url: base + '/API/users' + hoursUrl, 
              dataType: 'json',
              success: function (users) { 
                $container.append($('<ul>'));
                  $.each(users, function(index, user) {
                    $.each(segment.locations, function(index, location) {
                      if (user.checkin.location._id === location._id) {
                        $container.find('ul').append($('<li id="' + user._id + '">' + user.name + '</li>'));
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
          url: base + '/API/campus/name' + campusId, 
          dataType: 'json',
          success: function (campus) { 
            $.ajax({ 
              type: 'GET', 
              url: base + '/API/users' + hoursUrl, 
              dataType: 'json',
              success: function (users) { 
                $container.append($('<ul>'));
                  $.each(users, function(index, user) {
                    $.each(campus.segments, function(index, segment) {
                      $.each(segment.locations, function(index, location) {
                        if (user.checkin.location._id === location._id) {
                          $container.find('ul').append($('<li id="' + user._id + '">' + user.name + '</li>'));
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
          url: base + '/API/users' + hoursUrl, 
          dataType: 'json',
          success: function (users) { 
            $container.append($('<ul>'));
              $.each(users, function(index, user) {
                $container.find('ul').append($('<li id="' + user._id + '">' + user.name + '</li>'));
              });
          }
        });
      } else {
        $container.append('<h1>Voorbeelden gebruik widget</h1>');
        $container.append('<p>Alle aanwezige gebruikers</p>');
        $container.append('<textarea style="width: 90%; height: 50px;"><div id="wieiswaar-container"></div>\n<script type="text/javascript" src="https://agile-everglades-38755.herokuapp.com/assets/widget.js" data-all="true"></script></textarea></br>');
        $container.append('<p>Aanwezige gebruikers in een segment</p>');
        $container.append('<textarea style="width: 90%; height: 50px;"><div id="wieiswaar-container"></div>\n<script type="text/javascript" src="https://agile-everglades-38755.herokuapp.com/assets/widget.js" data-segment="Lab9k"></script></textarea></br>');
        $container.append('<p>Aanwezige gebruikers in een campus</p>');
        $container.append('<textarea style="width: 90%; height: 50px;"><div id="wieiswaar-container"></div>\n<script type="text/javascript" src="https://agile-everglades-38755.herokuapp.com/assets/widget.js" data-campus="Off-site campus"></script></textarea></br>');
      }

      socket.on('new-checkin', (data) => {
        if(segmentId !== undefined) {
          $.ajax({ 
            type: 'GET', 
            url: base + '/API/segment/name/' + segmentId, 
            dataType: 'json',
            success: function (segment) { 
              $.each(segment.locations, function(index, location) {
                if (data.user.checkin.location._id === location._id) {
                  $container.find('ul').append($('<li id="' + data.user._id + '">' + data.user.name + '</li>'));
                }
              });
            }
          });
        } else if (campusId !== undefined) {
          $.ajax({ 
            type: 'GET', 
            url: base + '/API/campus/name' + campusId, 
            dataType: 'json',
            success: function (campus) { 
              $.each(campus.segments, function(index, segment) {
                $.each(segment.locations, function(index, location) {
                  if (data.user.checkin.location._id === location._id) {
                    $container.find('ul').append($('<li id="' + data.user._id + '">' + data.user.name + '</li>'));
                  }
                });
              });
            }
          });
        } else if(all !== undefined && all) {
          $container.find('ul').append($('<li id="' + data.user._id + '">' + data.user.name + '</li>'));
        }
        
      });
      socket.on('new-checkout', (data) => {
        jQuery('#' + data.user._id).remove();
      });
      
    });
  }

})();