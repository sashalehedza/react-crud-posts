import { useEffect, useState } from 'react'
import { usePosts } from '../context/postContext'

import { Link, useParams } from 'react-router-dom'

import { v4 as uuidv4 } from 'uuid'

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

const PostPage = () => {
  const { getPost, updatePost } = usePosts()
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

  const [description, setDescription] = useState('')

  const addCommentDetails = async () => {
    let addComment = {
      description: description,
      created: new Date(),
      postId: params.id,
      id: uuidv4(),
    }
    const postCopy = post
    postCopy.comments.push(addComment)
    await updatePost(params.id, postCopy)
  }

  const deleteCommentData = async (id) => {
    const postCopy = post
    const updatedComments = postCopy.comments.filter((item) => item.id !== id)
    postCopy.comments = updatedComments
    await updatePost(params.id, postCopy)
  }

  //  useEffect(() => {
  //   ;(async () => {
  //     if (params.id) {
  //       const post = await getPost(params.id)
  //       setPost(post)

  //     }
  //   })()
  // }, [params.id, getPost])

  useEffect(() => {
    const fetchPost = async () => {
      // setTimeout(async () => {
      if (params.id) {
        const post = await getPost(params.id)
        setPost(post)
      }
      setLoading(false)
      // }, 500)
    }
    fetchPost()
  }, [params.id, getPost])

  return (
    <div>
      {loading ? (
        // <div className='grid grid-cols-1 gap-4 place-items-center'>
        //   <h3 className='text-2xl text-dark-300 font-bold'>Loading Data</h3>
        // </div>
        <></>
      ) : (
        <>
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
          {post.comments.length !== 0 ? (
            <div>
              <h3>Comments:</h3>
              {post.comments.map((comment) => {
                return (
                  <div key={comment.id}>
                    <h5>Description - {comment.description}</h5>
                    <Button
                      color='secondary'
                      variant='contained'
                      onClick={() => deleteCommentData(comment.id)}
                    >
                      Delete
                    </Button>
                  </div>
                )
              })}
            </div>
          ) : (
            <div>No comments here yet.</div>
          )}
        </>
      )}
    </div>
  )
}

export default PostPage
