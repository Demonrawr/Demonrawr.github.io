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
	
	// 3D Models
	
	var manager = new THREE.LoadingManager();
	manager.onProgress = function ( item, loaded, total ) {
		console.log( item, loaded, total );
	};
	var LexusTexture = new THREE.Texture();
	
	var onProgress = function ( xhr ) {
		if ( xhr.lengthComputable ) {
			var percentComplete = xhr.loaded / xhr.total * 100;
			console.log( Math.round(percentComplete, 2) + '% downloaded' );
		}
	};
	var onError = function ( xhr ) {
	};
	
	// Lexus Model

	createObject('Lexus/Lexus/Lexus jpg.jpg','Lexus/Lexus/lexus_hs.obj',10,.1,50,2);
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
	
	createObject('Coke/Cola.jpg','Coke/Coke.obj',0,0,-100,.5);
	
	//2D Art
	
	pictureArt("src/textures/cogswell.jpg", 0, 15, -15,0);
	pictureArt("src/textures/Traveler.jpg",50,15,-15,0);
	pictureArt("src/textures/Henry.jpg",100,15,-15,0);
	pictureArt("src/textures/Caroline.jpg",150,15,-15,0);
	pictureArt("src/textures/nobo.png",-65,15,21,-90)
	pictureArt("src/textures/sky3.jpg",-65,15,80,-90)
	pictureArt("src/textures/sky4.jpg",-25,15,135,0)
	pictureArt("src/textures/sky.jpg",50,15,135,0)
	//Environment
	
	//Floor
	
	geometry = new THREE.PlaneGeometry( 1000, 1000, 10, 10 );
	geometry.rotateX( - Math.PI / 2 );
	floorTexture = new THREE.TextureLoader().load( 'src/textures/wood.jpg' );
	floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping;
	floorTexture.repeat.set(100, 100);
	material = new THREE.MeshBasicMaterial({map: floorTexture}),
	mesh = new THREE.Mesh( geometry, material );
	scene.add( mesh );
	
	//Sky
	/*
	var sgeometry = new THREE.SphereGeometry(1000, 60, 40);
		var smaterial = new THREE.MeshBasicMaterial();
		smaterial.map = THREE.ImageUtils.loadTexture("src/textures/sky4.jpg");
		smaterial.side = THREE.BackSide;
		var skydome = new THREE.Mesh(sgeometry, smaterial);
		skydome.position.y = -105;
		scene.add(skydome);
	*/
	//Wall
	
	wallGenerator(150,0,140,-90); //+z brings back
	wallGenerator(350,0,10,-90);
	wallGenerator(-80,0,10,-90);
	wallGenerator(50,0,-30,0);
	wallGenerator(0,0,-200,0);
	wallGenerator(50,0,150,0);
	//wallGenerator(100,0,-30,0);
	
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