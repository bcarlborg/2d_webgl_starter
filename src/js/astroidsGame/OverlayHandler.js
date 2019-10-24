'use strict';

export default class OverlayHandler {
  constructor() {
    if (OverlayHandler.instance) return OverlayHandler.instance;
    OverlayHandler.instance = this;
    this.overlay = document.getElementById('overlay');
    this.controlsLeft = [];
    this.controlsRight = [];
    this.initOverlay();
    this.initFooter();
    this.initControls();
    this.initHeader();
    return this;
  }

  initOverlay() {
    this.overlay.innerHTML = '<div class="header"></div><div class="main"></div><div class="footer"></div>';
  }

  initFooter() {
    const footer = document.querySelector('.footer');
    this.ammoSpan = document.createElement('span');
    this.ammoSpan.className = 'ammo-span';
    this.ammoSpan.innerHTML = 'LOADING...';
    footer.appendChild(this.ammoSpan);
  }

  setAmmoText(text) {
    this.ammoSpan.innerHTML = text;
  }

  initHeader() {
    const header = document.querySelector('.header');
    const leftControlContainer = document.createElement('span');
    leftControlContainer.className = 'controls left-controls';
    const rightControlContainer = document.createElement('span');
    rightControlContainer.className = 'controls right-controls';

    header.appendChild(leftControlContainer);
    header.appendChild(rightControlContainer);

    const addControl = (parentNode, control) => {
      const newControl = document.createElement('span');
      newControl.innerHTML = `[ ${control[0]} ] ::: [ ${control[1]} ]`;
      newControl.className = 'control';
      parentNode.appendChild(newControl);
    };
    this.controlsLeft.forEach((control) => {
      addControl(leftControlContainer, control);
    });

    this.controlsRight.forEach((control) => {
      addControl(rightControlContainer, control);
    });
  }

  initControls() {
    this.controlsLeft.push([['TORQUE-LEFT'], ['LEFT-ARROW']]);
    this.controlsLeft.push([['TORQUE-RIGHT'], ['RIGHT-ARROW']]);
    this.controlsLeft.push([['FIRE-THRUSTER'], ['UP-ARROW']]);
    // this.controlsRight.push([['P'], ['PAUSE']]);
    this.controlsRight.push([['Z'], ['ZOOM-IN']]);
    this.controlsRight.push([['X'], ['ZOOM-OUT']]);
  }
}
