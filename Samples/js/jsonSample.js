/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
 $(function () {
      var map = $("#map").geomap({
        center: [-71.0595678, 42.3604823],
        zoom: 6,
        mode: "drawPoint",
        shape: function (e, geo) {
          var state = map.geomap("find", geo, 0);
          if (state.length > 0) {
            map.geomap("remove", state[0]);

            var color = Math.round(0xffffff * Math.random()).toString(16);

            map.geomap("append", state[0], {
              color: "#" + ( color.length == 5 ? "0" : "" ) + color
            });
          }
        }
      }),
      states = null;

      $.ajax({
        url: "http://data.jquerygeo.com/usastates.json",
        dataType: "json",
        success: function (result) {
          states = result;
          map.geomap("append", states);
        },
        error: function (xhr) {
          alert(xhr.statusText);
        }
      });
    });

