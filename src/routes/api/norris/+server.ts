import { getNorris } from "$lib/components/base/norris";
import { json, error } from "@sveltejs/kit";

export async function GET({ request, fetch }) {

    const norris = await getNorris(fetch)

    return json(norris)
}