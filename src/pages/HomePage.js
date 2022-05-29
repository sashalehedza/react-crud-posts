import { usePosts } from '../context/postContext'
import { Link } from 'react-router-dom'
import PostCard from '../components/PostCard'
import { VscEmptyWindow } from 'react-icons/vsc'
//import { useState, useEffect } from 'react'
const HomePage = () => {
  const { posts, loading, data, setSortType } = usePosts()
  //const { posts, data, setSortType } = usePosts()

  const renderPost = () => {
    if (posts.length === 0)
      return (
        <div className='flex flex-col justify-center items-center'>
          <VscEmptyWindow className='w-48 h-48 text-white' />
          <h1 className='text-white text-2xl'>There are no posts</h1>
        </div>
      )

    return (
      <div className='grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
        {data.map((post) => (
          <div key={post.id}>
            <PostCard key={post.id} post={post} />
          </div>
        ))}
      </div>
    )
  }

  return (
    <main>
      {loading ? (
        // <div className='grid grid-cols-1 gap-4 place-items-center'>
        //   <h3 className='text-2xl text-dark-300 font-bold'>Loading Data</h3>
        // </div>
        <></>
      ) : (
        <>
          <select onChange={(e) => setSortType(e.target.value)}>
            <option value=''>Sort Method</option>
            {/* <option value='title'>title</option> */}
            <option value='count'>count</option>
          </select>
          <header className='flex justify-between items-center my-4'>
            <h1 className='text-2xl text-dark-300 font-bold'>
              Posts ({posts.length})
            </h1>
            <Link
              to='/new'
              className='bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-500'
            >
              Create Post
            </Link>
          </header>

          {renderPost()}
        </>
      )}
    </main>
  )
}

export default HomePage
