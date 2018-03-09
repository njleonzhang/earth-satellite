import './main.css'
import * as THREE from 'three'
import { drawEarth, drawStars, drawMoon, drawSatellite } from './Tools'
import OrbitControlsFacotry from 'three-orbit-controls'
let OrbitControls = OrbitControlsFacotry(THREE)

// 场景
var scene = new THREE.Scene();

// 摄像机 （视角，宽高比，近裁剪面，远裁剪面）
var camera = new THREE.PerspectiveCamera(74, window.innerWidth / window.innerHeight, 0.1, 10000);
camera.position.set(0, 35, 70);
// camera.position.set(0, 0, -50);

// 渲染器
var renderer = new THREE.WebGLRenderer();

// 设置目标屏幕的宽高
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// 启动鼠标对3D模型的鼠标控制
let controls = new OrbitControls(camera);

// 画地球
let earth = drawEarth(scene)
drawStars(scene)
let moon = drawMoon(scene, earth)

// 画卫星
let statllite = drawSatellite(scene)

// 坐标系 for debug
let arrowHelper1 = new THREE.ArrowHelper(
  new THREE.Vector3(1, 0, 0),
  new THREE.Vector3(-1, 0, 0),
  50
)
let arrowHelper2 = new THREE.ArrowHelper(
  new THREE.Vector3(0, 1, 0),
  new THREE.Vector3(0, -1, 0),
  50
)
let arrowHelper3 = new THREE.ArrowHelper(
  new THREE.Vector3(0, 0, 1),
  new THREE.Vector3(0, 0, -1),
  50
)

scene.add(arrowHelper1);
scene.add(arrowHelper2);
scene.add(arrowHelper3);

// 圆形的初始者
let r = 35
let theta = 0;
let dTheta = 2 * Math.PI / 1000

// 卫星轨道初始值
let a = 30
let b = 50
let sThets = 2 * Math.PI / 500
let currentSThes = 0

// 光源
// var pointofLight = new THREE.PointLight('yellow');
// pointofLight.position.x = 0;
// pointofLight.position.y = 0;
// pointofLight.position.z = 0;
// scene.add(pointofLight);

function render() {
  requestAnimationFrame( render );
  earth.rotation.y += 0.005 // 地球自转

  theta += dTheta;
  moon.position.x = r * Math.cos(theta);
  moon.position.z = r * Math.sin(theta);

  currentSThes += sThets
  statllite.position.x = a * Math.cos(currentSThes)
  statllite.position.y = b * Math.sin(currentSThes)

  controls.update(); // 更新控制
  renderer.render(scene, camera);
}
render();
