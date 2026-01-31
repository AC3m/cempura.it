import { Hero } from './components/Hero';
import { Impact } from './components/Impact';
import { Strengths } from './components/Strengths';
import { Tech } from './components/Tech';
import { Footer } from './components/Footer';
import { CookieConsent } from './components/CookieConsent';

export default function App() {
  return (
    <main className="min-h-screen bg-background">
      <Hero />
      <Impact />
      <Strengths />
      <Tech />
      <Footer />
      <CookieConsent />
    </main>
  );
}
