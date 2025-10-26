import TopSection from "../components/TopSection"
import Services from "../components/Services"
import Tarifas from "../components/Tarifas"
import Blog from "../components/Blog"
import Testimonios from "../components/Testimonios"
import Formulario from "../components/Formulario"
function Home() {
    return (
        <>
            <TopSection />
            <Services />
            <Tarifas />
            <Blog />
            <Testimonios />
            <Formulario />
        </>
    )
}

export default Home