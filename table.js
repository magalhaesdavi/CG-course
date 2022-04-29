import * as THREE from  'three';
import Stats from       '../build/jsm/libs/stats.module.js';
import {TrackballControls} from '../build/jsm/controls/TrackballControls.js';
import {initRenderer, 
        initCamera,
        initDefaultBasicLight,
        InfoBox,
        onWindowResize,
        createGroundPlaneXZ} from "../libs/util/util.js";

var scene = new THREE.Scene();    // Create main scene
var renderer = initRenderer();    // View function in util/utils
var camera = initCamera(new THREE.Vector3(0, 15, 30)); // Init camera in this position
initDefaultBasicLight(scene);

// Enable mouse rotation, pan, zoom etc.
var trackballControls = new TrackballControls( camera, renderer.domElement );

// Show axes (parameter is size of each axis)
var axesHelper = new THREE.AxesHelper( 12 );
scene.add( axesHelper );

// create the ground plane
let plane = createGroundPlaneXZ(20, 20)
scene.add(plane);

// create a cube
var cubeGeometry = new THREE.BoxGeometry(11, 0.3, 6);
var cubeMaterial = new THREE.MeshLambertMaterial({color:"rgb(200, 0, 0)}"});
var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
// position the cube
cube.position.set(0.0, 3.0, 0.0);
// add the cube to the scene
scene.add(cube);

// create a cylinder
var geometry = new THREE.CylinderGeometry(0.2, 0.2, 3, 32);
var material = new THREE.MeshLambertMaterial({color:"rgb(200, 0, 0)}"});
var cylinder1 = new THREE.Mesh(geometry, material);
cube.add(cylinder1);
// position the cylinder
//cylinder.position.set(-5.0, -1.5, 2.0);
cylinder1.translateX(-5.0)
cylinder1.translateY(-1.5)
cylinder1.translateZ(2.0)
var scale = 1.0
cylinder1.scale.set(scale, scale, scale)

// create a cylinder
geometry = new THREE.CylinderGeometry(0.2, 0.2, 3, 32);
material = new THREE.MeshLambertMaterial({color:"rgb(200, 0, 0)}"});
var cylinder2 = new THREE.Mesh(geometry, material);
cube.add(cylinder2);
// position the cylinder
//cylinder.position.set(-5.0, -1.5, 2.0);
cylinder2.translateX(-5.0)
cylinder2.translateY(-1.5)
cylinder2.translateZ(-2.0)
var scale = 1.0
cylinder2.scale.set(scale, scale, scale)

// create a cylinder
geometry = new THREE.CylinderGeometry(0.2, 0.2, 3, 32);
material = new THREE.MeshLambertMaterial({color:"rgb(200, 0, 0)}"});
var cylinder2 = new THREE.Mesh(geometry, material);
cube.add(cylinder2);
// position the cylinder
//cylinder.position.set(-5.0, -1.5, 2.0);
cylinder2.translateX(5.0)
cylinder2.translateY(-1.5)
cylinder2.translateZ(-2.0)
var scale = 1.0
cylinder2.scale.set(scale, scale, scale)

// create a cylinder
geometry = new THREE.CylinderGeometry(0.2, 0.2, 3, 32);
material = new THREE.MeshLambertMaterial({color:"rgb(200, 0, 0)}"});
var cylinder2 = new THREE.Mesh(geometry, material);
cube.add(cylinder2);
// position the cylinder
//cylinder.position.set(-5.0, -1.5, 2.0);
cylinder2.translateX(5.0)
cylinder2.translateY(-1.5)
cylinder2.translateZ(2.0)
var scale = 1.0
cylinder2.scale.set(scale, scale, scale)

// Use this to show information onscreen
var controls = new InfoBox();
  controls.add("Basic Scene");
  controls.addParagraph();
  controls.add("Use mouse to interact:");
  controls.add("* Left button to rotate");
  controls.add("* Right button to translate (pan)");
  controls.add("* Scroll to zoom in/out.");
  controls.show();

// Listen window size changes
window.addEventListener( 'resize', function(){onWindowResize(camera, renderer)}, false );

render();
function render()
{
  trackballControls.update(); // Enable mouse movements
  requestAnimationFrame(render);
  renderer.render(scene, camera) // Render scene
}

// matriz inicial de translação
// translada em seu próprio eixo