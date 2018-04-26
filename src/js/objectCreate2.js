function createMTL(pat, mt, model, xpos, ypos, zpos, scale, r, ro) {
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
	
	var mtlLoader = new THREE.MTLLoader();
	mtlLoader.setBaseUrl( pat );
	mtlLoader.setPath( pat );
	mtlLoader.load( mt, function( materials ) {
		materials.preload();
		var objLoader = new THREE.OBJLoader();
		objLoader.setMaterials( materials );
		objLoader.setPath( pat );
		objLoader.load( model, function ( Obj ) {
			Obj.position.x = xpos;
		Obj.position.y = ypos;
		Obj.position.z = zpos;
		Obj.scale.set(scale,scale,scale);
		if (r!=0){
			Obj.rotation.x=(r*Math.PI/180);
		}
		if (ro!=0){
			Obj.rotation.y=(ro*Math.PI/180);
		}
			scene.add(Obj);
			
		}, onProgress, onError );
	});
}
