
var keyword_list=$('.keywordlist');
var pick_key_list=$('.piks_list');
var nic_key_list=$('.niks_list');

var default_duration=1;
var current_duration=1;
var piks_list=[];
var niks_list=[];
var table=$('#heatmap');

// var map_arr=[6, 3, 10, 6, 10, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6,
//         6, 6, 6, 5, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6,
//         6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 10, 6, 6, 6, 6, 10,
//         6, 6, 6, 10, 10, 6, 6, 6, 10, 10, 10, 10, 6, 6, 6, 6, 6, 10, 6, 6, 6, 6, 6,
//         6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 10
//         ];
var map_arr=new Array(100).fill(10);


function get_hm_data(keyname){

    return kdf_data[keyname]

}

function get_max(arr){
    return Math.max.apply(null, arr);
}

function get_min(arr){
    return Math.min.apply(null, arr);
}

function normalize(arr){
    ratio = get_max(arr);
    console.log("max");
    console.log(ratio);
    var num=10/ratio;
    for (var i = 0; i < arr.length; i++ ) {
        arr[i] = Math.round( arr[i] *num);
    }
    return arr
}

function get_heatmap(){
    sum= new Array(100).fill(0.0);
    // if(piks_list.length>0){

        for (var i = piks_list.length - 1; i >= 0; i--) {
            console.log(piks_list[i]);
            hm_data=get_hm_data(piks_list[i]);
            console.log('heat map');
            console.log(hm_data);
           for (var j = 0;j<hm_data.length;j++) {
               sum[j]=sum[j]+hm_data[j];
           }
        }
        console.log("After piks add");
        console.log(sum);
        for (var i = niks_list.length - 1; i >= 0; i--) {
            hm_data=get_hm_data(niks_list[i]);
           for (var j = 0;j<hm_data.length;j++) {
               sum[j]=sum[j]-hm_data[j]*0.25;
           }
        }
        console.log("After niks add");
        console.log(sum);
        min_elem=get_min(sum);
        console.log(min_elem);
        for (var j = 0;j<sum.length;j++) {
               sum[j]=sum[j]-min_elem;
        }
        console.log("Convert everything to +");
        console.log(sum);
        sum=normalize(sum);
        console.log("After normal");
        console.log(sum);
        return sum;
    // } else{
    //     return sum;
    // }
}

var apply_btn=document.getElementById("apply");
// apply_btn.addEventListener('click',function(){
//     // console.log(key_dict);
//     map_arr1=get_heatmap();
//     create_heatmap(map_arr1);
// });

function create_heatmap(map_arr){
    $("#heatmap tr").remove();
    var tr=document.createElement('tr');
    for (var i = 0;i<map_arr.length;i++) {
        var td = document.createElement('td');
        td.setAttribute('class','tt');
        td.style.opacity=map_arr[i]/5;
        td.style.backgroundColor="#FF7700";
        td.style.color="#FF7700";
        td.style.width="1px";
        td.innerHTML=".";
        tr.appendChild(td);
    }
    table.append(tr);
}

create_heatmap(map_arr);

