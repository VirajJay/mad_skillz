# assignment-2-team_6
assignment-2-team_6 created by GitHub Classroom
Members: Viraj Jayasinghe
			Pengcheng Xia


Functions:	
The system in place will detect an intrusion if the sequence of four motions follows a long, short, long and long pattern, where a long motion is defined as movement for more than 10 seconds. The server, run and coded using the library Node.Js, records all captured data on the Arduino Board detected by the PIR motion sensor attached. The communication between the board and the server is handled using the Johnny-five library. Once captured, the data is transmitted to the real-time database and the client facing interface. The database stores all data in JSON format. 

Structure:
Once the board is initialized, the app.js file listens to the index.html. index.html has 2 checkboxes and 1 button, one checkbox to turn the LED light on and off, the other tell the program whether or not to send signals from the motion sensor, the button is used for delete all data stored in firebase.
With the LED: index.html tells the app.js that the led checkbox state is changed, which in return toggles the state of the LED.
With the motion sensor: Once it is enabled in the web page, it sends different types of messages depending on two different scenarios. 
With firebase: Once data captured, the data is transmitted to the real-time database and the client facing interface.    

Once the html file is refreshed while running, all its local variables reset and a new connection is made. 		

Used Packages:
Node.js
Johnny-five
express
firebase-tools

Arduino Pins:
Motion_sensor PIR: pin 8
LED: pin 13 (connect the long head of the led to the pin 13 and the other to ground)
