import { ElevenLabsClient } from "elevenlabs";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const client = new ElevenLabsClient({
      apiKey: process.env.ELEVENLABS_API_KEY,
    });

    const voices = await client.voices.getAll();

    return NextResponse.json(voices);
  } catch (error) {
    return NextResponse.json(
      { error: "Falha ao buscar os dados" },
      { status: 500 }
    );
  }
}
