const PostList = ({ posts }) => {

  return (
    <div>
      <h1>Posts</h1>
      {posts.map((post) => {
      return (
          <div key={post.id}>
            <p>{post.attributes.text}</p>
          </div>
      )})}
    </div>
  )
}

export { PostList }
