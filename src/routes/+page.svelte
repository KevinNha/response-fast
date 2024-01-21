<script lang="ts">
	import { fade } from 'svelte/transition';
	import '../app.css';
	import type { PageData } from './$types';
	import { v4 as uuidv4 } from 'uuid';

	const MAX_TIMEOUT = 10;
	const MIN_TIMEOUT = 2;
	const MS_IN_SECONDS = 1000;

	// TODO dont get data from page load but just GET endpoint of leaderbaord
	export let data: PageData;

	let started = false;
	let ended = false;
	let endedEarly = false;

	let timeoutId: any;
	let startTime: number;
	let endTime: number;

	const handleKeyPress = async () => {
		if (!ended) {
			ended = true;
			endedEarly = true;
			clearTimeout(timeoutId);
			return;
		}

		endTime = new Date().getTime();
		document.removeEventListener('click', handleKeyPress);
		document.removeEventListener('keypress', handleKeyPress);
		await updateLeaderboard();
	};

	// TODO need to create a new modal for updating the table IF the time is faster than the top 10 at load
	// This function should also update the local leaderboard too
	const updateLeaderboard = async () => {
		await fetch('/api/leaderboard', {
			method: 'POST',
			body: JSON.stringify({
				responseTime: String(endTime - startTime),
				nickName: 'sada'
			})
		});
	};

	const onGameStart = (event: MouseEvent) => {
		const timeoutTime = (Math.random() * (MAX_TIMEOUT - MIN_TIMEOUT) + MIN_TIMEOUT) * MS_IN_SECONDS;

		event.stopPropagation();
		started = !started;
		timeoutId = setTimeout(() => {
			ended = !ended;
			startTime = new Date().getTime();
		}, timeoutTime);

		document.addEventListener('click', handleKeyPress);
		document.addEventListener('keypress', handleKeyPress);
	};
</script>

<svelte:head>
	<title>React Fast</title>
</svelte:head>
<main
	class="h-screen overscroll-none flex justify-center font-default {ended && !endedEarly
		? 'bg-gradient-to-r from-[#b0d9b1] to-[#ffffcc]'
		: 'bg-[#242424]'}"
>
	<div class="self-center text-white font-semibold text-base">
		{#if !started}
			<button class="rounded-full bg-zinc-900 px-8 py-1.5" on:click={onGameStart}> Start </button>
		{:else if started && !ended}
			<p in:fade={{ delay: 0, duration: 500 }} hidden={ended}>
				Press any key when the color changes
			</p>
		{:else if ended && endedEarly}
			<p>Too fast, try again!</p>
		{:else if ended && endTime}
			<p class="text-white">Clicked in {(endTime - startTime) / 1000} seconds</p>
		{/if}
	</div>
</main>
