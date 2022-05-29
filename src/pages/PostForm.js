import { Formik, Form, Field, ErrorMessage } from 'formik'
import { Link, useParams } from 'react-router-dom'
import * as Yup from 'yup'
import { usePosts } from '../context/postContext'
import { useNavigate } from 'react-router-dom'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import { useEffect, useState } from 'react'

const PostForm = () => {
  const { createPost, getPost, updatePost } = usePosts()
  const navigate = useNavigate()
  const [post, setPost] = useState({
    title: '',
    description: '',
    image: '',
    count: 0,
    size: { width: 0, height: 0 },
    comments: [],
    // image: null,
  })
  const params = useParams()

  useEffect(() => {
    let unmounted = false
    ;(async () => {
      if (params.id) {
        const post = await getPost(params.id)
        if (!unmounted) {
          setPost(post)
        }
      }
    })()
    return () => {
      unmounted = true
    }
  }, [params.id, getPost])

  return (
    <div className='flex items-center justify-center'>
      <div className='bg-zinc-800 p-10 shadow-md shadow-black'>
        <header className='flex justify-between items-center py-4 text-white'>
          <h3 className='text-xl'>New Post</h3>
          <Link to='/' className='text-black-400 text-sm hover:text-indigo-500'>
            Go Back
          </Link>
        </header>
        <Formik
          initialValues={post}
          enableReinitialize
          validationSchema={Yup.object({
            title: Yup.string().required('Title is Required'),
            description: Yup.string().required('Description is Required'),
            count: Yup.number().required('Count is Required'),
            image: Yup.string().required('Image is required'),
            size: Yup.object({
              width: Yup.number().required('Width is Required'),
              height: Yup.number().required('Height is Required'),
            }),

            // image: Yup.mixed().required("The image required"),
          })}
          onSubmit={async (values, actions) => {
            if (params.id) {
              values.count = Number(values.count)
              values.size.width = Number(values.size.width)
              values.size.height = Number(values.size.height)
              await updatePost(params.id, values)
            } else {
              values.count = Number(values.count)
              values.size.width = Number(values.size.width)
              values.size.height = Number(values.size.height)
              await createPost(values)
            }
            // actions.resetForm();
            actions.setSubmitting(false)
            navigate('/')
          }}
        >
          {({ setFieldValue, isSubmitting, handleSubmit }) => (
            <Form onSubmit={handleSubmit}>
              <label
                htmlFor='title'
                className='text-sm block font-bold mb-2 text-gray-400'
              >
                Title
              </label>
              <Field
                className='px-3 py-2 focus:outline-none rounded bg-gray-600 text-white w-full'
                placeholder='Post title'
                name='title'
                // autoFocus
              />
              <ErrorMessage
                component='p'
                name='title'
                className='text-red-400 text-sm'
              />

              <label
                htmlFor='description'
                className='text-sm block font-bold mb-2 text-gray-400'
              >
                Description
              </label>
              <Field
                component='textarea'
                name='description'
                id='description'
                placeholder='Write a description'
                rows='3'
                className='px-3 py-2 focus:outline-none rounded bg-gray-600 text-white w-full'
              />
              <ErrorMessage
                component='p'
                name='description'
                className='text-red-400 text-sm'
              />

              <label
                htmlFor='count'
                className='text-sm block font-bold mb-2 text-gray-400'
              >
                Count
              </label>
              <Field
                className='px-3 py-2 focus:outline-none rounded bg-gray-600 text-white w-full'
                placeholder='Count'
                name='count'
                // autoFocus
              />
              <ErrorMessage
                component='p'
                name='count'
                className='text-red-400 text-sm'
                render={(msg) => (
                  <div className='text-red-400 text-sm'>
                    {msg.includes('count must be a `number` type') ? (
                      <div>Count must be a `number` type</div>
                    ) : (
                      <div>{msg}</div>
                    )}
                  </div>
                )}
              />

              <label
                htmlFor='image'
                className='text-sm block font-bold mb-2 text-gray-400'
              >
                Image
              </label>
              <Field
                className='px-3 py-2 focus:outline-none rounded bg-gray-600 text-white w-full'
                placeholder='Image'
                name='image'
                type='url'
                // autoFocus
              />
              <ErrorMessage
                component='p'
                name='image'
                className='text-red-400 text-sm'
              />

              <label
                htmlFor='width'
                className='text-sm block font-bold mb-2 text-gray-400'
              >
                Width
              </label>
              <Field
                className='px-3 py-2 focus:outline-none rounded bg-gray-600 text-white w-full'
                placeholder='Width'
                name='size.width'
                // autoFocus
              />
              <ErrorMessage
                component='p'
                name='size.width'
                className='text-red-400 text-sm'
                render={(msg) => (
                  <div className='text-red-400 text-sm'>
                    {msg.includes('size.width must be a `number` type') ? (
                      <div>Width must be a `number` type</div>
                    ) : (
                      <div>{msg}</div>
                    )}
                  </div>
                )}
              />

              <label
                htmlFor='height'
                className='text-sm block font-bold mb-2 text-gray-400'
              >
                Height
              </label>
              <Field
                className='px-3 py-2 focus:outline-none rounded bg-gray-600 text-white w-full'
                placeholder='Height'
                name='size.height'
                // autoFocus
              />
              <ErrorMessage
                component='p'
                name='size.height'
                className='text-red-400 text-sm'
                render={(msg) => (
                  <div className='text-red-400 text-sm'>
                    {msg.includes('size.height must be a `number` type') ? (
                      <div>Height must be a `number` type</div>
                    ) : (
                      <div>{msg}</div>
                    )}
                  </div>
                )}
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
    </div>
  )
}

export default PostForm
