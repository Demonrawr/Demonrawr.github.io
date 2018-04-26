function createObject(pic, model, xpos, ypos, zpos, scale, r) {
	var Texture = new THREE.Texture();
	var smanager = new THREE.LoadingManager();
	smanager.onProgress = function ( item, loaded, total ) {
		console.log( item, loaded, total );
	};
	var onProgress = function ( xhr ) {
		if ( xhr.lengthComputable ) {
			var percentComplete = xhr.loaded / xhr.total * 100;
			console.log( Math.round(percentComplete, 2) + '% downloaded' );
		}
	};
	var onError = function ( xhr ) {
	};
	var lolloader = new THREE.ImageLoader( smanager );
		lolloader.load( pic, function ( image ) {
		Texture.image = image;
		Texture.needsUpdate = true;
	} );
	
	var cclolloader = new THREE.OBJLoader( smanager );
	cclolloader.load( model, function ( Obj ) {
		Obj.traverse( function ( child ) {
			if ( child instanceof THREE.Mesh ) {
				child.material.map = Texture;
			}
		} );
		Obj.position.x = xpos;
		Obj.position.y = ypos;
		Obj.position.z = zpos;
		Obj.scale.set(scale,scale,scale);
		if (r!=0){
			Obj.rotation.x=(r*Math.PI/180);
		}
		scene.add(Obj);
		tempo.push(Obj);
	}, onProgress, onError );
}
