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
	if ($(this).children("p").hasClass("selected") == false) {
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

