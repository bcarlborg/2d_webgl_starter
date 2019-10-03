"use strict"; 
/* exported GameObject */
class GameObject extends UniformProvider {
  constructor(mesh) { 
    super("gameObject", "gameObject2");
    this.position = new Vec3(0, 0, 0); 
    this.orientation = 0; 
    this.scale = new Vec3(0.3, 0.3, 0.3);
    this.addComponentsAndGatherUniforms(mesh); // defines this.modelMatrix
    this.modelMatrix.set();
    this.currStripeWidth = 0.5;
    this.stripeWidth.set(this.currStripeWidth);
    console.log(this);
  }

  //PRACTICAL TODO: update method setting up this.modelMatrix
  update(dt) {
    // strip width
    this.modelMatrix.set();
    this.modelMatrix.scale(this.scale);
    this.orientation += dt;
    this.modelMatrix.rotate(this.orientation);
    this.modelMatrix.translate(this.position);

    this.currStripeWidth += dt;
    this.stripeWidth.set(Math.sin(1.5 * this.currStripeWidth) + 1.5);
  }
}
