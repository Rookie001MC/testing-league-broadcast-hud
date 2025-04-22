<script lang="ts">
	import ObjectiveTimers from '$lib/components/ingame/ObjectiveTimers.svelte';
	import TopBar from '$lib/components/ingame/TopBar.svelte';
	import type { GameState } from '$lib/types/Ingame/Message';
	import { onMount } from 'svelte';

	let gameData: GameState | null = null;

	onMount(() => {
		const ws = new WebSocket('ws://localhost:58869/ws/in');
		ws.onmessage = (event) => {
			try {
				const parsed = JSON.parse(event.data);
				if (parsed.type === 'ingame-state-update') {
					gameData = parsed.state;
				}
			} catch {
				console.log('Received invalid JSON, likely KeepAlive:', event.data);
			}
		};
	});

</script>

{#if gameData}
	<div class="baron-timer">
		<ObjectiveTimers {gameData} objectiveType="baron" />
	</div>
	<div class="drake-timer">
		<ObjectiveTimers {gameData} objectiveType="drake" />
	</div>
	<div class="atakhan-timer">
		<ObjectiveTimers {gameData} objectiveType="atakhan" />
	</div>
	<TopBar {gameData} />
{/if}


<style>
	.baron-timer {
		position: absolute;
		left: 20px;
		top: 60px;
	}

	.drake-timer {
		position: absolute;
		right: 20px;
		top: 60px;
	}

	.atakhan-timer {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}
</style>
