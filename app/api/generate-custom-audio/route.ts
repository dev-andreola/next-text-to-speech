import { NextRequest, NextResponse } from "next/server";
import { ElevenLabsClient } from "elevenlabs";
import { v4 as uuid } from "uuid";
import { put } from "@vercel/blob";

const client = new ElevenLabsClient({
  apiKey: process.env.NEXT_PUBLIC_ELEVENLABS_API_KEY,
});

export async function POST(req: NextRequest) {
  try {
    const { voice, text } = await req.json();

    const audioStream = await client.generate({
      voice,
      text,
      model_id: "eleven_multilingual_v2",
    });

    const audioUrl = await saveAudioToBlob(audioStream);

    return NextResponse.json({ audioUrl });
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
}

async function saveAudioToBlob(audioStream: any): Promise<string> {
  const fileName = `${uuid()}.mp3`;

  const { url } = await put(`audio/${fileName}`, audioStream, {
    access: "public",
  });

  return url;
}
