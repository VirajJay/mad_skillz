//////////////////////////////////////////////////////////////////
//server-side section
//listens to the arduino and uploads morse code signals one after the other, based on how the user uses the motion sensor
/////////////////////////////////////////////////////////////////

var admin = require("firebase-admin");

// Fetch the service account key JSON file contents
var serviceAccount = require("./serviceAccountKey.json");

// Initialize the app with a service account, granting admin privileges
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://asgn5-53b13.firebaseio.com/"  // IMPORTANT: repalce the url with yours 
});

// As an admin, the app has access to read and write all data, regardless of Security Rules
var db = admin.database();
var ref = db.ref("/words"); // channel name


var five = require("johnny-five");
var board = new five.Board();

var stop_time;
var start_time;
var timing_unit=1000;
var long_motion=5000;

var end_transmission="";//has a copy of word that is meant to be transmitted. to end communication, "SK" has to be sent as a single word

board.on("ready", function(){
  var motion = new five.Motion(7);   
    motion.on("calibrated",function(){
        console.log("Motion Sensor Calibrated");        
    }); 

    motion.on("motionstart",function(){
            start_time=Date.now();
            //determine if new letter or new word is to made
            if(start_time-stop_time>=7*timing_unit){
              ref.push("new_word");//push signal to tell the receiving end that its a new word now
              console.log("new_word");
              end_transmission="";//reset the termination verification
            }
            else if(start_time-stop_time>=3*timing_unit){
              ref.push("new_letter");//push signal to tell the receiving end that its a new letter now
              console.log("new_letter");
              end_transmission="";//reset the termination verification
            }
    });

    motion.on("motionend",function(){
            stop_time=Date.now();
            //determine if long or short motion
            if(stop_time-start_time>=long_motion){//long motion
              ref.push("L");
              console.log("L");
              end_transmission+="L";
              if(end_transmission=="SSSLSL"){//see if the sever-side user wants to end the transmission
                ref.push("new_word");
                process.exit(0);//exit node js completely
              }
            }
            else{//short motion
              ref.push("S");
              console.log("S");
              end_transmission+="S";
            }
    });
});
