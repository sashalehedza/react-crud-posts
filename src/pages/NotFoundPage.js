import { Link } from 'react-router-dom'

const NotFoundPage = () => {
  return (
    <div>
      <div>
        <Link to='/' className='text-black-400 text-sm hover:text-indigo-500'>
          Go Back
        </Link>
      </div>
      This page is not exists
    </div>
  )
}

export default NotFoundPage
