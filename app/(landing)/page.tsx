import Hero from "./_components/hero";
import Proceso from "./_components/proceso";
import Caracteristicas from "./_components/caracteristicas";
import Impacto from "./_components/impacto";
import CallToAction from "./_components/cta";
import Footer from "./_components/footer";

const HomePage = () => {
    return (
        <>
            <Hero/>
            <Proceso/>
            <Caracteristicas/>
            <Impacto/>
            <CallToAction/>
            <Footer/>
        </>
    );
}
 
export default HomePage;