// import { Routes, Route } from 'react-router-dom'

// import { PostProvider } from './context/postContext'
// import { Toaster } from 'react-hot-toast'

// import PostForm from './pages/PostForm'
// import HomePage from './pages/HomePage'
// import NotFoundPage from './pages/NotFoundPage'
// import PostPage from './pages/PostPage'
// import PostPage2 from './pages/PostPage2'
// import PostPage3 from './pages/PostPage3'

// function App() {
//   return (
//     <div className='bg-violet-200 min-h-screen flex items-center'>
//       <div className='px-10 container m-auto py-4'>
//         <PostProvider>
//           <Routes>
//             <Route path='/' element={<HomePage />} />
//             <Route path='/new' element={<PostForm />} />
//             <Route path='/edit/:id' element={<PostForm />} />
//             <Route path='/post/:id' element={<PostPage />} />
//             <Route path='*' element={<NotFoundPage />} />
//           </Routes>
//           <Toaster />
//         </PostProvider>
//       </div>
//     </div>
//   )
// }

// export default App

import RoutesBase from './RoutesBase'

const App = () => {
  return <RoutesBase />
}

export default App
