from django.contrib.auth.models import User
from django.forms import *

class SignUpForm(ModelForm):
    password2 = CharField(widget = PasswordInput(attrs={'class': 'password2 reg-input', 'placeholder': 'Подтвердите пароль'}))

    class Meta:
        model = User
        fields = ['username', 'email', 'password']
        widgets = {
            'username': TextInput(attrs={'class': 'username reg-input', 'placeholder': 'Имя пользователя'}),
            'password': PasswordInput(attrs={'class': 'password reg-input','placeholder': 'Пароль'}),
            'email': TextInput(attrs={'class': 'emai reg-input','placeholder': 'Электронная почта'}),
        }