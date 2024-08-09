import { NextRequest, NextResponse } from "next/server";
import { ElevenLabsClient } from "elevenlabs";
import { createWriteStream, promises as fsPromises } from "fs";
import path from "path";
import { v4 as uuid } from "uuid";

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

    const audioUrl = await saveAudioToPublicDir(audioStream);

    return NextResponse.json({ audioUrl });
  } catch (error) {
    return NextResponse.error();
  }
}

async function saveAudioToPublicDir(audioStream: any): Promise<string> {
  const fileName = `${uuid()}.mp3`;
  const filePath = path.join(process.cwd(), "public", "audio", fileName);

  const fileStream = createWriteStream(filePath);

  audioStream.pipe(fileStream);

  await new Promise((resolve, reject) => {
    fileStream.on("finish", resolve);
    fileStream.on("error", reject);
  });

  return `/audio/${fileName}`;
}
