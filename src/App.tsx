/**
 * Main App Component
 * 
 * Assembles all sections into a single-page experience.
 * Minimal layout, lets sections breathe.
 */

import { Hero } from './components/Hero'
import { Impact } from './components/Impact'
import { Strengths } from './components/Strengths'
import { Tech } from './components/Tech'
import { Footer } from './components/Footer'

export default function App() {
  return (
    <main className="min-h-screen bg-background">
      <Hero />
      <Impact />
      <Strengths />
      <Tech />
      <Footer />
    </main>
  )
}
