function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize( window.innerWidth, window.innerHeight );
}
function animate() {
	
	if ( controlsEnabled ) {
		
		raycaster.setFromCamera( mouse, camera );
		var intersects = raycaster.intersectObjects( scene.children );
		var isOnObject = intersects.length > 0;
		var time = performance.now();
		var delta = ( time - prevTime ) / 1000;
		
		velocity.x -= velocity.x * 10.0 * delta;
		velocity.z -= velocity.z * 10.0 * delta;
		velocity.y -= 9.8 * 100.0 * delta; // 100.0 = mass
		
		if ( moveForward ) velocity.z -= 350.0 * delta;
		if ( moveBackward ) velocity.z += 350.0 * delta;
		if ( moveLeft ) velocity.x -= 350.0 * delta;
		if ( moveRight ) velocity.x += 350.0 * delta;
		
		if ( isOnObject === true ) {
			if ( INTERSECTED != intersects[ 0 ].object ) {
				if (moveForward){
					moveForward = false;
					moveBackward = true;
				}
			}
		}
        
		controls.getObject().translateX( velocity.x * delta );
		controls.getObject().translateY( velocity.y * delta );
		controls.getObject().translateZ( velocity.z * delta );
		if ( controls.getObject().position.y < 10 ) {
			velocity.y = 0;
			controls.getObject().position.y = 10;
			canJump = true;
		}
		
		//animates 
		tempo[1].rotation.y -= time*.0000002; 
		renderer.clear();
		renderer.render( scene, camera );
		
		prevTime = time;
	}
	renderer.render( scene, camera );
	requestAnimationFrame( animate );
}