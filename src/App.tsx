import React, { Suspense } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { createStore, StoreProvider } from 'store'
import Router from 'routes'
import './App.css'

const Loading = () => (
  <div>
    <h1>Loading...</h1>
  </div>
)

function App() {
  return (
    <StoreProvider store={createStore()}>
      <Suspense fallback={<Loading />}>
        <Toaster 
          position="top-right"
          toastOptions={{
            duration: 6500
          }}
        />
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </Suspense>
    </StoreProvider>
  )
}

export default App;