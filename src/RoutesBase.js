import { Suspense, lazy, Fragment } from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import { Toaster } from 'react-hot-toast'

const ROUTES = [
  {
    path: '*',
    Layout: Layout,
    routes: [
      {
        path: '/',
        Component: lazy(() => import('./pages/HomePage')),
        // Component: lazy(() => {
        //   return Promise.all([
        //     import('./pages/HomePage'),
        //     new Promise((resolve) => setTimeout(resolve, 1000)),
        //   ]).then(([moduleExports]) => moduleExports)
        // }),
      },
      {
        path: '/new',
        Component: lazy(() => import('./pages/PostForm')),
      },
      {
        path: '/edit/:id',
        Component: lazy(() => import('./pages/PostForm')),
      },
      {
        path: '/post/:id',
        Component: lazy(() => import('./pages/PostPage')),
        // Component: lazy(() => {
        //   return Promise.all([
        //     import('./pages/PostPage'),
        //     new Promise((resolve) => setTimeout(resolve, 1000)),
        //   ]).then(([moduleExports]) => moduleExports)
        // }),
      },
      {
        path: '/notfound',
        Component: lazy(() => import('./pages/NotFoundPage')),
      },
      {
        path: '*',
        Component: () => <Navigate to='/notfound' />,
      },
    ],
  },
]

const renderRoutes = (routes) => {
  //console.log(routes)
  return (
    <Suspense
      fallback={
        <>
          <div className='grid grid-cols-1 gap-4 place-items-center'>
            <h3 className='text-2xl text-dark-300 font-bold'>Loading Data</h3>
          </div>
        </>
      }
    >
      <Routes>
        {routes.map((route) => {
          const Component = route.Component
          const Layout = route.Layout || Fragment

          return (
            <Route
              path={route.path}
              key={route.path}
              element={
                <Layout>
                  {route.routes ? renderRoutes(route.routes) : <Component />}
                </Layout>
              }
            />
          )
        })}
      </Routes>
      <Toaster />
    </Suspense>
  )
}

const RoutesBase = () => renderRoutes(ROUTES)

export default RoutesBase
