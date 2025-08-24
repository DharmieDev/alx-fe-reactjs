// PostsComponent.jsx
import React from "react";
import { useQuery } from "@tanstack/react-query";

// Function to fetch data
const fetchPosts = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  if (!res.ok) {
    throw new Error("Network response was not ok");
  }
  return res.json();
};

function PostsComponent() {
  // useQuery hook handles fetching, caching, and updating
  const { data, error, isLoading, isError, refetch } = useQuery({
    queryKey: ["posts"], // unique key for caching
    queryFn: fetchPosts, // function to fetch data
    staleTime: 10000, // fresh for 10 seconds
    cacheTime: 60000, 
  });

  if (isLoading) {
    return <p>Loading posts...</p>;
  }

  if (isError) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div>
      <button
        onClick={() => refetch()}
        className="mb-4 p-2 bg-blue-500 text-white rounded"
      >
        Refetch Posts
      </button>

      <ul>
        {data.slice(0, 10).map((post) => (
          <li key={post.id} className="border p-2 mb-2 rounded">
            <h2 className="font-bold">{post.title}</h2>
            <p>{post.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PostsComponent;
