import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Chart from "./Chart";

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
      <Link to="/">Back to Dashboard</Link>
      <div>
        <h2>{post.title}</h2>
        <p>{post.author}</p>
      </div>
      <div style={{ width: '900px' }}>
        <Chart
          interactions={[
            {
              name: "Likes",
              stats: post.last_seven_days_interactions.likes,
              color: "rgba(75,192,0,1)",
            },
            {
              name: "Shares",
              stats: post.last_seven_days_interactions.shares,
              color: "rgba(75,0,192,1)",
            },
            {
              name: "Comments",
              stats: post.last_seven_days_interactions.comments,
              color: "rgba(0,192,192,1)",
            },
          ]}
        />
      </div>
      <div>
        <p>{post.description}</p>
        <img src={post.imageUrl} alt={post.title} />
      </div>
    </div>
  );
};

export default Detail;
