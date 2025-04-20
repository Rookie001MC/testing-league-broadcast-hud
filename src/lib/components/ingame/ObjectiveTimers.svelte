<script>
    /** @type {import('svelte/elements').Props<{gameData: any, objectiveType: 'baron' | 'atakhan' | 'drake'}>} */
    const { gameData, objectiveType } = $props();

    // Map objectiveType to the correct property in gameData
    const objectivePropertyMap = {
        'baron': 'baronPitTimer',
        'atakhan': 'atakhanTimer',
        'drake': 'dragonPitTimer'
    };

    // Define colors for each objective type
    const objectiveColors = {
        'baron': '#a17c47', // Baron/Herald gold
        'atakhan': '#7d5ca7', // Atakhan purple
        'drake': '#3498db'   // Dragon blue
    };

    // Backend URL for assets
    const backendUrl = 'http://localhost:58869/';
    
    /** @type {import('svelte/elements').Props<{gameData: any, objectiveType: 'baron' | 'atakhan' | 'drake'}>['gameData'] | null} */
    let timer = $state(null);


    // Get the correct timer object based on the objective type
    $effect(() => {
        const propertyName = objectivePropertyMap[objectiveType];    
        timer = gameData?.[propertyName] || null;

    });

    // Computed values
    let color = $derived(objectiveColors[objectiveType] || '#ffffff');
    let iconUrl = $derived(timer?.subType ? backendUrl + "cache/" + timer.subType : '');
    let isVisible = $derived(!!timer && timer?.timeLeft > 0);
    let formattedTime = $derived(timer?.timeLeft ? formatTime(timer.timeLeft) : '0:00');
    let progressPercent = $derived(timer?.timeLeft && timer?.timeTotal ? 1 - (timer.timeLeft / timer.timeTotal) : 0);

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
    <div class="timer-text">
        <span>{formattedTime}</span>
    </div>
    <div class="timer-icon-container">
        <div class="icon-wrapper">
            {#if iconUrl}
            <img src="{iconUrl}" alt="{objectiveType} icon">
            {/if}
        </div>
        <svg class="progress-ring" width="40" height="40">
            <circle 
                cx="20" 
                cy="20" 
                r="18" 
                fill="transparent"
                stroke="white" 
                stroke-width="2"
                stroke-dasharray={2 * Math.PI * 18}
                stroke-dashoffset={2 * Math.PI * 18 * progressPercent}
                transform="rotate(-90, 20, 20)"
            />
        </svg>
    </div>
</div>
{/if}

<style>
    .timer-container {
        display: flex;
        align-items: center;
        border-radius: 8px;
        padding: 8px;
        width: fit-content;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
        color: white;
    }
    
    .timer-text {
        color: white;
        font-size: 18px;
        font-weight: bold;
        margin-right: 10px;
        text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
    }
    
    .timer-icon-container {
        position: relative;
        width: 40px;
        height: 40px;
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
    }
</style>