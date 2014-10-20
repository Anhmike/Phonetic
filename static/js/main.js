$("#transcribeForm #userinput").focus();

numRequests = 0;
validRequests = 0;
// remember words requested, so if user requests same word, just fetch from cache
wordcache = {};
current_word = {
	valid : true,
	ipa: "fʌnɛtɪk.mi",
	arpa: "fʌnɛtɪk.mi"
};

$("#transcribeForm").submit(function(event) {
	event.preventDefault();
	if (numRequests > 500) {
		$("#transcription p").html("you're doing that too much");
	}
	else {
		var text = $("#userinput").val();
		var url = "/transcribe/" + text
		$("#userinput").val("");
		$.ajax({
			url: url,
		}).done(function(data) {
			current_word = data;
			if (data.valid) {
				validRequests += 1;
				if ($("#IPA").hasClass("selected") == true) {
					$("#transcription p").html(data.ipa);
				} else if ($("#ARPA").hasClass("selected") == true) {
					$("#transcription p").html(data.arpa);
				}
			} else {
				numRequests += 1;
				$("#transcription p").html("invalid - try again");
			}
		});
	}
})

$("#buttons span").click(function() {
	// if not already selected and in the format button group:
	if ($(this).children("p").hasClass("selected") == false && $(this).children("p").hasClass("format")) {
		$("#buttons span p").each(function() {
			$(this).removeClass("selected");
		});
		$(this).children("p").addClass("selected");
		if ($(this).children("p").attr("id") == "IPA") {
			$("#transcription p").html(current_word.ipa);
		} else if ($(this).children("p").attr("id") == "ARPA") {
			$("#transcription p").html(current_word.arpa);
		}
	}
	$("#transcribeForm #userinput").focus();
});

$("#transcription").click(function() {
	$("#transcribeForm #userinput").focus();
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
	$("#transcription p").css("font-size", "30px");
	$("#transcription p").html("Welcome to Phonetic.me! Use this tool to turn English words into phonetics. Type a word in the box below and hit enter. Click the buttons to switch between IPA and APA (coming soon). Transciptions come from the CMU Pronouncing Dictionary. Suggestions/feedback? send me a message at nort.ryan@gmail.com");
}, 
function() {
	$("#transcription p").html(save[0]);
	$("#transcription p").css("font-size", save[1]);
});
