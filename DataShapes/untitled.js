
			import * as THREE from '../build/three.module.js';

			import Stats from './jsm/libs/stats.module.js';

			var renderer, scene, camera, stats;

			var sphere;

			var WIDTH = window.innerWidth;
			var HEIGHT = window.innerHeight;

			init();
			animate();

			function init() {

				camera = new THREE.PerspectiveCamera( 40, WIDTH / HEIGHT, 1, 10000 );
				camera.position.z = 300;

				scene = new THREE.Scene();

				var amount = 100000;
				var radius = 200;

				var positions = new Float32Array( amount * 3 );
				var colors = new Float32Array( amount * 3 );
				var sizes = new Float32Array( amount );

				var vertex = new THREE.Vector3();
				var color = new THREE.Color( 0xffffff );

				for ( var i = 0; i < amount; i ++ ) {

					vertex.x = ( Math.random() * 2 - 1 ) * radius;
					vertex.y = ( Math.random() * 2 - 1 ) * radius;
					vertex.z = ( Math.random() * 2 - 1 ) * radius;
					vertex.toArray( positions, i * 3 );

					if ( vertex.x < 0 ) {

						color.setHSL( 0.5 + 0.1 * ( i / amount ), 0.7, 0.5 );

					} else {

						color.setHSL( 0.0 + 0.1 * ( i / amount ), 0.9, 0.5 );

					}

					color.toArray( colors, i * 3 );

					sizes[ i ] = 10;

				}

				var geometry = new THREE.BufferGeometry();
				geometry.setAttribute( 'position', new THREE.BufferAttribute( positions, 3 ) );
				geometry.setAttribute( 'customColor', new THREE.BufferAttribute( colors, 3 ) );
				geometry.setAttribute( 'size', new THREE.BufferAttribute( sizes, 1 ) );

				//

				var material = new THREE.ShaderMaterial( {

					uniforms: {
						color: { value: new THREE.Color( 0xffffff ) },
						pointTexture: { value: new THREE.TextureLoader().load( "textures/sprites/spark1.png" ) }
					},
					vertexShader: document.getElementById( 'vertexshader' ).textContent,
					fragmentShader: document.getElementById( 'fragmentshader' ).textContent,

					blending: THREE.AdditiveBlending,
					depthTest: false,
					transparent: true

				} );

				//

				sphere = new THREE.Points( geometry, material );
				scene.add( sphere );

				//

				renderer = new THREE.WebGLRenderer();
				renderer.setPixelRatio( window.devicePixelRatio );
				renderer.setSize( WIDTH, HEIGHT );

				var container = document.getElementById( 'container' );
				container.appendChild( renderer.domElement );

				stats = new Stats();
				container.appendChild( stats.dom );

				//

				window.addEventListener( 'resize', onWindowResize, false );

			}

			function onWindowResize() {

				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();

				renderer.setSize( window.innerWidth, window.innerHeight );

			}

			function animate() {

				requestAnimationFrame( animate );

				render();
				stats.update();

			}

			function render() {

				var time = Date.now() * 0.005;

				sphere.rotation.z = 0.01 * time;

				var geometry = sphere.geometry;
				var attributes = geometry.attributes;

				for ( var i = 0; i < attributes.size.array.length; i ++ ) {

					attributes.size.array[ i ] = 14 + 13 * Math.sin( 0.1 * i + time );

				}

				attributes.size.needsUpdate = true;

				renderer.render( scene, camera );

			}

			d3.csv("/data/cities.csv", function(d) {
  return {
    city : d.city,
    state : d.state,
    population : +d.population,
    land_area : +d["land area"]
  };
}).then(function(data) {
  console.log(data[0]);
});