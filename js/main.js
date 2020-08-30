/* This file imports everything and sets the demo in motion */

/* Imports */
import { scene, camera, render } from "./threeBoilerplate.js"
import {} from "./fountain.js"
import { updateOnEachFrame } from './drops.js'

/* Position the camera in front of the fountain */
camera.position.z = 4;

/* Call the render function */
render(updateOnEachFrame)