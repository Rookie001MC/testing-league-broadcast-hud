<script>
	import ObjectiveTimers from '$lib/components/ingame/ObjectiveTimers.svelte';

	let data = new WebSocket('ws://localhost:58869/ws/in');

	let gameData;
	data.onmessage = (event) => {
		// jsonify message, ignore if not valid JSON for messages like KeepAlive
		try {
			const parsedData = JSON.parse(event.data);
			if (parsedData.type === 'ingame-state-update') {
				gameData = parsedData.state;
			}
		} catch (e) {
			console.log('Received invalid JSON, likely KeepAlive: ', event.data);
		}
	};
</script>

<div class="baron-timer">
	<ObjectiveTimers {gameData} objectiveType="baron" />
</div>
<div class="drake-timer">
	<ObjectiveTimers {gameData} objectiveType="drake" />
</div>
<div class="atakhan-timer">
	<ObjectiveTimers {gameData} objectiveType="atakhan" />
</div>

<div id="top-row">
	<!-- Includes: Top Bar for Scoreboard, including: total kills, total team gold, total towers destroyed, ....-->
</div>

<style>
	.baron-timer {
		position: absolute;
		left: 20px;
		top: 60px;
	}

	.drake-timer {
		position: absolute;
		right: 60px;
		top: 60px;
	}

	.atakhan-timer {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}
</style>
