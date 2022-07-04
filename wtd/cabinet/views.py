from django.contrib.auth.decorators import login_required
from django.db.migrations import serializer
from django.http import HttpResponse, JsonResponse
from django.shortcuts import render, get_object_or_404


from datetime import datetime
from cabinet.models import *


@login_required(login_url='login')
def show_cabinet(request):
    return render(request, 'cabinet/cabinet.html')

@login_required(login_url='login')
def add_new_hint(request):
    if request.method == 'POST':
        title = request.POST['title']
        date_to = request.POST['date_to']
        cb1 = request.POST['cb1']
        cb2 = request.POST['cb2']
        cb3 = request.POST['cb3']
        cb4 = request.POST['cb4']
        cb5 = request.POST['cb5']
        user = request.user

        new_hint = Hints(hint_title=title, date_to=date_to, checkbox1=cb1, checkbox2=cb2, checkbox3=cb3, checkbox4=cb4, checkbox5=cb5, user=user)
        new_hint.save()
        return HttpResponse('OK!!!')
    else:
        return HttpResponse('not OK!')

@login_required(login_url='login')
def load_hints(request):
    user = request.user
    needed_hints = Hints.objects.filter(user_id=user).reverse()
    if request.method == 'GET':
        mainJsonDict = {}
        for h in needed_hints:

            today_date = datetime.now()
            print((h.date_to.replace(tzinfo=None) - today_date.replace(tzinfo=None)).days)

            if (h.date_to.replace(tzinfo=None) - today_date.replace(tzinfo=None)).days < 1:
                h.is_outdated = 1
                h.save()
                continue

            else:
                hintsJsonDict = {}
                hintsJsonDict["hint_title"] = h.hint_title
                hintsJsonDict["create_date"] = h.create_date.strftime("%d/%m/%Y")
                hintsJsonDict["date_to"] = h.date_to.strftime("%d %B, %Y")
                hintsJsonDict["is_marked"] = h.is_marked
                hintsJsonDict["is_archived"] = h.is_archived
                hintsJsonDict["is_completed"] = h.is_completed
                hintsJsonDict["is_outdated"] = h.is_outdated
                hintsJsonDict["cb1"] = h.checkbox1
                hintsJsonDict["cb2"] = h.checkbox2
                hintsJsonDict["cb3"] = h.checkbox3
                hintsJsonDict["cb4"] = h.checkbox4
                hintsJsonDict["cb5"] = h.checkbox5
                hintsJsonDict["id"] = h.id

                mainJsonDict[f'{hintsJsonDict["hint_title"]}'] = hintsJsonDict

        return JsonResponse(mainJsonDict)

