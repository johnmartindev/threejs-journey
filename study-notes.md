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

## Geometries

- Geometries in three-dimensional space are comprised of vertices (points) and faces.
- Faces are drawn in WebGL using triangles that join over vertices (create surfaces).
- Geometries can be used for meshes but also particles (a particle per vertex).
- Geometries can also store UV coordinates, normals, colours, and anything else we like.
- There are many geometric classes in ThreeJS like `BoxGeometry` (creates a box) and `PlaneGeometry` (creates a plane).
- We also have `CircleGeometry` (creates a disc/portion of disc) and `ConeGeometry` (creates cone or a portion of a cone).
- `CylinderGeometry` creates a cylinder, `RingGeometry` creates a flat ring or portion of flat circle.
- `TorusGeometry` creates a donut shape, `TorusKnotGeometry` creates knot geometry.
- `DodecahedronGeometry` creates a 12-faced sphere, `OctahedronGeometry` creates an 8-faced sphere.
- `TetrahedronGeometry` creates a 4-faces sphered.
- `IcosahedronGeometry` creates a sphere composed of triangles that have roughly the same size.
- `SphereGeometry` creates the most popular type of sphere where faces looks like quads (combination of two triangles).
- `ShapeGeometry` creates a shape based on a path, `TubeGeometry` creates a tube following a path.
- `ExtrudeGeometry` creates an extrusion based on a path. We can add and control the bevel.
- `LatheGeometry` creates a vase or portion of a vase (more like a revolution).
- `TextGeometry` creates 3D text (we provide the font in typeface JSON format).
- We can create complex structures by combing these geometries, e.g. houses, trees, cars, etc.
- However more complex structures than these will require us to use 3D software such as Blender.
- Generally, the more details you want in shape, the more segments it will have (the more "subdivisions").
- More subdivisions means more faces which means more triangles (recall that it's 2 triangles per face).
- Better discern these details in a shape by enabling wireframe on the material: `material: true` as a parameter.

## Buffer geometries

- We can create our own geometries programmatically using `BufferGeometry`.
- `BufferGeometry` is a very efficient way of creating shapes and the GPU will render it very quickly.
- This efficiency and speed comes from the way computers read values in a `Float32Array`.
- `Float32Array` is a native JavaScript API that stores elements (of a predefined length) of a common data type.
- In the case of `BufferGeometry`, that one type of data is a float.
- These float values occupy an array that is one-dimensional.
- To create a triangle, for instance, we need an array with a length of 9: `const positionsArray = new Float32Array(9)`.
- This is because a triangle has 3 vertices — each vertex with three parameters designating a position: `X`, `Y`, and `Z`.
- We then convert to a ThreeJS buffer attribute `const positionsAttribute = new THREE.BufferAttribute(positionsArray)`.
- One interesting thing with `BufferGeometry` is that you can mutualise vertices using the `index` property.
- Consider a cube. Multiple faces can use some vertices like the ones in the corners.
- And if you look closely, every vertex can be used by various neighbour triangles.
- That will result in a smaller attribute array and performance improvement.

## Debug UI

- An efficient way of reviewing changes in real-time as we develop in ThreeJS is with debugging UIs/GUIs.
- We can create our own. However there are many existing importable libraries to save time.
- Some of these libraries include: "dat.GUI", "control-panel", "ControlKit", "Guify", "Ouify".
- dat.GUI is the most popular one.
- There are different elements we can add to dat.GUI panel: range, colour, text, checkbox, select, button, and folder.
- Within these elements, we have different parameters: minimum, maximum, and step (or precision).
- We can use chaining syntax like so: `gui.add(mesh.position, 'y').min(- 3).max(3).step(0.01).name('elevation')`.
- We should get into a habit of including debug UIs/GUIs in projects and adding tweaks to the panel as we go.


## Textures

- Textures are based on images that cover the surface of geometry. There many different types and effects.
- The most simple texture type is color or albedo.
- Another is alpha. This is a grayscale image where the whitest parts are visible and darkest invisible.
- Height (or displacement) texture is another grayscale image. This moves vertices to create "relief", but needs subdivisions.
- "Normal" textures add details (mainly concerning light). No need for subdivisions, doesn't move vertices, and is performant.
- Ambient occlusion is a grayscale image that adds fake shadows in crevices. Creates contrast.
- Metalness is a grayscale image where metallic elements are white and non-metallic elements are black. Mostly for reflection.
- Roughness is used in conjunction with metalness where white is rough and black is smooth. Helps show light dissipation.
- These texture elements follow "PBR principles" ("physically-based rendering").
- PBR is a standardised set of calculations for achieving realistic results in how textures are rendered.
- Read about the calculations for PBR here: https://marmoset.co/posts/physically-based-rendering-and-you-can-too/
- In ThreeJS we use the `TextureLoader` class (or `Texture` with an `onload` event listener) to apply images as textures.
- One `TextureLoader` can load multiple textures.
- We can also transform textures using methods like `repeat`, `offset`, `rotation`, `center` (pivot point), etc.


## UV unwrapping

- UV unwrapping is the process of flattening a 3D model's surface into a 2D plane.
- It's the opposite of UV mapping which is the process of projecting a 2D image texture onto a 3D model's surface
- UV unwrapping allows for easier as well as more accurate texturing.
- The letters "UV" don't stand for anything — they just come before "XYZ" in the alphabet (our Cartesian coordinates).
- If we create our own geometry, we must specify UV coordinates.

## Mipmapping and filtering

- Mipmapping (or "mip mapping" with a space) is a process for creating variations of a texture.
- It creates smaller versions of a texture: half-size, quarter-size, eighth-size, etc. until 1x1 texture.
- These variations are sent to the GPU which will choose the appropriate texture to load.
- ThreeJS and the GPU handle all of this, and we can just set what filter algorithm to use.
- There are two types of filter algorithms: the minification filter and the magnification filter.
- Use `NearestFilter` if possible for better performance.
- An example could be a small texture like a checkered pattern of Minecraft block and using it with `magFilter`.
- This is a cheap (you can even deactivate mipmapping) but sharp way of rendering such textures.


## Preparing a texture

- When preparing a texture consider (1) weight (2) size/resolution (3) data.
- In terms of weight, .jpg is lossy (lower quality but lighter), .png is lossless (higher quality but heavier). Compress!
- Resize textures to be as small as possible.
- It's also important to use textures that are divisible by 2, e.g. 512x512, 1024x1024, etc. for mipmapping to get to 1x1.
- Textures support transparency, so use .png for the texture for this (.jpg doesn't support transparency).
- Some texture resource sites: poliigon.com, 3dtextures.me, and arroway-textures.ch


## Materials

- Used to put a colour on every visible pixel of the geometry.
- The algorithms used to do this are called "shaders".
- To set opacity or to use an alpha map, we also have to set the `transparent` property to `true`.
- We can use the `side` property to limit the visibility of face sides. `FrontSide` (default), `BackSide`, or `DoubleSide`.
- Try to avoid `DoubleSide` where possible as it's more GPU intensive.
- "Normals" are information that contains the direction of the outside of the face.
- Normals can be used for lighting, reflection, refraction, etc.
- There's a `flatShading` property to remove how normals interpolate between vertices.
- Clever use of materials can save us adding extra geometry, lights, etc. to our scene and save on GPU processing.
- One way to do so is with MatCaps (material captures). This fakes a whole material including lighting and reflections.
- Here are some MatCaps we can use: https://github.com/nidorx/matcaps
- We can also create our own MatCaps using 3D software (rendering a sphere in front of the camera in a square image).
- We can also use 2D software like Photoshop, but this can be more difficult.
- There are materials available to us in ThreeJS like lambert, phong, toon, and so on.
- Lambert is more performant than phong, but there are more visible artefacts.
- `MeshStandardMaterial` is usually a better option than deciding whether to use lambert or phong.
- Use `dat.gui` to adjust roughness, metalness, and so on, in the scene.
- Try to use normal maps and height/displacement maps before creating more vertices (more performant).
- To add realism, use environment maps, particularly `cubeTextureLoader`.
- Search the web for cubemaps or use HDRIHaven: https://hdrihaven.com/
- Convert HDRIs to cubemaps using this tool: https://matheowis.github.io/HDRI-to-CubeMap/
- Always check licenses for resources found online. Thankfully, HDRIHaven has a CC0 license (free for even commercial use).


## 3D text

- To create text in ThreeJS we use the `TextGeometry` class.
- We can use fonts provided by ThreeJS (in the "examples/fonts" folder of the Three module).
- We can use our own fonts, but need to convert them to a typeface format with this tool: http://gero3.github.io/facetype.js/
- We also need to use a class called `FontLoader` (must be separately imported).
- We should always check we have the right to use a particular font (check license files).
- In creating text geometry we should be aware of bevels, curve segments, and other factors that affect performance.
- A quick way to centre text is with `textGeometry.center()`.
- Use materials like MatCaps to create nice looking styles for the text while the scene performant.


## Optimisation

- An effective way of monitoring how optimised the code/scene is is with `console.time()` and `console.timeEnd()`.
- Check how many milliseconds are taken to render certain functions and if we can speed this up.


## Going live

- Traditionally, we would put a site online with `npm run build` and upload the `dist` folder using FTP.
- We will use a modern hosting solution than this.
- The modern solution uses "continuous integration" (automation of testing, deployment, etc).
- Use services like Vercel, Netlify, Github Pages, and so on. Most have free plans (with limitations).
- Use Github or GitLab or Bitbucket for Git repositories for version control.


## Adding lights

- To add a light, we instantiate the relevant light class and add it to the scene.
- We have different light classes including `AmbientLight` (omnidirectional lighting).
- There's also `DirectionalLight` (sun-like effect with light rays in parallel).
- `HemisphereLight` is another light class. Similar to ambient light but with two colours for top and bottom.
- `PointLight` is an infinitesimally small light source that spreads in all directions. Looks like a lighter.
- `RectAreaLight` works like a box soft-light you see in photoshoots. Mixes directional and diffuse light.
- `SpotLight` works like a torch/flashlight.
- Lights can cost a lot when it comes to performance. There's even a limit in how many we can add (50?).
- We should add as few lights as possible and use less expensive lights.
- Minimal cost lights: ambient, hemisphere. Moderate cost: directional, point light. High cost: spotlight and rect area light.
- When we need to have a lot of lighting, use baking (the tradeoff is that we cannot move lighting of this sort).
- Positioning lights can be difficult. Use helpers.


## Shadows

- By default, we see a dark shadow in the back of objects. This is called a "core shadow".
- For realism, however, we may also want "drop shadows" — the silhouette of objects on a plane.
- Shadows have always been a challenge for developers to efficiently achieve.
- ThreeJS has an in-built solution: light renders stored as textures called "shadow maps".
- To activate shadows: `renderer.shadowMap.enabled = true`.
- Also enable the following: `sphere.castShadow = true`, `plane.receiveShadow = true`, and `directionalLight.castShadow = true`.
- By default the shadow map is 512x512. We can increase this (but keep it power of 2 for mipmap).
- Example: `directionalLight.shadow.mapSize.width = 1024` & `directionalLight.shadow.mapSize.height = 1024`.
- To help us debug, we can use the `CameraHelper` class. This corresponds to `directionalLight.shadow.camera`.
- For better optimisation/fewer glitches, adjust: `directionalLight.shadow.camera.near` & `directionalLight.shadow.camera.far`.
- Also reduce the amplitude by adjusting `top`, `right`, `bottom`, and `left`. This makes for crisper shadows. Experiment!
- To create a blur in the shadow, do this: `directionalLight.shadow.radius = 10;`
- There are different algorithms for shadow maps: https://threejs.org/docs/#api/en/renderers/WebGLRenderer.shadowMap
- `PCFShadowMap` is the default, but we can try `PCFSoftShadowMap` for better quality (at some cost to performance).
- "Baking" shadows, like baking lights, is a good solution. Use `TextureLoader` for this.
- If we want baked shadows that can move, we can create a plane under the shape and apply an alphamap texture to it.
- As for the solution we should use for shadows in a scene? Dynamic or baked? It very much depends on the project.
- A mix of both can work well. E.g, Simon's portfolio has a car with dynamic shadows (other element shadows are baked).


## Particles

- Particles can be used to create stars, smoke, rain, dust, fire, etc.
- We can have hundreds of thousands in our scene with a reasonable frame rate.
- Each particle is generated on each vertex of the geometry and always faces the camera.
- Creating particles is similar to creating a mesh, we need: geometry, a material, and a `Points` instance.
- Enable `sizeAttentuation` in the material for a sense of perspective (closer particles are bigger).
- Use `BufferGeometry` to create particles programmatically for better performance.
- We can add textures to our particles too. Useful resource: https://www.kenney.nl/assets/particle-pack
- When adding textures to particles, we can run into issues with rendering.
- One such rendering issue is when a texture is opaque and blots out particles behind it.
- We can solve this by enabling transparency and adding values to `alphaMap` and `alphaTest`.
- As well as texturing particles, we can animate them too.
- We can animate by looping through/updating particles geometry `attributes.position` array in the tick.
- However, this is computational expensive.
- A better way of animating textured particles is creating our own materials and shaders (later lessons).
- Use `lerp` for mixing colours.

## Performance tips

- For event listeners, use `onFinishChange` rather than `onChange`.
- Use `dispose` to remove any unnecessary geometry and material from the scene (to prevent memory leaks).
- Use `remove` to remove any unnecessary elements, such as points, from the scene (to prevent memory leaks).
- Use GPU profiling. See browser's dev tools to profile your app's performance. Look out for bottlenecks.
- Cull invisible objects/keep frustum culling enabled.
- Use texture atlases.
- Reduce the number of vertices — simplify models where possible.
