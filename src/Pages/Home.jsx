import { useState } from "react";
import { useEffect } from "react";
import { PostList } from "./PostList";

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
    </div>
  )
}

export { Home }
