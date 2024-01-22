<script lang="ts">
    let isRankingModalOpen = false;

    const toggleRankingModal = () => {
        isRankingModalOpen = !isRankingModalOpen
    }

    function handleWindowKeyDown(event: KeyboardEvent) {
		if (event.key === 'Escape') {
			isRankingModalOpen = false;	
		}
	}
</script>

<div class="grid place-content-center bg-black py-2 h-14">
    {#if isRankingModalOpen}
        <div class="absolute right-2 z-10 h-40 bg-white w-40">hello</div>
    {/if}

    <p class="text-white">Quickrr</p>
    <button on:click={toggleRankingModal} on:blur={() => isRankingModalOpen = false}  class="absolute py-1 px-6 top-3 right-2 bg-[#515757] hover:bg-[#2f3333] rounded-lg text-white border border-black">
        🏆 Ranking 🏆
    </button>
</div>