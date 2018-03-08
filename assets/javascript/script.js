$(document).ready(function(){

var topicArray =["Houston Rockets", "Boston Celtics", "Toronto Raptors", "Golden State Warriors", "San Antonio Spurs", "Cleveland Cavaliers"];
var gifArray;


$("#addTopic").on("click", addTopic);
$(document).on("click", ".topicButton", getGiphyResponse);
$(document).on("click", ".gifs", switchAnimate);





function addTopic(){
    event.preventDefault();

    var topic = $("#topicSearch").val().trim();
    alert(topic);
    topicArray.push(topic);
    displayButtons();
}


function getGiphyResponse(){
    //

    alert("giphy ajax");
    var topicName = $(this).text();


    var topicURL = "http://api.giphy.com/v1/gifs/search?q="+topicName+"&api_key=suFibuOCECQfQLKd80Bsc61RZcjsgGVj&limit=5"


    $.ajax({
        url:topicURL,
        method: "GET"
    }).then(function(response){
        console.log(response);
        
        gifArray = response.data;

        for(var i =0; i<gifArray.length; i++){
            var gif = $("<img>");
            gif.attr({src: gifArray[i].images.fixed_height_still.url, alt:gifArray[i].title, still_url:gifArray[i].images.fixed_height_still.url,  animate_url:gifArray[i].images.fixed_height.url, status:"still"});
            gif.addClass("gifs");
            $("#gifDiv").append(gif);
        }

    });
}


function switchAnimate(){

    var clickedGIF = $(this);
    if(clickedGIF.attr("status")==="still"){
        clickedGIF.attr("src", clickedGIF.attr("animate_url"))
        clickedGIF.attr("status", "animate");
    }
    else{
        clickedGIF.attr("src", clickedGIF.attr("still_url"))
        clickedGIF.attr("status", "still");
    }


    
}

function displayButtons(){

    $("#topicArrayDisplay").empty()
    
    for(var i = 0; i<topicArray.length; i++){
        var topicDisplay=$("<button>");
        topicDisplay.addClass("topicButton");
        topicDisplay.text(topicArray[i]);
        $("#topicArrayDisplay").append(topicDisplay);
    }
}




displayButtons();


});