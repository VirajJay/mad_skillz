var admin = require("firebase-admin");

var serviceAccount = require("./serviceAccountKey.json");

// Initialize the app with a service account, granting admin privileges
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://assignment2-9afba.firebaseio.com/"  // IMPORTANT: repalce the url with yours 
});

  var status;
  var mtn_cntr;
  var mtn_lng;
  var mtn_shrt;
  var intrdrcnt;

// As an admin, regardless of security rules, app has read/write priviliges
var db = admin.database();
var ref = db.ref("/hdwr");    
var allData  = db.ref("/Motion");
ref.on("value", function(snap){
  init_data = snap.val();
  status = init_data.state;
  mtn_cntr =  init_data.cnt;
  mtn_lng = init_data.cnt_long;
  mtn_shrt = init_data.cnt_shrt; 
  intrdrcnt = init_data.intrdr;
})
var five = require("johnny-five");                
var board = new five.Board();   


board.on("ready", function() {                          // triggers when board on
    var led = new five.Led(13);                         // LED pin = 13;
    var motion = new five.Motion(3);    
    var startTime = 0;
    console.log('TEST');                // PIR sensor pin = 3;
    motion.on("calibrated",function(){
        console.log("Motion Sensor Calibrated");        
    }); 


    // johhny five sensor stuff
    motion.on("motionstart",function(){
            startTime = Date.now();                 // start timestamp
    });
  


    motion.on("motionend",function(){
            var endTime = Date.now();            // end timestamp
            motionLength = endTime - startTime; 
            if (status) {
              mtn_cntr = mtn_cntr +1;
              if (motionLength < 10500){
                  mtn_shrt = mtn_shrt + 1;
                  allData.push({
                      Type: 0,
                      Time : Date.now()
                  });
                  ref.set({
                    cnt: mtn_cntr,
                    cnt_long: mtn_lng,
                    cnt_shrt: mtn_shrt,
                    state: status,
                    intrdr: intrdrcnt
                  }) 
              }
              else {
                  mtn_lng = mtn_lng + 1;
                  allData.push({
                      Type: 1,
                      Time : Date.now()
                  });
                  console.log(mtn_lng);  
                  ref.set({
                    cnt: mtn_cntr,
                    cnt_long: mtn_lng,
                    cnt_shrt: mtn_shrt,
                    state: status,
                    intrdr: intrdrcnt

                  })
            }
            
            }

    });

    var leddata = db.ref("/light");
    leddata.on("value", function(snap){
      LEDSTATUS = snap.val();
      console.log(LEDSTATUS);
      console.log(LEDSTATUS.val);
      if (LEDSTATUS.val){
        led.on();
      }
      else{
        led.off();
      }
    }, function (errorObject) {             // if error
      console.log("Data read failiure: " + errorObject.code);
    });
});
