import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Dashboard = () => {
  const URL = "http://127.0.0.1:8000/api/";
  const [posts, setPosts] = useState([]);

  const capitalize = (word) => {
    return word[0].toUpperCase() + word.slice(1);
  };

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(URL);
        setPosts(res.data);
      } catch (error) {
        console.log("Something went wrong");
        console.log(error);
      }
    })();
  }, []);

  if (posts.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <h1>Dashboard</h1>
      <table className="posts-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Likes</th>
            <th>Shares</th>
            <th>Comments</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <tr key={post.id}>
              <Link to={`/${post.id}`} style={{ display: "contents" }}>
                <td>{post.title}</td>
                <td>{post.author}</td>
                <td>{post.likes}</td>
                <td>{post.shares}</td>
                <td>{post.comments}</td>
                <td>{capitalize(post.status[0])}</td>
              </Link>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
