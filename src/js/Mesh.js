'use strict';

/* exported Mesh */
export default class Mesh extends UniformProvider {
  constructor(material, geometry) {
    super('mesh');
    this.addComponentsAndGatherUniforms(material, geometry);
  }
}
