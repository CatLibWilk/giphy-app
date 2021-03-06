

var keywords = ["bugles", "breakdancing", "mozzarella", "pizza", "rainstorms", "bobcats", "lightning", "brewers", "fireworks", "burritos", "eagles", "parades", "japan", "cranes", "summer"];
var selectedKeyword = "";

var searchBtn = $("button[type='submit']");
var resetBtn = $("#resetBtn");

///makes and updates buttons field
function makeButtons(){
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
            var favBtn = $("<button class='favBtn btn btn-warning float-left'>");
            favBtn.text("add to Favs");
            favBtn.attr("data-still", gifArray[i].images.fixed_height_still.url);   
            favBtn.attr("data-animate", gifArray[i].images.fixed_height.url);
            favBtn.attr("data-state", "still");

            gifImg.attr("src", gifArray[i].images.fixed_height_still.url);
            gifImg.attr("data-still", gifArray[i].images.fixed_height_still.url);   
            gifImg.attr("data-animate", gifArray[i].images.fixed_height.url);
            gifImg.attr("data-state", "still");

            gifDiv.append(gifImg);
            gifDiv.append(gifP);
            gifDiv.append(favBtn);
            
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

///button to clear favs area////
resetBtn.on("click", function(){
    $("#fav-col").empty();
    makeButtons();
})

///adds selected gifs to favorites section
$(document).on("click", ".favBtn", function(){
    var state = $(this).attr("data-state");
    var still = $(this).attr("data-still");
    var animate = $(this).attr("data-animate");

    var favDiv = $("<div class='mb-2'>");
    var favImg = $("<img class='gifImg img-fluid favImg'>");
    favImg.attr("src", still);
    favImg.attr("data-state", state);
    favImg.attr("data-still", still);
    favImg.attr("data-animate", animate);
    favDiv.append(favImg);
    $("#fav-col").append(favDiv);

});