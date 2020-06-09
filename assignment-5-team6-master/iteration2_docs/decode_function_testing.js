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

////////////////////////////////////////////////////////////////////
//TESTING CODE STARTS HERE//////////////////////////////////////////
////////////////////////////////////////////////////////////////////

//punctuation testing
console.log(decode('LSLLSL'));//closing paranthesis
console.log(decode('SLLSLS'));//@ sign

//numerical testing
console.log(decode('SSSSS'));//5
console.log(decode('LLLLL'));//0

//character testing
console.log(decode('S'));//E
console.log(decode('SSS'));//S

////////////////////////////////////////////////////////////////////
//TESTING CODE ENDS HERE////////////////////////////////////////////
////////////////////////////////////////////////////////////////////

function decode(in_str){//improved to decode numbers and puncuations
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
