"use strict"; 
class ProgramReflection {
  constructor(gl, glProgram) { 
    // get gl program
    this.gl = gl; 
    this.glProgram = glProgram;

    this.uniformDescriptors = {};

  	// for all uniforms used in glProgram
    // get the number of active uniforms
  	const nUniforms = gl.getProgramParameter(this.glProgram, gl.ACTIVE_UNIFORMS);
    // loop over number of uniforms
  	for(let i=0; i<nUniforms; i++){ 
      // get uniform by index number
      // returns a webgl active info object for the uniform at the index
      // this object contains a name value
  	  const glUniform = gl.getActiveUniform(this.glProgram, i); 
  	  // separate struct name (if exists) and unqualified uniform name
  	  const nameParts = glUniform.name.split('[')[0].split('.');
      // TODO: I DO NOT GET THIS CODE
      // what exactly is being returned and how does
  	  const uniformName = nameParts[nameParts.length - 1];
  	  const structName = nameParts[nameParts.length - 2];

      if(!structName) { continue; }

      // if this struct name has a key in the unfiform descriptor, use that
      this.uniformDescriptors[structName] = this.uniformDescriptors[structName] || [];
      // push the infor for this uniform onto the uniform descriptors object
      this.uniformDescriptors[structName].push({
        name: uniformName,
        type: glUniform.type,
        size: glUniform.size,
        location: gl.getUniformLocation(this.glProgram, glUniform.name)
      });
    }
  }
  
  definePropertiesMatchingUniforms(target){
    for(const structName of target.glslStructNames) {
      // Skip GLSL struct provided by the target if the program does not need it.
      if(this.uniformDescriptors[structName] === undefined){
        continue;
      }
      for(const uniformDesc of this.uniformDescriptors[structName]) {
        const reflectionVariable = ProgramReflection.makeVar(this.gl, uniformDesc.type, uniformDesc.size);

        if(uniformDesc.name in target){ // if reflection property already exists, check compatibility
          const existingVariable = target[uniformDesc.name];
          if(existingVariable.constructor !== reflectionVariable.constructor ||
            existingVariable.storage.length !== reflectionVariable.storage.length){
            throw new Error("Trying to reflect uniform " + uniformDesc.name + " as a " + reflectionVariable.constructor.name + " with element count " + reflectionVariable.storage.length + ", but it already exists in the target object as a " +
              (existingVariable.constructor && existingVariable.constructor.name || "UNKNOWN") + " with element count " +
              (existingVariable.storage && existingVariable.storage.length || "UNKNOWN") + ".");
          }
        }
        Object.defineProperty(target, uniformDesc.name, {
          get: () => reflectionVariable,
          set: () => {throw new Error("Properties of UniformProvider components that reflect uniforms cannot be assigned new values. Use their set() method instead.");}
        } );
      }
    }
  }

  draw(...uniformProviders) { 
    const gl = this.gl;
    gl.useProgram(this.glProgram);
    let textureUnitCount = 0;

    for(const provider of uniformProviders){
      for(const structName of provider.glslStructNames) {
        if(this.uniformDescriptors[structName] === undefined) { continue; }
        for(const uniformDesc of this.uniformDescriptors[structName]) {
          provider[uniformDesc.name].commit(gl, uniformDesc.location, textureUnitCount);
          //  keep track of texture units used
          if( ProgramReflection.isSampler(gl, uniformDesc.type) ){ 
            textureUnitCount += uniformDesc.size;
          }
        }
      }
    }
  }

