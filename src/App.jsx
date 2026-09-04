import { Fragment } from 'react'
import { RouterProvider } from 'react-router'
import router from './routes'

export default function App() {
  return (
    <Fragment>
      <RouterProvider router={router}></RouterProvider>
    </Fragment>
  )
}
