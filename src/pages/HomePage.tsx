import HeroSection from '../components/home/HeroSection';
import CategoryGrid from '../components/home/CategoryGrid';
import DestacadosSection from '../components/home/DestacadosSection';
import HowWeHelp from '../components/home/HowWeHelp';

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />
      <CategoryGrid />
      <DestacadosSection />
      <HowWeHelp />
    </div>
  );
}
