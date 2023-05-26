import Qoute from "@models/quote";
import { connectToDB } from "@utils/database"

export const GET = async (request, { params }) => {
    try {
        await connectToDB();

        const quotes = await Qoute.find({creator: params.id}).populate('creator')

        return new Response(JSON.stringify(quotes), {
            status: 200
        })
    } catch (error) {
        return new Response('Could not fetch post', { status: 500} )
    }
}
