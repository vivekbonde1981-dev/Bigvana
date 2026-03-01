import React from "react"
import { Outlet } from "react-router-dom"  
import Header from "./components/header"
import AgencyFooter from "./Pages/footer"
import {ContactForm,StackedCards,AutoSoftHeros,ProjectShowcase,QuantumFlow} from "./Pages" 
import SmoothScrollProvider from "./components/smoothScrollProvider"

function Layout(){
    return(
        <SmoothScrollProvider>
            <Header />
            <Outlet />   {/* ← this renders whichever child route matches */}
            <AgencyFooter />
        </SmoothScrollProvider>
    )
}

export default Layout