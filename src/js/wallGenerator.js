function wallGenerator(x, y, z, r){
	var wgeometry = new THREE.BoxGeometry( 250, 75, 30 );
	var wmaterial = new THREE.MeshBasicMaterial();
	wmaterial.map = THREE.ImageUtils.loadTexture("src/textures/wall.jpg");
	var walls = new THREE.Mesh( wgeometry, wmaterial );
	walls.position.z = z;
	walls.position.x = x;
	walls.position.y = y;
	if (r>0 || r<0){
		walls.rotation.y=(r*Math.PI/180);
	}
	scene.add( walls );
	objects.push(walls);
}