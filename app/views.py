from django.shortcuts import render
from urllib2 import urlopen
from django.http import HttpResponse
import xml.etree.ElementTree as ET

def index(request):
	return render(request, 'index.html')
	
def transcribe(request, format, text):
	key = "023c06b3-d060-417d-96f0-44201d53f2db"
	url = "http://www.dictionaryapi.com/api/v1/references/collegiate/xml/" + text +"?key=" + key;
	xml = urlopen(url).read()
	root = ET.fromstring(xml)
	transcription = "invalid - try again"
	for e in root[0]:
		if e.tag == "pr":
			transcription = e.text
			break

	if format == "APA":
		pass

	return HttpResponse(transcription)