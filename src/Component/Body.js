// src/components/Body.jsx
import React, { useEffect, useState } from "react";
import Card from "./Card";

const Body = () => {
  const [posts, setPosts] = useState([]); // expect array of children
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getRedditPosts();
  }, []);

  const getRedditPosts = async () => {
    try {
      const res = await fetch(
        "https://my-backend-api-lwf7.onrender.com/reddit"
      ); // ✅ Changed to deployed URL
      if (!res.ok) throw new Error(`Server error ${res.status}`);
      const data = await res.json();
      console.log("Fetched posts:", data);
      setPosts(data || []);
    } catch (err) {
      console.error("Error fetching Reddit posts:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Default resolution container: 1280 x 720, but responsive (max-w-full)
  return (
    <div className="min-h-screen flex items-start justify-center bg-gray-50 p-6">
      <div
        className="w-[1280px] h-[720px] max-w-full max-h-[100vh] bg-white rounded-2xl shadow-lg overflow-auto p-6"
        style={{ boxSizing: "border-box" }}
      >
        <header className="mb-4">
          <h1 className="text-2xl md:text-3xl font-bold">
            Display the JSON data from this link
          </h1>
          <p className="text-sm text-gray-500">
            Showing Title, SelfText_HTML, URL and score
          </p>
        </header>

        {loading && <div className="text-center py-8">Loading posts…</div>}
        {error && (
          <div className="text-red-600 py-4">
            Error: {error}. Make sure your backend at{" "}
            <code>http://localhost:5000</code> is running.
          </div>
        )}

        {!loading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.length === 0 && (
              <div className="col-span-full text-gray-500">No posts found.</div>
            )}
            {posts.map((postWrapper, idx) => {
              const post = postWrapper?.data || {};
              return (
                <Card
                  key={post.id || idx}
                  title={post.title}
                  selfText={post.selftext}
                  url={post.url}
                  score={post.score}
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Body;
