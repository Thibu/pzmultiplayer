import React from 'react'

export const Hero = () => {
  const redColor = '#D30F0E'
  return (
    <section className="relative flex flex-col items-center text-center gap-6 pt-6 md:pt-12 pb-4">
      <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight">
        <span
          className="animated-gradient-text bg-clip-text text-transparent"
          style={{
            backgroundImage: `linear-gradient(90deg, var(--color-primary), ${redColor}, var(--color-primary))`,
          }}
        >
          PZ Count Up
        </span>
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


