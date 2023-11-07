import { useAtomValue } from "jotai"
import { userAtom } from "./atoms"

const useAuthCurrentUser = (user) => {
  const currentUser = useAtomValue(userAtom)

  if(user === currentUser.id) {
    return true
  } else {
    return false
  }
}

export { useAuthCurrentUser }
