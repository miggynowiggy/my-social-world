import React, { Suspense } from 'react'
import { BrowserRouter } from 'react-router-dom'
import ScopedCssBaseline from '@mui/material/ScopedCssBaseline';
import { ThemeProvider } from '@mui/material';
import { Toaster } from 'react-hot-toast'
import customTheme from 'theme'
import { createStore, StoreProvider } from 'store'
import Router from 'routes'

const Loading = () => (
  <div>
    <h1>Loading...</h1>
  </div>
)

function App() {
  return (
    <StoreProvider store={createStore()}>
      <Suspense fallback={<Loading />}>
        <ThemeProvider theme={customTheme}>
          <ScopedCssBaseline enableColorScheme>
            <Toaster
              position="bottom-center"
            />
            <BrowserRouter>
              <Router />
            </BrowserRouter>
          </ScopedCssBaseline>
        </ThemeProvider>
      </Suspense>
    </StoreProvider>
  )
}

export default App;