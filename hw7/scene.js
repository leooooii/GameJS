/*
function sceneDesign() {

  // add obstacles to the scene
  scene.obstacles = [];
  scene.obstacles.push ( new Obstacle (new THREE.Vector3(150,0,150), 50) )
  scene.obstacles.push ( new Obstacle (new THREE.Vector3(-100,0,200), 30) )
  scene.obstacles.push ( new Obstacle (new THREE.Vector3(0,0,-100), 60) )
    
  scene.targets = [];
  scene.targets.push (new Target (1, new THREE.Vector3 (300,0,300) ));
  scene.targets.push (new Target (2, new THREE.Vector3 (-200,0,150) ));
  scene.targets.push (new Target (3, new THREE.Vector3 (250,0,-200) ));
  scene.targets.push (new Target (4, new THREE.Vector3 (0,0,-200) ));

}
*/


import {scene} from './threemain.js';
import {Obstacle} from './obstacle.js';
import {Target} from './target.js';

function sceneFromJSON () {
  const JSONStr  ='{"obstacles":[{"center":{"x":44.562050567481684,"y":4.200656444006741e-14,"z":-189.1807479594023},"size":20},{"center":{"x":-89.74645140108137,"y":1.514654948847595e-15,"z":-6.821399463224907},"size":20},{"center":{"x":134.87996111883243,"y":2.123995285497838e-15,"z":-9.565624376304754},"size":20},{"center":{"x":110.23559655932756,"y":-3.312922296286611e-14,"z":149.2007561906379},"size":20},{"center":{"x":-229.88700095456238,"y":-2.9221075169645045e-14,"z":131.60002324537868},"size":20},{"center":{"x":-143.91130751217844,"y":-3.361020261057407e-14,"z":151.36689595282826},"size":20}],"targets":[],"targets":[{"id":0,"pos":{"x":-170.96098270075498,"y":1.4072922348060594e-13,"z":-121.78807842739616}},{"id":1,"pos":{"x":173.8093284377129,"y":3.632627064004123e-14,"z":-163.5989789182495}},{"id":2,"pos":{"x":248.1273914134486,"y":5.516543817640233e-14,"z":263.5569531850243}},{"id":3,"pos":{"x":-237.81629357811414,"y":5.1244638502615395e-14,"z":281.21466513488554}}]}';
  let myScene = JSON.parse (JSONStr);
  
  scene.obstacles = []
  myScene.obstacles.forEach (function (obs) {
  	scene.obstacles.push (new Obstacle (new THREE.Vector3 (obs.center.x, obs.center.y, obs.center.z), 30))
  })
  
  scene.targets = []
  myScene.targets.forEach (function (tt) {
    scene.targets.push (new Target (tt.id, new THREE.Vector3 (tt.pos.x, tt.pos.y, tt.pos.z) ))
  })

}

export {sceneFromJSON};