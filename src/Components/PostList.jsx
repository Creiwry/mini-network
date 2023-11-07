import { Link } from "react-router-dom"

/* eslint-disable */
const PostList = ({ posts }) => {
  return (
    <div>
      <h1>Posts</h1>
      {posts ? posts.map((post) => {
      return (
        <Link key={post.id} to={`/post/${post.id}`}>
          <div>
            <p>{post.attributes.user}</p>
            <p>{post.attributes.text}</p>
          </div>
        </Link>
      )}) : <p>nope :)</p>}
    </div>
  )
}

export { PostList }
