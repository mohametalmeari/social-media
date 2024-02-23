from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
import json

@api_view(['GET'])
def index(request):
    return Response({"message": "Hello, world!"})