from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
import json
from datetime import datetime

@api_view(['GET'])
def index(request):
    ## Read data from data.json
    with open("data.json", "r") as f:
        data = json.load(f)

    ## Extract posts from data and calculate total likes, shares and comments
    posts = []
    for post in data["posts"]:
        scheduled = datetime.utcnow() < datetime.strptime(post["schedule"], "%Y-%m-%dT%H:%M:%SZ")
        post = {
            "id": post["id"],
            "title": post["title"],
            "author": post["author"],
            "likes": sum(entry["count"] for entry in post["likes"]),
            "shares": sum(entry["count"] for entry in post["shares"]),
            "comments": sum(entry["count"] for entry in post["comments"]),
            "status": ['draft'] if post["draft"] else ['scheduled' if scheduled else 'published', post["schedule"]],
        }
        posts.append(post)

    return Response(posts, status=status.HTTP_200_OK)