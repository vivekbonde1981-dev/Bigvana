
import ContactForm from "./contactUs"
import QuantumFlow from "./slider"
import StackedCards from "./ExScroll"
import ProjectShowcase from "./project"
import AutoSoftHeros from "./HeroSections"


function HomePage(){
    return(
        <>
            <QuantumFlow/>
            <AutoSoftHeros/>
            <StackedCards/>
            <ProjectShowcase/>
            <ContactForm/>
        </>
    )
}

export default HomePage