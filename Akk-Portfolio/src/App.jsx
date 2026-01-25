import './App.css'
import CustomCursor from './Components/CustomCursor'
import NavBar from './Components/NavBar'
import { AboutUs } from './Sections/AboutUs'
import { Contact } from './Sections/Contact'
import { Experience } from './Sections/Experience'
import { Home } from './Sections/Home'
import { Skills } from './Sections/Skills'
import { Testimonial } from './Sections/Testimonial'

export default function App() {

  return (
    <>
    <CustomCursor />
      <div className='relative gradient text-white'>
        <NavBar />
        <Home />
        <AboutUs />
        <Experience />
        <Skills />
        <Testimonial />
        <Contact />
      </div>
    </>
  )
}
