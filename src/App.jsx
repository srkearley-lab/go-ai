import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import BasketPanel from './components/BasketPanel'
import MobileBottomBar from './components/MobileBottomBar'
import { BasketProvider } from './context/BasketContext'
import Home from './pages/Home'
import Services from './pages/Services'
import Industries from './pages/Industries'
import Portfolio from './pages/Portfolio'
import Automation from './pages/Automation'
import Pricing from './pages/Pricing'
import Packages from './pages/Packages'
import Bundles from './pages/Bundles'
import Websites from './pages/Websites'
import Contact from './pages/Contact'
import HowItWorks from './pages/HowItWorks'
import Book from './pages/Book'
import Onboarding from './pages/Onboarding'
import OrderForm from './pages/OrderForm'
import FAQ from './pages/FAQ'
import ThankYou from './pages/ThankYou'
import ControlCentre from './pages/ControlCentre'
import Quote from './pages/Quote'

function App() {
  return (
    <BrowserRouter>
      <BasketProvider>
        <ScrollToTop />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/industries" element={<Industries />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/automation" element={<Automation />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/packages" element={<Packages />} />
          <Route path="/bundles" element={<Bundles />} />
          <Route path="/websites" element={<Websites />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/quote" element={<Quote />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/book" element={<Book />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/order" element={<OrderForm />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/thank-you" element={<ThankYou />} />
          <Route path="/control" element={<ControlCentre />} />
        </Routes>
        <Footer />
        <BasketPanel />
        <MobileBottomBar />
      </BasketProvider>
    </BrowserRouter>
  )
}

export default App
