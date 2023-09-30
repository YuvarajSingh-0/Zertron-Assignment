from django.http import JsonResponse
from .models import Books
from .serializers import BookSerializer
from rest_framework.decorators import api_view
from django.http import HttpResponse
import jwt
from .models import Users
from dotenv import load_dotenv
import os
load_dotenv()

@api_view(['GET'])
def getBooks(request):
    print(request)
    books = Books.objects.all()
    serializer = BookSerializer(books, many=True)
    print(serializer.data)
    return JsonResponse({'books':serializer.data}, safe=False)

@api_view(['POST'])
def login(request):
    # print(request.COOKIES)
    if request.method == 'POST':
        email,password=request.data['email'],request.data['password']
        print(email,password)
        user=Users.objects.filter(email=email,password=password)
        print(user)
        token=jwt.encode(request.data, os.environ.get('JWT_SECRET'), algorithm='HS256')
        response = HttpResponse('success')
        response.set_cookie('token', token, expires=None, path='/', httponly=False, samesite='None', secure=True)  # Modify settings as needed
        response['Access-Control-Allow-Origin'] = '*'  # Replace with your React app URL
        response['Access-Control-Allow-Credentials'] = 'true'
        return response

@api_view(['GET'])
def logout(request):
    if request.method == 'GET':
        if 'token' in request.COOKIES:
            request.COOKIES['token'] = None
            response = HttpResponse('success')
            response.set_cookie('token', None, expires=-1 , path='/', httponly=False, samesite='None', secure=True)  # Modify settings as needed
            return response
        else:
            response = HttpResponse('Something went wrong')
            return response
    
@api_view(['GET']) 
def checkAuth(request):
    if request.method == 'GET':
        # print(request.COOKIES)
        if 'token' in request.COOKIES:
            token = request.COOKIES['token']
            try:
                token_decode=jwt.decode(token, 'secret', algorithms=['HS256'])
                # print(token_decode)
                return HttpResponse('Authorized')
            except:
                print('error')
                return HttpResponse('Unauthorized')
        else:
            print("else")
            return HttpResponse('Unauthorized')