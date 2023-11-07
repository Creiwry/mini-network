import { useState } from "react";
import { useEffect } from "react";
import { PostList } from "../Components/PostList";
import { Link } from "react-router-dom";

const Home = () => {
  const url = 'http://localhost:1337/api/posts';
  const [ posts, setPosts ] = useState([]);

  const getData = async () => {
    const response = await fetch(url)
    .then(response => response.json());
    setPosts(response.data);
  }

  useEffect(() => {
    getData();
  }, [setPosts]);

  console.log(posts)
  return (
    <div>
      { posts ? <PostList posts={posts} />
        : <p>No posts</p>
    }
      <Link to="/posts/new">New Post</Link>
    </div>
  )
}

export { Home }
