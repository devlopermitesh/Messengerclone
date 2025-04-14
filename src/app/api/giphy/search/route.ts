import ServerAuth from "@/libserver/serverAuth";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request:NextRequest) {
    try {
     const currentUser = await ServerAuth(request);
     if(!currentUser) {
        return NextResponse.json({ success: false, error: "Unauthorized request! Please try again later." }, { status: 401 });
    }
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('query') || '';
    const API_KEY = process.env.NEXT_PUBLIC_GIPHY_API_KEY;
    const url = `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${query}&limit=10&offset=0&rating=g&lang=en`;
    const response=await axios.get(url);
    const gifs = response.data.data.map((gif: any) => ({
        id: gif.id,
        url: gif.images.original.url,
        title: gif.title,
    }));
    return NextResponse.json({ success: true, data: gifs }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ success: false, error:"Something went wrong" }, { status: 500 });
        
    }
}
