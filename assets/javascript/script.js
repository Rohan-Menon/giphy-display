$(document).ready(function(){

var topicArray =["Houston Rockets", "Boston Celtics", "Toronto Raptors", "Golden State Warriors", "San Antonio Spurs", "Cleveland Cavaliers"];


$("#addTopic").on("click", addTopic);
$(document).on("click", ".topicButton", getGiphyResponse);
$(document).on("click", ".gifs", switchAnimate);





function addTopic(){
    event.preventDefault();

    var topic = $("#topicSearch").val().trim();
    // $("#topicSearch").val().empty();
    topicArray.push(topic);
    displayButtons();
}


function getGiphyResponse(){
    
    $("#displayDiv").empty();
    var topicName = $(this).text();


    var topicURL = "http://api.giphy.com/v1/gifs/search?q="+topicName+"&api_key=suFibuOCECQfQLKd80Bsc61RZcjsgGVj&limit=100"


    $.ajax({
        url:topicURL,
        method: "GET"
    }).then(function(response){
        $("#gifSection").empty();
        var results = response.data;
        console.log(results);
        var gifArray= [];

        for(var i=0; i<10; i++){
            var randomIndex = Math.floor(Math.random()*results.length);
            gifArray.push(results[randomIndex]);
            console.log(results[randomIndex]);
            results.splice(randomIndex, 1);
            
            
            
        }




        // gifArray = response.data;
        var gifRow = $("<div class=row>");
        for(var i =0; i<gifArray.length; i++){

            var gifCol=$("<div class='col-xs-3'>");

            var rating = $("<p class='ratings text-center'>");

            rating.text(gifArray[i].rating);

            gifCol.append(rating);

            var gif = $("<img>");
            gif.attr({src: gifArray[i].images.fixed_height_still.url, alt:gifArray[i].title, still_url:gifArray[i].images.fixed_height_still.url,  animate_url:gifArray[i].images.fixed_height.url, status:"still"});
            gif.addClass("gifs");

            gifCol.append(gif);

            gifRow.append(gifCol);

            if(((i+1)%3)===0)
            {
                $("#gifSection").append(gifRow);
                gifRow=$("<div class='row'>");
            }
            else if(i===(gifArray.length-1))
            {
                $("#gifSection").append(gifRow);

            }
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