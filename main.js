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

    //add grid helper
    const gridHelper = new THREE.GridHelper(200, 50);
    scene.add(gridHelper);

    // add ambient light
    const ambientLight = new THREE.AmbientLight( 0xffffff, 0.5 );
    scene.add( ambientLight );

    // add directional light
    const directionalLight = new THREE.DirectionalLight( 0xffffff, 0.5 );
    directionalLight.position.set( 5, 15, 10 );
    scene.add( directionalLight );

    // add direfcional light helper
    const directionalLightHelper = new THREE.DirectionalLightHelper( directionalLight, 5 );
    scene.add( directionalLightHelper );

    //add torus
    const geometry = new THREE.TorusGeometry( 0.8, 0.3, 16, 115 );
    const material = new THREE.MeshLambertMaterial( { color: 0x9A7A48 } );
    const torus = new THREE.Mesh( geometry, material );
    scene.add( torus );

    // add sphere
    const sphereGeometry = new THREE.SphereGeometry( 100, 32, 32 );
    const sphereMaterial = new THREE.MeshLambertMaterial( { color: 0xb2b0bd } );
    sphereMaterial.side = THREE.BackSide;
    const sphere = new THREE.Mesh( sphereGeometry, sphereMaterial );
    scene.add( sphere );

    const cylinderGeometry = new THREE.CylinderGeometry( 10, 10, 0.2, 100 );
    const cylinderMaterial = new THREE.MeshLambertMaterial( {color: 0xfff1ce} );
    const cylinder = new THREE.Mesh( cylinderGeometry, cylinderMaterial );
    scene.add( cylinder );

    function animate() {
        requestAnimationFrame( animate );
        camera.position.y = 8;

        torus.position.x = 0;
        torus.position.y = 0;

        camera.lookAt(torus.position);

        renderer.render( scene, camera );
    };
    animate();
