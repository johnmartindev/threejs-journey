# ThreeJS Journey Notes

I hope these notes will provide a useful record to look back on when applying knowledge to real-world projects!


## Contents

### 1. Basics
1.1   - First impressions of the course

1.2.1 - What is ThreeJS?

1.2.2 - Applications of the technology

1.2.3 - What is WebGL?

1.2.4 - Other libraries

1.3.1 - Default object positioning

1.3.2 - Using Three classes from modules

1.4.1 - Properties for transforming objects

1.4.2 - Groups

1.4.3 - Useful camera method: "lookAt"

1.5   - Animation

1.6.1 - Cameras

1.6.2 - Cursor position

1.6.3 - Built-in controls

1.6.4 - Instantiating orbit controls

### 2. Classic techniques

### 3. Advanced techniques

### 4. Shaders

### 5. Extra

### 6. Portal scene

### 7. React Three Fiber


## 1.1. - First impressions of the course

The main take-away from this introduction is that ThreeJS is now a stable, mature technology.
It is capable of producing a vast array of media for all sorts of projects (as seen on ThreeJs.org examples).

Simon warns that some parts of the course (particularly the section on shaders) causes a lot of people to struggle.
While difficult and/or boring, it's important to power through such content.

"If it's hard to learn, it's valuable knowledge"!

## 1.2.1 - What is ThreeJS?

- ThreeJS (or Three.js) is a 3D JavaScript library.
- It uses the MIT license.
- It was originally created by "Mr. Doob" (Ricardo Cabello) — now maintained by thousands of contributors.
- It enables developers to create 3D experiences for the web.
- It works with WebGL, but can also work with SVG and CSS (in limited ways).
- See the change logs on the Three.js Github repo for changes.

## 1.2.2 Applications of the technology

- Rich interactive imagery: https://www.oculus.com/medal-of-honor/?locale=en_GB
- Motion graphics: https://cornrevolution.resn.global/
- Product demonstrations: https://live.vanmoof.com/
- Selectable, animated maps: https://chartogne-taillet.com/en
- Flow field effects (particle effects)
- Videogames: https://heraclosgame.com/, https://letsplay.ouigo.es/
- ...and so much more.

## 1.2.3 - What is WebGL?

- WebGL is a JavaScript API.
- Can render triangles very efficiently.
- Results can be drawn in `<canvas>` element (HTML5).
- Compatible with most modern browsers.
- Uses the GPU which makes it really fast — can do thousands of parallel calculations.
- CPUs have multiple cores but typically JavaScript (in browser) uses one, so calculations occur one at a time (blocking).
- WebGL can be used for 2D as well, but we will focus on 3D.
- WebGL uses instructions called "shaders" to place points and draw pixels (to colourise and place).
- Native WebGL is hard. Drawing a single triangle on the canvas takes at least 100 lines of code.
- Three.js helps by offering a level of abstraction above WebGL — making it easier for us developers.

## 1.2.4 - Other libraries

- There are other WebGL libraries, but they aren't as popular and/or as stable and/or as versatile.
- Examples include: Babylon.js, Fab (formerly Sketchfab), Verge3D, and Unity.

## 1.3.1 - Default object positioning

- By default, an object is positioned in the middle of the scene.
- This means we must move the camera on the `Z` axis so we aren't viewing the scene from inside of the object.

## 1.3.2 - Using Three classes from modules

- When we use Three modules in Node, we need to run our project on a server.
- We can do this locally with Vite and debug with multiple devices connected to the same network address.
- Using Node gives us access to syntax like so: `import * as THREE from 'three'` (imports all ThreeJS core classes).

## 1.4.1 - Properties for transforming objects

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

## 1.4.2 - Groups

- To transform many objects at once we can use the `Group` class.
- This inherits from/is an instance of `Object3D`.
- Get into the habit of putting things in groups!

## 1.4.3 - Useful camera method: "lookAt"

- Ensures the camera looks exactly at the centre of a Vector3: `camera.lookAt(mesh.position)`.

## 1.5 - Animation

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

## 1.6.1 - Cameras

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

