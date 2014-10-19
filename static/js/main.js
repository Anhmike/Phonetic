$("#transcribeForm #userinput").focus();

$("#transcribeForm").submit(function(event) {
	event.preventDefault();
	var text = $("#userinput").val();
	var format = 'IPA'
	if ($("#APA").hasClass("selected") == true) {
		format = 'APA'
	}
	var url = "/transcribe/" + format + "/" + text
	$("#userinput").val("");
	$.ajax({
		url: url,
	}).done(function(data) {
		$("#transcription p").html(data);
	});

})

$("#buttons span").click(function() {
	if ($(this).children("p").hasClass("selected") == false && $(this).children("p").hasClass("format")) {
		$("#buttons span p").each(function() {
			$(this).removeClass("selected");
		});
		$(this).children("p").addClass("selected");
	}
});

$(function(){
	var $window = $(window);
	winHeight = $window.height();
	$("#transcription").height(winHeight/2);
	$("#transcribeForm").height(winHeight/2);
   
	$(window).resize(function(){
		winHeight = $window.height();
		$("#transcription").height(winHeight/2);
		$("#transcribeForm").height(winHeight/2);
	});
});

var save;
$("#help").hover(function() {
	save = [$("#transcription p").html(),$("#transcription p").css("font-size")];
	$("#transcription p").css("font-size", "40px");
	$("#transcription p").html("Welcome to Phonetic.me! Use this tool to turn English words into phonetics. Type a word in the box below and hit enter. Click the buttons to switch between IPA and APA (coming soon).");
}, 
function() {
	$("#transcription p").html(save[0]);
	$("#transcription p").css("font-size", save[1]);
});
