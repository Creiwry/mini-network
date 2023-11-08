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
            <p>{post.attributes.text}</p>
            <p>- {post.attributes.users_permissions_user.data.attributes.username}</p>
          </div>
        </Link>
      )}) : <p>nope :)</p>}
    </div>
  )
}

export { PostList }
