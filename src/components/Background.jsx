import React from 'react'
import Particles from 'react-tsparticles'
import { loadFireflyPreset } from 'tsparticles-preset-firefly'

export default function Background () {
  // this customizes the component tsParticles installation
  async function customInit (engine) {
    // this adds the preset to tsParticles, you can safely use the
    await loadFireflyPreset(engine)
  }

  const options = {
    preset: 'firefly',
    particles: {
      color: { value: '#8900ff' }
    },
    background: {
      color: { value: 'transparent' }
    }
  }

  return (
    <div
      style={{
        position: 'fixed',
        top: 96,
        bottom: 0,
        left: 0,
        width: '100%',
        zIndex: 0
      }}
    >
      <Particles options={options} init={customInit} />
    </div>
  )
}
