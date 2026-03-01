
import './App.css'
import AutoSoftHeros from './Pages/HeroSections.jsx'
import StackedCards from './Pages/ExScroll.jsx'
import ProjectShowcase from './Pages/project.jsx'
import ContactForm from './Pages/contactUs.jsx'
import AgencyFooter from './Pages/footer.jsx'
import SmoothScrollProvider from './components/smoothScrollProvider.jsx'
import QuantumFlow from './Pages/slider.jsx'
import Header from './components/header.jsx'


function App() {
 
  return (
    <>
    {/* <ReactLenis root autoRaf={false}> */}
    {/* <ReactLenis root> */}
      <SmoothScrollProvider>
     <Header></Header>
     < QuantumFlow/>
     <AutoSoftHeros/>
      <StackedCards />
      <ProjectShowcase/>
      <ContactForm/>
      <AgencyFooter></AgencyFooter>
     </SmoothScrollProvider>
      {/* </ReactLenis> */}

    </>
  )
}

export default App
