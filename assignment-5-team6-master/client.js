//////////////////////////////////////////////////////////////////
//client side technical section. 
//each time a child is added to the firebase database, code file will process it appropriately and display the results in the webpage
/////////////////////////////////////////////////////////////////

// Initialize Firebase

var config = {
  apiKey: "AIzaSyAkZnKYrlsw-NsWmt3zjIv2Obzcg0pJkDs",
  authDomain: "asgn5-53b13.firebaseapp.com",
  databaseURL: "https://asgn5-53b13.firebaseio.com",
  projectId: "asgn5-53b13",
  storageBucket: "asgn5-53b13.appspot.com",
  messagingSenderId: "374645710403"
};
firebase.initializeApp(config);


var arrayCodes = [//letters  
 'SL',//A
 'LSSS',//B
 'LSLS',//C
 'LSS',//D
 'S',//E
 'SSLS',//F
 'LLS',//G
 'SSSS',//H
 'SS',//I
 'SLLL',//J
 'LSL',//K
 'SLSS',//L
 'LL',//M
 'LS',//N
 'LLL',//O
 'SLLS',//P
 'LLSL',//Q
 'SLS',//R
 'SSS',//S
 'L',//T
 'SSL',//U
 'SSSL',//V
 'SLL',//W
 'LSSL',//X
 'LSLL',//Y
 'LLSS',//Z 
];

var arrayNumsPuns=[//numbers and punctuation indexes
    'LLLLL',//0
    'SLLLL',//1
    'SSLLL',//2
    'SSSLL',//3
    'SSSSL',//4
    'SSSSS',//5
    'LSSSS',//6
    'LLSSS',//7
    'LLLSS',//8
    'LLLLS',//9    
    'SLSLSL',//full-stop
    'LLSSLL',//comma
    'LLLSSS',//colon
    'SSLLSS',//question_mark
    'SLLLLS',//apostrophe
    'SLLLLS',//hyphen
    'LSSLS',//slash
    'LSLLS',//open parenthesis
    'LSLLSL',//closed parenthesis
    'SLLSLS',//at sign 
    'LSSSL',//equals sign
	
];

var punctuations=[//punctuations
	'.',
	',',
	':',
	'?',
	"'",
	'-',
	'/',
	'(',
	')',
	'@',
	'='
];

receive_signals=true;
document.getElementById('status').checked=true;


message = firebase.database().ref('/words');
message.remove();//reset the database each time the webpage reloads

status=firebase.database().ref('/STATUS');

var input_message;
var output="";
var letter_to_decode="";

display_input_message="";

message.on('child_added', function(snap){//listen to messages
  if(receive_signals){
      input_message=snap.val();
      if(input_message=="new_letter"){
        //decode the previous one
        //start recording for new one
        if(letter_to_decode!=""){//prevents from decoding if there isnt any letters to output
          output+=decode(letter_to_decode);
          letter_to_decode="";
        }
      }
      else if(input_message=="new_word"){
        //add a space to the output string, decode and reset the temp letter var (letter_to_decode)
        if(letter_to_decode!=""){//prevents from decoding if there isnt any letters to output
          output+=" ";
          output+=decode(letter_to_decode);    
          letter_to_decode="";
        }  
      }
      else if(input_message=="S"|input_message=="L"){
        //just increment the temporary letter variable (letter_to_decode)
        letter_to_decode+=input_message;
      }
      else{
        //the scenarios labelled above are the only inputs into the database. so it cannot be different unless the 
        //values were changed artificially while being transffered
        output="WE HAVE BEEN HACKED!!!!!!";
        message.remove();//reset the database to protect private information
      }
      //print the output on the html document
      display_input_message=input_message;
      document.getElementById('rec_code').innerText = display_input_message; //display the received morse code signal
      document.getElementById('Message').innerText = output; //display the decoded output  
  }
});

function checkbox_pressed(){//see if the client side user wants to pause or resume
  if(document.getElementById('status').checked){
    receive_signals=true;
  }
  else{
    receive_signals=false;
  }
}


function decode(in_str){//improved to decode numbers and puncuations
  //purpose: decodes a string of morsecode into english
  //argument: string, containing the morsecode to decode
  //returns: null or string. if decode is successful, corresponding string is returned. if not, null is returned.
  //preconditions: input has to be of string format or else it will be rejected by the program with an error
  //postconditions:none
  //decodes the given morse codes to english, returns null if the morse code doesnt exist
  var index;
  var out;
  if(in_str.length>=5){//number
		index=arrayNumsPuns.indexOf(in_str);//accesses global array for number codes
		if(index==-1){//returns null if code doesnt exist
			return null;
		}
		else if(index>9){//punctuation
			return punctuations[index-10];
		}
		else{//number
			return index;
		}
  }
  else{//character
		index=arrayCodes.indexOf(in_str);//accesses global array for character codes
		if(index==-1){//returns null if code doesnt exist
			return null;
		}
		else{
			out=String.fromCharCode(index+65);//decodes if it does exist, 65 is the ascii index for "A"
			return out;
		}
  }  

}