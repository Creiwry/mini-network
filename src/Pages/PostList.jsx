import { Link } from "react-router-dom"

const PostList = ({ posts }) => {

  return (
    <div>
      <h1>Posts</h1>
      {posts.map((post) => {
      return (
        <Link key={post.id} to={`/post/${post.id}`}>
          <div>
            <p>{post.attributes.user}</p>
            <p>{post.attributes.text}</p>
          </div>
        </Link>
      )})}
    </div>
  )
}

export { PostList }
