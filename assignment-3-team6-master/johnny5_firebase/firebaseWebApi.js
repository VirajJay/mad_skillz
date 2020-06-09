// Initialize Firebase
    var config = {
        apiKey: "AIzaSyAW9oQxzGOYaMaUp3fYRPFO525hA9PQAic",
        authDomain: "asgn3-7ca8b.firebaseapp.com",
        databaseURL: "https://asgn3-7ca8b.firebaseio.com",
        projectId: "asgn3-7ca8b",
        storageBucket: "asgn3-7ca8b.appspot.com",
        messagingSenderId: "169360925374"
    };
    firebase.initializeApp(config);

  time = firebase.database().ref('/Time');
  //reset the database everytime the page loads
  time.remove();

  var times=[];
  time.on('child_added', function(snap){
    var child = snap.val();
    var sum=0;
    var current_time=Date.now();
    var pushTime=current_time-child.val;
    //write current time into webpage
    if(!isNaN(pushTime)){
      times.push(pushTime);
    }
    document.getElementById('time_array').innerText = times;
    if(times.length==5){
      for(var i=0; i<times.length; i++){
        sum+=times[i];
      }
      avg=sum/times.length;

      //write average time into webpage
      document.getElementById('avg_time').innerText = avg;

      //reset the sum and average
      sum=0;
      avg=0;
      times=[];
    }
    
    
    
  })
  



