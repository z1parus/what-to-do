from django.shortcuts import render, redirect

from usersys.forms import *


def index(request):
    return render(request, 'usersys/index.html')

def signup(request):

    if request.method != 'POST':
        form = SignUpForm()
        context = {
            'form':form,
        }
        return render(request, 'usersys/registration.html', context=context)
    elif request.method == 'POST':
        form = SignUpForm(request.POST)
        if form.is_valid():
            username = request.POST['username']
            email = request.POST['email']
            if request.POST['password'] == request.POST['password2']:
                password = request.POST['password']
                new_user = User(username=username, email=email)
                new_user.set_password(password)
                new_user.save()
                return redirect('login')
            else:
                return redirect('signup')

        else:
            return redirect('signup')
