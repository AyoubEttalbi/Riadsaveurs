import React from 'react'
import Hero from './components/Hero'
import NavBar from './components/NavBar'
import Dishes from './components/Dishes'
import About from './components/About'
import Mission from './components/Mission'
export default function App() {
  return (
    <main className='overflow-y-hidden text-neutral-200'>
      <Hero/>
      <NavBar/>
      <Dishes/>
      <About/>
      <Mission/>
    </main>
  )
}
