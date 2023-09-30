from rest_framework import serializers
from .models import Books, Users
class BookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Books
        fields = ('bookId', 'title', 'author', 'price', 'publisher', 'pubdate','img')

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Users
        fields = ('userId', 'email', 'password')