## 1.6.2 - Cursor position

- We use `event.clientX` and `event.clientY` (in event listener) to get the cursor position in `window` or `document.body`.
- However, to get the cursor position relative to the canvas size, we would use: `event.clientX / sizes.width`.
- Do the same with `clientX` and `sizes.height`.
- This means the mouse position goes from 0 to 1 as we move the mouse over the canvas left to right.
- To go from -0.5 to 0.5 (even better than 0 to 1), use `event.clientX / sizes.width - 0.5`.
- However, ThreeJS's Y goes up rather than down (like `clientY`), so we must invert.
- Invert like so: `-(event.clientY / sizes.height - 0.5)`.

## 1.63 - Built-in controls

- ThreeJS has built-in controls to save us time: https://threejs.org/docs/index.html?q=controls#examples/en/controls
- `FlyControls`. Allows us to move the camera like we're on a spaceship. Rotate on 3 axes, go back and forward.
- `FirstPersonControls`. Like `FlyControls` but has a fixed up axis. More like a bird — can't do a barrel roll.
- `PointerLockControls`. Uses pointer lock JavaScript API — keeps cursor hidden and centred. Not terribly useful.
- `OrbitControls`. Similar to controls we coded above. Rotate around a point, translate laterally, and zoom in/out.
- `TrackballControls`. Like `OrbitControls`, but no vertical angle limits. Rotate/spin even if the scene turns upside down.
- `TransformControls` and `DragControls`. Nothing to do with the camera. More about manipulating objects.

## 1.64 - Instantiating orbit controls

- To use the `OrbitControls` class we have to import it from a specific part of the `three` module.
- Import like so: `import { OrbitControls } from 'three/addons/controls/OrbitControls.js`.
- Some versions of ThreeJS instead have: `import { OrbitControls } from "three/examples/jsm/controls/OrbitControls`.
- By default, the orbit controls are centred. Change this with `controls.target.y = 1` (example) and `controls.update()`.

## 1.65 - Damping

- "Damping" is a term that refers to smoothing an animation by applying acceleration and friction.
- Thankfully, there's built-in damping. We don't have to code the formulae manually.
- We enable damping with something like: `controls.enableDamping = true`. Add `controls.update()` inside the tick function.

## 1.71 - Fullscreen and resizing

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

## 1.72 - Pixel ratio

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

## 1.81 - Geometries

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

## 1.82 - Buffer geometries

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

## 1.9 - Debug UI

- An efficient way of reviewing changes in real-time as we develop in ThreeJS is with debugging UIs/GUIs.
- We can create our own. However there are many existing importable libraries to save time.
- Some of these libraries include: "dat.GUI", "control-panel", "ControlKit", "Guify", "Ouify".
- dat.GUI is the most popular one.
- There are different elements we can add to dat.GUI panel: range, colour, text, checkbox, select, button, and folder.
- Within these elements, we have different parameters: minimum, maximum, and step (or precision).
- We can use chaining syntax like so: `gui.add(mesh.position, 'y').min(- 3).max(3).step(0.01).name('elevation')`.
- We should get into a habit of including debug UIs/GUIs in projects and adding tweaks to the panel as we go.


## 1.10 - Textures

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
- Also enable the following: `sphere.castShadow = true`, `plane.receiveShadow = true`, & `directionalLight.castShadow = true`.
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


## Normalizing values

- It's sometimes wise to normalize values so that everything has the the same range.
- A cursor's position on the screen might go from 0 to 1000, for example.
- However, if we make everything use a low value of -0.5 and a high value of 0.5, it simplifies development.
- For the cursor position, we implement it with something like this: `cursor.x = event.clientX / sizes.width - 0.5`


## Physics

