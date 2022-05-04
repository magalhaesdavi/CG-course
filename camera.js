import * as THREE from  'three';
import { OrbitControls } from '../build/jsm/controls/OrbitControls.js';
import KeyboardState from '../libs/util/KeyboardState.js'
import {initRenderer, 
        initCamera,
        initDefaultBasicLight,
        initBasicMaterial,
        InfoBox,
        onWindowResize,
        createGroundPlaneXZ,
        createGroundPlaneWired,
        degreesToRadians} from "../libs/util/util.js";

let scene, renderer, material, light, orbit; // variables 
scene = new THREE.Scene();    // Create main scene
renderer = initRenderer();    // Init a basic renderer
//camera = initCamera(new THREE.Vector3(0, 15, 30)); // Init camera in this position

var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.lookAt(0, 0, 0);
  camera.position.set(0, 0, 1);
  camera.up.set( 0, 1, 0 );

material = initBasicMaterial(); // create a basic material
light = initDefaultBasicLight(scene); // Create a basic light to illuminate the scene
//orbit = new OrbitControls( camera, renderer.domElement ); // Enable mouse rotation, pan, zoom etc.

// Listen window size changes
window.addEventListener( 'resize', function(){onWindowResize(camera, renderer)}, false );

// Show axes (parameter is size of each axis)
let axesHelper = new THREE.AxesHelper( 12 );
scene.add( axesHelper );

var cameraHolder = new THREE.Object3D();
cameraHolder.position.set(0.0, 2.0, 0.0)
cameraHolder.add(camera)
scene.add(cameraHolder)

let plane = createGroundPlaneWired(5, 5)
scene.add(plane)

scene.add(new THREE.HemisphereLight())

// To use the keyboard
var keyboard = new KeyboardState();

let clock = new THREE.Clock();

render();

function keyboardUpdate() {

  keyboard.update();

  var speed = 30;
  var moveDistance = speed * clock.getDelta();

  // Keyboard.down - execute only once per key pressed
  //if ( keyboard.down("left") )   cube.translateX( -1 );
  //if ( keyboard.down("right") )  cube.translateX(  1 );
  //if ( keyboard.down("up") )     cube.translateZ(  1 );
  //if ( keyboard.down("down") )   cube.translateZ( -1 );

  // Keyboard.pressed - execute while is pressed
  let angle = degreesToRadians(1)
  if ( keyboard.pressed("space") )  cameraHolder.translateZ( -angle );
  if ( keyboard.pressed("right") )  cameraHolder.rotateY(  -angle );
  if ( keyboard.pressed("left") )  cameraHolder.rotateY(  angle );
  if ( keyboard.pressed("up") )  cameraHolder.rotateX( angle );
  if ( keyboard.pressed("down") )  cameraHolder.rotateX( -angle );
  if ( keyboard.pressed(",") )  cameraHolder.rotateZ( -angle );
  if ( keyboard.pressed(".") )  cameraHolder.rotateZ( angle );
  
}

// Use this to show information onscreen
let controls = new InfoBox();
  controls.add("Basic Scene");
  controls.addParagraph();
  controls.add("Use mouse to interact:");
  controls.add("* Left button to rotate");
  controls.add("* Right button to translate (pan)");
  controls.add("* Scroll to zoom in/out.");
  controls.show();


function render()
{
  keyboardUpdate();
  requestAnimationFrame(render);
  renderer.render(scene, camera) // Render scene
}