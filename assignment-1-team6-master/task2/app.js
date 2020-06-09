
//import required APIs
app = require('express')();
var http = require('http').Server(app);
var io=require('socket.io')(http);
//initialize variables
var before=0;
var after=0;
var time=0;

var five = require("johnny-five");
var board = new five.Board();//connect to board
var pir_state=false;		

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');//initiates communication with the html file
});

board.on("ready", function() {
	var led = new five.Led(13);
io.on('connection', function(socket){
	//initial conditions when connected.
	console.log('user connected');
	var lol=0;

	new five.Motion(7);

	// Options object with pin property
	var motion = new five.Motion({
		pin: 8
	});

	motion.on("calibrated", function() {//when PIR is calibrated
		console.log("calibrated");
	});	
	led.off();
	snsr_state=0;
	//led code	
	socket.on('led_toggle', function(led_status){//when the html file changes state of the led checkbox
		if(led_status){
			console.log("LED_ON");
			led.on();
			
		}
		else{
			console.log("LED_OFF");
			led.off();
		}
			
	});

	socket.on('snsr_toggle', function(snsr_state){//when the html file changes state of the led checkbox
		if (snsr_state)
		{
			console.log("SNSR_ON");
			pir_state=true;
		}
		else{
			console.log("SNSR_OFF");
			pir_state=false;
		}
	});

	motion.on("motionstart", function() {//when the sensor picks up motion. Action is only taken if the web page has enabled the use of the PIR
	if(pir_state)
	{
		console.log("motion started");
		before=Date.now();//record time when the motion was detected in the system
	}
		
  	});

	motion.on("motionend", function() {//when no more motion is detected in the PIR
		if(pir_state){
			console.log("motion ended");
			after=Date.now();//record the time after the motion was detected.
			time=Math.floor(after-before);//gives the time it took for the whole motion
			if(time>10000)
			{
				socket.send("LONG");//sends the message and the html file increments its local variable for each case
				console.log();//provides a small delay so that the next message(total motions) has time to be sent
				socket.send("MOTION");
				
			}
			else{
				socket.send("SHORT");
				console.log();
				socket.send("MOTION");
			}
		}
    
  	});

	socket.on('disconnect', function() {
      console.log('Got disconnect!');
	});

});


http.listen(3000, function(){
  console.log('listening on *:3000');
});



});	
