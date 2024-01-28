import * as THREE from "three";

const data = {
  tiltX: [
    0.2, 0.5, 0.8, 1.2, 1.6, 1.9, 2.3, 2.6, 2.9, 3.2, 3.5, 3.9, 4.2, 4.5, 4.8,
    5.1, 5.4, 5.7, 6.0, 6.3,
  ],
  tiltY: [
    -0.3, -0.6, -0.9, -1.2, -1.5, -1.8, -2.1, -2.4, -2.7, -3.0, -3.3, -3.6,
    -3.9, -4.2, -4.5, -4.8, -5.1, -5.4, -5.7, -6.0,
  ],
  rotZ: [
    0.1, 0.4, 0.7, 1.0, 1.3, 1.6, 1.9, 2.2, 2.5, 2.8, 3.1, 3.4, 3.7, 4.0, 4.3,
    4.6, 4.9, 5.2, 5.5, 5.8,
  ],
};

const container = document.getElementById("model");

const containerWidth = container.clientWidth;
const containerHeight = container.clientHeight;

function updateRendererSize() {
  const rendererWidthVW = 30;
  const rendererHeightVH = 37;
  const rendererWidth = (rendererWidthVW * window.innerWidth) / 100;
  const rendererHeight = (rendererHeightVH * window.innerHeight) / 100;
  renderer.setSize(rendererWidth, rendererHeight);

  camera.aspect = rendererWidth / rendererHeight;
  camera.updateProjectionMatrix();
}

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(0, 0, 5); // Adjust camera position to view the scene
camera.lookAt(scene.position); // Make the camera look at the center of the scene

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // Soft white light
scene.add(ambientLight);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(containerWidth, containerHeight);
//append renderer to the container
container.appendChild(renderer.domElement);
const bodyHeight = 2;
const bodyRadius = bodyHeight * (2 / 5);
const bodyGeometry = new THREE.CylinderGeometry(
  bodyRadius,
  bodyRadius,
  bodyHeight,
  32
);
const bodyMaterial = new THREE.MeshBasicMaterial({ color: 0x47b6c5 });
const canSatBody = new THREE.Mesh(bodyGeometry, bodyMaterial);
canSatBody.position.set(0, 0, 0);

const edgeGeometry = new THREE.EdgesGeometry(bodyGeometry);
const edgeColor = new THREE.Color(0xffffff); // Set your desired edge color
const edgeHighlightMaterial = new THREE.ShaderMaterial({
  uniforms: {
    edgeColor: { value: edgeColor },
    thickness: { value: 0.008 }, // Adjust thickness of the edge color
    insideColor: { value: new THREE.Color(0x000000) }, // Inside color of the cylinder
  },
  vertexShader: `
        varying vec3 vNormal;

        void main() {
            vNormal = normalMatrix * normal;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
    `,
  fragmentShader: `
        uniform vec3 edgeColor;
        uniform float thickness;
        uniform vec3 insideColor;
        varying vec3 vNormal;

        void main() {
            float step = fwidth(dot(normalize(vNormal), normalize(vec3(0.0, 0.0, 1.0))));
            float edgeFactor = smoothstep(thickness - step, thickness + step, 1.0 - abs(dot(normalize(vNormal), normalize(vec3(0.0, 0.0, 1.0)))));
            gl_FragColor = mix(vec4(edgeColor, 1.0), vec4(insideColor, 1.0), edgeFactor);
        }
    `,
});

const edges = new THREE.LineSegments(edgeGeometry, edgeHighlightMaterial);

edges.position.set(0, 0, 0);
canSatBody.add(edges);

const gridHelper = new THREE.GridHelper(30, 30);
gridHelper.material = new THREE.LineBasicMaterial({ color: 0xcacaca });
gridHelper.position.set(0, 0, -5);
gridHelper.rotation.x = Math.PI / 2;
scene.add(gridHelper);
scene.add(canSatBody);
scene.background = new THREE.Color(0xefefef);
let dataIndex = 0;

function updateCanSat() {
  // Update tilt and rotation based on data from the CanSat
  canSatBody.rotation.x = data.tiltX[dataIndex];
  canSatBody.rotation.y = data.tiltY[dataIndex];
  canSatBody.rotation.z = data.rotZ[dataIndex];
  // Increment the index for the next set of data
  dataIndex = (dataIndex + 1) % data.tiltX.length;
}
//call the update function
updateRendererSize();
//listen to window resize event
window.addEventListener("resize", updateRendererSize);
// Function to render the scene
function render() {
  // Update CanSat based on new sensor data
  updateCanSat();

  // Render the scene with the camera
  renderer.render(scene, camera);
}

// Update the CanSat data every 1000 milliseconds (1 second)
setInterval(render, 1000);
