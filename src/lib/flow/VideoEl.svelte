<script>
	export let src = "https://sveltejs.github.io/assets/caminandes-llamigos.mp4";
	export let poster = "https://sveltejs.github.io/assets/caminandes-llamigos.jpg";
	let time = 0;
	let duration;
	export let muted = true;
	export let volume = 0.5;
	let paused = true;
	let showControls = true;
	let showControlsTimeout;
	let lastMouseDown;
	function toggleMute() {
		muted = !muted;
	}
	function handleMousedown(e) {
		lastMouseDown = new Date();
	}

	function handleMouseup(e) {
		if (new Date() - lastMouseDown < 300) {
			if (paused) e.target.play();
			else e.target.pause();
		}
	}

	function format(seconds) {
		if (isNaN(seconds)) return '...';

		const minutes = Math.floor(seconds / 60);
		seconds = Math.floor(seconds % 60);
		if (seconds < 10) seconds = '0' + seconds;

		return `${minutes}:${seconds}`;
	}
</script>



<div>
	<video
				 poster={poster}
				 src={src}
				 on:mousedown={handleMousedown}
				 on:mouseup={handleMouseup}
				 bind:volume={volume}
				 bind:muted={muted}
				 bind:currentTime={time}
				 bind:duration
				 bind:paused>
		<track kind="captions"/>
	</video>

	<div class="controls" style="opacity: {duration && showControls ? 1 : 0}">
		<div class="info">
			<span class="time">{format(time)}</span>
			<span class="sound-toggle" on:click={toggleMute}>Sound {muted ? 'On ' : 'Off'}</span>
			<span class="time">{format(duration)}</span>
		</div>
	</div>
</div>

<style>
	div {
		position: relative;
	}

	.controls {
		position: absolute;
		top: 0;
		width: 100%;
		transition: opacity 1s;
	}

	.info {
		display: flex;
		width: 100%;
		justify-content: space-between;
	}

	span {
		padding: 0.2em 0.5em;
		color: white;
		text-shadow: 0 0 8px black;
		font-size: 1em;
		opacity: 0.7;
	}
	.sound-toggle {
		cursor: pointer;
	}

	.time {
		width: 3em;
	}

	.time:last-child { text-align: right }

	video {
		width: 100%;
	}
</style>
