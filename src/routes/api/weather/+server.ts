import { json } from "@sveltejs/kit";

export async function GET({ request }) {

    const city = request.headers.get("X-city")

    

    return json({})
}