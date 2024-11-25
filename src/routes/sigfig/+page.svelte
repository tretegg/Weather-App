<script lang="ts">
    import { onMount } from "svelte";
    
    let numberInput: HTMLInputElement
    let finalSigfigs: number = $state(0)
    

    // Doesn't quite work correctly
    function handleChange() {
        let numberValue = numberInput.value
        numberValue = numberValue.replace(/[^0-9.]/g, '');
        
        const [integerPart, decimalPart] = numberValue.split('.');
        
        let sigFigs = 0;

        const cleanedIntegerPart = integerPart.replace(/^0+/, '');
        
        sigFigs += cleanedIntegerPart.length;

        if (decimalPart !== undefined) {
            sigFigs += decimalPart.length;
        }
        
        finalSigfigs = sigFigs
    }

</script>


<div class="w-full h-[8%] border-b flex items-center justify-center space-x-8">

    <div class="flex space-x-4">
        <div class="flex items-center justify-center">
            <p class="tex-sm pr-2">Enter a number:</p>
            <input placeholder="e.g 201.0" class="!outline-none text-black pl-1" bind:this={numberInput} type="text" oninput={handleChange}>
        </div>

    </div>
</div>

<div class="flex justify-center mt-2">
    <p class="text-2xl">Significant Figures: {finalSigfigs}</p>
</div>