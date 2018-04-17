function init() {
	camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 3000 );
	//Starting position X/Y Coordinates
	//camera.position.x= 10; 
	//camera.position.z= 15;
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
	var counter = 0;
	//Switch statement for user's input
	var onKeyDown = function ( event ) {
		switch ( event.keyCode ) {
			case 81:
				rotate = true;
				break;
			case 87: // w
				moveForward = true;
				counter++;
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
			
			case 38: // up
				carForward = true;
				break;
			case 37: // left
				carLeft = true; break;
			case 40: // down
				carBackward = true;
				break;
			case 39: // right
				carRight = true;
				break;
			case 32: // space
				//readTextFile("file:///C:/Users/Test/Desktop/Demonrawr.github.io/src/js/test.txt");
				if ( canJump === true ) 
				velocity.y += 350;
				canJump = false;
				break;
		}
	};
	
	var onKeyUp = function ( event ) {
		switch ( event.keyCode ) {
			case 81:
				rotate = false;
				break;
			case 87: // w
				moveForward = false;
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
			case 38: // up
				carForward = false;
				break;
			case 37: // left
				carLeft = false; 
				break;
			case 40: // down
				carBackward = false;
				break;
			case 39: // right
				carRight = false;
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
	
	/*
	// City models //
	var mtlLoader = new THREE.MTLLoader();
	mtlLoader.setBaseUrl( 'City/' );
	mtlLoader.setPath( 'City/' );
	mtlLoader.load( 'The_City.mtl', function( materials ) {
		materials.preload();
		var objLoader = new THREE.OBJLoader();
		objLoader.setMaterials( materials );
		objLoader.setPath( 'City/' );
		objLoader.load( 'City.obj', function ( object ) {
			object.position.y = -39;
			scene.add( object );
		}, onProgress, onError );
		
	});
	*/
	
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
		smaterial.map = THREE.ImageUtils.loadTexture("src/textures/sky2.jpg");
		smaterial.side = THREE.BackSide;
		var skydome = new THREE.Mesh(sgeometry, smaterial);
		scene.add(skydome);
		
	//Wall
	var geometry = new THREE.BoxGeometry( 20, 10, 1 );
	var cmaterial = new THREE.MeshBasicMaterial();
	cmaterial.map = THREE.ImageUtils.loadTexture("src/textures/cogswell.jpg");
	var cube = new THREE.Mesh( geometry, cmaterial );
	cube.position.y = 5;
	scene.add( cube );
	
	var wgeometry = new THREE.BoxGeometry( 400, 75, 1 );
	var wmaterial = new THREE.MeshBasicMaterial();
	wmaterial.map = THREE.ImageUtils.loadTexture("src/textures/wall.jpg");
	var cube2 = new THREE.Mesh( wgeometry, wmaterial );
	cube2.position.z = -30;
	scene.add( cube2 );
	
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
		scene.add( CokeB );
	}, onProgress, onError );
	
	

	renderer = new THREE.WebGLRenderer();
	renderer.setClearColor( 0xffffff );
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( window.innerWidth, window.innerHeight );
	document.body.appendChild( renderer.domElement );
	
	window.addEventListener( 'resize', onWindowResize, false );
	animate();
}