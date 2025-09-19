import React from 'react'
 

export const Hero = () => {
  return (
    <section className="relative flex flex-col items-center text-center gap-6 pt-6 md:pt-6 pb-4">
      <h1 className="font-title tracking-wider text-4xl md:text-6xl lg:text-9xl">
        Pz Count
      </h1>
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


