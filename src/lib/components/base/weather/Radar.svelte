<script lang="ts">
    export let latitude: number;
    export let longitude: number;
</script>

<div class="w-[100%] h-[50%] border-2 border-white rounded">
    <iframe title="Weather Radar" width="100%" height="100%" src="https://embed.windy.com/embed2.html?lat={latitude}&lon={longitude}&zoom=20&level=surface&overlay=wind&product=ecmwf&menu=&message=&marker=&calendar=now&pressure=&type=map&location=coordinates&detail=&metricWind=default&metricTemp=default&radarRange=-1" frameborder="0">
    </iframe>
</div>

<!-- https://embed.windy.com/embed2.html?lat={latitude}&lon={longitude}&detailLat=40.292&detailLon=-79.405&width=650&height=450&zoom=5&level=surface&overlay=wind&product=ecmwf&menu=&message=&marker=&calendar=now&pressure=&type=map&location=coordinates&detail=&metricWind=default&metricTemp=default&radarRange=-1 -->
<!-- this is just so i can see what params there are so i dont forget when i delete them -->