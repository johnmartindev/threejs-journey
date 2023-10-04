# Notes

## First impressions of course

The main take-away from this introduction is that ThreeJS is now a stable, mature technology.
It is capable of producing a vast array of media for all sorts of projects (as seen on ThreeJs.org examples).

Simon warns that some parts of the course (particularly the section on shaders) causes a lot of people to struggle.
While difficult and/or boring, it's important to power through such content.

"If it's hard to learn, it's valuable knowledge"!

## What is Three.js?

- Three.js is a 3D JavaScript library.
- It uses the MIT license.
- It was originally created by "Mr. Doob" (Ricardo Cabello) — now maintained by thousands of contributors.
- It enables developers to create 3D experiences for the web.
- It works with WebGL, but can also work with SVG and CSS (in limited ways).
- See the change logs on the Three.js Github repo for changes.

## Applications of the technology

- Rich interactive imagery: https://www.oculus.com/medal-of-honor/?locale=en_GB
- Motion graphics: https://cornrevolution.resn.global/
- Product demonstrations: https://live.vanmoof.com/
- Selectable, animated maps: https://chartogne-taillet.com/en
- Flow field effects (particle effects)
- Videogames: https://heraclosgame.com/, https://letsplay.ouigo.es/
- And so much more.

## What is WebGL?

- WebGL is a JavaScript API.
- Can render triangles very efficiently.
- Results can be drawn in `<canvas>` element (HTML5).
- Compatible with most modern browsers.
- Uses the user's GPU which makes it really fast — can do thousands of parallel calculations. CPUs have multiple cores but typically JavaScript in the browser uses one of them so the calculations occur one at a time (blocking).
- WebGL can be used for 2D as well, but we will focus on 3D.
- WebGL uses instructions called "shaders" to place points and draw pixels (to colourise and place).
- Native WebGL is hard. Drawing a single triangle on the canvas takes at least 100 lines of code.
- Three.js helps by offering a level of abstraction above WebGL — making it easier for us developers.

## Other libraries

- There are other WebGL libraries, but they aren't as popular and/or as stable and/or as versatile.
- Examples include: Babylon.js, Fab (formerly Sketchfab), Verge3D, and Unity.

## Default object positioning

- By default, an object is positioned in the middle of the scene.
- This means we must move the camera on the `Z` axis so we aren't viewing the scene from inside of the object.

## Using Three classes from modules

- When we use Three modules in Node, we need to run our project on a server.
- We can do this locally with Vite and debug with multiple devices connected to the same network address.
- Using Node gives us access to syntax like so: `import * as THREE from 'three'` (imports all ThreeJS core classes).

## Properties for transforming objects

- There are 4 properties for transformations: (1) `position` (2) `scale` (3) `rotation` (4) `quaternion`.
- Any class that inherits from the `Object3D` class has access to these, i.e. cameras, meshes, etc.
- Transformations are compiled under the hood using matrices (multidimensional mathematical arrays).
- We must apply transformations before rendering with the renderer for them to show in the scene.
- In ThreeJS, `position` is a Vector3 and gives us more properties than just `x`, `y`, `z`.
- `mesh.position.normalize()` is useful. `normalize()` method reduces the vector length to 1.
- `mesh.position.length()` is another useful example. It tells us the distance of a mesh from the centre of the scene.
- `mesh.position.set(0.5, -0.5, 1)` allows us to pass `x`, `y`, `z` arguments to update 3 coordinates with 1 line of code.
- See documentation for many more properties and methods: https://threejs.org/docs/#api/en/math/Vector3
- Use the `AxesHelper` class to assist with transformations.
- In ThreeJS, `scale` is also a Vector3.
- Note that `rotation` and `quaternion` affect each other. Updating one will automatically update the other.
- `rotation` is an Euler rather than Vector3.
- Half a rotation is done with Pi, a full rotation is done with 2 * Pi. A quarter is Pi / 2.
- `Math.PI` is the floating point approximation of Pi in JavaScript (3.141592653589793 as per IEEE 754 standards).
- Be careful of "gimbal lock". This is when you do rotations in the wrong axes order.
- One example of a "gimbal lock" in an FPS game: rotating the character's `x` position before `y` position.
- We can fix gimbal lock by reordering axes' order like so: `object.rotation.reorder('yxz')`.
- The axes order problem is why most engines and 3D software uses `quaternion` rather than `rotation`.

## Groups

- To transform many objects at once we can use the `Group` class.
- This inherits from/is an instance of `Object3D`.
- Get into the habit of putting things in groups!

## Useful camera method: "lookAt"

- Ensures the camera looks exactly at the centre of a Vector3: `camera.lookAt(mesh.position)`.
