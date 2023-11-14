## React & R3F hooks (**got help from GPT-4 to keep this succinct):

| Term                     | Definition                                                    |
|--------------------------|---------------------------------------------------------------|
| useState                 | Manages state variables in a functional component.            |
| useEffect                | Runs side effects in functional components, triggered by state or prop changes. |
| useContext               | Provides a way to share values like themes or user data across components without prop drilling. |
| useReducer               | Manages complex state logic in components with an action-dispatch mechanism. |
| useCallback              | Memoizes callback functions to prevent unnecessary re-renders. |
| useMemo                  | Memoizes complex calculations to optimise performance by reducing redundant processing. |
| useRef                   | References DOM elements or stores a mutable value that does not trigger re-renders. |
| useImperativeHandle      | Customises the instance value exposed to parent components when using ref. |
| useLayoutEffect          | Similar to useEffect, but fires synchronously after all DOM mutations, for measuring layout. |
| useDebugValue            | Used for displaying a label in React DevTools for custom hooks. |
| useThree (R3F)           | Provides access to the ThreeJS context, including renderer, scene, and camera. |
| useFrame (R3F)           | Used for creating animations or updates within the ThreeJS render loop. |
| useLoader (R3F)          | Efficiently loads and caches external assets like textures and models in ThreeJS. |
| useUpdate (R3F)          | Automatically updates ThreeJS objects when their props change. |
| useResource (R3F)        | Manages and reuses ThreeJS object instances efficiently.       |

## React general definitions:

| Term                         | Definition                                                   |
|------------------------------|--------------------------------------------------------------|
| JSX                          | JavaScript syntax extension allowing HTML in JavaScript code. |
| Component                    | Independent, reusable piece of UI.                           |
| Props                        | Object for passing data and event handlers to components.    |
| State                        | Data specific to a component, changes trigger re-renders.     |
| Context                      | Provides a way to share data across the component tree.       |
| Lifecycle Methods            | Special methods in class components for different phases of component's life. |
| Hooks                        | Functions letting functional components use state and lifecycle features. |
| Virtual DOM                  | Lightweight copy of the real DOM for efficient updates.       |
| Render                       | Process of updating the UI to match React elements.          |
| Higher-Order Component (HOC) | Function that takes a component and returns a new component, enhancing its features. |
| Functional Component         | Component defined by a function, can use hooks.              |
| Class Component              | Component defined by an ES6 class, can hold state and lifecycle methods. |
| Fragment                     | Group elements without adding extra nodes to the DOM.        |
| Key                          | Special string attribute used when creating lists of elements |
| Ref                          | Reference to a DOM element or a class component instance.    |
