/*
    4 elements to get started:
    --------------------------
    - Scene
    - Objects
    - Camera
    - Renderer
*/

// console.log("hello three.js");
// console.log(THREE);

const scene = new THREE.Scene();

// A mesh is a combination of geometry (like a cube) and a material

// Let's make a red cube:
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const mesh = new THREE.Mesh(geometry, material);

// ^ Notice we're using "const". It's better for memory management.
// Remember to add the mesh to the scene:
scene.add(mesh);

// Sizes:
const sizes = {
  width: 800,
  height: 600,
};

// We have to add a camera to capture the scene:
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height); // <- params: fov,
// By default, to see objects positioned in middle of the scene, we need to move the camera on the following axis (Z):
camera.position.z = 3;
camera.position.x = 1;
scene.add(camera);

const canvas = document.querySelector(".webgl");

// Renderer:
const renderer = new THREE.WebGLRenderer({
  canvas,
});

renderer.setSize(sizes.width, sizes.height);

renderer.render(scene, camera);
