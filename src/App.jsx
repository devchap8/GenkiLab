import { useState, Fragment } from 'react'
import { RouterProvider } from 'react-router'
import router from './routes'

import VocabList from './components/VocabList'

export default function App() {
  return (
    <Fragment>
      <RouterProvider router={router}></RouterProvider>
    </Fragment>
  )
}