@login_required(login_url='login')
def markHint(request):
    if request.method == "POST":
        title = request.POST["title"]
        date_to = request.POST["date_to"]
        print(date_to, '!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
        date_to = datetime.strptime(date_to, "%d %B, %Y")
        neededHint = get_object_or_404(Hints, hint_title=title, date_to=date_to)
        print(neededHint)
        neededHint.is_marked = 1
        neededHint.save()
        return HttpResponse('ok')

@login_required(login_url='login')
def unMarkHint(request):
    if request.method == "GET":
        print(request.GET)
        title = request.GET["title"]
        print(title, '!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
        date_to = request.GET["date_to"]
        date_to = datetime.strptime(date_to, "%d %B, %Y")
        print(date_to, '!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')

        neededHint = get_object_or_404(Hints, hint_title=title, date_to=date_to)

        if neededHint.is_marked == 0:
            data = 0
            return JsonResponse(0, safe=False)
        elif neededHint.is_marked == 1:
            data = 1
            return JsonResponse(1, safe=False)

    elif request.method == "POST":
        title = request.POST["title"]
        date_to = request.POST["date_to"]
        date_to = datetime.strptime(date_to, "%d %B, %Y")

        neededHint = get_object_or_404(Hints, hint_title=title, date_to=date_to)
        neededHint.is_marked = 0
        neededHint.save()
        return HttpResponse('ok')

@login_required(login_url='login')
def removeHint(request):
    if request.method == "POST":
        id = request.POST["id"]
        hint = get_object_or_404(Hints, id=id)
        hint.delete()
        return HttpResponse('ok')

@login_required(login_url='login')
def archiveHint(request):
    if request.method == "POST":
        title = request.POST["title"]
        date_to = request.POST["date_to"]
        date_to = datetime.strptime(date_to, "%d %B, %Y")
        hint = get_object_or_404(Hints, hint_title=title, date_to=date_to)
        hint.is_archived = 1
        hint.save()
        return HttpResponse('ok')

@login_required(login_url='login')
def unarchiveHint(request):
    if request.method == "GET":
        title = request.GET["title"]
        date_to = request.GET["date_to"]
        date_to = datetime.strptime(date_to, "%d %B, %Y")


        neededHint = get_object_or_404(Hints, hint_title=title, date_to=date_to)

        if neededHint.is_archived == 0:
            data = 0
            return JsonResponse(0, safe=False)
        elif neededHint.is_archived == 1:
            data = 1
            return JsonResponse(1, safe=False)

    elif request.method == "POST":
        title = request.POST["title"]
        date_to = request.POST["date_to"]
        date_to = datetime.strptime(date_to, "%d %B, %Y")

        neededHint = get_object_or_404(Hints, hint_title=title, date_to=date_to)
        neededHint.is_archived = 0
        neededHint.save()
        return HttpResponse('ok')

@login_required(login_url='login')
def editHint(request):
    if request.method == 'POST':
        hint_id = request.POST['hint_id']
        title = request.POST['title']
        date_to = request.POST['date_to']
        cb1 = request.POST['cb1']
        cb2 = request.POST['cb2']
        cb3 = request.POST['cb3']
        cb4 = request.POST['cb4']
        cb5 = request.POST['cb5']

        hint = get_object_or_404(Hints, id=hint_id)
        hint.hint_title = title
        hint.date_to = date_to
        hint.checkbox1 = cb1
        hint.checkbox2 = cb2
        hint.checkbox3 = cb3
        hint.checkbox4 = cb4
        hint.checkbox5 = cb5

        hint.save()
        return HttpResponse('ok')

@login_required(login_url='login')
def getUserEmail(request):
    if request.method == "GET":
        email = request.user.email
        return JsonResponse(email, safe=False)

@login_required(login_url='login')
def changeEmail(request):
    if request.method == "POST":
        email = request.POST['email']
        user = get_object_or_404(User, username=request.user)
        user.email = email
        user.save()
        return HttpResponse('ok')

@login_required(login_url='login')
def changePass(request):
    if request.method == "POST":
        password = request.POST['password']
        user = get_object_or_404(User, username=request.user)
        user.set_password(password)
        user.save()
        print(user.password)
        return HttpResponse('ok')

@login_required(login_url='login')
def archivefilter(request):
    if request.method == 'GET':
        user_id = request.user.id
        print(user_id)
        hints = Hints.objects.filter(user_id=user_id, is_archived=1)
        print(hints)
        mainJsonDict = {}
        for h in hints:
            hintsJsonDict = {}
            hintsJsonDict["hint_title"] = h.hint_title
            hintsJsonDict["create_date"] = h.create_date.strftime("%d/%m/%Y")
            hintsJsonDict["date_to"] = h.date_to.strftime("%d %B, %Y")
            hintsJsonDict["is_marked"] = h.is_marked
            hintsJsonDict["is_archived"] = h.is_archived
            hintsJsonDict["is_completed"] = h.is_completed
            hintsJsonDict["is_outdated"] = h.is_outdated
            hintsJsonDict["cb1"] = h.checkbox1
            hintsJsonDict["cb2"] = h.checkbox2
            hintsJsonDict["cb3"] = h.checkbox3
            hintsJsonDict["cb4"] = h.checkbox4
            hintsJsonDict["cb5"] = h.checkbox5
            hintsJsonDict["id"] = h.id

            mainJsonDict[f'{hintsJsonDict["hint_title"]}'] = hintsJsonDict

        return JsonResponse(mainJsonDict)

@login_required(login_url='login')
def outdatedFilter(request):
    if request.method == "GET":
        user_id = request.user.id
        print(user_id)
        hints = Hints.objects.filter(user_id=user_id)
        print(hints)
        mainJsonDict = {}
        for h in hints:

            today_date = datetime.now()
            print((h.date_to.replace(tzinfo=None) - today_date.replace(tzinfo=None) ).days)

            if (h.date_to.replace(tzinfo=None) - today_date.replace(tzinfo=None) ).days < 1 :
                hintsJsonDict = {}
                hintsJsonDict["hint_title"] = h.hint_title
                hintsJsonDict["create_date"] = h.create_date.strftime("%d/%m/%Y")
                hintsJsonDict["date_to"] = h.date_to.strftime("%d %B, %Y")
                hintsJsonDict["is_marked"] = h.is_marked
                hintsJsonDict["is_archived"] = h.is_archived
                hintsJsonDict["is_completed"] = h.is_completed
                hintsJsonDict["is_outdated"] = h.is_outdated
                hintsJsonDict["cb1"] = h.checkbox1
                hintsJsonDict["cb2"] = h.checkbox2
                hintsJsonDict["cb3"] = h.checkbox3
                hintsJsonDict["cb4"] = h.checkbox4
                hintsJsonDict["cb5"] = h.checkbox5
                hintsJsonDict["id"] = h.id

                mainJsonDict[f'{hintsJsonDict["hint_title"]}'] = hintsJsonDict
            else:
                continue
    return JsonResponse(mainJsonDict)

@login_required(login_url='login')
def markedFilter(request):
    if request.method == "GET":
        user_id = request.user.id
        print(user_id)
        hints = Hints.objects.filter(user_id=user_id, is_marked=1)
        print(hints)
        mainJsonDict = {}
        for h in hints:
            today_date = datetime.now()
            print((h.date_to.replace(tzinfo=None) - today_date.replace(tzinfo=None)).days)

            if (today_date.replace(tzinfo=None) - h.date_to.replace(tzinfo=None)).days < 1:
                hintsJsonDict = {}
                hintsJsonDict["hint_title"] = h.hint_title
                hintsJsonDict["create_date"] = h.create_date.strftime("%d/%m/%Y")
                hintsJsonDict["date_to"] = h.date_to.strftime("%d %B, %Y")
                hintsJsonDict["is_marked"] = h.is_marked
                hintsJsonDict["is_archived"] = h.is_archived
                hintsJsonDict["is_completed"] = h.is_completed
                hintsJsonDict["is_outdated"] = h.is_outdated
                hintsJsonDict["cb1"] = h.checkbox1
                hintsJsonDict["cb2"] = h.checkbox2
                hintsJsonDict["cb3"] = h.checkbox3
                hintsJsonDict["cb4"] = h.checkbox4
                hintsJsonDict["cb5"] = h.checkbox5
                hintsJsonDict["id"] = h.id

                mainJsonDict[f'{hintsJsonDict["hint_title"]}'] = hintsJsonDict
            else:
                continue

    return JsonResponse(mainJsonDict)

@login_required(login_url='login')
def dateToFilter(request):
    if request.method == "GET":
        user_id = request.user.id
        print(user_id)
        hints = Hints.objects.filter(user_id=user_id).order_by('-date_to')
        print(hints)
        mainJsonDict = {}
        for h in hints:
            today_date = datetime.now()
            print((h.date_to.replace(tzinfo=None) - today_date.replace(tzinfo=None)).days)

            if (today_date.replace(tzinfo=None) - h.date_to.replace(tzinfo=None) ).days < 1:
                hintsJsonDict = {}
                hintsJsonDict["hint_title"] = h.hint_title
                hintsJsonDict["create_date"] = h.create_date.strftime("%d/%m/%Y")
                hintsJsonDict["date_to"] = h.date_to.strftime("%d %B, %Y")
                hintsJsonDict["is_marked"] = h.is_marked
                hintsJsonDict["is_archived"] = h.is_archived
                hintsJsonDict["is_completed"] = h.is_completed
                hintsJsonDict["is_outdated"] = h.is_outdated
                hintsJsonDict["cb1"] = h.checkbox1
                hintsJsonDict["cb2"] = h.checkbox2
                hintsJsonDict["cb3"] = h.checkbox3
                hintsJsonDict["cb4"] = h.checkbox4
                hintsJsonDict["cb5"] = h.checkbox5
                hintsJsonDict["id"] = h.id

                mainJsonDict[f'{hintsJsonDict["hint_title"]}'] = hintsJsonDict
            else:
                continue

    return JsonResponse(mainJsonDict)