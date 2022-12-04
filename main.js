import './style.css'
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
    camera.position.set(15, 5, 10);

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );

    const controls = new OrbitControls( camera, renderer.domElement );

    //add grid HELPER
    const gridHelper = new THREE.GridHelper(200, 50);
    scene.add(gridHelper);

    // add ambient light
    const ambientLight = new THREE.AmbientLight( 0xffffff, 0.5 );
    scene.add( ambientLight );

    // add directional light
    const directionalLight = new THREE.DirectionalLight( 0xffffff, 1 );
    directionalLight.position.set( 8, 15, 10 );
    scene.add( directionalLight );

    // add direfcional light helper
    const directionalLightHelper = new THREE.DirectionalLightHelper( directionalLight, 5 );
    scene.add( directionalLightHelper );

    //add HOUSE

    //load texture
    const texture = new THREE.TextureLoader().load( "/textures/wall.png" );

    //add house box
    const boxGeometry = new THREE.BoxGeometry( 8, 3, 5);
    const boxMaterial = new THREE.MeshLambertMaterial( { color: 0xebd7c2, side: THREE.DoubleSide } );
    boxMaterial.map = texture;
    const box = new THREE.Mesh( boxGeometry, boxMaterial );
    box.position.x = 0;
    box.position.y = 1.5;
    scene.add( box );

    //add roof
    const shape = new THREE.Shape();

    shape.moveTo( 0, 3);
    shape.lineTo( 3, 2);
    shape.lineTo( -3,  2);

    const TriangleGeometry = new THREE.ShapeGeometry(shape);
    const Triangle = new THREE.Mesh( TriangleGeometry, boxMaterial );
    Triangle.position.x = 4;
    Triangle.position.y = 1;
    Triangle.rotation.y = Math.PI / 2;
    scene.add( Triangle );

    const Triangle2 = new THREE.Mesh( TriangleGeometry, boxMaterial );
    Triangle2.position.x = -4;
    Triangle2.position.y = 1;
    Triangle2.rotation.y = Math.PI / 2;
    scene.add( Triangle2 );

    //roof planes
    const planeGeometry = new THREE.PlaneGeometry( 8, 6);
    const planeMaterial = new THREE.MeshLambertMaterial( { color: 0xffffff, side: THREE.DoubleSide } );
    const plane = new THREE.Mesh( planeGeometry, planeMaterial );
    plane.position.x = 0;
    plane.position.y =3;
    plane.rotation.x = Math.PI / 2;
    scene.add( plane );

    const rooftexture = new THREE.TextureLoader().load( "/textures/roof.jpg" );

    const planeGeometry2 = new THREE.PlaneGeometry( 8.5, 3.18);
    planeMaterial.map = rooftexture;
    const RoofPane1 = new THREE.Mesh( planeGeometry2, planeMaterial );
    RoofPane1.position.z = 1.5;
    RoofPane1.position.y = 3.5;
    RoofPane1.rotation.x = 1.8925;
    scene.add( RoofPane1 );

    const planeGeometry3 = new THREE.PlaneGeometry( 8.5, 3.18);
    const RoofPane2 = new THREE.Mesh( planeGeometry3, planeMaterial );
    RoofPane2.position.z = -1.5;
    RoofPane2.position.y = 3.5;
    RoofPane2.rotation.x = -1.8925;
    scene.add( RoofPane2 );

    //add door
    const doorGeometry = new THREE.BoxGeometry( 1, 2, 0.1);
    const doorMaterial = new THREE.MeshLambertMaterial( { color: 0xffffff, side: THREE.DoubleSide } );
    doorMaterial.map = rooftexture;
    const door = new THREE.Mesh( doorGeometry, doorMaterial );
    door.position.x = 4;
    door.position.y = 1.1;
    door.position.z = -.7;
    door.rotateY( Math.PI / 2 );
    scene.add( door );

    //add window1
    const window1Geometry = new THREE.BoxGeometry( 1, 1, 0.1);
    const window1Material = new THREE.MeshLambertMaterial( { color: 0xffffff, side: THREE.DoubleSide } );
    window1Material.map = rooftexture;
    const window1 = new THREE.Mesh( window1Geometry, window1Material );
    window1.position.x = 4;
    window1.position.y = 2;
    window1.position.z = 1;
    window1.rotateY( Math.PI / 2 );
    window1.rotateZ( Math.PI / 2 );
    scene.add( window1 );

    // add tree-island around the house
    const loader = new GLTFLoader();
    loader.load( '/objects/tree_island.gltf', function ( island ) {
        island.scene.position.x = 0;
        island.scene.position.y = 0;
        island.scene.position.z = -3;
        island.scene.scale.set(10, 10, 10);
        island.scene.rotateY( Math.PI / 2 );
        scene.add( island.scene );
    }, undefined, function ( error ) {
        console.error( error );
    } );

    // add BACKGROUND
    const sphereGeometry = new THREE.SphereGeometry( 100, 32, 32 );
    const sphereMaterial = new THREE.MeshLambertMaterial( { color: 0xb2b0bd } );
    sphereMaterial.side = THREE.BackSide;
    const sphere = new THREE.Mesh( sphereGeometry, sphereMaterial );
    scene.add( sphere );

    // add cilinder GROUND
    // const cylinderGeometry = new THREE.CylinderGeometry( 10, 10, 0.2, 100 );
    // const cylinderMaterial = new THREE.MeshLambertMaterial( {color: 0xd4f273} );
    // const cylinder = new THREE.Mesh( cylinderGeometry, cylinderMaterial );
    // scene.add( cylinder );

    function animate() {
        requestAnimationFrame( animate );


        camera.lookAt(box.position);

        renderer.render( scene, camera );
    };
    animate();