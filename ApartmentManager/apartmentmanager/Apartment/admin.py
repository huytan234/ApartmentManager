from django.contrib import admin
from django.template.response import TemplateResponse

from .models import User, Service, Bill, ResidentFamily, TuDo, Package, Feedback, Survey, \
    SurveyQuestion, SurveyAnswer, Notification
from django import forms
from ckeditor_uploader.widgets import CKEditorUploadingWidget
from django.utils.html import mark_safe
from django.urls import path
from django.db.models import Count, Sum


class MyCourseAdminSite(admin.AdminSite):
    site_header = 'Quản lí chung cư'


admin_site = MyCourseAdminSite(name='MyAdmin')


class MyUserSite(admin.ModelAdmin):
    list_display = ['id', 'first_name', 'last_name', 'email', 'username', 'password', 'avatar', 'role']
    search_fields = ['username', 'description']


class MyServiceSite(admin.ModelAdmin):
    list_display = ['id', 'name', 'description', 'price']
    search_fields = ['name', 'description']


class MyBillSite(admin.ModelAdmin):
    list_display = ['id', 'user', 'name', 'status']
    search_fields = ['name']


admin_site.register(User, MyUserSite)
admin_site.register(Service, MyServiceSite)
admin_site.register(Bill, MyBillSite)
admin_site.register(ResidentFamily)
admin_site.register(TuDo)
admin_site.register(Package)
admin_site.register(Feedback)
admin_site.register(Survey)
admin_site.register(SurveyQuestion)
admin_site.register(SurveyAnswer)
admin_site.register(Notification)
