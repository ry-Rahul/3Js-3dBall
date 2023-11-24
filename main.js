import * as THREE from "three";
import gsap from "gsap";
import "./style.css";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

const scene = new THREE.Scene();

// Geometry Sphere
const geometry = new THREE.SphereGeometry(3, 64, 64);
const material = new THREE.MeshStandardMaterial({
    color: "#00ff83",
    roughness: 0.3,
});

const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// Sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
};

// Lights
const pointLight = new THREE.PointLight(0xffffff, 200);
pointLight.position.set(0, 10, 10);
// pointLight.intensity = 100;
scene.add(pointLight);


// Camera
const camera = new THREE.PerspectiveCamera(
    45,
    sizes.width / sizes.height,
    0.1,
    100
);
camera.position.z= 20;
scene.add(camera);



// Render
const canvas = document.querySelector(".webgl");
const renderer = new THREE.WebGLRenderer({
    canvas,
});
renderer.setPixelRatio(window.devicePixelRatio);
// renderer.setPixelRatio(2);
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);


// controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.enablePan = false;
controls.enableZoom = false;
controls.autoRotate = true;
controls.autoRotateSpeed = 5;


// Resize
window.addEventListener("resize", () => {
    // Update sizes
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;

    // Update camera
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();

    // Update renderer
    renderer.setSize(sizes.width, sizes.height);
    // renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

const loop = () => {

    controls.update();

    // mesh.rotation.x += 0.2;
    // Render
    renderer.render(scene, camera);
window.requestAnimationFrame(loop);
}

loop();




// gsap timeline
const tl = gsap.timeline({ defaults: { duration: 1 } });
tl.fromTo(mesh.scale, {
    z: 0,
    x: 0,
    y: 0,
}, {
    z: 1,
    x: 1,
    y: 1,
});
tl.fromTo("nav", 
    { y: "-100%" },
    { y: "0%" },
);
tl.fromTo(".title", 
    { opacity: 0 },
    { opacity: 1 },
);


// Mouse Animation color___________________________________
let mouseDown = false;
let rgba = [];
window.addEventListener("mousedown", () => { mouseDown = true; });
window.addEventListener("mouseup", () => { mouseDown = false; });

window.addEventListener("mousemove", (e) => {
    if (mouseDown) {
        rgba = [
            Math.round((e.pageX / window.innerWidth) * 255),
            Math.round((e.pageY / window.innerHeight) * 255),
            Math.round(Math.random() * 255),
        ]
        
        // animate color
        gsap.to(mesh.material.color, {
            r: rgba[0] / 255,
            g: rgba[1] / 255,
            b: rgba[2] / 255,
            duration: 0.5,
        })
    }
} );
