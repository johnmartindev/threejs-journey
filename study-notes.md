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

## Animation

- ThreeJS animations work through rendering many individual frames.
- Most devices run at 60 frames per second, but our animations must be a consistent speed regardless of device.
- We can achieve this with two native JavaScript components.
- The first is the JavaScript method: `window.requestAnimationFrame(...)`.
- Despite its name, the main purpose of `requestAnimationFrame` is not animation but calling a function on the next frame.
- The second component is `Date`. `Date.now()` gives us a timestamp (milliseconds that have passed since 1st January 1970).
- We calculate the delta (difference between current & previous time) and multiply it by transformation value.
- For example: `mesh.rotation.y += 0.001 * deltaTime`.
- Another way to achieve consistent speed regardless of device is with ThreeJS's `Clock` class.
- We call the `elapsedTime` method on a new `Clock` instance and assign it to `mesh.rotation.y`.
- To achieve 1 revolution per second, we would write `mesh.rotation.y = elapsedTime * (Math.PI * 2)`.
- Caveat: avoid `getDelta()` on Clock. It can mess with the class. Use `getElapsedTime()` method instead.
- We can use trigonometry with the likes of sine (`Math.sin()`).
- `Math.sin(elapsedTime)` on position `y` makes the cube travel on a vertical sine wave.
- More advanced animations on a timeline that use delays and tweens are better taken care of with a library (more control).
- GSAP (GreenSock) is one such library. Add as a dependency to Node modules with `npm install gsap@[version] --save`.
- GSAP (GreenSock) has its own tick, so we don't need to use `requestAnimationFrame` or `Clock`.
- The approach we take to animation (whether native JS, Clock, or GSAP) depends on the project and personal preferences.

## Cameras