function add_key_btns(keylist){
    $('.keywordlist').empty();
    for (var i = 0;i<keylist.length;i++) {
        var div_group=document.createElement('span');
        div_group.setAttribute('id',keylist[i]+"_div");
        div_group.setAttribute('class','btn-group tag');
        div_group.setAttribute('role','group');
        var div_name=document.createElement('span');
        div_name.setAttribute("type","button");
        div_name.setAttribute("class","btn btn-secondary keyword defaultTag keyLabel");
        div_name.innerHTML=keylist[i];
        var li = document.createElement("span");
        var btn=document.createElement("button");
        var btn2=document.createElement("button");
        btn.innerHTML=" +";
        btn2.innerHTML="-";
        li.setAttribute('id', keylist[i]+"_li");
        btn.setAttribute('id',keylist[i]+"_btn");
        btn.setAttribute('class','btn btn-secondary keyword defaultTag plus');
        btn2.setAttribute('id',keylist[i]+"_btn2");
        btn2.setAttribute('class','btn btn-secondary keyword defaultTag minus');

        btn.addEventListener('click',function(){
            var ids=this.id.toString();
            var keyname=ids.substr(0,ids.length-4);
            if ((piks_list.indexOf(keyname) === -1) && (niks_list.indexOf(keyname) === -1)) {
              // console.log("element doesn't exist");
              add_pick_btn(keyname);
              piks_list.push(keyname);
            }
            else {
              console.log("element found :"+keyname);
            }
            map_arr1=get_heatmap();
            create_heatmap(map_arr1);

        });
        btn2.addEventListener('click',function(){
            var ids=this.id.toString();
            var keyname=ids.substr(0,ids.length-5);
            if ((niks_list.indexOf(keyname) === -1) && (piks_list.indexOf(keyname) === -1)) {
              // console.log("element doesn't exist");
              add_nick_btn(keyname);
              niks_list.push(keyname);
            }
            else {
              console.log("element found:"+ keyname);
            }
            map_arr1=get_heatmap();
            create_heatmap(map_arr1);

        });

        div_group.appendChild(div_name);
        div_group.appendChild(btn);
        div_group.appendChild(btn2);
        li.append(div_group);
        keyword_list.append(li);

    }
}

//Input Pik Btns
function input_pick_btn() {
  var div_group=document.createElement('span');
  var ids = document.getElementById("addPik").value.toString();
  var keyname=ids.substr(0,ids.length);
  if ((piks_list.indexOf(keyname) === -1) && (niks_list.indexOf(keyname) === -1)) {
    // console.log("element doesn't exist");
    add_pick_btn(keyname);
    piks_list.push(keyname);
  }
  else {
    console.log("element found :"+keyname);
  }
  // div_group.appendChild(btn);
  // li.append(div_group);
  // keyword_list.append(li);
  $(this.previousSibling).val(function() {
      return this.defaultValue;
  });

  map_arr1=get_heatmap();
  create_heatmap(map_arr1);

}
$( "input#pluspik" ).bind( "click", input_pick_btn );

//Input Nik Btns
function input_nick_btn() {
  var div_group=document.createElement('span');
  var ids = document.getElementById("addNik").value.toString();
  var keyname=ids.substr(0,ids.length);
  if ((niks_list.indexOf(keyname) === -1) && (piks_list.indexOf(keyname) === -1)) {
    // console.log("element doesn't exist");
    add_nick_btn(keyname);
    niks_list.push(keyname);
  }
  else {
    console.log("element found :"+keyname);
  }
  // div_group.appendChild(btn);
  // li.append(div_group);
  // keyword_list.append(li);

  $(this.previousSibling).val(function() {
      return this.defaultValue;
  });

  map_arr1=get_heatmap();
  create_heatmap(map_arr1);

}
$( "#plusnik" ).bind( "click", input_nick_btn );


function add_pick_btn(keyname){
    var div_group=document.createElement('span');
    div_group.setAttribute('id',keyname+"_div");
    div_group.setAttribute('class','btn-group pik tag');
    div_group.setAttribute('role','group');
    var div_name=document.createElement('span');
    div_name.setAttribute("type","button");
    div_name.setAttribute("class","btn btn-secondary keyword keyLabel");
    div_name.innerHTML=keyname;
    var li = document.createElement("span");
    var btn=document.createElement("button");
    btn.innerHTML=" X ";
    li.setAttribute('id', keyname+"_li");
    btn.setAttribute('id',keyname+"_btn");
    btn.setAttribute('class','btn btn-secondary keyword x');
    div_group.appendChild(div_name);
    div_group.appendChild(btn);
    li.append(div_group);
    btn.addEventListener('click',function(){
        var ids=this.id.toString();
        var keyname=ids.substr(0,ids.length-4);
        var lis=keyname+"_li";
        var span_grp=keyname+"_div";
        var index=piks_list.indexOf(keyname);
        console.log(index);
        piks_list.splice(index,1);
        console.log("piks list");
        console.log(piks_list);

        $(div_group).remove();
         map_arr1=get_heatmap();
        create_heatmap(map_arr1);



    });
    pick_key_list.append(li);
}




