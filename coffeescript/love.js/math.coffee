class Love.Math
  constructor: () ->
    @random_generator = new Love.Math.RandomGenerator()
    simplex_r = new Love.Math.RandomGenerator()
    @simplex = new SimplexNoise(simplex_r.random.bind(simplex_r))

  gammaToLinear: =>
  getRandomSeed: =>
  isConvex: =>
  linearToGamma: =>
  newBezierCurve: =>
  newRandomGenerator: =>
  noise: (dimensions...) =>
    switch dimensions.length
      when 1 then @simplex.noise1D(dimensions[0])
      when 2 then @simplex.noise2D(dimensions[0], dimensions[1])
      when 3 then @simplex.noise3D(dimensions[0], dimensions[1], dimensions[2])
      when 4 then @simplex.noise4D(dimensions[0], dimensions[1], dimensions[2], dimensions[3])

  random: (min, max) =>
    @random_generator.random(min, max)

  setRandomSeed: =>
  randomNormal: (stddev = 1, mean = 0) =>
    @random_generator.randomNormal(stddev) + mean

  triangulate: =>
