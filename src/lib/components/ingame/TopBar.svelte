<script lang="ts">
	import type { GameState } from '$lib/types/Ingame/Message';
	import type { Scoreboard } from '$lib/types/Ingame/ScoreboardTypes';
	import { formatTime } from '$lib/utils/formatTime';

	const { gameData }: { gameData: GameState | null } = $props();

	const topScoreboardData: Scoreboard = gameData?.scoreboard ?? {
		teams: [],
		gameTime: 0,
		bestOf: 0
	};

	// convert gold to k
	const goldToK = (gold: number) => gold / 1000;
	const goldToKString = (gold: number) => goldToK(gold).toFixed(1);
	const goldToKStringWithSuffix = (gold: number) => goldToKString(gold) + 'K';

	// Calculate gold difference between 2 teams
	let goldDifference = topScoreboardData.teams[0].gold - topScoreboardData.teams[1].gold;
	let goldDiffThreshold = 600;

	// Calculate gold difference string
	let goldDifferenceString = $state('');
	if (Math.abs(goldDifference) > goldDiffThreshold) {
		goldDifferenceString = goldToKStringWithSuffix(Math.abs(goldDifference));
	} else {
		goldDifferenceString = '';
	}

	// What team is having more gold?
	let goldDiffTeam = goldDifference > 0 ? 0 : 1;
</script>

{#if gameData}
	<div id="the-entire-top-bar">
		<div id="topbar-background">
			<div class="team-container blue-team">
				<div class="team-tag-and-score">
					<span>{topScoreboardData.teams[0].teamTag}</span>
					<div class="team-score-container">
						<!-- Add the .game-won class to the team that has won a game (gameSeries.seriesScore.wins) -->
						{#each Array.from({ length: topScoreboardData.bestOf - 1 }) as _, index}
							<div
								class="empty-block {index < topScoreboardData.teams[0].seriesScore.wins
									? 'game-won'
									: ''}"
							></div>
						{/each}
					</div>
				</div>
				<div class="team-towers">
					<img class="team-towers-icon" src="/objective-icons/turret-icon.png" alt="turret icon" />
					<span class="team-towers-count">{topScoreboardData.teams[0].towers}</span>
				</div>
				<div class="team-gold">
					<div class="current-gold">
						<img class="team-gold-icon" src="/objective-icons/gold-icon.png" alt="gold icon" />
						<span class="team-gold-count"
							>{goldToKStringWithSuffix(topScoreboardData.teams[0].gold)}</span
						>
					</div>
					<div class="gold-difference {goldDiffTeam === 0 ? 'display-gold-diff' : ''}">
						{goldDifferenceString}
					</div>
				</div>
				<div class="team-kills">
					<span class="team-kills-count team-kills-blue">{topScoreboardData.teams[0].kills}</span>
				</div>
			</div>
			<div class="tournament-logo">
				<img
					src="http://localhost:58869/cache/style/mainIcon.png"
					alt="tournament logo"
					width="60"
					height="60"
				/>
			</div>
			<div class="team-container red-team">
				<div class="team-kills">
					<span class="team-kills-count team-kills-red">{topScoreboardData.teams[1].kills}</span>
				</div>
				<div class="team-gold">
					<div class="current-gold">
						<img class="team-gold-icon" src="/objective-icons/gold-icon.png" alt="gold icon" />
						<span class="team-gold-count"
							>{goldToKStringWithSuffix(topScoreboardData.teams[1].gold)}</span
						>
					</div>
					<div class="gold-difference {goldDiffTeam === 1 ? 'display-gold-diff' : ''}">
						{goldDifferenceString}
					</div>
				</div>
				<div class="team-towers">
					<img class="team-towers-icon" src="/objective-icons/turret-icon.png" alt="turret icon" />
					<span class="team-towers-count">{topScoreboardData.teams[1].towers}</span>
				</div>
				<div class="team-tag-and-score">
					<span>{topScoreboardData.teams[1].teamTag}</span>
					<div class="team-score-container">
						{#each Array.from({ length: topScoreboardData.bestOf - 1 }) as _, index}
							<div
								class="empty-block {index < topScoreboardData.teams[1].seriesScore.wins
									? 'game-won'
									: ''}"
							></div>
						{/each}
					</div>
				</div>
			</div>
		</div>
		<div id="toplowerbar-background">
			<div class="toplowerbar-timer">
				{formatTime(gameData?.gameTime || 0)}
			</div>
		</div>
	</div>
{/if}

<style>

	#topbar-background {
		position: absolute;
		top: 0;
		left: 50%;
		transform: translateX(-50%);
		height: 75px;
		width: 1110px;
		background: linear-gradient(
			90deg,
			rgba(69, 10, 61, 1) 0%,
			rgba(26, 2, 14, 1) 50%,
			rgba(99, 6, 39, 1) 100%
		);
		padding-left: 10px;
		padding-right: 10px;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.team-container {
		color: #fff;
		font-family: 'Roboto', 'Segoe UI', 'Arial', sans-serif;
		display: flex;
		height: 100%;
		margin: 0 60px;
		gap: 55px;
	}

	.team-tag-and-score {
		display: flex;
		position: relative;
		flex-direction: column;
		justify-content: center;
		font-size: 20px;
	}

	.team-score-container {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 2px;
	}

	.team-towers {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		gap: 2px;
	}

	.team-towers-icon {
		width: 30px;
		height: 30px;
	}

	.team-towers-count {
		font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
		font-size: 20px;
		font-weight: 500;
	}

	.current-gold {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		gap: 2px;
	}

	.team-gold {
		height: 100%;
		width: 100px;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	.team-gold-icon {
		width: 30px;
		height: 30px;
	}

	.team-gold-count {
		font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
		font-size: 20px;
		font-weight: 500;
	}

	.empty-block {
		width: 10px;
		height: 10px;
		background-color: transparent;
		border: 1px solid white;
		border-radius: 5px;
	}

	.game-won {
		background-color: #fff;
		border: 1px solid white;
		border-radius: 5px;
	}
	
	.gold-difference {
		display: none;
		background-color: #5e5ef4;
		border-radius: 10px;
		text-align: center;
		transition: display 0.3s ease-in-out;
	}

	.display-gold-diff {
		display: block;
	}

	#toplowerbar-background {
		width: 620px;
		height: 30px;
		background-color: #1f0210;
		position: relative;
		margin-top: 20px;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	
	.team-kills {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		font-size: 48px;
	}

	.team-kills-red {
		color: #ff3333;
	}

	.team-kills-blue {
		color: #336dff;
	}

	#the-entire-top-bar {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		height: 140px;
	}

	.toplowerbar-timer {
		color: #fff;
		font-family: "Roboto", "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
		font-size: 20px;
	}
</style>