function add_nick_btn(keyname){
    var div_group=document.createElement('span');
    div_group.setAttribute('id',keyname+"_div");
    div_group.setAttribute('class','btn-group tag nik');
    div_group.setAttribute('role','group');
    var div_name=document.createElement('span');
    div_name.setAttribute("type","button");
    div_name.setAttribute("class","btn btn-secondary keyword keyLabel");
    div_name.innerHTML=keyname;
    var li = document.createElement("span");
    var btn=document.createElement("button");
    btn.innerHTML=" X ";
    li.setAttribute('id', keyname+"_li");
    btn.setAttribute('id',keyname+"_btn");
    btn.setAttribute('class','btn btn-secondary keyword x');

    div_group.appendChild(div_name);
    div_group.appendChild(btn);
    li.append(div_group);
    btn.addEventListener('click',function(){
        var ids=this.id.toString();
        var keyname=ids.substr(0,ids.length-4);
        var lis=keyname+"_li";
        var index=niks_list.indexOf(keyname);
        niks_list.splice(index,1);
        var span_grp=keyname+"_div";
        $(div_group).remove();
        map_arr1=get_heatmap();
        create_heatmap(map_arr1);


    });
    nic_key_list.append(li);
}




var slider=document.getElementById('myRange');
// Add an event listener to our range slider
slider.addEventListener('input',function(){
    var value=slider.value;
    // console.log("Time duration");
    var class_list=this.getAttribute('Class');
    if (class_list.includes('super_short')==true){

        add_key_btns(keyword_data[value][1]);
    } else if (class_list.includes('short')==true){
        add_key_btns(keyword_data[value][5]);
    } else if (class_list.includes('medium')==true){
        add_key_btns(keyword_data[value][10]);
    } else if (class_list.includes('long')==true){
        add_key_btns(keyword_data[value][15]);
    }


});

function heatmap() {
  var x = document.getElementsByClassName("tt");
  var color;

  for (i = 0; i < x.length; i++) {

    if(x[i].innerHTML == 0) {
      color = "#5B391B";}

    if(x[i].innerHTML == 1) {
    color = "#A64E00"; }

    if(x[i].innerHTML == 2) {
      color = "#FF7700"; }

    x[i].style.backgroundColor = color;
    x[i].style.color = color;
  }
}


function short() {
  document.getElementById("myRange").className = "slider short";
  add_key_btns(keyword_data[value][5]);


}
function medium() {
  document.getElementById("myRange").className = "slider medium";
  add_key_btns(keyword_data[value][10]);

}
function long() {
  document.getElementById("myRange").className = "slider long";
  add_key_btns(keyword_data[value][15]);

}
function super_short() {
  document.getElementById("myRange").className = "slider super_short";
  add_key_btns(keyword_data[value][1]);

}
function pik() {
  document.getElementById("myRange").className = "slider pik";
}
function nik() {
  document.getElementById("myRange").className = "slider nik";
}

//toggle keyword list state
var keywordList = document.getElementsByClassName("keyword");

// for (var i = 0; i < keywordList.length; i++) {
//   var keyword = keywordList[i];
//   keyword.addEventListener('click',setColor(keyword));
// }

var count = 0;
function setColor(btn) {
  var property = document.getElementById(btn);

  if (count == 0) {
      property.style.backgroundColor = "#018D7A";
      count = 1;
  }
  else if (count == 1){
      property.style.backgroundColor = "#c63535";
      count = 2;
  }
  else {
      property.style.backgroundColor = "#000";
      property.style.color = "fff";
      count = 0;
  }
}

