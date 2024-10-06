const transportModes = {
  car: 'driving-car',
  cycling: 'cycling-regular',
  walking: 'foot-walking',
  eletricCycling: 'cycling-electric'
}

const modeEnvironmentalImpact = {
  [transportModes.car]: 0.21,
  [transportModes.cycling]: 0,
  [transportModes.walking]: 0
}

const modeCost = {
  [transportModes.car]: 6.07,
  [transportModes.cycling]: 0,
  [transportModes.walking]: 0
}

const carMode = {
  fuelPrice: 6.07,
  autonomy: 10
}

export { transportModes, modeEnvironmentalImpact, modeCost, carMode }