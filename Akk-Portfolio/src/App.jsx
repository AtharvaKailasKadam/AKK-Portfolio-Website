import './App.css'
import CustomCursor from './Components/CustomCursor'
import NavBar from './Components/NavBar'
import { AboutUs } from './Sections/AboutUs'
import { Contact } from './Sections/Contact'
import { Experience } from './Sections/Experience'
import { Home } from './Sections/Home'
import { Projects } from './Sections/Projects'
import { Skills } from './Sections/Skills'
import { Testimonial } from './Sections/Testimonial'
import Footer from './Sections/Footer'

export default function App() {

  return (
    <>
    <CustomCursor />
      <div className='relative gradient text-white'>
        <NavBar />
        <Home />
        <AboutUs />
        <Skills />
        <Projects />
        <Experience />
        <Testimonial />
        <Contact />
        <Footer />
      </div>
    </>
  )
}
