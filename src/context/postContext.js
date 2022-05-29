import { createContext, useContext, useEffect, useState } from 'react'
import {
  getPostsRequest,
  deletePostRequest,
  createPostRequest,
  getPostRequest,
  updatePostRequest,
} from '../api/posts'

const postContext = createContext()

export const usePosts = () => {
  const context = useContext(postContext)
  if (!context) throw new Error('Post Provider is missing')
  return context
}

export const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState([])
  const [sortType, setSortType] = useState('title')

  useEffect(() => {
    const sortArray = (type) => {
      const types = {
        '': '',
        count: 'count',
      }
      const sortProperty = types[type]

      let sorted = [...posts].sort((a, b) => {
        if (a.title < b.title) {
          return -1
        } else if (a.title > b.title) {
          return 1
        }

        if (a.count > b.count) {
          return 1
        } else if (a.count < b.count) {
          return -1
        } else {
          return 0
        }
      })
      if (sortType) {
        sorted = [...sorted].sort((a, b) => {
          var tA = typeof a[sortProperty]
          var tB = typeof b[sortProperty]
          if (tA === tB && tA === 'string') {
            return a[sortProperty].localeCompare(b[sortProperty])
          } else if (tA === tB && tA === 'number') {
            return a[sortProperty] - b[sortProperty]
          } else {
            return tA === 'string' ? -1 : 1
          }
        })
      }

      setData(sorted)
      console.log(sorted)
    }
    sortArray(sortType)
  }, [sortType, posts])

  ////////////////////////////////////////////////////////////////////

  useEffect(() => {
    ;(async () => {
      const res = await getPostsRequest()
      setPosts(res.data)
      setLoading(false)
    })()
  }, [])

  // useEffect(() => {
  //   fetchPosts()
  // }, [])

  // //Fetch product
  // const fetchPosts = async () => {
  //   // setTimeout(async () => {
  //   const response = await fetch(`/posts/?_sort=id&_order=desc`)
  //   const data = await response.json()
  //   setPosts(data)
  //   setLoading(false)
  //   // }, 500)
  // }

  ////////////////////////////////////////////////////////////////////

  const deletePost = async (id) => {
    await deletePostRequest(id)
    setPosts(posts.filter((post) => post.id !== id))
  }

  // const deletePost = async (id) => {
  //   await fetch(`/posts/${id}`, { method: 'DELETE' })
  //   setPosts(posts.filter((post) => post.id !== id))
  // }

  ////////////////////////////////////////////////////////////////////

  const createPost = async (post) => {
    try {
      const res = await createPostRequest(post)
      setPosts([...posts, res.data])
    } catch (error) {
      console.error(error)
    }
  }

  // const createPost = async (post) => {
  //   const response = await fetch('/posts', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify(post),
  //   })
  //   const data = await response.json()
  //   setPosts([data, ...posts])
  // }

  ////////////////////////////////////////////////////////////////////

  const getPost = async (id) => {
    try {
      const res = await getPostRequest(id)
      return res.data
    } catch (error) {
      console.error(error)
    }
  }

  // const getPost = async (id) => {
  //   const response = await fetch(`/posts/${id}`, { method: 'GET' })
  //   return response.json()
  // }

  ////////////////////////////////////////////////////////////////////

  const updatePost = async (id, post) => {
    try {
      // const res = await updatePostRequest(id, post)
      // const data = res.data
      // setPosts(posts.map((post) => (post.id === data.id ? data : post)))
      const res = await updatePostRequest(id, post)
      setPosts(posts.map((post) => (post.id === res.data.id ? res.data : post)))
    } catch (error) {
      console.error(error)
    }
  }

  // const updatePost = async (id, post) => {
  //   const response = await fetch(`/posts/${id}`, {
  //     method: 'PUT',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify(post),
  //   })
  //   const data = await response.json()
  //   setPosts(posts.map((item) => (item.id === data.id ? data : item)))
  // }
  ////////////////////////////////////////////////////////////////////

  return (
    <postContext.Provider
      value={{
        posts,
        loading,
        deletePost,
        createPost,
        getPost,
        updatePost,
        data,
        setSortType,
      }}
    >
      {/* value={{
        posts,
        deletePost,
        createPost,
        getPost,
        updatePost,
        data,
        setSortType,
      }}
    > */}
      {children}
    </postContext.Provider>
  )
}