// Grab a handle to the video
var videoFrame = document.getElementById("video");
// Turn off the default controls
videoFrame.controls = false;

//Duration Slider Width
var durrList = document.getElementsByClassName('durr_btn');

for (var i = 0 ; i < durrList.length; i++ ) {

  var btn = durrList[i]

  if(btn.id == '1min') {
    btn.addEventListener('click',super_short);

    current_duration=1;
  } else if (btn.id == '10min') {
    btn.addEventListener('click',medium);

    current_duration=10;
  } else if (btn.id == '15min') {
    btn.addEventListener('click',long);
    current_duration=15;
  }else if (btn.id == '5min') {
    btn.addEventListener('click',short);
    current_duration=5;
  }
};



heatmap();

video.addEventListener("timeupdate", updateProgress, false);

var play = document.getElementById('playpause');
play.addEventListener('click', togglePlayPause);
//
// $('#playpause').click(togglePlayPause());

// Play pause
function togglePlayPause() {
   var playpause = document.getElementById("playpause");
   if (video.paused || video.ended) {
      playpause.title = "pause";
      playpause.className = "pause";
      video.play();
   }
   else {
      playpause.title = "play";
      playpause.className = "play";
      video.pause();
   }
}

setInterval(updateTimeStamp,1000);
setInterval(updateVideoDuration,1000);


// Update TimeStamp
function updateTimeStamp() {
  var time = video.currentTime;
  var minutes = Math.floor(time / 60);
  var formatMinutes = ("0" + parseInt(minutes)).slice(-2);
  var seconds = time - minutes * 60;
  var formatSeconds = ("0" + parseInt(seconds)).slice(-2);
  var hours = Math.floor(time / 3600);
  time = time - hours * 3600;
  // console.log(formatMinutes + ":" + formatSeconds);
  document.getElementById("currentTime").innerHTML= formatMinutes + ":" + formatSeconds;
}

//Update Video Duration
function updateVideoDuration() {
  var time = video.duration;
  var minutes = Math.floor(time / 60);
  var formatMinutes = ("0" + parseInt(minutes)).slice(-2);
  var seconds = time - minutes * 60;
  var formatSeconds = ("0" + parseInt(seconds)).slice(-2);
  var hours = Math.floor(time / 3600);
  time = time - hours * 3600;
  // console.log(formatMinutes + ":" + formatSeconds);
  document.getElementById("totalTime").innerHTML= formatMinutes + ":" + formatSeconds;
}



// Update Progress
function updateProgress() {
   var progress = document.getElementById("progress");
   var value = 0;
   if (video.currentTime > 0) {
      value = Math.floor((100 / video.duration) * video.currentTime);
   }
   progress.style.width = value + "%";
}

// Playback drag time marker
$(document).ready(function(){

var timeDrag = false;   /* Drag status */
$('#progressBar').mousedown(function(e) {
    timeDrag = true;
    updatebar(e.pageX);
});
$(document).mouseup(function(e) {
    if(timeDrag) {
        timeDrag = false;
        updatebar(e.pageX);
    }
});
$(document).mousemove(function(e) {
    if(timeDrag) {
        updatebar(e.pageX);
    }
});

//update Progress Bar control
var updatebar = function(x) {
    var progress = $('#progressBar');
    var maxduration = video.duration; //Video duraiton
    var position = x - progress.offset().left; //Click pos
    var percentage = 100 * position / progress.width();

    //Check within range
    if(percentage > 100) {
        percentage = 100;
    }
    if(percentage < 0) {
        percentage = 0;
    }

    //Update progress bar and video currenttime
    $('.timeBar').css('width', percentage+'%');
    video.currentTime = maxduration * percentage / 100;
};

});

//
// $('.colorMe td').each(function() {
//     if (!this.rowIndex) return; // skip first row
//     var customerId = this.cells[0].innerHTML;
// });
