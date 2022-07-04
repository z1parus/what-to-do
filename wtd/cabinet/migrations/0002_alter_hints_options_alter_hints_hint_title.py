# Generated by Django 4.0.5 on 2022-07-03 16:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cabinet', '0001_initial'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='hints',
            options={'ordering': ['create_date'], 'verbose_name': 'Заметки', 'verbose_name_plural': 'Заметки'},
        ),
        migrations.AlterField(
            model_name='hints',
            name='hint_title',
            field=models.TextField(max_length=64, verbose_name='Название заметки'),
        ),
    ]
