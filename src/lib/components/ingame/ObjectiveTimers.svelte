<script lang="ts">
	import type { ObjectiveTimer } from '$lib/types/Ingame/ObjectiveTypes';

	const { gameData, objectiveType } = $props();

	// Map objectiveType to the correct property in gameData
	const objectivePropertyMap = {
		baron: 'baronPitTimer',
		atakhan: 'atakhanTimer',
		drake: 'dragonPitTimer'
	};

	// Define colors for each objective type
	const objectiveColors = {
		baron: '#3a3171', // Baron/Herald purple-blue
		atakhan: '#7a2613', // Atakhan dark red
		// Each drake should have their own color
		earth: '#a66206', // Mountain Dragon
		fire: '#ff8a00', // Inferno Dragon
		air: '82b0f2', // Cloud Dragon
		chemtech: '#75ce03', // Chemtech Dragon
		hextech: '#00cffd', // Hextech Dragon
		water: '00e9a3', // Ocean Dragon
		elder: '#75ce03' // Elder Dragon
	};

	// Backend URL for assets
	const backendUrl = 'http://localhost:58869/';

	let timer = $state<ObjectiveTimer | null>(null);
	let drakeType = $state<keyof typeof objectiveColors | null>(null);
	// @ts-ignore
	let color = $state(objectiveColors[objectiveType] || '#ffffff');

	$effect(() => {
		timer = gameData?.[objectivePropertyMap[objectiveType]] || null;
	});

	$effect(() => {
		if (objectiveType === 'drake') {
			drakeType = (timer?.subType?.split('/').pop().split('.')[0] as keyof typeof objectiveColors) || null;
			color = objectiveColors[drakeType as keyof typeof objectiveColors] || '#ffffff';
		}
	});


	// Computed values
	let iconUrl = $derived(timer?.subType ? backendUrl + 'cache/' + timer.subType : '');
	let isVisible = $derived(!!timer && timer?.timeLeft > 0);
	let formattedTime = $derived('0:00');
	let progressPercent = $derived(
		timer?.timeLeft && timer?.timeTotal ? 1 - timer.timeLeft / timer.timeTotal : 0
	);

	$effect(() => {
		if (timer?.timeLeft < 0.2 && timer?.timeLeft > 0) {
			formattedTime = 'LIVE';
		} else {
			formattedTime = formatTime(timer?.timeLeft || 0);
		}
	});


	// Helper function to format time as MM:SS
	function formatTime(seconds) {
		if (!seconds && seconds !== 0) return '0:00';
		const mins = Math.floor(seconds / 60);
		const secs = Math.floor(seconds % 60);
		return `${mins}:${secs.toString().padStart(2, '0')}`;
	}

</script>

{#if isVisible}
	<div class="timer-container" style="background-color: {color}">
		<div class="timer-icon-container">
			<div class="icon-wrapper">
				{#if iconUrl}
					<img src={iconUrl} alt="{objectiveType} icon" />
				{/if}
			</div>
			<svg class="progress-ring" width="40" height="40">
				<circle
					cx="20"
					cy="20"
					r="18"
					fill="transparent"
					stroke="white"
					stroke-width="4.1"
					stroke-dasharray={2 * Math.PI * 18}
					stroke-dashoffset={2 * Math.PI * 18 * progressPercent}
					transform="rotate(-90, 20, 20)"
				/>
			</svg>
		</div>
		<div class="timer-text">
			{#if formattedTime}
				<span>{formattedTime}</span>
			{/if}
		</div>
	</div>
{/if}

<style>
	.timer-container {
		display: flex;
		align-items: center;
		border-radius: 40px;
		width: fit-content;
		box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
		color: white;
		width: 113px;
		padding: 9px;
	}

	.timer-text {
		color: white;
		text-align: left;
		font-size: 19px;
		margin-top: 4px;
		font-weight: bold;
		margin-right: 10px;
		text-shadow: 0 0 10px #fff;
		font-family: 'Roboto', 'Segoe UI', 'Arial', sans-serif;
	}

	.timer-icon-container {
		position: relative;
		width: 40px;
		height: 40px;
		flex: 1;
		margin-right: 20px;
	}

	.icon-wrapper {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 20px;
		height: 20px;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.icon-wrapper img {
		max-width: 100%;
		max-height: 100%;
	}

	.progress-ring {
		position: absolute;
		top: 0;
		left: 0;
		filter: drop-shadow(0 0 10px #fff);
	}
</style>
