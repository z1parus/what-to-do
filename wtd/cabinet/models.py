from django.contrib.auth.models import User
from django.db import models

class Hints(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, verbose_name='ID Пользователя')
    hint_title = models.TextField(max_length=64, blank=False, null=False, verbose_name='Название заметки')
    create_date = models.DateTimeField(auto_now_add=True, verbose_name='Дата создания заметки')
    date_to = models.DateTimeField(verbose_name='Дата, когда нужно выполнить заметку', blank=True, null=True)
    is_marked = models.IntegerField(default=0, verbose_name='Пометка "Важно"')
    is_archived = models.IntegerField(default=0, verbose_name='Пометка "Архив"')
    is_completed = models.IntegerField(default=0, verbose_name='Пометка "Выполнено"')
    is_outdated = models.IntegerField(default=0, verbose_name='Пометка "Просрочено"')
    checkbox1 = models.TextField(max_length=142, blank=True, null=True, verbose_name='Подзадача №1')
    checkbox2 = models.TextField(max_length=142, blank=True, null=True, verbose_name='Подзадача №2')
    checkbox3 = models.TextField(max_length=142, blank=True, null=True, verbose_name='Подзадача №3')
    checkbox4 = models.TextField(max_length=142, blank=True, null=True, verbose_name='Подзадача №4')
    checkbox5 = models.TextField(max_length=142, blank=True, null=True, verbose_name='Подзадача №5')

    class Meta:
        verbose_name = 'Заметки'
        verbose_name_plural = 'Заметки'
        ordering = ['create_date']



