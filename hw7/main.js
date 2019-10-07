import {sceneFromJSON} from './scene.js';
import {scene,initThree, postMessage} from './threemain.js';
import {Agent as AgentJason} from './agentJason.js';
import {Agent as AgentLeo} from './agentLeo.js';

/////////////////////////////////////////////////////////
// global variables
var camera, renderer;
var agentJason, agentLeo;

// program starts here ...
init();
animate();

function randomStart(){
     var pos =new THREE.Vector3();
     var done=false;
     do{
       pos.x=-400+Math.random()*800;pos.y=0;
       pos.z=-400+Math.random()*800;
       for(var i=0;i<scene.obstacles.length;i++){
         if(scene.obstacles[i].center.distanceTo(pos)<scene.obstacles[i].size)break;

       }
       if(i==scene.obstacles.length)done=true;
     }while(!done);
     return pos;
}
function init() {

  initThree();
  
//  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 5000);
  camera.position.z = 500;
  camera.position.y = 400;


  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0x888888);

  let controls = new THREE.OrbitControls(camera, renderer.domElement);

  document.body.appendChild(renderer.domElement);

  /////////////////////////////////////////////////////////////////////

  
  // scene grid [-400,400]x[-400,400]
  var gridXZ = new THREE.GridHelper(800, 80, 'red', 'white');
  scene.add(gridXZ);

  // in scene.js
  sceneFromJSON ( );  // using LevelDesigner
  
  //////////////////////////////////////////////////////////////////////////	
  	let size = 10; // halfsize of agent
  	let randXZ = [-400 + Math.random()*800, -400 + Math.random()*800];
//    agentJason = new AgentJason(new THREE.Vector3(randXZ[0], 0, randXZ[1]), size);
    agentJason = new AgentJason(new THREE.Vector3(500, 0, 0), size);

  	randXZ = [-400 + Math.random()*800, -400 + Math.random()*800];
    agentLeo = new AgentLeo(new THREE.Vector3(200,0,-200), size);

}


function animate() {

  agentJason.update(0.01)
  agentLeo.update(0.01)

  $('#score').text (agentJason.name + '[' + agentJason.score.toFixed(1) + '] ... ' + agentLeo.name + '[' + agentLeo.score.toFixed(1) + ']');
    
  // check agent crossing obstacles ...
  scene.obstacles.forEach ( function (obs) { obs.checkCollision (agentJason)} );
  scene.obstacles.forEach ( function (obs) { obs.checkCollision (agentLeo)} );

  if (scene.targets.length > 0)
  	requestAnimationFrame(animate);
  else
  	alert ('game over')

  render();
}

function render() {
  renderer.render(scene, camera);
}


