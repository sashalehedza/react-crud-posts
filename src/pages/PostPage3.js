import { useEffect, useState, useCallback } from 'react'

import { usePosts } from '../context/postContext'

import { Link, useParams } from 'react-router-dom'

import { v4 as uuidv4 } from 'uuid'

import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'

import {
  getCommentsRequest,
  addCommentRequest,
  deleteCommentRequest,
} from '../api/comments'

import { Button } from '@material-ui/core'

const PostPage3 = () => {
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

  const [comments, setComments] = useState([])
  const addComment = { description: '' }

  const deleteCommentData = async (id) => {
    await deleteCommentRequest(id)
    setComments(comments.filter((post) => post.id !== id))
    console.log(comments)
  }

  const getAllComments = useCallback(async () => {
    let response = await getCommentsRequest(params.id)
    setComments(response.data)
  }, [params.id])

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
            <Formik
              initialValues={addComment}
              enableReinitialize
              validationSchema={Yup.object({
                description: Yup.string().required('Description is Required'),
              })}
              onSubmit={async (values, actions) => {
                let addComment = {
                  description: values.description,
                  created: new Date(),
                  postId: params.id,
                  id: uuidv4(),
                }
                await addCommentRequest(addComment)
                setComments([addComment, ...comments])
                // actions.resetForm();
                // actions.setSubmitting(false)
                //navigate('/')
              }}
            >
              {({ setFieldValue, isSubmitting, handleSubmit }) => (
                <Form onSubmit={handleSubmit}>
                  <label
                    htmlFor='description'
                    className='text-sm block font-bold mb-2 text-gray-400'
                  >
                    Description
                  </label>
                  <Field
                    className='px-3 py-2 focus:outline-none rounded bg-gray-600 text-white w-full'
                    placeholder='Comment description'
                    name='description'
                    // autoFocus
                  />
                  <ErrorMessage
                    component='p'
                    name='description'
                    className='text-red-400 text-sm'
                  />

                  <button
                    type='submit'
                    className='bg-indigo-600 hover:bg-indigo-500 px-4 py-2 rounded mt-2 text-white focus:outline-none disabled:bg-indigo-400'
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <AiOutlineLoading3Quarters className='animate-spin h-5 w-5' />
                    ) : (
                      'save'
                    )}
                  </button>
                </Form>
              )}
            </Formik>
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

export default PostPage3
