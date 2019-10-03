class OrthoCamera extends UniformProvider {
  constructor(...programs) {
    super('camera');
    this.position = new Vec2(0.0, 0);
    this.rotation = 0;
    this.windowSize = new Vec2(2, 2);

    // this.addComponentsAndGatherUniforms(...programs);
    this.addComponentsAndGatherUniforms(...programs[0]);
  }

  update(t) {
    this.position.add(0.01 * Math.sin(t), 0);
    this.viewProjMatrix
      .set()
      // scale(0.5 + 0.5 * t).
      .scale(this.windowSize)
      .rotate(this.rotation)
      .translate(this.position)
      .invert();
  }

  setAspectRatio(ar) {
    this.windowSize.x = this.windowSize.y * ar;
    this.update();
  }
}
