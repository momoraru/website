const content = document.querySelector('.content'),
	musicName = content.querySelector('.music-titles .name'),
	musicArtist = content.querySelector('.music-titles .artist'),
	musicFriend = content.querySelector('.music-titles .friend'),
	Audio = document.querySelector('.main-song'),
	playBtn = content.querySelector('.play-pause'),
	playBtnIcon = content.querySelector('.play-pause span'),
	progressBar = content.querySelector('.progress-bar'),
	progressDetails = content.querySelector('.progress-details'),
	Shuffle = content.querySelector('#shuffle');

let index = 1;

window.addEventListener('load', () => {
	loadData(index);
});

function loadData(indexValue) {
	musicName.innerHTML = songs[indexValue - 1].name;
	musicArtist.innerHTML = songs[indexValue - 1].artist;
	musicFriend.innerHTML = songs[indexValue - 1].friend;

	Audio.src = 'music/' + songs[indexValue - 1].audio + '.mp3';
}

playBtn.addEventListener('click', () => {
	const isMusicPaused = content.classList.contains('paused');
	if (isMusicPaused) {
		pauseSong();
	} else {
		playSong();
	}
});

function playSong() {
	content.classList.add('paused');
	playBtnIcon.innerHTML = 'pause';
	Audio.play();
}

function pauseSong() {
	content.classList.remove('paused');
	playBtnIcon.innerHTML = 'play';
	Audio.pause();
}


Audio.addEventListener('timeupdate', (e) => {
	const initialTime = e.target.currentTime; // Get current music time
	const finalTime = e.target.duration; // Get music duration
	let BarWidth = (initialTime / finalTime) * 100;
	progressBar.style.width = BarWidth + '%';

	progressDetails.addEventListener('click', (e) => {
		let progressValue = progressDetails.clientWidth; // Get width of Progress Bar
		let clickedOffsetX = e.offsetX; // get offset x value
		let MusicDuration = Audio.duration; // get total music duration

		Audio.currentTime = (clickedOffsetX / progressValue) * MusicDuration;
	});

	//Timer Logic
	Audio.addEventListener('loadeddata', () => {
		let finalTimeData = content.querySelector('.final');

		//Update finalDuration
		let AudioDuration = Audio.duration;
		let finalMinutes = Math.floor(AudioDuration / 60);
		let finalSeconds = Math.floor(AudioDuration % 60);
		if (finalSeconds < 10) {
			finalSeconds = '0' + finalSeconds;
		}
		finalTimeData.innerText = finalMinutes + ':' + finalSeconds;
	});

	//Update Current Duration
	let currentTimeData = content.querySelector('.current');
	let CurrentTime = Audio.currentTime;
	let currentMinutes = Math.floor(CurrentTime / 60);
	let currentSeconds = Math.floor(CurrentTime % 60);
	if (currentSeconds < 10) {
		currentSeconds = '0' + currentSeconds;
	}
	currentTimeData.innerText = currentMinutes + ':' + currentSeconds;

	//repeat button logic
	// repeatBtn.addEventListener("click", ()=>{
	//   Audio.currentTime = 0;
	// });
});

//Shuffle Logic
Shuffle.addEventListener('click', () => {
	var randIndex = Math.floor(Math.random() * songs.length) + 1; // Select random betwn 1 and song array length
	loadData(randIndex);
	playSong();
});

Audio.addEventListener('ended', () => {
	index++;
	if (index > songs.length) {
		index = 1;
	}
	loadData(index);
	playSong();
});
