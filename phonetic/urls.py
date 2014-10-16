from django.conf.urls import patterns, include, url
from app import views
from django.contrib import admin

admin.autodiscover()

urlpatterns = patterns('',
    url(r'^$', views.index, name='index'),

)