- Physics can enhance the user experience with added realism, engagement, and immersion.
- There's many forces we can use like friction, gravity, buoyancy, tension, etc.
- However, writing these from scratch can be counterproductive. Use libraries where possible.
- If a 2D physics library is sufficient (projects where vertical axis aren't needed, e.g. pool game), we should use it.
- Ammo.js might be the most used physics library. However, Cannon.js is easier to implement and understand.
- Libraries like Cannon.js have their own virtual setup that's distinct from the ThreeJS scene.
- Cannon.js, for example, uses `Vec3` instead of `Vector3`, `Body` for objects, and so on.
- When these virtual elements of Cannon.js are updated, we need to update the ThreeJS scene to match it.
- Make sure to keep code organised because these projects can become messy fast.
- Keep in mind: `Box` in Cannon.js uses "half extent" rather than width, height, and depth. Double to normalise.
- For a more immersive experience, we may want to consider adding sound events.
- For a more maintained version of CannonJS, try Cannon-Es.
- To save ourselves time in writing code for both physical and virtual worlds, use "Physijs".


## Optimising physics

- Make sure the physics engine we're using is not set to use the default `NaiveBroadphase` algorithm.
- Use `GridBroadphase` or `SAPBroadphase` ("Sweep and Prune") instead. Much more efficient.
- A huge performance: enable `allowSleep`. This means a body isn't constantly tested (unless subject to sufficient force).
- Use "Workers" to improve frame-rate. These spread the processing load across the CPU.


## Importing models

- To create complex shapes, we should use dedicated 3D software for modelling. E.g. Blender, Cinema 4D, Maya, 3DS Max etc.
- There are many model formats: https://en.wikipedia.org/wiki/List_of_file_formats#3D_graphics
- Popular formats: OBJ, FBX, STL, PLY, COLLADA, 3DS, GLTF.
- GLTF is the standard and should cover most of our needs.
- GLTF supports different sets of data like geometries, materials, cameras, lights, animations, etc.
- GLTF sample models: https://github.com/KhronosGroup/glTF-Sample-Models
- There are different GLTF formats: gLTF, gLTF-Binary (.glb), gLTF-Draco, and gLTF-Embedded.
- GLTF are exported with PBR materials.
- Use the GLTF and ThreeJS loaders to import a GLTF. Use `console.log` to review its properties.
- You will see that it adds it as a `Group` scene (including children like a camera). We only want the mesh!
- We can do this by importing only the mesh children element. However, it's missing scale metadata.
- If the imported mesh without scale metadata is too big or small, fix this in 3D software and try again.
- Try Draco compression for high geometry counts. Check the size of model files.
- Draco allows for a much lighter model (applied to buffer data, i.e. geometry (stored in .bin)).
- Use the Draco decoder (it's written in Web Assembly and runs in a "worker").
- To use animation "actions" from the `AnimationClip`, we need to create an `AnimationMixer`.
- ThreeJS editor to test models: https://www.threejs.org/editor


## Raycaster

- A raycaster casts a ray in a specific direction and tests if objects intersect with it.
- For example: a laser gun hitting something, checking if an object is under the cursor? (simulating mouse events), etc.
- We set up raycaster in ThreeJS by instantiating the `Raycaster` class and setting origin and direction parameters.
- Be sure to normalize the direction parameter to 1 using the `normalize()` method.
- To cast a ray and get the intersection we can use either `intersectObject` (one object) or `intersectObjects` (multiple).
- Both of these return an object array with properties like `distance`, `face`, `faceIndex`, `object`, `point`, and `uv`.
- It can be computationally expensive to test objects on each frame. Use sparingly.
- We can raycast with 3D models we've imported as well as meshes.


## Custom models with Blender

- There's many 3D graphics software programs for modelling like Cinema4D, Maya, 3DSMax, Blender, ZBrush, etc.
- Blender is probably the best all-rounder given it's free, performant, light, cross-platform, etc.
- In using Blender, know how to truck, pedestal, dolly, tilt, pan (sidenote: a lot of people confuse "truck" and "pan").
- Blender shortcuts: https://docs.google.com/document/d/1wZzJrEgNye2ZQqwe8oBh54AXwF5cYIe56EGFe2bb0QU/edit
- `CTRL + TAB` is perhaps the most useful Blender shortcut (brings up a circular menu). Or `F3` for search.
- There are different modes like object and edit mode, different shading modes like solid, material, wireframe, etc.
- Have a familiarity with the UI and what the different panels are and what they contain.
- When working with materials, note "principled BSDF". It uses PBR so will look the same in ThreeJS as in Blender.
- "Eevee" is the default render engine in Blender. It works in real-time using GPU. Performant but not too realistic.
- "Workbench" is another render engine, but it's a bit dated now — only really suitable for specific use-cases/effects.
- "Cycles" is another one. It uses raytracing which is great for shadows, reflections, etc. Not as performant as Eevee.
- When modelling, decide on a unit scale. Go to scene properties and change it to "none" if you prefer.
- Always scale in "edit" mode to keep the scale of the object 1.
- There are many resources to learn Blender. Just make sure the tutorials use Blender beyond version 2.8.
- Blender's Official Youtube channel', Blender Guru (Youtube), Grant Abbit (Youtube), CGFastTrack (Youtube) are among the best.


## Environment maps

- Environment maps, as mentioned previously, can be used as a background, as reflections, and as lighting.
- There are different styles and formats for environment maps: LDR (JPEGs, PNGs, etc.) and HDR (HDR, EXR, RAW, etc.).
- Different styles and formats require different loaders.
- An HDRI equirectangular environment map (.hdr file), for example, needs a RGBE (red green blue exponent) loader.
- The RGBE loader encodes for HDR and allows for colour values with a much higher range than traditional images.
- While HDR maps look great, they can be heavy. Best to reserve for lighting where you can get away with a low res texture.
- Use the transverse method to update all models at once with the ability to do a single `dat.gui` for it all.
- Use `backgroundBlurriness` and `backgroundIntensity` tweaks to find suitable values.


## Custom environment maps

- We can make our own environment maps with Blender, but first need to adjust some values in the properties panel.
- We should first specify the "cycles" render engine for more realistic renders.
- Viewport samples should be set to a max of 256 (can be high with a higher performance computer).
- In materials, set the surface colour to black.
- In output, set resolution to 2048x1024 (stick to power of 2 resolutions).
- Change the % scale to test rendering at different resolutions 50% would render half the resolution, for example.
- Add a camera and make it panoramic => equirectangular (or whichever map format needed).
- Add an area light. Make sure its visible to the renderer (ray visibility => camera (enable this)).
- We could also make custom environment maps with AI. "NVIDIA Canvas" is a tool for this.
- Keep in mind some of these tools export to EXR format which needs a different loader.
- BlockadeLabs.com is a useful tool for creating environment maps, but look out for pricing (some free, some not).
- As well as regular skyboxes, we can have "Ground Projected" skyboxes.
- However, ground projected skyboxes aren't suitable for maps with objects close to the centre.
- When we render into a cube texture, we need to use `WebGLCubeRenderTarget`. A resolution of 256 is ideal.
- Sometimes objects will occlude others and we can get around this with layers.
- By setting layers on a camera, the camera will only see objects matching the same layers.
- For example, a camera with layers set to 1 and 2 will only see objects with layers set to 1 and 2.
- All layers are 0 by default. Think of it like Z-index in CSS.


## Realistic renders

- In producing 3D projects, sometimes the goal is realism. Perhaps we're showcasing a real-life product on a website.
- One way to achieve this (seen above) is with an environment map, e.g. HDR equirectangular texture (for better lighting).
- Tone mapping is another way to achieve realism. It "fakes" the conversion of LDR to HDR.
- There are different `toneMapping` properties/types: Linear, Reinhard, Cineon, and ACESFilmic.
- We can adjust how strong this tone map will be with `toneMappingExposure`.
- Another step for adding realism to our scene is enabling "anti-aliasing". This removes staircasing artefacts/jagged edges.
- In comp-sci there's different anti-aliasing solutions. One is super sampling (SSAA) AKA. "fullscreen sampling" (FSAA).
- Super sampling makes a bigger render and compares it to the normal-sized render. Pixel value averages are taken.
- Super sampling uses 4 times more pixels, so watch for performance issues!
- Multi-sampling is another anti-aliasing solution. It averages pixels from its neighbours.
- We can do antialiasing in ThreeJS by adding `antialias: true` to the renderer.
- Screens with a pixel ratio above 1 don't really need antialias.
- Since environment maps cannot cast shadows we need to add a light that roughly matches the environment lighting.
- We do this with a directional light. Remember if we adjust the position of this we have to apply `updateWorldMatrix()`.
- By default, however, ThreeJS lighting isn't realistic.
- We can fix this by setting `useLegacyLights` to false. Best to do this at the start of a realistic scene project.
- Another step for adding realism is with shadows on with shadowMap: `renderer.shadowMap.enabled = true`.
- PCFShadowMap should be chosen as the type: `renderer.shadowMap.type = THREE.PCFShadowMap`;
- For sharper shadows, increase mapsize from the default 512x512, e.g. `directionalLight.shadow.mapSize.set(1024, 1024)`.
- Colorspace is another important consideration for achieving realism. It's how colours are optimised.
- If a texture looks washed out, it may be the case that it needs a different colour space (`colorSpace`) applied to it.
- GLTF imports contain metadata that specifies sRGB colourspace, so may not need to be changed.
- Make sure you're using a good screen/monitor with colour accuracy. Apple Macs are usually good.
- Also, keep in mind we can spend too much time on a scene and lose perspective. Take breaks and look again with fresh eyes.
- Ask others for feedback.
- Something else to be aware of when using models is "shadow acne" (weird shadow patterns).
- We can fix shadow acne with `bias` for flat surfaces and `normalBias` for rounded surfaces.
- Lastly, we can use other techniques like ambient occlusion, bloom, etc. but these require post-processing (later lesson).


## Code structuring for bigger projects

- A professional project should contain a maintainable codebase. Part of this is organisation.
- Unorganised (spaghetti) code is hard to find, hard to re-use specific parts, liable to conflicts, etc.
- What we need to do is implement a separation of concerns (SoC) with modularisation and encapsulation.
- In order to do this, we should use a bundler like Vite or Webpack.
- JavaScript can handle modules natively now, but it's not universally compatible yet and doesn't manage dependencies.
- When using modules, we can use the "tree-shakable" approach of only importing what we need from modules.
- This is lighter, but it makes code much more verbose and potentially messy.
- In terms of how to structure the code in each module, we can use classes or functions.
- The base class (the main app) should be called something expressive like "Experience.js".
- Keep all modules within their own folders, so "Experience.js" would be in the "Experience" folder.
- In the Experience folder, we could also have a "Utils.js" class for methods dealing with resizing, etc.
- Personal preferences of ourselves and our team factor into code structuring/conventions.
- For example, using an instance of "Experience" as a global variable may be seen as unacceptable to certain developers.


## Shaders

- Shaders is probably the most demanding topic within learning WebGL and ThreeJS.
- Everything showing up in the WebGL render is made possible because of shaders.
- Native WebGL requires we know shaders.
- We can create our own. They are written in GLSL.
- GLSL is sent to the GPU and (1) gets the position of each vertex in geometry (2) colorises each visible pixel.
- "Pixel" isn't quite the right word, though. Technically we are talking about "fragments".
- We send a lot of data to the shader: mesh transformations, information about the camera, colours, textures, etc.
- There are two types of shaders: (1) vertex shader (2) fragment shader.
- The vertex shader deals with vertices coordinates, mesh transformations, and so on. The GPU follows these instructions.
- Some data like vertex position will be different. This type of data is the "attribute".
- Some data like the position of the mesh are the same for every vertex. This type of data is the "uniform".
- We can send data from the vertex shader to the fragment shader. These values are interpolated. This is call "varying".
- Why would we write our own shaders at all? ThreeJS materials are limited and we can add custom post-processing.


## Creating a custom shader with GLSL

- To create our own shaders in ThreeJS, we can use the classes: (1) `ShaderMaterial` and (2) `RawShaderMaterial`.
- `ShaderMaterial` has some code automatically added to the shader codes, where `RawShaderMaterial` does not.
- We can write shader programs in code that's inline with JavaScript using template literals.
- However, it's best to not write inline code, but to separate GLSL into their own files with syntax highlighting.
- We need a plugin to import these GLSL in the likes of Vite. One is `vite-plugin-glsl`.
- Note: GLSL does not support logs or prints,
- GLSL is white-space insensitive, so indentation is not important.
- GLSL requires semicolons to delimit lines of code.
- GLSL is a typed language. We must specify the variable type immediately: `float`, `int`, `string`, etc.
- A type that we'll commonly see in GLSL is `vec2`. This has two values: x, y (coordinates).
- We can change values after their assignment. `vec2 someVect = vec2(0.1, 0.2);` `someVect.x = 1.1;` will change it.
- `vec3` is like `vec2` but with an additional value: x, y, z (coordinates) or r, g, b (colour values).
- We can make `vec3` from mutating a `vec2` by adding an additional value. This is called "swizzling".
- `vec4` is like `vec3` but with a 4th value: x, y, z, and w (coordinates) or r, g, b, and a (colour + alpha).
- There are other types like `mat2`, `mat3`, `mat4`, `sample2D`, but we'll deal with these later.
- In GLSL, we can create functions. However, these must start with the type of value that will be returned.
- There are built-in basic functions like `sin`, `cos`, `max`, `min`, `pow`, `exp`, `mod`, `clamp`, etc.
- There are also more specialised functions like `cross`, `dot`, `mix`, `stop`, `smoothstep`, `length`, `distance`, etc.
- There's no beginner-friendly documentation, but try "Shaderific", "Kronos Group Registry", and "Book of Shaders".


## Vertex shader

- The vertex shade needs a function beginning `void main()`. This is called automatically and doesn't return anything.
- A `gl_Position` will be set with model matrix values and any modifications.
- We're working in `vec4` because of something called the "clip space" which has a 4th value (one we don't deal with).
- There are some components to be aware of:
- `modelMatrix` applies transformations relative to the mesh (position, rotation, scale).
- `viewMatrix` applies transformations relative to the camera (position, rotation, fov, near, and far).
- `projectionMatrix` transforms the coordinates into the clip space coordinates.


## Fragment shader

- When working with the raw shader, we have to set a float precision value.
- The precision can be `highp` (beware of performance hit), `mediump`, or `lowp` (buggy on some devices).
- We usually use `mediump` to avoid too many issues.
- `gl_fragColor` already exists and assigns colour using a `vec4` for r, g, b, a.
- We can add our own attributes to `BufferGeometry`.
- We cannot send attributes to the fragment, but we can send to the vertex to the fragment using "varying".
- We can use uniforms in both vertex and fragment shader. It's data that doesn't change between vertices.


## Shader patterns

- In creating shaders, we can create specific patterns like stars, circles, light lenses, waves, etc.
- Using textures to do this can get heavy and we'll have less control.
- We can do it programmatically by using UV coordinates to manipulate the fragment shader.
- However, we cannot send UV coordinates directly to the fragment shaders.
- We need to pass UV coordinates to the vertex shader and then to the fragment shader using "varying".
- In creating shader patterns, avoid using "if else" statements. These are computationally expensive.
- Instead, use GLSL methods like `step`, `mod`, etc.
- If we need to use random values, we should bear in mind there is no native random functions in GLSL.
- Use the following resource to add a randomiser function: https://thebookofshaders.com/10/
- To add more "natural" randomness, we should consider "Perlin noise": https://thebookofshaders.com/11/


## Particles revisited: tips

- Use shaders for efficiency and performance (rather than animating each vertex of geometry with the CPU).
- Use randomness in your particles. If you don't, it looks fake. In real life, particles are random sizes.
- The size of particles depends on pixel ratio. Use `renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))`.
- Size attenuation should be implemented. However, it's not as easy as setting an object value to "true".
- In ThreeJS's source code, there's an attenuation formula that can be adapted: `gl_PointSize *= ( scale / - mvPosition.z );`.
- Check ThreeJS source code for any other formulae we might need in shaders. Copy, paste, and adapt it.


## Modifying materials

- As well as creating brand new shader materials, we can modify built-in ThreeJS ones.
- Perhaps we want to add vertex animations to MeshStandardMaterial?
- We can do this by either using a ThreeJS hook that is triggered before compilation or recreating the material.
- Or recreating a ThreeJS material. Although, this would take a long time. We would have to handle lights, env. maps, etc.
- Using a ThreeJS hook is the best approach in most cases: `material.onBeforeCompile = (shader) => {}`.
- This code snippet gives us access to vertex and fragment shader information.
- For more information on 2D matrices and how to transform them, read: https://thebookofshaders.com/08/


## Post processing

- Post-processing is about adding effects on the final image (the render).
- People mostly use this technique in filmmaking, but we can do it in WebGL too.
- We can adjust depth of field, bloom, "god ray", motion blur, add glitch effects, outlines, change colours, etc.
- A common way to do post processing with ThreeJS is with the `RenderTarget`.
- The RenderTarget works like a buffer of sorts. Instead of rendering to the canvas, it renders to a texture first.
- This texture is then able to have effects added to it through the fragment shader.
- The effects we apply in post processing are called "passes".
- We can add multiple passes, but each pass reduces performance!
- We need two render targets for multiple passes.
- This allows us to read on one and write on the other and switch between (ping pong buffering).
- Fortunately, we don't have to worry about doing this manually. `EffectComposer` takes care of it.
- Keep an eye on performances when using post processing!
- Manual: https://threejs.org/docs/#manual/en/introduction/How-to-use-post-processing
- Examples: https://threejs.org/examples/#webgl_postprocessing
- Issues that might need fixed: resizing effects composer, gamma pass for reducing darkness in RGB shift, and anti-aliasing.


## Anti-aliasing passes

- FXAA: Performant, but the result is just "okay" (can be blurry).
- SMAA: Usually better than FXAA, but less performant — not to be confused with MSAA.
- SSAA: Best quality but the worst performance.
- TAA: Performant but limited result.
- There are many others, but these are the main ones.


## Performance tips II

- We know we should target a 60fps experience (at least).
- However, we should consider performance in terms of the CPU and the GPU.
- We can do this with an FPS meter, such as "stats.js": `npm install stats.js`.
- Disable FPS-limiting on Chrome: https://gist.github.com/brunosimon/c15e7451a802fa8e34c0678620022f7d
- Test on an array of devices, browsers, etc. and keep an eye on the weight of the website.
- Minimise "draw calls" (actions of the GPU). The less of them, the better the performance.
- Spector.js is a good Chrome extension for monitoring draw calls.
- To get a count of triangles, lines, points, etc., we can use this: `console.log(renderer.info`
- Write efficient JavaScript — especially in the tick function.
- Dispose of things: https://threejs.org/docs/#manual/en/introduction/How-to-dispose-of-objects
- Avoid lights if possible, but if you have to use them use cheap lights like ambient and hemisphere lights.
- Use baked shadows when shadows are needed.
- Use a smaller shadow map.
- Use castShadow and receiveShadow wisely.
- Deactivate shadow update (shadow on first frame only):
- `renderer.shadowMap.autoUpdate = false` and `renderer.shadowMp.needsUpdate = true`.
- Use small textures and resize your texture as small as possible. Also, keep power of 2 resolutions for mipmaps.
- Use buffer geometries. Merge geometries using `BufferGeometryUtils`.
- Create an `InstancedMesh`.
- Use Draco compression on complex models. Use Gzip compression on assets.
- Lower FOV, lower range between near and far, and use frustum culling.
- Keep pixel ratios at 2 or less.
- Only use anti-alias when need be.
- Limit passes on post-processing. Perhaps merge passes when multiple passes are needed.
- Consider `lowp` precision for lower performance devices when implementing shaders.
- Avoid "if" statements when working with shaders. Use methods like `clamp()` instead.
- Considering using a texture representing the likes of Perlin noise than having it generate programmatically.
- Use "defines" in GLSL code.
- Do calculations in the vertex shader. Pass the result to fragment shader with varyings (rather than in fragment shader).
- Test with bad bandwidth simulation (use Chrome devtools — make sure "disable cache" is checked).