  /**
   * @method makeVar
   * @memberof ProgramReflection
   * @static 
   * @description Returns a new reflection variable based on a numerical WebGL type ID.
   * @param {WebGLRenderingContext} gl - The rendering context.
   * @param {Number} type - The numeric type of the uniform, i.e. a value of a type identifier property in the rendering context.
   * @param {Number} arraySize - The number of elements in the uniform, if it is an array. Otherwise, it must be 1.
   * @return {Vec1 | Vec1Array | Vec2 | Vec2Array | Vec3 | Vec3Array | Vec4 | Vec4Array | Mat4 | Mat4Array | Sampler2D | Sampler2DArray | SamplerCube | SamplerCubeArray | Sampler3D | Sampler3DArray | Sampler2DArrayTexture | Sampler2DArrayTextureArray} The new reflection object.
   */  
  static makeVar(gl, type, arraySize) {
    if(arraySize === 1) {
      switch(type) {
        case gl.FLOAT        : return new Vec1();
        case gl.FLOAT_VEC2   : return new Vec2();
        case gl.FLOAT_VEC3   : return new Vec3();
        case gl.FLOAT_VEC4   : return new Vec4();
        case gl.FLOAT_MAT4   : return new Mat4();
        case gl.UNSIGNED_INT_SAMPLER_2D: 
        case gl.INT_SAMPLER_2D:
        case gl.SAMPLER_2D_SHADOW:
        case gl.SAMPLER_2D   : return new Sampler2D();
        case gl.UNSIGNED_INT_SAMPLER_CUBE: 
        case gl.INT_SAMPLER_CUBE:
        case gl.SAMPLER_CUBE_SHADOW:
        case gl.SAMPLER_CUBE : return new SamplerCube();
        case gl.UNSIGNED_INT_SAMPLER_3D: 
        case gl.INT_SAMPLER_3D:
        case gl.SAMPLER_3D   : return new Sampler3D();
        case gl.UNSIGNED_INT_SAMPLER_2D_ARRAY: 
        case gl.INT_SAMPLER_2D_ARRAY:
        case gl.SAMPLER_2D_SHADOW_ARRAY:
        case gl.SAMPLER_2D_ARRAY   : return new Sampler2DArrayTexture();
      }
    } else {
      switch(type) {
        case gl.FLOAT        : return new Vec1Array(arraySize);
        case gl.FLOAT_VEC2   : return new Vec2Array(arraySize);
        case gl.FLOAT_VEC3   : return new Vec3Array(arraySize);
        case gl.FLOAT_VEC4   : return new Vec4Array(arraySize);
        case gl.FLOAT_MAT4   : return new Mat4Array(arraySize);
        case gl.UNSIGNED_INT_SAMPLER_2D: 
        case gl.INT_SAMPLER_2D:
        case gl.SAMPLER_2D_SHADOW:
        case gl.SAMPLER_2D   : return new Sampler2DArray(arraySize);
        case gl.UNSIGNED_INT_SAMPLER_CUBE: 
        case gl.INT_SAMPLER_CUBE:
        case gl.SAMPLER_CUBE_SHADOW:
        case gl.SAMPLER_CUBE : return new SamplerCubeArray(arraySize);
        case gl.UNSIGNED_INT_SAMPLER_3D: 
        case gl.INT_SAMPLER_3D:
        case gl.SAMPLER_3D   : return new Sampler3DArray(arraySize);
        case gl.UNSIGNED_INT_SAMPLER_2D_ARRAY: 
        case gl.INT_SAMPLER_2D_ARRAY:
        case gl.SAMPLER_2D_SHADOW_ARRAY:
        case gl.SAMPLER_2D_ARRAY   : return new Sampler2DArrayTextureArray(arraySize);
      }
    }
  }

  static isSampler(gl, type){
    return  type === gl.SAMPLER_2D ||
            type === gl.SAMPLER_3D ||
            type === gl.SAMPLER_CUBE ||
            type === gl.SAMPLER_2D_SHADOW ||
            type === gl.SAMPLER_2D_ARRAY ||
            type === gl.SAMPLER_2D_ARRAY_SHADOW ||
            type === gl.SAMPLER_CUBE_SHADOW ||
            type === gl.INT_SAMPLER_2D ||
            type === gl.INT_SAMPLER_3D ||
            type === gl.INT_SAMPLER_CUBE ||
            type === gl.INT_SAMPLER_2D_ARRAY ||
            type === gl.UNSIGNED_INT_SAMPLER_2D ||
            type === gl.UNSIGNED_INT_SAMPLER_3D ||
            type === gl.UNSIGNED_INT_SAMPLER_CUBE ||
            type === gl.UNSIGNED_INT_SAMPLER_2D_ARRAY;
  }
}