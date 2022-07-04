from django.contrib import admin
from django.urls import path, include

from .views import *

urlpatterns = [
    path('cabinet/', show_cabinet, name = 'cabinet'),
    path('createnewhint/', add_new_hint, name = 'addnewhint' ),
    path('loadhints/', load_hints, name = 'loadhints'),
    path('markhint/', markHint, name = 'markhint'),
    path('unmarkhint/', unMarkHint, name = 'unmarkhint'),
    path('removehint/', removeHint, name = 'removehint'),
    path('archivehint/', archiveHint, name = 'archiveHint'),
    path('unarchivehint/', unarchiveHint, name = 'unarchiveHint'),
    path('edithint/', editHint, name = 'editHint'),
    path('getemailurl/', getUserEmail, name = 'getuseremail'),
    path('changeemail/', changeEmail, name = 'changeemail'),
    path('changepass/', changePass, name = 'changepass'),
    path('archivefilter/', archivefilter, name = 'archivefilter'),
    path('outdatedfilter/', outdatedFilter, name = 'outdatedfilter'),
    path('markedfilter/', markedFilter, name = 'markedfilter'),
    path('datetofilter/', dateToFilter, name = 'datetofilter'),
]