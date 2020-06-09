  var config = {
    apiKey: "AIzaSyA_3AyJrAQij6VHygAJBOAGApWy6TqrqSU",
    authDomain: "assignment2-9afba.firebaseapp.com",
    databaseURL: "https://assignment2-9afba.firebaseio.com",
    projectId: "assignment2-9afba",
    storageBucket: "assignment2-9afba.appspot.com",
    messagingSenderId: "749026127142"
  };
  firebase.initializeApp(config);
  ref = firebase.database().ref('/hdwr');
  intruder = firebase.database().ref('/Motion');
  light = firebase.database().ref('/light');

  var status;
  var mtn_cntr;
  var long_mtn;
  var short_mtn;
  var cnt_intrdr

  
  ref.on('value', function(snap){
    data = snap.val();
    status = data.state;
    mtn_cntr = data.cnt;
    long_mtn = data.cnt_long;
    short_mtn = data.cnt_shrt;
    cnt_intrdr = data.intrdr;

    document.getElementById('dtctedmtns').innerText = data.cnt;
    document.getElementById('dtctedshrtmtns').innerText = data.cnt_shrt;
    document.getElementById('dtctedlngmtns').innerText = data.cnt_long;
    document.getElementById('int_cnt').innerText = data.intrdr;
  })

  var queue = "";
  alert = "1011"
  intruder.on('child_added', function(snap){
    var children = snap.val();

      if (queue.length == 4){
        queue = queue.substring(1);
      }
      queue += children.Type;
    
    console.log(queue)

    if(queue == alert){

      console.log("Intruder");
      cnt_intrdr += 1;
      ref.set({
          cnt: mtn_cntr,
          cnt_long: long_mtn,
          cnt_shrt: short_mtn,
          state: status,
          intrdr: cnt_intrdr
                  
      
      })
      queue = "";
    }
  })
  

function LEDtoggle() {
  light.set({
    val: document.getElementById('light').checked
  })
}

function PIRtoggle() {
  ref.set({
    cnt: mtn_cntr,
    cnt_long: long_mtn,
    cnt_shrt: short_mtn,
    state: document.getElementById('mtn_snsr').checked,
    intrdr: cnt_intrdr
  })           
}

function RST() {
  if (document.getElementById('rstswitch').checked) {
    intruder.remove();
    ref.set({
      cnt: 0,
      cnt_long: 0,
      cnt_shrt: 0,
      state: document.getElementById('mtn_snsr').checked,
      intrdr: 0
    })
  
  }

}

