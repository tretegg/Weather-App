import type { ForecastDay, Hour } from "$lib/types/weather";

const CONDITION_MAP: {[id: number]: string} = {
    // 1000: "Sun",
    1003: "PartlyCloudy",
    1006: "Cloudy",
    1009: "Overcast",
}

const DEFAULT_CONDITION = "Cloudy";

export function GetConditionIcon(day: ForecastDay, hour?: Hour) {
    if (!hour) {
        if (day.day.condition.code in CONDITION_MAP) return CONDITION_MAP[day.day.condition.code]

        return DEFAULT_CONDITION
    }

    if (hour.condition.code in CONDITION_MAP) return CONDITION_MAP[hour.condition.code]

    if (day.astro.is_sun_up && hour.condition.code === 1000) return "Sun"

    if (!day.astro.is_sun_up && hour.condition.code === 1000) return "Moon"

    return DEFAULT_CONDITION
}