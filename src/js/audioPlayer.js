function play(file) {
	var audioFile = new Audio(file);
	audioFile.play();
}
function stop(file) {
	var audioFile = new Audio(file);
	audioFile.pause();
}