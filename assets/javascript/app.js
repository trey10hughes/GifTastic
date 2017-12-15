$(document).ready(function (){



var animals = ["dog", "cat", "mouse"];

for (i = 0; i < animals.length; i++){
//creates initial buttons for generating gifs
var $initialButton = $("<button type='button' class='btn btn-success' data-animal='" + animals[i] + "'>" + animals[i] + "</button>");
$("#buttons").append($initialButton);

}

$("#submit").on("click", function(){

//assigning value to those variables based on what you have typed into the text box
var animal = $("#animal-input").val().trim();

//push the value of animal to the animals array
animals.push(animal);
console.log(animals);

//creates a new button to press at the top
var $newButton = $("<button type='button' class='btn btn-success' data-animal='" + animal + "'>" + animal + "</button>");

$("#buttons").append($newButton);



});//end of on click for submit button


$("#buttons").on("click", "button", function() {
	console.log("button clicked");

	var searchAnimal = $(this).attr("data-animal");
	console.log($(this).attr("data-animal"));

	//generates the url for the query using variables from earlier to fill in parameters
	var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=dc6zaTOxFJmzC&q=" + searchAnimal + "&limit=10"


	//ajax call
	$.ajax({
        	url: queryURL,
        	method: "GET"
      	}).done(function(response) {
       	//put what you want to do with the data you get off the ajax call in here

       	console.log(response);

    	var results = response.data;
		console.log(response.data);

		for (var i = 0; i < results.length; i++) {

			//dynamically creates a div to store the rating and image in
			var animalDiv = $("<div>"); 
			var p = $("<p>");
			p.text("rating: " + results[i].rating);
			var animalImage = $("<img>");


			animalImage.attr("src", results[i].images.fixed_height_still.url);
			animalImage.attr("data-still", results[i].images.fixed_height_still.url);
			animalImage.attr("data-animate", results[i].images.fixed_height.url);
			animalImage.attr("data-state", "still");
			animalImage.attr("class", "gif");

			animalDiv.append(animalImage);
			animalDiv.append(p);
			$("#gifs").prepend(animalDiv);
		}
       
      	});
	});//end of on click for dynamic buttons

$("#gifs").on("click", ".gif", function() {

        var state = $(this).attr("data-state");

        if (state === "still") {
          var dataAnimate = $(this).attr("data-animate");
          $(this).attr("src", dataAnimate);
          $(this).attr("data-state", "animate");
        } else {
          var dataStill = $(this).attr("data-still");
          $(this).attr("src", dataStill);
          $(this).attr("data-state", "still");
        }
    }); //end of on click for gifs

});//end of code	


