import { ASCIIRenderer } from './renderers/ascii';
import { Vector3 } from './vector3';
import { Camera } from './camera';
import { Scene } from './scene';
import { CubeOutline } from './shapes/cube';
import { toRad } from './trig';
import { Sphere } from './shapes/sphere';

const renderer = new ASCIIRenderer(
  document.getElementById('canvas'),
  100,
  100,
);

const camera = new Camera(renderer, new Vector3(0, 0, -70));

const cube = new CubeOutline(50, 50)
.relRotY(toRad(45))
.relRotX(toRad(45));
const sphere = new Sphere(20, 64, 64)
.relRotX(toRad(125))
.relRotY(toRad(30));
const sbigSphere = new Sphere(20, 64, 64)
.relRotX(toRad(125))
.relRotY(toRad(30));

const target = cube;

const scene = new Scene(
  [camera],
  [
    cube,
    sphere,
  ],
);

scene.render();

// Arrow key rotations
window.addEventListener('keydown', function (e) {
  const code = e.which || e.keyCode;
  const rad = toRad(10);
  // Up
  if (code === 38) {
    target.relRotX(-rad);
  }
  // Down
  else if (code === 40) {
    target.relRotX(rad);
  }
  // Left
  else if (code === 37) {
    target.relRotY(-rad);
  }
  // Right
  else if (code === 39) {
    target.relRotY(rad);
  }
  scene.render();
});

module.hot.accept();
