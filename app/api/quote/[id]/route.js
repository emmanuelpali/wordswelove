import Quote from "@models/quote";
import { connectToDB } from "@utils/database"

export const GET = async (request, { params }) => {
    try {
        await connectToDB();

        const quote = await Quote.findById(params.id).populate('creator')
        if(!quote) {
            console.log("no post");
            
            return new Response("Quote not found", {status: 404});
        }
        
        return new Response(JSON.stringify(quote), {
            status: 200
        })
    } catch (error) {
        return new Response('Could not fetch post', { status: 500} )
    }
}

export const PATCH = async (request, { params }) => {
    const { quote, author, tag } = await request.json();
    try {
        await connectToDB();
        const existingQuote = await Quote.findById(params.id);
        
        if(!existingQuote) {
           
            return new Response("Quote not found", { status: 404 })
        }
        existingQuote.quote = quote;
        existingQuote.author = author;
        existingQuote.tag = tag;

        await existingQuote.save();

        return new Response(JSON.stringify(existingQuote), {
            status: 200
        })
    } catch (error) {
        console.log("no post");
        return new Response('Could not fetch post', { status: 500} )
    }

}

export const DELETE = async (request, { params }) => {
    try {
        await connectToDB();

        await Quote.findByIdAndRemove(params.id);

        return new Response("Quote deleted successfully", { status: 200 })
    } catch (error) {
        return new Response('Could not delete quote', { status: 500} )
    }
}