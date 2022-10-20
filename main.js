import './style.css'
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
    
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );
    const controls = new OrbitControls( camera, renderer.domElement );

    // add ambient light
    const ambientLight = new THREE.AmbientLight( 0xffffff, 0.5 );
    scene.add( ambientLight );

    // add directional light
    const directionalLight = new THREE.DirectionalLight( 0xffffff, 0.5 );
    directionalLight.position.set( 2, 2, 0 );
    scene.add( directionalLight );

    const geometry = new THREE.TorusGeometry( 1, 0.3, 16, 115 );
    const material = new THREE.MeshLambertMaterial( { color: 0x9A7A48 } );
    const torus = new THREE.Mesh( geometry, material );
    scene.add( torus );

    function animate() {
        requestAnimationFrame( animate );
        camera.position.x = 2;

        renderer.render( scene, camera );
    };
    animate();
