

var keywords = ["bugles", "breakdancing", "mozzarella", "pizza", "rainstorms", "bobcats", "lightning", "brewers", "fireworks", "burritos", "eagles", "parades", "japan", "cranes", "summer"];

var selectedKeyword = "";


function makeButtons(){
    for (var i=0; i<keywords.length; i++){
        var newBtn = $("<button class='btn btn-primary m-2 float-left'>").text(keywords[i]);
        newBtn.attr("id", keywords[i]);
        $("#btn-col").prepend(newBtn);
    }
}

makeButtons();

$(document).on("click", ".btn", function(){
    $("#gifs-col").empty();
    selectedKeyword = $(this).attr("id");
    retrieveGifs();
});

function retrieveGifs(){
    
    
    $.ajax({
        url: "https://api.giphy.com/v1/gifs/search?api_key=cDVT7MGH5kQi3g0vaQceOmMtnWwSVAFy&q=" + selectedKeyword + "&limit=10&offset=0&rating=G&lang=en",  
        method: "GET"
      }).then(function(response){
        var gifArray = response.data;
        console.log(gifArray);
        
        for (var i=0; i<gifArray.length; i++){
            console.log(i);
            var gifDiv = $("<div class='clearfloat float-left m-1'>");
            var gifP = $("<p class='giftext text-sm-left'>");
            gifP.text("Rating: " + gifArray[i].rating);
            var gifImg = $("<img class='gifImg float-left'>");
            gifImg.attr("src", gifArray[i].images.fixed_height_still.url);
            gifImg.attr("data-still", gifArray[i].images.fixed_height_still.url);   
            gifImg.attr("data-animate", gifArray[i].images.fixed_height.url);
            gifImg.attr("data-state", "still");

            gifDiv.append(gifImg);
            gifDiv.append(gifP);
            
            $("#gifs-col").append(gifDiv);
        }
    });
}

$(document).on("click", ".gifImg", function(){
    var state = $(this).attr("data-state");

    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
})







