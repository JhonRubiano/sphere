import * as THREE from "three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { gsap } from "gsap";
//Scene
const scene = new THREE.Scene();

const sphereParams = { 
  radius:3,
  widthSegments: 64,
  heightSegments: 64
}
const {radius, widthSegments, heightSegments} = sphereParams;

// Create our sphere
const geometry = new THREE.SphereGeometry( radius, widthSegments,heightSegments)
const material = new THREE.MeshStandardMaterial({
  color: "rgb(234,150,150)",
  roughness:0.5
});
const mesh = new THREE.Mesh( geometry, material);
scene.add(mesh)

//Sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
}

//Light
const light = new THREE.PointLight( "rgb(250,250,250)", 100, 100)
light.position.set(0, 10, 10)
// light.intensity = 125
scene.add(light)

//Camera
const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 0.1, 100);
camera.position.z = 20
scene.add(camera)


//Renderer
const canvas = document.querySelector(".webgl")
const renderer = new THREE.WebGLRenderer({ canvas })
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene,camera)
renderer.setPixelRatio(2);

//Controls 
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
controls.enablePan = false
controls.enableZoom = false
controls.autoRotate = true
controls.autoRotateSpeed = 5



//resize
window.addEventListener('resize', () => {
  //Update Sizes
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight

  //Update Camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix()
  renderer.setSize(sizes.width,sizes.height)

})

const loop = () => {
  controls.update()
  renderer.render(scene,camera);
  window.requestAnimationFrame(loop)
}
loop()

//Timeline magic
const tl = gsap.timeline({
  defaults:{
    duration:1,
  }
})
tl.from('nav',{
  y:'100%',
  scale:1.25
},"+=1"
)
tl.to('nav', { 
    y: '0%',
    scale:1 
  }
)
tl.fromTo(mesh.scale,
  { x:0,y:0, z:0},
  { x:1,y:1, z:1 },1
)
tl.fromTo('.title',{opacity:0},{opacity:1})


//Mouse Animation Color
let mouseDown = false
let rgb = [];//three values red,green, blue
window.addEventListener('mousedown',()=> (mouseDown = true))
window.addEventListener('mouseup',()=> (mouseDown = false))
window.addEventListener('mousemove',(event)=>{
  if(mouseDown){
    rgb = [
      Math.round( (event.pageX / sizes.width) * 255 ),
      Math.round( (event.pageY / sizes.height) * 255 ),
      200
    ]
    let newColor = new THREE.Color(`rgb(${rgb.join(',')})`)
    gsap.to(mesh.material.color,{
      r:newColor.r,
      g:newColor.g,
      b:newColor.b
    })
  }
})