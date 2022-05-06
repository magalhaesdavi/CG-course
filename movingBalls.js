import * as THREE from  'three';
import Stats from '../build/jsm/libs/stats.module.js';
import GUI from '../libs/util/dat.gui.module.js'
import {TrackballControls} from '../build/jsm/controls/TrackballControls.js';
import {initRenderer, 
        initCamera, 
        degreesToRadians, 
        onWindowResize,
        initDefaultBasicLight,
        createGroundPlane} from "../libs/util/util.js";

var stats = new Stats();          // To show FPS information
var scene = new THREE.Scene();    // Create main scene
var renderer = initRenderer();    // View function in util/utils
var camera = initCamera(new THREE.Vector3(5, 5, 7)); // Init camera in this position
var trackballControls = new TrackballControls( camera, renderer.domElement );
initDefaultBasicLight(scene);

var groundPlane = createGroundPlane(5.0, 5.0, 60, 60, "rgb(100,140,90)");
  groundPlane.rotateX(degreesToRadians(-90));
scene.add(groundPlane);

// Set angles of rotation
var angle = 0;
var angle2 = 0;
var speed = 0.03;
var animationOn = true; // control if animation is on or of
var sphereMove = false;
var sphere2Move = false;

// Show world axes
var axesHelper = new THREE.AxesHelper( 12 );
scene.add( axesHelper );

// Base sphere
var sphereGeometry = new THREE.SphereGeometry(0.2, 32, 32);
var sphereMaterial = new THREE.MeshPhongMaterial( {color:'rgb(180,180,255)'} );
var sphere = new THREE.Mesh( sphereGeometry, sphereMaterial );
sphere.position.set(-2, 0.2, -2)
scene.add(sphere);

//var sphereGeometry = new THREE.SphereGeometry(0.2, 32, 32);
//var sphereMaterial = new THREE.MeshPhongMaterial( {color:'rgb(180,180,255)'} );
var sphere2 = new THREE.Mesh( sphereGeometry, sphereMaterial );
sphere2.position.set(-2, 0.2, 2)
scene.add(sphere2);
// Set initial position of the sphere
//sphere.translateX(1.0).translateY(1.0).translateZ(1.0);

// Listen window size changes
window.addEventListener( 'resize', function(){onWindowResize(camera, renderer)}, false );

buildInterface();
render();

function moveBalls()
{
  // More info:
  // https://threejs.org/docs/#manual/en/introduction/Matrix-transformations
  //sphere.matrixAutoUpdate = false;
  //sphere2.matrixAutoUpdate = false;
  // Set angle's animation speed
  if(sphereMove && sphere.position.x < 2.5)
  {
    angle+=speed;
    sphere.translateX(speed);
}
  //else{
  //   sphereMove = false;
  //}
  if(sphere2Move && sphere2.position.x < 2.5)
  {
    angle2+=speed*2;
    sphere2.translateX(speed * 2);
} 
  //else{
  //    sphere2Move = false;
  //}
}

function buildInterface()
{
  var controls = new function ()
  {
    this.sphereButton = function(){
      sphereMove = true;
    };
    this.sphere2Button = function(){
      sphere2Move = true;
    }
    this.resetButton = function(){
        sphereMove = false;
        sphere2Move = false;
        sphere.position.set(-2, 0.2, -2)
        sphere2.position.set(-2, 0.2, 2)
    }
  };

  // GUI interface
  var gui = new GUI();
  gui.add(controls, 'sphereButton', true).name("Move sphere 1");
  gui.add(controls, 'sphere2Button', true).name("Move sphere 2");
  gui.add(controls, 'resetButton', true).name("Reset")
}

function render()
{
  stats.update(); // Update FPS
  trackballControls.update();
  moveBalls();
  requestAnimationFrame(render);
  renderer.render(scene, camera) // Render scene
}
