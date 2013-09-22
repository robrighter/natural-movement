/* Author: YOUR NAME HERE
*/

$(document).ready(function() {   

  var socket = io.connect();

  $('#sender').bind('click', function() {
   socket.emit('message', 'Message Sent on ' + new Date());     
  });

  socket.on('server_message', function(data){
   $('#receiver').append('<li>' + data + '</li>');  
  });
});


function autoBall(processing, rangeX, rangeY, width, height, color){
	var xoff = Math.random();
	var yoff = Math.random();
	var xinc = (Math.random>.5) ? function(){xoff+=0.01} : function(){xoff-=0.01};
	var yinc = (Math.random>.5) ? function(){yoff+=0.01} : function(){yoff-=0.01};
	var p = processing;
	this.draw = function(){
		var xn = p.noise(xoff);
		var yn = p.noise(yoff);
		var x = p.map(xn,0,1,0,rangeX);
		var y = p.map(yn,0,1,0,rangeY);
		p.fill(color);
		p.ellipse(x,y,width,height);
		xinc();
		yinc();
	}	
}


function sketchProc(processing) {
  console.log(processing);
  var width = 600;
  var height = 600;
  processing.size(width,height);
  processing.frameRate(50);
  var balls = [];
  for(var i=0; i<10; i++){
  	balls.push(new autoBall(processing,width,height, 25, 25, processing.color(255, 255, 255)));
  }

  processing.draw = function() {
	processing.background(processing.color(0, 200, 255));
  	balls.forEach(function(b){b.draw()});
  };
}

var canvas = document.getElementById("canvas1");
// attaching the sketchProc function to the canvas
var processingInstance = new Processing(canvas, sketchProc);