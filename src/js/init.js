function init() {
	camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 3000 );
	scene = new THREE.Scene();
	scene.fog = new THREE.Fog( 0xffffff, 10, 1100 );
	var light = new THREE.HemisphereLight( 0xeeeeff, 0x777788, 0.75 );
	light.position.set( 0.5, 1, 0.75 );
	scene.add( light );
	var light1 = new THREE.DirectionalLight( 0xffffff, .3 );
	light1.position.set( -1, 1.75, 1 );
	scene.add( light1 );
	controls = new THREE.PointerLockControls( camera );
	scene.add( controls.getObject() );
	
	//Switch statement for user's input
	var onKeyDown = function ( event ) {
		switch ( event.keyCode ) {
			case 87: // w
				moveForward = true;
				break;
			case 65: // a
				moveLeft = true; 
				break;
			case 83: // s
				moveBackward = true;
				break;
			case 68: // d
				moveRight = true;
				break;
			case 32: // space
				if ( canJump === true ) 
				velocity.y += 350;
				canJump = false;
				break;
		}
	};
	
	var onKeyUp = function ( event ) {
		switch ( event.keyCode ) {
			case 87: // w
				moveForward = false;
				moveBackward = false;
				break;
			case 65: // a
				moveLeft = false; 
				break;
			case 83: // s
				moveBackward = false;
				break;
			case 68: // d
				moveRight = false;
				break;
			case 32: // space
				if ( canJump === false ) velocity.y += 350;
				canJump = false;
				break;
		}
	};
	
	document.addEventListener( 'keydown', onKeyDown, false );
	document.addEventListener( 'keyup', onKeyUp, false );
	raycaster = new THREE.Raycaster( new THREE.Vector3(), new THREE.Vector3( 0, - 1, 0 ), 0, 10 );
	
	
	// objects
	
	var manager = new THREE.LoadingManager();
	manager.onProgress = function ( item, loaded, total ) {
		console.log( item, loaded, total );
	};
	var LexusTexture = new THREE.Texture();
	var CokeTexture = new THREE.Texture();
	
	var onProgress = function ( xhr ) {
		if ( xhr.lengthComputable ) {
			var percentComplete = xhr.loaded / xhr.total * 100;
			console.log( Math.round(percentComplete, 2) + '% downloaded' );
		}
	};
	var onError = function ( xhr ) {
	};
	
	// Lexus texture
	
	var loader = new THREE.ImageLoader( manager );
	loader.load( 'Lexus/Lexus/Lexus jpg.jpg', function ( image ) {
		LexusTexture.image = image;
		LexusTexture.needsUpdate = true;
	} );
	
	
	// Car models //
	
	// Lexus
	var loader = new THREE.OBJLoader( manager );
	loader.load( 'Lexus/Lexus/lexus_hs.obj', function ( object1 ) {
		object1.traverse( function ( child ) {
			if ( child instanceof THREE.Mesh ) {
				child.material.map = LexusTexture;
			}
		} );
		object1.position.x = 10;
		object1.position.y= 0.1;
		object1.position.z= 50;
		object1.rotation.y=(-115*Math.PI/180);
		object1.scale.set(2,2,2);
		scene.add( object1 );
		car = object1;
		objects.push(object1);
	}, onProgress, onError );
	
	// Ship
	var mtlLoader = new THREE.MTLLoader();
	mtlLoader.setBaseUrl( 'Kameri/' );
	mtlLoader.setPath( 'Kameri/' );
	mtlLoader.load( 'Kameri_explorer_flying.mtl', function( materials ) {
		materials.preload();
		var objLoader = new THREE.OBJLoader();
		objLoader.setMaterials( materials );
		objLoader.setPath( 'Kameri/' );
		objLoader.load( 'Kameri explorer flying.obj', function ( object3 ) {
			object3.position.y=10;
			object3.position.x=1.3;
			object3.position.z=150;
			scene.add( object3 );
			ship = object3;
		}, onProgress, onError );
	});
	
	//Floor
	
	geometry = new THREE.PlaneGeometry( 4000, 4000, 10, 10 );
	geometry.rotateX( - Math.PI / 2 );
	floorTexture = new THREE.TextureLoader().load( 'src/textures/wood.jpg' );
	floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping;
	floorTexture.repeat.set(200, 200);
	material = new THREE.MeshBasicMaterial({map: floorTexture}),
	mesh = new THREE.Mesh( geometry, material );
	scene.add( mesh );
	
	//Sky
	var sgeometry = new THREE.SphereGeometry(1000, 60, 40);
		var smaterial = new THREE.MeshBasicMaterial();
		smaterial.map = THREE.ImageUtils.loadTexture("src/textures/sky4.jpg");
		smaterial.side = THREE.BackSide;
		var skydome = new THREE.Mesh(sgeometry, smaterial);
		skydome.position.y = -105;
		scene.add(skydome);
		
	//Wall
	var geometry = new THREE.BoxGeometry( 20, 10, 5 );
	var cmaterial = new THREE.MeshBasicMaterial();
	cmaterial.map = THREE.ImageUtils.loadTexture("src/textures/cogswell.jpg");
	var cube = new THREE.Mesh( geometry, cmaterial );
	cube.position.y = 5;
	scene.add( cube );
	objects.push(cube);
	
	var wgeometry = new THREE.BoxGeometry( 400, 75, 15 );
	var wmaterial = new THREE.MeshBasicMaterial();
	wmaterial.map = THREE.ImageUtils.loadTexture("src/textures/wall.jpg");
	var wall1 = new THREE.Mesh( wgeometry, wmaterial );
	wall1.position.z = -30;
	wall1.position.x = -100;
	wall1.rotation.y=(-90*Math.PI/180);
	scene.add( wall1 );
	objects.push(wall1);
	
	var wgeometry = new THREE.BoxGeometry( 400, 75, 15 );
	var wmaterial = new THREE.MeshBasicMaterial();
	wmaterial.map = THREE.ImageUtils.loadTexture("src/textures/wall.jpg");
	var wall2 = new THREE.Mesh( wgeometry, wmaterial );
	wall2.position.z = -30;
	wall2.position.x = 100;
	wall2.rotation.y=(-90*Math.PI/180);
	scene.add( wall2 );
	objects.push(wall2);
	
	var wgeometry = new THREE.BoxGeometry( 400, 75, 15 );
	var wmaterial = new THREE.MeshBasicMaterial();
	wmaterial.map = THREE.ImageUtils.loadTexture("src/textures/wall.jpg");
	var wall2 = new THREE.Mesh( wgeometry, wmaterial );
	wall2.position.z = -30;
	wall2.position.x = 100;
	scene.add( wall2 );
	objects.push(wall2);
	
	//2D Art
	var geometry = new THREE.BoxGeometry( 30, 15, .05 );
	var cmaterial = new THREE.MeshBasicMaterial();
	cmaterial.map = THREE.ImageUtils.loadTexture("src/textures/traveler.jpg");
	var art1 = new THREE.Mesh( geometry, cmaterial );
	art1.position.y = 15;
	art1.position.z = -22;
	scene.add( art1 );
	objects.push(art1);
	
	//Coke
	var cokeloader = new THREE.ImageLoader( manager );
	cokeloader.load( 'Coke/Cola.jpg', function ( image ) {
		CokeTexture.image = image;
		CokeTexture.needsUpdate = true;
	} );
	
	var ccloader = new THREE.OBJLoader( manager );
	ccloader.load( 'Coke/Coke.obj', function ( CokeB ) {
		CokeB.traverse( function ( child ) {
			if ( child instanceof THREE.Mesh ) {
				child.material.map = CokeTexture;
			}
		} );
		CokeB.position.z = -100;
		scene.add(CokeB);
		cokemodel = CokeB;
	}, onProgress, onError );
	
	
	renderer = new THREE.WebGLRenderer();
	renderer.setClearColor( 0xffffff );
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( window.innerWidth, window.innerHeight );
	document.body.appendChild( renderer.domElement );
	document.addEventListener( 'mousemove', onDocumentMouseMove, false );
	
	window.addEventListener( 'resize', onWindowResize, false );
	animate();
}
function onDocumentMouseMove( event ) {
				event.preventDefault();
				mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
				mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
			}