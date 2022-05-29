const Layout = ({ children }) => {
  return (
    <div className='bg-violet-200 min-h-screen flex items-center'>
      <div className='px-10 container m-auto py-4'>
        <div>{children}</div>
      </div>
    </div>
  )
}

export default Layout
