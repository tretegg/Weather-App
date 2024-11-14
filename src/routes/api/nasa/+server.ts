import {getNasaData} from "$lib/components/base/nasa"
import { json, error } from "@sveltejs/kit";

export async function GET({ request, fetch }) {

    const nasa = await getNasaData(fetch)

    console.log(nasa)

    return json(nasa)
}