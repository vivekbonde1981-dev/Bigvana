import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Layout from './Layout.jsx'
import { ContactForm, StackedCards, AutoSoftHeros, QuantumFlow, HomePage ,ThankYou } from "./Pages"
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import ProjectShowcase from './components/projects.jsx'
import { ThemeProvider } from './ThemeContext.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "", element: <HomePage /> },
      { path: "about", element: <AutoSoftHeros /> },
      { path: "contact", element: <ContactForm /> },
      { path: "projects", element: <ProjectShowcase /> },
      { path: "service", element: <StackedCards /> },
            { path: "thank-you", element: <ThankYou/> }


    ]
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  </StrictMode>,
)
