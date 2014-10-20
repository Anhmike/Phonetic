from django.shortcuts import render
from django.http import HttpResponse
from nltk.corpus import cmudict
import nltk
import os

nltk.data.path = [os.path.join((os.path.dirname(os.path.dirname(__file__))),"cmudict")]

ipadict = {
	# vowels
	"AO" : "\u0254",
	"AA" : "\u0061",
	"IY" : "\u0069",
	"UW" : "\u0075",
	"EH" : "\u025B",
	"IH" : "\u026A",
	"UH" : "\u028A",
	"AH" : "\u028C",
	"AX" : "\u0259",
	"AE" : "\u00E6",
	# diphthongs
	"EY" : "\u0065\u026A",
	"AY" : "\u0061\u026A",
	"OW" : "\u006F\u028A",
	"AW" : "\u0061\u028A",
	"OY" : "\u0254\u026A",
	# R-colored vowels
	"ER" : "\u0259\u0072",
	"AXR" : "\u0259\u0072",
	# Consonants
	#   Stops
	"P" : "\u0070",
	"B" : "\u0062",
	"T" : "\u0074",
	"D" : "\u0064",
	"K" : "\u006B",
	"G" : "\u0067",
	#   Affricates
	"CH" : "\u0074\u0283",
	"JH" : "\u0064\u0292",
	#   Fricatives
	"F" : "\u0066",
	"V" : "\u0076",
	"TH" : "\u03B8",
	"DH" : "\u00F0",
	"S" : "\u0073",
	"Z" : "\u007A",
	"SH" : "\u0283",
	"ZH" : "\u0292",
	"HH" : "\u0068",
	#   Nasals
	"M" : "\u006D",
	"EM" : "\u006D",
	"N" : "\u006E",
	"EN" : "\u006E",
	"NG" : "\u014B",
	"ENG" : "\u014B",
	#   Liquids
	"L" : "\u006C",
	"EL" : "\u0259\u006C",
	"R" : "\u0072",
	"DX" : "\u0072",
	"NX" : "\u0072",
	#   Semivowels
	"Y" : "\u006A",
	"W" : "\u0077",
	"Q" : "\u0294",
}

def index(request):
	return render(request, 'index.html')
	
def transcribe(request, format, text):
	wordlist = text.split(" ")
	transcription = ""
	for word in wordlist:
		try:

			phonemes = cmudict.dict()[word.lower()][0]

			# ARPABET
			if format == "ARPA":
				for e in phonemes:
					transcription += e + "-"
				transcription = transcription[:-1] + " "

			# IPA
			elif format == "IPA":

				# remove stress numbers
				for i, p in enumerate(phonemes):
					if p[-1] in ['0','1','2']:
						phonemes[i] = p[:-1]

				# replace with ipa characters
				phonemes = [ipadict[p] for p in phonemes]
				for e in phonemes:
					transcription += e
				transcription += ' '

				# convert to unicode
				transcription =  transcription.decode('unicode-escape')	

		except:
			pass

	if transcription == "" and text != "":
		transcription = "invalid - try again"

	else:
		transcription = transcription[:-1]

	return HttpResponse(transcription)