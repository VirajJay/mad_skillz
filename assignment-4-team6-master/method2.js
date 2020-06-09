var moreCodeTable=[{
    letter:'a',
    code: ['1', '0', '0', '1']
},{
    letter: 'b',
    code: ['0', '0', '1', '1']
}, {
    letter: 'c',
    code: ['0', '1', '0', '1']
},{
    letter: 'd',
    code: ['1', '1', '1', '0']
},{
    letter: 'e',
    code: ['1', '1', '1', '1']
}];


//generate 50000 "motion datas"
var array=[];
var array_in=[];
var num;
for(var i=0;i<50000;i++){
    for(var j=0; j<4; j++){
        //generate string
        num=Math.floor((Math.random()*10)%2);//generate random number, 0 or 1
        array_in.push(num.toString());//add it to the string
    }
    //push the string
    array.push(array_in);
    array_in=[];//reset the string
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
    var found;
    var start_time=Date.now();    
    for(var i=0; i<array.length;i++){//iterate through each item in the 5000 array
        for(var j=0; j<moreCodeTable.length; j++){//iterate through moreCodeTable
            //compares the two arrays in linear time
            found=1;
            for(var k=0;k<moreCodeTable[j].code.length;k++){
                if(moreCodeTable[j].code[k]!=array[i][k]){
                    found=0;
                }
            }
            if(found==1){
                console.log(moreCodeTable[j].letter);
                break;
            }
            //end of linear comparison
        }
        if(found==0){
            console.log(null);
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