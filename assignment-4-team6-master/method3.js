var arrayCodes=['1001', '0011', '0101', '1110', '1111'];

//Note: this program tests a different way of storing the code
/*
After doing some online research, I found that the least complicated and efficient sounding
way of implementing is as follows:

have one array, arrayCodes, to store the codes and another, arrayLetter, to store the corresponding letter.
these two will be corresponding to each other. For instance, if the index of code '1111'('e') is 4, the other array's
4th index will contain its corresponding letter 'e'

 */


//Note: same code as in the string.js to generate the random strings
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
    array.push(arrayCodes[i%5]);
}
*/

//Note: only difference can be spotted in the deepest for loop
var index=0;
times_array=[];//run step 3 100 times and get the average time
var time_taken;
for(var trial=0;trial<100;trial++){
    //iterate through moreCodeTable for each entry and see if any of the data fits in or not and time the whole thing
    var start_time=Date.now();
    for(var i=0; i<array.length;i++){//iterate through each item in the 5000 array
        index=arrayCodes.indexOf(array[i]);
        if(index==-1){//checks if the item exists, -1 is usually retruned if it doesnt
            console.log(null);
        }
        else{
            console.log(String.fromCharCode(index+97));
        }
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

console.log("Average time taken for array method is: "+avg+" Milliseconds");

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