<script lang="ts">
	import { fade } from 'svelte/transition';
	import '../app.css';

	const MAX_TIMEOUT = 10;
	const MIN_TIMEOUT = 2;
	const MS_IN_SECONDS = 1000;

	let isButtonHidden = false;
	let ended = false;
	let endedEarly = false;

	let timeoutId: number;
	let startTime: number;
	let endTime: number;

	const timeoutTime = (Math.random() * (MAX_TIMEOUT - MIN_TIMEOUT) + MIN_TIMEOUT) * MS_IN_SECONDS;

	const handleKeyPress = () => {
		if (!ended) {
			ended = true;
			endedEarly = true;
			clearTimeout(timeoutId);
			return;
		}

		endTime = new Date().getTime();
		document.removeEventListener('click', handleKeyPress);
		document.removeEventListener('keypress', handleKeyPress);
	};

	const onClick = (event: MouseEvent) => {
		event.stopPropagation();
		isButtonHidden = !isButtonHidden;
		timeoutId = setTimeout(() => {
			ended = !ended;
			startTime = new Date().getTime();
		}, timeoutTime);

		document.addEventListener('click', handleKeyPress);
		document.addEventListener('keypress', handleKeyPress);
	};
</script>

<main
	class="h-screen overscroll-none flex justify-center font-default {ended && !endedEarly
		? 'bg-gradient-to-r from-[#b0d9b1] to-[#ffffcc]'
		: 'bg-[#242424]'}"
>
	<div class="self-center text-white font-semibold text-base">
		{#if !isButtonHidden}
			<button class="rounded-full bg-zinc-900 px-8 py-1.5" on:click={onClick}> Start </button>
		{:else if isButtonHidden && !ended}
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
