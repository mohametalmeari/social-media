import { useEffect } from "react";
import axios from 'axios';

const Dashboard = () => {
  const URL = "http://127.0.0.1:8000/api/";
  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get(URL);
      return res.data;
    };
    const posts = fetchPosts();
    console.log(posts);
  }, []);
  return (
    <div>
      <h1>Dashboard</h1>
    </div>
  );
};

export default Dashboard;
