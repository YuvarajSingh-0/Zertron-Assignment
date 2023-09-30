from django.db import models

# Create your models here.

class Books(models.Model):
    bookId = models.AutoField(primary_key=True)
    title = models.CharField(max_length=100)
    img= models.CharField(max_length=500)
    author = models.CharField(max_length=100)
    price = models.IntegerField()
    publisher = models.CharField(max_length=100)
    pubdate = models.DateField()
    def __str__(self):
        return self.title

class Users(models.Model):
    userId = models.AutoField(primary_key=True)
    email = models.CharField(max_length=100)
    password = models.CharField(max_length=100)
    def __str__(self):
        return self.email