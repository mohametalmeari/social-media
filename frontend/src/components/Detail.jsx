import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Chart from "./Chart";

const Detail = () => {
  const { id } = useParams();
  const URL = "http://127.0.0.1:8000/api/";
  const [post, setPost] = useState();
  const [selectedStatus, setSelectedStatus] = useState("");

  const handleDropdownChange = (event) => {
    setSelectedStatus(event.target.value);
  };

  const capitalize = (word) => {
    return word[0].toUpperCase() + word.slice(1);
  };

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
      <Link className="back-link" to="/">
        Back to Dashboard
      </Link>
      <h1 className="page-title">Post Detail</h1>
      <div>
        <h2 style={{ marginBottom: "1rem", fontWeight: "normal" }}>
          <span>{post.title}</span>{" "}
          <span style={{ fontStyle: "italic" }}>by {post.author}</span>
        </h2>
      </div>
      <div style={{ width: "900px", alignSelf: "center", margin: "2rem 0" }}>
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
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          marginBottom: "2rem",
        }}
      >
        <h3 style={{ marginBottom: "1rem" }}>Description</h3>
        <p style={{ marginBottom: "2rem" }}>{post.description}</p>
        <img
          style={{ width: "70%", margin: "auto" }}
          src={post.imageUrl}
          alt={post.title}
        />
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <h3 style={{ marginBottom: "1rem" }}>Status</h3>
        <div style={{ marginBottom: "1rem", display: "flex", gap: "1rem" }}>
          <span>{capitalize(post.status[0])}</span>

          <select
            className="select-field"
            name="status"
            value={selectedStatus}
            onChange={handleDropdownChange}
          >
            <option value="">Change</option>
            {post.status[0] !== "draft" && (
              <option value="draft">to Draft</option>
            )}
            {post.status[0] !== "published" && (
              <option value="publish">to Publish</option>
            )}
            {post.status[0] !== "scheduled" && (
              <option value="schedule">to Schedule</option>
            )}
          </select>

          {selectedStatus === "schedule" && (
            <input className="select-field" type="date" name="selectedDate" />
          )}
          {selectedStatus !== "" && (
            <button style={{ padding: "0 1rem", cursor: "pointer" }}>
              Submit
            </button>
          )}
        </div>
        {post.status[0] !== "draft" && (
          <p style={{ marginBottom: "1rem" }}>
            Data: {post.status[1].slice(0, 10)}
          </p>
        )}
      </div>
    </div>
  );
};

export default Detail;
