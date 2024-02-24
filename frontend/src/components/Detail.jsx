import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Detail = () => {
  const { id } = useParams();
  const URL = "http://127.0.0.1:8000/api/";
  const [post, setPost] = useState();

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(`${URL}${id}`);
        setPost(res.data);
      } catch (error) {
        console.log("Something went wrong");
        console.log(error);
      }
    })();
  }, []);

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <h1>Post Detail</h1>
      <div>
        <h2>{post.title}</h2>
        <p>{post.author}</p>
      </div>
      <div>
        Chart
      </div>
      <div>
        <p>{post.description}</p>
        <img src={post.imageUrl} alt={post.title} />
      </div>

    </div>
  );
};

export default Detail;
