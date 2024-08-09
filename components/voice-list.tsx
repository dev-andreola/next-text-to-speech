"use client";

import { FaPauseCircle, FaPlayCircle } from "react-icons/fa";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Textarea } from "./ui/textarea";
import { useEffect, useRef, useState } from "react";
import { Voice } from "elevenlabs/api";

export default function VoiceList() {
  const [voices, setVoices] = useState<Voice[]>([]);
  const [currentVoiceId, setCurrentVoiceId] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [customText, setCustomText] = useState<string>("");

  useEffect(() => {
    async function fetchVoices() {
      try {
        const response = await fetch("/api/get-voices");
        const data = await response.json();
        setVoices(data.voices);
      } catch (error) {
        console.error("Falha ao buscar vozes:", error);
      }
    }

    fetchVoices();
  }, []);

  function playPreview(voiceId: string, previewUrl: string) {
    if (currentVoiceId === voiceId) {
      if (audioRef.current) {
        audioRef.current.pause();
        setCurrentVoiceId(null);
      }
    } else {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      const audio = new Audio(previewUrl);
      audioRef.current = audio;
      audio.play();
      setCurrentVoiceId(voiceId);

      audio.onended = () => {
        setCurrentVoiceId(null);
      };
    }
  }

  function playCustomText() {
    console.log(customText);
  }

  playCustomText();

  return (
    <div className="w-full px-2">
      <Textarea
        value={customText}
        onChange={(e) => setCustomText(e.currentTarget.value)}
        placeholder="Digite aqui o texto que será convertido..."
      />
      <div className="py-2 space-y-4">
        <h2 className="font-semibold">Escolha uma das vozes:</h2>
        {voices.map((voice) => (
          <Card key={voice.voice_id} className=" py-2 px-4 space-y-3">
            <CardHeader className="p-0 flex flex-col justify-start items-center">
              <CardTitle>{voice.name}</CardTitle>
              <CardDescription className="leading-tight	">
                {voice.category}
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="text-xs flex-1 text-muted-foreground grid grid-cols-3 gap-2">
                {voice.labels &&
                  Object.entries(voice.labels).map(([key, value]) => (
                    <div
                      key={key}
                      className="flex border rounded-xl py-1 flex-col items-center justify-center"
                    >
                      <span className="font-semibold">{key}</span>
                      <span>{value}</span>
                    </div>
                  ))}
                <Button
                  onClick={() =>
                    playPreview(voice.voice_id, voice.preview_url as string)
                  }
                  className="flex border rounded-xl py-1 gap-1 items-center justify-center"
                >
                  <p className="text-xs">Testar</p>
                  {currentVoiceId === voice.voice_id ? (
                    <FaPauseCircle size={16} />
                  ) : (
                    <FaPlayCircle size={16} />
                  )}
                </Button>
              </div>

              <div className="py-2 px-0 space-y-2">
                <Button className="w-full gap-2">
                  <span>Converter Texto</span>
                  <FaPlayCircle size={22} />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
