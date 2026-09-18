import LandingHeader from '../components/LandingHeader';
import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
import StatsSection from '../components/StatsSection';
import TestimonialsSection from '../components/TestimonialsSection';
import CommunitySection from '../components/CommunitySection';
import FaqSection from '../components/FaqSection';
import ContactSection from '../components/ContactSection';
import LandingFooter from '../components/LandingFooter';

const LandingPage = () => (
  <div className="font-sans">
    <LandingHeader />
    <HeroSection />
    <AboutSection />
    <StatsSection />
    <TestimonialsSection />
    <CommunitySection />
    <FaqSection />
    <ContactSection />
    <LandingFooter />
  </div>
);

export default LandingPage;
