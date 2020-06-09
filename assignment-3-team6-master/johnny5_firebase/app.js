var admin = require("firebase-admin");

var serviceAccount = require("./serviceAccountKey.json");

// Initialize the app with a service account, granting admin privileges
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://asgn3-7ca8b.firebaseio.com/"  // IMPORTANT: repalce the url with yours 
});


// As an admin, regardless of security rules, app has read/write priviliges
var db = admin.database();
var sendtime = db.ref("/Time");

var five = require("johnny-five");                
var board = new five.Board();   


board.on("ready", function() {                          // triggers when board on
    var motion = new five.Motion(7);   
    motion.on("calibrated",function(){
        console.log("Motion Sensor Calibrated");        
    }); 


    // johhny five sensor stuff
    motion.on("motionstart",function(){
            //push the timestamp when it happens into the database
            var time=Date.now();
            sendtime.push({
              val:time
            });
            console.log("Motion HAPPENED!!!!");

    });
  


    motion.on("motionend",function(){
            //push timestamp when motion ends
            var time=Date.now();
            sendtime.push({
              val:time
            });
            console.log("Motion UNHAPPENEDMFUIDJHSN!!!!");

    });
});