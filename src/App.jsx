import React from 'react'
import Home from './components/Home'

const App = () => {
  return (
    <div className='w-4/5 mx-auto'>
      <h1 className='text-5xl font-bold text-green w-full text-center p-4 text-white sticky top-0 bg-slate-900'>
        TODO LIST
      </h1>
      <Home/>
    </div>
  )
}

export default App