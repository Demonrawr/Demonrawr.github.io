function createObject(scene, path, xpos, ypos, zpos, rotates, scales) {
	var manager = new THREE.LoadingManager();
	manager.onProgress = function ( item, loaded, total ) {
		console.log( item, loaded, total );
	};
	
	var texture = new THREE.Texture();
		
	var loader = new THREE.ImageLoader( manager );
	loader.load( 'Lexus/Lexus/Lexus jpg.jpg', function ( image ) {
		texture.image = image;
		texture.needsUpdate = true;
	} );
	
	var loader = new THREE.OBJLoader( manager );
	loader.load( path, function ( objectTest ) {
		objectTest.traverse( function ( child ) {
			if ( child instanceof THREE.Mesh ) {
				child.material.map = texture;
			}
		} );
		objectTest.position.x = xpos;
		objectTest.position.y = ypos;
		objectTest.position.z = zpos;
		objectTest.rotation.y = (rotates);
		objectTest.scale.set(scales,scales,scales);
		scene.add( objectTest );
	}, onProgress, onError );
}
