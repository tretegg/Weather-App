import {getNasaData} from "$lib/components/base/nasa"
import { json, error } from "@sveltejs/kit";

export async function GET({ request, fetch, setHeaders }) {

    setHeaders({
        'cache-control': '3600',
    })

    const nasa = await getNasaData(fetch)

    return json(nasa)
}