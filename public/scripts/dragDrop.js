$(document).ready(function(){
	var drag = [];

	var container = document.getElementById('canvas');
	var container_size = container.getBoundingClientRect();
	var container_offset = $(container).offset();

	var hammerOpts = { drag_min_distance: 0, drag_horizontal: true, drag_vertical: true, transform: false, hold: false, prevent_default: true}

	$(".widget").hammer(hammerOpts)
								.bind('dragstart', onDragStart)
								.bind('drag', onDrag)
								.bind('dragend', onDragEnd)
								.bind('tap', onTap)

	function onTap(e) {
		var color = rndColor();
		$(e.target).css('background', color);

		if(window.notifyBackgroundChange) 
			notifyBackgroundChange({color: color});
	}

	function onDragStart(e) {}

	function onDragEnd(e) {}

	function onDrag(ev) {
		drag = [];

    var touches = ev.originalEvent.touches || [ev.originalEvent];
    for(var t=0; t < touches.length; t++) {
        var el = touches[t].target;

        if(el && el.className.search('widget') > -1) {
        		var pos = {x: ev.touches[t].x - container_offset.left, y: ev.touches[t].y - container_offset.top}
            drag.push({el: el, size: { width: 120, height: 120 }, pos: pos});

            if(window.notifyPositionChange) 
            	notifyPositionChange(pos);
        }
    }
	}

  /** keep up dragging */
  function watchDrag() {
    if(!drag.length) {
        return;
    }

    for(var d = 0; d<drag.length; d++) {
        var left = drag[d].pos.x - (drag[d].size.width / 2);
        var top = drag[d].pos.y - (drag[d].size.height / 2);

        if(left < 0) {
            left = 0;
        }
        if(top < 0) {
            top = 0;
        }

        if(left > container_size.width - drag[d].size.width) {
            left = container_size.width - drag[d].size.width;
        }
        if(top > container_size.height - drag[d].size.height) {
            top = container_size.height - drag[d].size.height;
        }

        drag[d].el.style.left = left +'px';
        drag[d].el.style.top = top +'px';
    }
  }

  /** Drag and Drop Debounced Style **/
  setInterval(watchDrag, 10);
});