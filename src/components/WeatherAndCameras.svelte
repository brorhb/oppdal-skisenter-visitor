<script>
import Weatherstations from "./Weather.svelte";
import Webcam from "./Cameras.svelte";
import Wrapper from '../components/max-wrapper.svelte';
</script>
<Wrapper>
    <h2 class="text-2xl font-bold sm:px-4">Vær og føre</h2>
    <div class="flex md:flex-row w-full flex-col">
        <div id="w-full md:h-auto p-4 md:px-0 h-96 md:w-2/3">
            <Webcam/>
        </div>
        <div id="w-full md:w-1/3 p-4 md:px-0">
            <Weatherstations />
        </div>
    </div>
</Wrapper>
