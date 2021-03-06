# Generated by Django 3.0.5 on 2021-04-16 11:14

from django.db import migrations, models
import djongo.models.fields
import login.models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Companies',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('busiNo', models.CharField(max_length=250)),
                ('coNm', models.CharField(max_length=250)),
                ('coAddr', models.CharField(max_length=250)),
                ('superRegionCd', models.IntegerField()),
                ('superRegionNm', models.CharField(max_length=250)),
                ('regionCd', models.IntegerField()),
                ('regionNm', models.CharField(max_length=250)),
                ('x', models.CharField(max_length=250)),
                ('y', models.CharField(max_length=250)),
                ('superIndTpCd', models.CharField(max_length=250)),
                ('superIndTpNm', models.CharField(max_length=250)),
                ('indTpCd', models.CharField(max_length=250)),
                ('indTpNm', models.CharField(max_length=250)),
                ('coMainProd', models.CharField(max_length=250)),
                ('coHomePage', models.CharField(max_length=250)),
                ('alwaysWorkerCnt', models.CharField(max_length=250)),
                ('sgBrandNm', djongo.models.fields.ArrayField(model_container=login.models.Certified, model_form_class=login.models.CertifiedForm)),
                ('recruitment', models.BooleanField(default=False)),
                ('info', djongo.models.fields.ArrayField(model_container=login.models.Info, model_form_class=login.models.InfoForm)),
            ],
            options={
                'db_table': 'Companies',
            },
        ),
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('social_login_id', models.CharField(max_length=250)),
                ('email', models.EmailField(max_length=254)),
                ('platform', models.CharField(default=0, max_length=250)),
                ('cofavorate', djongo.models.fields.ArrayField(model_container=login.models.Favorate, model_form_class=login.models.FavorateFrom)),
            ],
            options={
                'db_table': 'User',
            },
        ),
    ]
