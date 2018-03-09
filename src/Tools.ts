import * as THREE from 'three'
import earthImg from './images/earth.jpg'
import starFieldImg from './images/galaxy_starfield.png'
import moonImg from './images/moon_texture.jpg'

let loader = new THREE.TextureLoader()
let orbitColor = 0xffeecc

function loadImg(imgPath: string) {
  return loader.load(imgPath)
}

/**
 * 画卫星轨道
 *
 * @param {number} radius
 * @param {number} [angle=0]
 * @param {number} [opacity=0]
 * @returns
 */
function createOrbit(radius: number, angle: number = 0, opacity: number = 0) {
  var orbit = new THREE.Mesh(
    new THREE.RingGeometry(radius, radius + .1, 100, 20, angle, Math.PI * 2),
    new THREE.MeshBasicMaterial({
      color: orbitColor,
      side: THREE.DoubleSide
    })
  )
  return orbit;
}


/**
 * 创建球体
 * @param radius    球体半径
 * @param segments  切片次数，数字越大球面越光滑，太大浏览器会崩溃
 * @param img       贴图
 */
function createSphere(radius: number, segments:number, imgPath: string) {
  return new THREE.Mesh(
    new THREE.SphereGeometry(radius, segments, segments),
    new THREE.MeshBasicMaterial({
      map: loadImg(imgPath),
      color: 0xf2f2f2,
    }),
  )
}

/**
 * 画地球
 *
 * @param {THREE.Scene} scene
 */
export function drawEarth(scene: THREE.Scene) {
  let earth = createSphere(10, 50, earthImg)
  scene.add(earth)
  return earth
}

/**
 * 星空
 *
 */
export function drawStars(scene: THREE.Scene) {
  var starGeometry = new THREE.SphereGeometry(1000, 50, 50);
  var starMaterial = new THREE.MeshBasicMaterial({
    map: loadImg(starFieldImg),
    side: THREE.DoubleSide,
  })
  var starField = new THREE.Mesh(starGeometry, starMaterial);
  scene.add(starField);
}

/**
 * 画月亮
 *
 * @export
 * @param {THREE.Scene} scene
 */
export function drawMoon(scene: THREE.Scene, earth: THREE.Object3D) {
  let moon = createSphere(3.5, 50, moonImg)
  moon.position.set(35, 0, 0)
  scene.add(moon)

  let moonOrbit = createOrbit(35);
  moonOrbit.rotation.x = Math.PI / 2
  scene.add(moonOrbit)
  return moon
}

export function drawSatellite(scene: THREE.Scene) {
  let satellite = createSphere(3.5, 50, moonImg)
  satellite.position.set(30, 0, 0)
  scene.add(satellite)

  var curve = new THREE.EllipseCurve(
    0,  0,            // ax, aY
    30, 50,           // xRadius, yRadius
    0,  2 * Math.PI,  // aStartAngle, aEndAngle
    false,            // aClockwise
    0                 // aRotation
  )

  var geometry = new THREE.Geometry().setFromPoints(curve.getPoints(500))
  var material = new THREE.LineBasicMaterial({
    color: orbitColor
  })

  var ellipse = new THREE.Line(geometry, material)

  scene.add(ellipse)
  return satellite
}
