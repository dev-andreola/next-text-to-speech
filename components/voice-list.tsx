"use client";

import { FaPlayCircle } from "react-icons/fa";
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
import { useEffect, useState } from "react";
import { Voice } from "elevenlabs/api";

export default function VoiceList() {
  const [voices, setVoices] = useState<Voice[]>([]);

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

  return (
    <div className="w-full px-2">
      <Textarea placeholder="Digite aqui o seu texto..." />
      <div className="py-2">
        <h2 className="font-semibold">Escolha uma das vozes:</h2>
        {voices.map((voice) => (
          <Card key={voice.voice_id} className=" py-2 px-4 space-y-3">
            <CardHeader className="p-0 flex flex-col justify-start items-center">
              <CardTitle>{voice.name}</CardTitle>
              <CardDescription className="leading-tight	">
                {voice.category}
              </CardDescription>
            </CardHeader>
            <div className="text-xs flex-1 text-muted-foreground grid grid-cols-3 gap-2 px-2">
              {voice.labels &&
                Object.entries(voice.labels).map(([key, value]) => (
                  <div
                    key={voice.voice_id}
                    className="flex border roudned-sm py-1 flex-col items-center justify-center"
                  >
                    <span className="font-semibold">{key}</span>
                    <span>{value}</span>
                  </div>
                ))}
            </div>

            <CardContent className="py-2 px-0 space-y-2">
              <Button variant={"outline"} className="w-full gap-2">
                <span>Preview</span>
                <FaPlayCircle size={22} />
              </Button>
              <Button className="w-full gap-2">
                <span>Custom Text</span>
                <FaPlayCircle size={22} />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
