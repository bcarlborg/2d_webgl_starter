// eslint-disable-next-line func-names
const Textured2D = function (gl, mediaFileUrl) {
  // eslint-disable-next-line no-param-reassign
  gl.pendingResources[mediaFileUrl] = ++gl.pendingResources[mediaFileUrl] || 1;
  this.mediaFileUrl = mediaFileUrl;

  this.glTexture = gl.createTexture();

  this.image = new Image();

  this.image.onload = () => { this.loaded(gl); };
  this.image.src = mediaFileUrl;
};

// eslint-disable-next-line func-names
Textured2D.prototype.loaded = function (gl) {
  gl.bindTexture(gl.TEXTURE_2D, this.glTexture);
  gl.texImage2D(gl.TEXTURE_2D, 0,
    gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this.image);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER,
    gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER,
    gl.LINEAR_MIPMAP_LINEAR);
  gl.generateMipmap(gl.TEXTURE_2D);
  gl.bindTexture(gl.TEXTURE_2D, null);
  /* eslint-disable no-param-reassign */
  if (--gl.pendingResources[this.mediaFileUrl] === 0) {
    delete gl.pendingResources[this.mediaFileUrl];
  }
  /* eslint-enable no-param-reassign */
};

export default Textured2D;
