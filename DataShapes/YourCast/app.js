
var keyword_list=$('.keywordlist');
var pick_key_list=$('.piks_list');
var nic_key_list=$('.niks_list');

var default_duration=10;
var current_duration=10;
var interval = 2;
var time = 1953.56;
var piks_list=[];
var niks_list=[];
var table=$('#heatmap');
var style = document.querySelector('[data="test"]');

var maxTSZone = $.map(keyword_data[interval], function(n, i) { return i; }).length;
document.getElementById("myRange").max = maxTSZone-1;
var value = document.getElementById("myRange").value
add_key_btns(keyword_data[interval][value])


// var map_arr=[6, 3, 10, 6, 10, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6,
//         6, 6, 6, 5, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6,
//         6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 10, 6, 6, 6, 6, 10,
//         6, 6, 6, 10, 10, 6, 6, 6, 10, 10, 10, 10, 6, 6, 6, 6, 6, 10, 6, 6, 6, 6, 6,
//         6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 10
//         ];


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
    if (ratio) {
      var num=10/ratio;
      for (var i = 0; i < arr.length; i++ ) {
          arr[i] = Math.round( arr[i] *num);
      }
    }
    return arr
}

function get_heatmap(){
    sum= new Array(kdf_data[Object.keys(kdf_data)[0]].length).fill(0.0);
    // if(piks_list.length>0){
    console.log(kdf_data[Object.keys(kdf_data)[0]].length)
        for (var i = piks_list.length - 1; i >= 0; i--) {
            console.log(piks_list[i]);
            hm_data=get_hm_data(piks_list[i]);
            console.log('heat map');
            console.log(hm_data);
            if (hm_data) {
              for (var j = 0;j<hm_data.length;j++) {
                console.log(sum[j])
                sum[j]=sum[j]+hm_data[j];
              }
            }
        }
        console.log("After piks add");
        console.log(sum);
        for (var i = niks_list.length - 1; i >= 0; i--) {
            hm_data=get_hm_data(niks_list[i]);
            if (hm_data) {
              for (var j = 0;j<hm_data.length;j++) {
                sum[j]=sum[j]-hm_data[j];
              }
            }
        }
        console.log("After niks add");
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
        if (map_arr[i] > 0) {
          td.style.backgroundColor = "rgb(255,100,0)";
          td.style.color = "rgb(255,100,0)";
          td.style.opacity = map_arr[i]+0.2;    
        }
        else if (map_arr[i] < 0) {
          td.style.backgroundColor = "rgb(0,100,255)";
          td.style.color = "rgb(0,100,255)";
          td.style.opacity = -map_arr[i]+0.2;    
        }
        else {
          td.style.opacity=0;
        }
        td.style.width="1px";
        td.innerHTML=".";
        tr.appendChild(td);
    }
    table.append(tr);
}

var map_arr=new Array(maxTSZone).fill(0);
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
    if (keyname) {
      console.log("element added to piks list");
      add_pick_btn(keyname);
      piks_list.push(keyname);
      $(this.previousSibling).val(function() {
        return this.defaultValue;
      });
      map_arr1=get_heatmap();
      create_heatmap(map_arr1);
    }
    else {
      console.log('empty pik!')
    }
  }
  else {
    console.log("element found :"+keyname);
  }
  // div_group.appendChild(btn);
  // li.append(div_group);
  // keyword_list.append(li);
}
$( "input#pluspik" ).bind( "click", input_pick_btn );

//Input Nik Btns
function input_nick_btn() {
  var div_group=document.createElement('span');
  var ids = document.getElementById("addNik").value.toString();
  var keyname=ids.substr(0,ids.length);
  if ((niks_list.indexOf(keyname) === -1) && (piks_list.indexOf(keyname) === -1)) {
    if (keyname) {
    // console.log("element doesn't exist");
      add_nick_btn(keyname);
      niks_list.push(keyname);
    }
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
    console.log(value);
    add_key_btns(keyword_data[interval][value]);
});

function change_slider_size() {
  var pix_per_sec = 450 / video.duration
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

// Grab a handle to the video
var videoFrame = document.getElementById("video");
// Turn off the default controls
videoFrame.controls = false;

$('.btn').on('click',function(e){
  var temp = parseInt(this.getAttribute("name"));
  if (temp) {
    current_duration = temp;
    interval = Math.floor(current_duration/5);
    maxTSZone = $.map(keyword_data[interval], function(n, i) { return i; }).length;
    
    // Let range stay in same position after size change.
    var OldMax = document.getElementById("myRange").max;
    var OldMin = 0;
    var NewMax = maxTSZone-1;
    var NewMin = 0;
    var value = document.getElementById("myRange").value
    var OldValue = value
    var NewValue = Math.round((((OldValue - OldMin) * (NewMax - NewMin)) / (OldMax - OldMin)) + NewMin)

    document.getElementById("myRange").max = maxTSZone-1;
    document.getElementById("myRange").value = NewValue
    style.innerHTML = ".slider::-webkit-slider-thumb { width: " + (60*current_duration*450)/time + "px !important; } .slider::-moz-range-thumb { width: " + (60*current_duration*450)/time + "px !important; }  ";
    add_key_btns(keyword_data[interval][NewValue])
  }
})

/* heatmap(); */

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
  time = video.duration;
  style.innerHTML = ".slider::-webkit-slider-thumb { width: " + (60*current_duration*450)/time + "px !important; } .slider::-moz-range-thumb { width: " + (60*current_duration*450)/time + "px !important; }  ";
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
      value = ((100 / video.duration) * video.currentTime);
   }
   progress.style.width = value*450/100 + "px";
   console.log(progress.style.width)
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
