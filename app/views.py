from django.shortcuts import render
from django.http import HttpResponse
from nltk.corpus import cmudict

def index(request):
	return render(request, 'index.html')
	
def transcribe(request, format, text):
	wordlist = text.split(" ")
	transcription = ""
	for word in wordlist:
		try:
			phonemes = cmudict.dict()[word.lower()][0]
			for e in phonemes:
				transcription += e + "-"
			transcription = transcription[:-1] + " "

		except:
			pass

	if transcription == "" and text != "":
		transcription = "invalid - try again"

	else:
		transcription = transcription[:-1]


	if format == "APA":
		pass

	return HttpResponse(transcription)