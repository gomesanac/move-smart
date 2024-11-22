const transportModes = {
  driving: 'driving',
  bicycling: 'bicycling',
  walking: 'walking',
  transit: 'transit'
}

const modeEnvironmentalImpact = {
  [transportModes.driving]: 0.21,
  [transportModes.bicycling]: 0,
  [transportModes.walking]: 0,
  [transportModes.transit]: 0.18
}

const modeCost = {
  [transportModes.driving]: 6.07,
  [transportModes.bicycling]: 0,
  [transportModes.walking]: 0,
  [transportModes.transit]: 5.70
}

const carMode = {
  fuelPrice: 6.07,
  autonomy: 10
}

export { transportModes, modeEnvironmentalImpact, modeCost, carMode }