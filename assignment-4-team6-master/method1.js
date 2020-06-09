var moreCodeTable=[{
    letter:'a',
    code: '1001'
},{
    letter: 'b',
    code: '0011'
}, {
    letter: 'c',
    code: '0101'
},{
    letter: 'd',
    code: '1110'
},{
    letter: 'e',
    code: '1111'
}];


//generate 50000 "motion datas"
var array=[];
var str_in='';
var num;
for(var i=0;i<50000;i++){
    for(var j=0; j<4; j++){
        //generate string
        num=Math.floor((Math.random()*10)%2);//generate random number, 0 or 1
        str_in+=num.toString();//add it to the string
    }
    //push the string
    array.push(str_in);
    str_in='';//reset the string
}

/*
//best case scenario code
var array=[];
var str_in='';
var num;
for(var i=0;i<50000;i++){
    array.push(moreCodeTable[i%5].code);
}
*/

times_array=[];//run step 3 100 times and get the average time
var time_taken;
for(var trial=0;trial<100;trial++){
    //iterate through moreCodeTable for each entry and see if any of the data fits in or not and time the whole thing
    var found=0;
    var start_time=Date.now();
    for(var i=0; i<array.length;i++){//iterate through each item in the 5000 array
        for(var j=0; j<moreCodeTable.length; j++){//iterate through moreCodeTable
            if(str_cmp(array[i], moreCodeTable[j].code)){
                found=1;
                console.log(moreCodeTable[j].letter);//print out the letter if it exists
                break;
            }
        }
        if(found==0){
            console.log(null)
        }
        found=0;//reset the check value
    }
    var end_time=Date.now();
    time_taken=end_time-start_time;
    times_array.push(time_taken);
}

var sum=0;
var avg;
for(var i=0;i<times_array.length;i++){
    sum+=times_array[i];
    avg=sum/times_array.length;
}
console.log("Average time taken for string is: "+avg+" Milliseconds");

times_array.sort();

if(times_array.length%2==0){
    var middle_upper=times_array.length/2;
    var middle_lower=middle_upper-1;
    var median=(times_array[middle_lower]+times_array[middle_upper])/2;
    console.log("Median: "+median+" Milliseconds")
}
else{
    var middle=Math.floor(times_array.length/2);
    var median=times_array[middle];
    console.log("Median: "+median+" Milliseconds")
}



function str_cmp(str1, str2){//compares if the lists are the same
    if(str1.length!=str2.length){//most fundamental check
        return false;
    }
    for(var i=0; i<str1.length;i++){
        if(str1[i]!=str2[i]){
            return false;
        }
    }
    return true;
}


