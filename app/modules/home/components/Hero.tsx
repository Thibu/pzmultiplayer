import React from 'react'
import Shuffle from '../../shared/components/shadcn/Shuffle'

export const Hero = () => {
  return (
    <section className="relative flex flex-col items-center text-center gap-6 pt-6 md:pt-6 pb-4">
      <Shuffle 
        text="PZ Count"
        shuffleDirection="right"
        duration={0.35}
        animationMode="evenodd"
        shuffleTimes={1}
        ease="power3.out"
        stagger={0.03}
        threshold={0.1}
        triggerOnce={true}
        triggerOnHover={true}
        respectReducedMotion={true}
        className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight"
      />
      <p className="text-muted-foreground max-w-2xl">
        Track the time since the latest Project Zomboid update.
      </p>
      <div className="flex gap-3">
        <a href="#news" className="inline-flex items-center rounded-lg bg-primary text-primary-foreground px-4 py-2 text-sm font-medium shadow hover:opacity-90 transition">
          View news
        </a>
      </div>
    </section>
  )
}

export default Hero


