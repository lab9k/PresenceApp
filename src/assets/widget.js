(function() {
  var jQuery;
  var socket;

  //insert socket.io
  let script_socket = document.createElement('script');
  script_socket.setAttribute("type","text/javascript");
  script_socket.setAttribute("src", "https://wiw.lab9k.gent/socket.io/socket.io.js");

  if (window.jQuery === undefined || window.jQuery.fn.jquery !== '1.7.1') {
    var script_tag = document.createElement('script');
    script_tag.setAttribute("type","text/javascript");
    script_tag.setAttribute("src",
        "https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js");
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
      var base = 'https://wiw.lab9k.gent';
      //var base = 'http://localhost:4200';
      var $container = $('#wieiswaar-container');
      var script = $("script[data-locatie],[data-segment],[data-campus],[data-all]");
      var locationId = script.attr('data-locatie');
      var segmentId = script.attr('data-segment');
      var campusId = script.attr('data-campus');
      var hours = script.attr('data-hours');
      var all = script.attr('data-all');
      var hoursUrl = '';

      socket = io(base);

      if (hours !== undefined) {
        hoursUrl = '?hours=' + hours;
      }

      if(locationId !== undefined) {
        $.ajax({ 
          type: 'GET', 
          url: base + '/API/location/name/' + locationId, 
          dataType: 'json',
          success: function (location) { 
            $.ajax({ 
              type: 'GET', 
              url: base + '/API/users' + hoursUrl, 
              dataType: 'json',
              success: function (users) { 
                $container.append($('<ul>'));
                $.each(users, function(index, user) {
                  if (user.checkin.location._id === location._id) {
                    $container.find('ul').append($('<li id="' + user._id + '">' + user.name + '</li>'));
                  }
                });
                if ($container.find('li').length === 0) {
                  $container.append($('<p>Er is hier niemand ingecheckt...</p>'));
                }
              }
            });
          }
        });
      }
      else if(segmentId !== undefined) {
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
                  if ($container.find('li').length === 0) {
                    $container.append($('<p>Er is hier niemand ingecheckt...</p>'));
                  }
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
                  if ($container.find('li').length === 0) {
                    $container.append($('<p>Er is hier niemand ingecheckt...</p>'));
                  }
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
              if ($container.find('li').length === 0) {
                $container.append($('<p>Er is hier niemand ingecheckt...</p>'));
              }
          }
        });
      } else {
        $container.append('<h1>Voorbeelden gebruik widget</h1>');
        $container.append('<p>Alle aanwezige gebruikers</p>');
        $container.append('<textarea style="width: 90%; height: 50px;"><div id="wieiswaar-container"></div>\n<script type="text/javascript" src="https://wiw.lab9k.gent/assets/widget.js" data-all="true"></script></textarea></br>');
        $container.append('<p>Aanwezige gebruikers in een locatie</p>');
        $container.append('<textarea style="width: 90%; height: 50px;"><div id="wieiswaar-container"></div>\n<script type="text/javascript" src="https://wiw.lab9k.gent/assets/widget.js" data-locatie="Location 1"></script></textarea></br>');
        $container.append('<p>Aanwezige gebruikers in een segment</p>');
        $container.append('<textarea style="width: 90%; height: 50px;"><div id="wieiswaar-container"></div>\n<script type="text/javascript" src="https://wiw.lab9k.gent/assets/widget.js" data-segment="Lab9k"></script></textarea></br>');
        $container.append('<p>Aanwezige gebruikers in een campus</p>');
        $container.append('<textarea style="width: 90%; height: 50px;"><div id="wieiswaar-container"></div>\n<script type="text/javascript" src="https://wiw.lab9k.gent/assets/widget.js" data-campus="Off-site campus"></script></textarea></br>');
        $container.append('<p>Aanwezige gebruikers ingecheckt in de laatste x uren.</p>');
        $container.append('<textarea style="width: 90%; height: 50px;"><div id="wieiswaar-container"></div>\n<script type="text/javascript" src="https://wiw.lab9k.gent/assets/widget.js" data-all="true" data-hours="8"></script></textarea></br>');
      }

      //socket events
      socket.on('new-checkin', (data) => {
        $container.find('p').remove();
        $container.find('#' + data.user._id).remove();
        if(locationId !== undefined) {
          $.ajax({ 
            type: 'GET', 
            url: base + '/API/location/name/' + locationId, 
            dataType: 'json',
            success: function (location) { 
              if (data.user.checkin.location._id === location._id) {
                $container.find('ul').append($('<li id="' + data.user._id + '">' + data.user.name + '</li>'));
              }
              if ($container.find('li').length === 0) {
                $container.append($('<p>Er is hier niemand ingecheckt...</p>'));
              }
            }
          });
        }
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
              if ($container.find('li').length === 0) {
                $container.append($('<p>Er is hier niemand ingecheckt...</p>'));
              }
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
              if ($container.find('li').length === 0) {
                $container.append($('<p>Er is hier niemand ingecheckt...</p>'));
              }
            }
          });
        } else if(all !== undefined && all) {
          $container.find('ul').append($('<li id="' + data.user._id + '">' + data.user.name + '</li>'));
          if ($container.find('li').length === 0) {
            $container.append($('<p>Er is hier niemand ingecheckt...</p>'));
          }
        }
        
      });
      socket.on('new-checkout', (data) => {
        $container.find('#' + data.user._id).remove();
        if ($container.find('li').length === 0) {
          $container.append($('<p>Er is hier niemand ingecheckt...</p>'));
        }
      });
    });
  }
})();