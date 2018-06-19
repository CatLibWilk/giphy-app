

var keywords = ["bugles", "breakdancing", "mozzarella", "pizza", "rainstorms", "bobcats", "lightning", "brewers", "fireworks", "burritos", "eagles", "parades", "japan", "cranes", "summer"];
var selectedKeyword = "";

var searchBtn = $("button[type='submit']");
var resetBtn = $("#resetBtn");

///makes and updates buttons field
function makeButtons(){
    console.log("make run");
    $("#btn-col").empty();
    for (var i=0; i<keywords.length; i++){
        var newBtn = $("<button class='btn gifbtn btn-primary m-2 float-left'>").text(keywords[i]);
        newBtn.attr("id", keywords[i]);
        $("#btn-col").append(newBtn);
    }
}
makeButtons();

///allows for button-search-term selection
$(document).on("click", ".gifbtn", function(){
    $("#gifs-col").empty();
    selectedKeyword = $(this).attr("id");
    retrieveGifs();
});
///makes AJAX call for selected term, then generates the gifs
function retrieveGifs(){

    
    $.ajax({
        url: "https://api.giphy.com/v1/gifs/search?api_key=cDVT7MGH5kQi3g0vaQceOmMtnWwSVAFy&q=" + selectedKeyword + "&limit=10&offset=0&rating=&lang=en",  
        method: "GET"
      }).then(function(response){
        $("#gifs-col").empty();
        var gifArray = response.data;
        
        for (var i=0; i<gifArray.length; i++){
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
///toggles still and animated gifs
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
///takes inputed search term in right-side form, adds term to keywords (so button is created)
///and changes selectedKeyword to new input (allowing AJAX call based on new term), 
///then calls makeButton and retrieveGif functions to update page
searchBtn.on("click", function(e){
    e.preventDefault();

    var userTerm = $("#userTerm").val();
    $("#userTerm").val("");

    selectedKeyword = userTerm;
    keywords.push(userTerm);

    makeButtons();

    retrieveGifs();


});

///button to clear gifs area////
resetBtn.on("click", function(){
    $("#gifs-col").empty();
    makeButtons();
})