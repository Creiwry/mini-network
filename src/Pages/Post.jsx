import { useParams } from "react-router-dom"

const Post = () => {
  const { id } = useParams();
  return <h1>{id}</h1>
}

export { Post }
