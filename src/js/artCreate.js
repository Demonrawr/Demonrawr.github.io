function pictureArt(path, xpos, ypos, zpos, rotate){	
	var geometry = new THREE.BoxGeometry( 30, 20, .05 );
	var cmaterial = new THREE.MeshBasicMaterial();
	cmaterial.map = THREE.ImageUtils.loadTexture(path);
	var cube = new THREE.Mesh( geometry, cmaterial );
	cube.position.y = ypos;
	cube.position.z = zpos;
	cube.position.x = xpos;
	if (rotate!=0){
		cube.rotation.y = (rotate*Math.PI/180);
	}
	scene.add( cube );
}