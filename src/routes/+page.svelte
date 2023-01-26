<script lang="ts">
    import svelteAutosize from 'svelte-autosize'
    import {save} from '$lib/store'

    let textArea: HTMLElement

    function completeTask() {
        if ($save.current === '') return
        $save.done = [$save.current, ...$save.done]
        $save.current = ''
    }

    function undo(id: number) {
        $save.current = $save.done.splice(id, 1)[0]
        $save.done = $save.done
        textArea.focus()
    }
</script>

<svelte:head>
    <title>{$save.current ? `${$save.current} | One Item Todo List` : 'One Item Todo List'}</title>
</svelte:head>

<main
    class="min-w-screen min-h-screen flex justify-center items-start flex-col text-primary bg-gradient-to-br from-primary-100 to-primary-300"
>
    <div class="container px-2 mx-auto flex flex-col">
        <form class="my-10 flex justify-start md:items-center flex-col md:flex-row">
            <div>
                <h2 class="text-sm">What I'm working on</h2>
                <!-- svelte-ignore a11y-autofocus -->
                <textarea
                    rows="1"
                    bind:this={textArea}
                    use:svelteAutosize
                    bind:value={$save.current}
                    class="md:w-auto w-[90vw] bg-transparent border-l-4 border-0 border-primary-200 focus:border-primary-300 focus:ring-0 text-primary text-4xl placeholder-primary font-bold placeholder:opacity-20"
                    autofocus
                    placeholder="Your Task"
                    on:keypress={e => {
                        if (e.keyCode === 13) {
                            e.preventDefault()
                            completeTask()
                        }
                    }}
                />
            </div>
            <button
                on:click={completeTask}
                class="py-3 px-6 rounded-full md:ml-8 font-bold transition-all bg-primary-300 text-primary-600 hover:text-primary-700 text-lg hover:bg-primary-400
                {$save.current.length > 0 ? 'opacity-100' : 'opacity-0'}"
            >
                Complete
            </button>
        </form>

        {#if $save.done.length > 0}
            <h2 class="opacity-50">Finished</h2>
            <ul class="flex flex-col items-start">
                {#each $save.done as task, id}
                    <li class="flex justify-center items-center text-xl font-semibold relative group">
                        <span class="group-hover:opacity-10">{task}</span>
                        <button
                            on:click={() => undo(id)}
                            class="opacity-0 group-hover:opacity-100 absolute px-2 py-1 rounded-full hover:bg-primary-200 ml-4 text-sm"
                        >
                            Undo
                        </button>
                    </li>
                {/each}
            </ul>
        {/if}
    </div>
</main>
