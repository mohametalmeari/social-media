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

@api_view(['GET'])
def post_detail(request, id):
    ## Read data from data.json
    with open("data.json", "r") as f:
        data = json.load(f)

    ## Find post with given id
    post = next((post for post in data["posts"] if post["id"] == id), None)

    ## Calculate daily likes for the last 7 days
    daily_likes = [0, 0, 0, 0, 0, 0, 0]
    for stat in post['likes']:
        days_difference = (datetime.now() - datetime.strptime(stat['date'], "%Y-%m-%dT%H:%M:%SZ")).days
        if days_difference < 7:
            daily_likes[days_difference] += stat['count']

    ## Calculate daily shares for the last 7 days
    daily_shares = [0, 0, 0, 0, 0, 0, 0]
    for stat in post['shares']:
        days_difference = (datetime.now() - datetime.strptime(stat['date'], "%Y-%m-%dT%H:%M:%SZ")).days
        if days_difference < 7:
            daily_shares[days_difference] += stat['count']

    ## Calculate daily comments for the last 7 days
    daily_comments = [0, 0, 0, 0, 0, 0, 0]
    for stat in post['comments']:
        days_difference = (datetime.now() - datetime.strptime(stat['date'], "%Y-%m-%dT%H:%M:%SZ")).days
        if days_difference < 7:
            daily_comments[days_difference] += stat['count']
        
    ## Extract post details and calculate total likes, shares and comments
    scheduled = datetime.utcnow() < datetime.strptime(post["schedule"], "%Y-%m-%dT%H:%M:%SZ")
    post = {
        "id": post["id"],
        "title": post["title"],
        "author": post["author"],
        "description": post["description"],
        "imageUrl": post["imageUrl"],
        "last_seven_days_interactions": {
            "likes": daily_likes,
            "shares": daily_shares,
            "comments": daily_comments,
        },
        "likes": sum(entry["count"] for entry in post["likes"]),
        "shares": sum(entry["count"] for entry in post["shares"]),
        "comments": sum(entry["count"] for entry in post["comments"]),
        "status": ['draft'] if post["draft"] else ['scheduled' if scheduled else 'published', post["schedule"]],
    }
    if post is None:
        return Response({"error": "Post not found"}, status=status.HTTP_404_NOT_FOUND)
    
    return Response(post, status=status.HTTP_200_OK)