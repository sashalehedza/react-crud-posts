import { useEffect, useState, useCallback } from 'react'

import { usePosts } from '../context/postContext'

import { Link, useParams } from 'react-router-dom'

import { v4 as uuidv4 } from 'uuid'

import {
  getCommentsRequest,
  addCommentRequest,
  deleteCommentRequest,
} from '../api/comments'

import {
  FormGroup,
  FormControl,
  InputLabel,
  Input,
  Button,
  makeStyles,
  Typography,
} from '@material-ui/core'

const useStyles = makeStyles({
  container: {
    width: '50%',
    margin: '5% 0 0 25%',
    '& > *': {
      marginTop: 20,
    },
  },
})

const PostPage2 = () => {
  const { getPost } = usePosts()
  const [loading, setLoading] = useState(true)
  const [post, setPost] = useState({
    title: '',
    description: '',
    image: '',
    count: 0,
    size: { width: 0, height: 0 },
    comments: [],
  })
  const params = useParams()
  const classes = useStyles()

  const [comments, setComments] = useState([])
  const [description, setDescription] = useState('')

  const addCommentDetails = async () => {
    let addComment = {
      description: description,
      created: new Date(),
      postId: params.id,
      id: uuidv4(),
    }
    await addCommentRequest(addComment)
    setComments([addComment, ...comments])
    console.log(comments)
  }

  const deleteCommentData = async (id) => {
    await deleteCommentRequest(id)
    setComments(comments.filter((post) => post.id !== id))
    console.log(comments)
  }

  const getAllComments = useCallback(async () => {
    let response = await getCommentsRequest(params.id)
    setComments(response.data)
  }, [params.id])

  // useEffect(() => {
  //   ;(async () => {
  //     if (params.id) {
  //       const post = await getPost(params.id)
  //       setPost(post)
  //       getAllComments()
  //     }
  //   })()
  // }, [params.id, getPost, getAllComments])

  useEffect(() => {
    const fetchPost = async () => {
      // setTimeout(async () => {
      if (params.id) {
        const post = await getPost(params.id)
        setPost(post)
        getAllComments()
      }
      setLoading(false)
      // }, 500)
    }
    fetchPost()
  }, [params.id, getPost, getAllComments])

  return (
    <div>
      {loading ? (
        // <div className='grid grid-cols-1 gap-4 place-items-center'>
        //   <h3 className='text-2xl text-dark-300 font-bold'>Loading Data</h3>
        // </div>
        <></>
      ) : (
        <div>
          <Link to='/' className='text-black-400 text-sm hover:text-indigo-500'>
            Go Back
          </Link>
          <div>Id - {post.id}</div>
          <div>Title - {post.title}</div>
          <div>Description - {post.description}</div>
          <div>Count - {post.count}</div>
          <div>
            <div>Size:</div>
            <div>Width - {post.size.width}</div>
            <div>Height - {post.size.height}</div>
          </div>
          <img
            src={post.image}
            alt='post view'
            style={{
              height: 200,
              width: 250,
            }}
          ></img>
          <div>
            <FormGroup className={classes.container}>
              <Typography variant='h4'>Add Comment</Typography>
              <FormControl>
                <InputLabel htmlFor='my-input'>Description</InputLabel>
                <Input
                  onChange={(e) => setDescription(e.target.value)}
                  name='description'
                  value={description}
                  id='my-input'
                />
              </FormControl>

              <FormControl>
                <Button
                  variant='contained'
                  color='primary'
                  onClick={() => addCommentDetails()}
                >
                  Add Comment
                </Button>
              </FormControl>
            </FormGroup>
          </div>
          <div>
            {comments.length}
            {comments.map((item) => (
              <div key={item.id}>
                <h3>{item.description}</h3>
                <Button
                  color='secondary'
                  variant='contained'
                  onClick={() => deleteCommentData(item.id)}
                >
                  Delete
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default PostPage2
