from django.shortcuts import render
from urllib2 import urlopen
from django.http import HttpResponse
import xml.etree.ElementTree as ET

def index(request):
	return render(request, 'index.html')
	
def transcribe(request, text):
	key = "023c06b3-d060-417d-96f0-44201d53f2db"
	url = "http://www.dictionaryapi.com/api/v1/references/collegiate/xml/" + text +"?key=" + key;
	xml = urlopen(url).read()
	root = ET.fromstring(xml)
	return HttpResponse(root[0][4].text)