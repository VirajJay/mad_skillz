Assignment 1 team 6
Members: Viraj Jayasinghe
			Pengcheng Xia

Functions:
The function at the highest level of the program is the one which controles the board, board.on() From that, we create an anonymous function that listens to messages sent from the html 
file, index.html, for things like changes in different checkboxes and so forth.

motion.on() and socket.on() makes up all the subclasses after io.on()

Structure:
Once the board is initialized, the app.js file listens to the index.html. index.html has 2 checkboxes, one to turn the LED light on and off, the other tell the program whether or not to send signals from the motion sensor.
With the LED: index.html tells the app.js that the led checkbox state is changed, which in return toggles the state of the LED.
With the motion sensor, once it is enabled in the webpage, it sends different types of messages depending on two different scenarios. 
1: Long motion- "LONG"
2: Short motion- "SHORT"
The index.html file has its own local variables that contain the total number of motions, long motions and short motions, which gets increments from the messages sent.
with both these, a console.log(); command is run to make a long enough delay to send another message "MOTION", which tells the web page to increment its total amount of motions.

Once the html file is refreshed while running, all its local variables reset and a new connection is made. 

Used Packages:
Node.js
Johnny-five
express
socket.io

Arduino Pins:
Motion_sensor PIR: pin 8
LED: pin 13 (connect the long head of the led to the pin 13 and the other to ground)

Problems:
I encounted a small bug which I believe is the system's fault, where when you the client connects to the server, the server automatically duplicates the client a number of times.
For instance, the console returns "user connected" two or three times when it is only meant to return it once. Fixing this currently feels much above my skill level unfortunately.