- All ThreeJS cameras (`ArrayCamera`, `CubeCamera`, `OrthographicCamera`, etc.) inherit from `Camera`.
- `Camera` is an abstract class (meaning we don't use it directly).
- `ArrayCamera` renders a scene from multiple cameras on specific areas of the render (like old split-screen co-op games).
- `StereoCamera` renders the scene through two cameras in a way that's useful for 3-D glasses, VR, etc.
- `CubeCamera` handles 6 renders facing different directions. Used for environment maps (reflection, refraction, shadows, etc.).
- `OrthographicCamera` creates a render of the scene without perspective. Objects far away don't look smaller. E.g. RTS games.
- `PerspectiveCamera` is the camera we will continue using a lot. It simulates a real-life camera with perspective.
- The first parameter in `PerspectiveCamera` is Field of View (FOV) — the vertical viewing angle measured in degrees.
- A large FOV leads to objects appearing small with a distortion in the surrounding area. Keep FOV between `45` and `75`.
- The second parameter in `PerspectiveCamera` is Aspect Ratio. This is the width of render divided by its height.
- The third and fourth parameters are `near` and `far` and correspond to the range of objects that will be rendered.
- Any object (or part of an object) closer than `near` value or further than `far` will not be visible in the scene.
- It's tempting to use a very low `near` value and very high `far` value, but this can lead to a bug called "z-fighting".
- Read more about "z-fighting" here: https://en.wikipedia.org/wiki/Z-fighting
- A sensible `near` value might be 0.1 with 100 for `far`, but we should experiment with this on a project by project basis.
- `OrthographicCamera` does not have a FOV parameter (has `left`, `right`, `top`, `bottom`), but has `near` and `far`.
- Tip: to overcome a flat distorted orthographic view, multiply `left` and `right` by the aspect ratio value.

## Cursor position

- We use `event.clientX` and `event.clientY` (in event listener) to get the cursor position in `window` or `document.body`.
- However, to get the cursor position relative to the canvas size, we would use: `event.clientX / sizes.width`.
- Do the same with `clientX` and `sizes.height`.
- This means the mouse position goes from 0 to 1 as we move the mouse over the canvas left to right.
- To go from -0.5 to 0.5 (even better than 0 to 1), use `event.clientX / sizes.width - 0.5`.
- However, ThreeJS's Y goes up rather than down (like `clientY`), so we must invert.
- Invert like so: `-(event.clientY / sizes.height - 0.5)`.

## Built-in controls

- ThreeJS has built-in controls to save us time: https://threejs.org/docs/index.html?q=controls#examples/en/controls
- `FlyControls`. Allows us to move the camera like we're on a spaceship. Rotate on 3 axes, go back and forward.
- `FirstPersonControls`. Like `FlyControls` but has a fixed up axis. More like a bird — can't do a barrel roll.
- `PointerLockControls`. Uses pointer lock JavaScript API — keeps cursor hidden and centred. Not terribly useful.
- `OrbitControls`. Similar to controls we coded above. Rotate around a point, translate laterally, and zoom in/out.
- `TrackballControls`. Like `OrbitControls`, but no vertical angle limits. Rotate/spin even if the scene turns upside down.
- `TransformControls` and `DragControls`. Nothing to do with the camera. More about manipulating objects.

## Instantiating orbit controls

- To use the `OrbitControls` class we have to import it from a specific part of the `three` module.
- Import like so: `import { OrbitControls } from 'three/addons/controls/OrbitControls.js`.
- Some versions of ThreeJS instead have: `import { OrbitControls } from "three/examples/jsm/controls/OrbitControls`.
- By default, the orbit controls are centred. Change this with `controls.target.y = 1` (example) and `controls.update()`.

## Damping

- "Damping" is a term that refers to smoothing an animation by applying acceleration and friction.
- Thankfully, there's built-in damping. We don't have to code the formulae manually.
- We enable damping with something like: `controls.enableDamping = true`. Add `controls.update()` inside the tick function.

## Fullscreen and resizing

- For a more immersive experience, we could have the canvas fill the size of the viewport.
- We can also make the page enter into fullscreen mode.
- We first need the viewport's width and height with `window.innerWidth` and `window.innerHeight`.
- An HTML page has default margin and padding values we need to get rid of first, though.
- We use the wildcard selector in CSS to do this: `* { margin: 0; padding: 0; }`.
- Also, we need to restyle the `.webgl` canvas element to remove page scroll: `.webgl { position: fixed; top: 0; left: 0; }`.
- Sometimes a blue outline will appear in the browser around the canvas. Add `outline: none` to get rid of this.
- One last style we should add to prevent scrolling beyond the page limit: `body { overflow: hidden; }`.
- It should look good. However, when we resize the page, the canvas is no longer occupying the viewport properly.
- We fix this with a resize event listener that updates `sizes.width` and `sizes.height`.
- We need to update the camera with `camera.aspect = sizes.width / sizes.height` and `camera.updateProjectionMatrix()`.
- We also need to update the renderer: `renderer.setSize(sizes.width, sizes.height)`;
- Lastly, enter fullscreen with a double click event listener that calls the `requestFullscreen` JavaScript API.
- See documentation for `requestFullscreen` API: https://developer.mozilla.org/en-US/docs/Web/API/Element/requestFullscreen

## Pixel ratio

- The "pixel ratio" is how many physical pixels a screen displays per software pixel.
- Traditionally, all screens had a pixel ratio of 1.
- Developers like Apple set a trend for producing screens with a pixel ratio of 2 or more. Retina display has 2, for example.
- A pixel ratio of 2 means four times more pixels for the GPU to render.
- A pixel ratio of 3 means nine times more pixels for the GPU to render.
- Some mobiles have pixel ratios up to 5. But the results are (1) visually imperceptible (2) GPU-intensive. Marketing nonsense!
- We really don't need a pixel ratio beyond 2. Don't buy a device with a screen beyond 3.
- Measure your device's pixel ratio by doing a console log of `window.devicePixelRatio`.
- `renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))` produces better renders on pixel ratios of 2.
- We cap the pixel ratio at 2 to minimise performance issues on devices with higher pixel ratios.
