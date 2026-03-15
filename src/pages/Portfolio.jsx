import Navbar   from '../components/Navbar';
import Hero     from '../components/Hero';
import Work     from '../components/Work';
import About    from '../components/About';
import Services from '../components/Services';
import Contact  from '../components/Contact';

export default function Portfolio() {
  return (
    <>
      <Navbar />
      <Hero />
      <Work />
      <About />
      <Services />
      <Contact />
    </>
  );
}
