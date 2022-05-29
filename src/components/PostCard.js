import toast from 'react-hot-toast'
import { usePosts } from '../context/postContext'
import { useNavigate } from 'react-router-dom'

const PostCard = ({ post }) => {
  const { deletePost } = usePosts()
  const navigate = useNavigate()

  const handleDelete = (id) => {
    toast(
      (t) => (
        <div>
          <p className='text-white'>
            Do you want to delete <strong>{id}</strong>?
          </p>
          <div>
            <button
              className='bg-red-500 hover:bg-red-400 px-3 py-2 text-sm text-white rounded-sm mx-2'
              onClick={(e) => {
                deletePost(id)
                toast.dismiss(t.id)
              }}
            >
              Delete
            </button>
            <button
              className='bg-slate-400 hover:bg-slate-500 px-3 py-2 text-white rounded-sm mx-2'
              onClick={() => toast.dismiss(t.id)}
            >
              Cancel
            </button>
          </div>
        </div>
      ),
      {
        duration: '4000',
        style: {
          background: '#202020',
        },
      }
    )
  }
  return (
    <div
      // className='bg-zinc-800 text-white rounded-md shadow-md shadow-black hover:bg-zinc-700 hover:cursor-pointer'
      className='bg-zinc-800 text-white rounded-md shadow-md shadow-black'
      // onClick={() => navigate(`/${post.id}`)}
    >
      <div className='px-4 py-7'>
        <div className='flex justify-between items-center'>
          <h3 className='text-md font-semibold'>{post.title}</h3>
          <p className='text-gray-400'>{post.count}</p>
        </div>
        <div className='flex justify-end'>
          <button
            className='bg-blue-600 text-sm px-2 py-1 rounded-sm ml-2 mt-2'
            onClick={() => navigate(`/post/${post.id}`)}
          >
            View
          </button>
          <button
            className='bg-gray-600 text-sm px-2 py-1 rounded-sm ml-2 mt-2'
            onClick={() => navigate(`/edit/${post.id}`)}
          >
            Edit
          </button>
          <button
            className='bg-red-600 text-sm px-2 py-1 rounded-sm ml-2 mt-2'
            onClick={(e) => {
              e.stopPropagation()
              handleDelete(post.id)
            }}
          >
            Delete
          </button>
        </div>
      </div>
      {/* {post.image && <img src={post.image.url} alt={post.title} />} */}
    </div>
  )
}

export default PostCard
