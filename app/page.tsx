"use client"

import { useState, useEffect, Suspense } from "react"
import Header from "@/components/header"
import Hero from "@/components/hero"
import InteractiveTimeline from "@/components/interactive-timeline"
import Materials from "@/components/materials"
import MaterialComparison from "@/components/material-comparison"
import MaterialQuiz from "@/components/material-quiz"
import Impact from "@/components/impact"
import Footer from "@/components/footer"
import ParticlesBackground from "@/components/particles-background"
import Material3DViewer from "@/components/material-3d-viewer"
import MaterialImpactCalculator from "@/components/material-impact-calculator"
import InteractiveEvolutionChart from "@/components/interactive-evolution-chart"
import MaterialPropertiesExplorer from "@/components/material-properties-explorer"
import EconomicImpactSimulator from "@/components/economic-impact-simulator"
import FactCards from "@/components/fact-cards"
import DeepTimeline from "@/components/deep-timeline"
import AdvancedQuiz from "@/components/advanced-quiz"
import GameMaterialsInventory from "@/components/game-materials-inventory"
import CraftingGame from "@/components/crafting-game"

function LoadingFallback() {
  return <div className="h-screen bg-gradient-to-b from-background to-background/50" />
}

export default function Home() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <main className="bg-background text-foreground overflow-hidden">
      <ParticlesBackground />
      <div className="relative z-10">
        <Header />
        <Suspense fallback={<LoadingFallback />}>
          <Hero scrollY={scrollY} />
        </Suspense>
        <CraftingGame />
        <GameMaterialsInventory />
        <Material3DViewer />
        <MaterialImpactCalculator />
        <InteractiveEvolutionChart />
        <MaterialPropertiesExplorer />
        <EconomicImpactSimulator />
        <FactCards />
        <DeepTimeline />
        <AdvancedQuiz />
        <InteractiveTimeline />
        <Materials />
        <MaterialComparison />
        <MaterialQuiz />
        <Impact />
        <Footer />
      </div>
    </main>
  )
}
