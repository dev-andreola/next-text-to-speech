"use client";

import { useRef, useState } from "react";
import { FaPauseCircle, FaPlayCircle } from "react-icons/fa";
import { Button } from "./ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "./ui/card";
import { Textarea } from "./ui/textarea";
import { ScrollArea } from "./ui/scroll-area";
import { VoiceFilter } from "./voice-filter";
import { useVoiceFilter } from "@/app/_hooks/useVoiceFilter";
import { Voice } from "elevenlabs/api";

export function VoiceList() {
  const {
    voices,
    isLoadingVoices,
    setSelectedGender,
    setSelectedAccent,
    setSelectedUseCase,
    setSelectedAge,
    setSelectedDescription,
    selectedGender,
    selectedAccent,
    selectedUseCase,
    selectedAge,
    selectedDescription,
  } = useVoiceFilter();
  const [loadingVoiceId, setLoadingVoiceId] = useState<string | null>(null);
  const [inputText, setInputText] = useState<string>("");
  const [currentVoiceId, setCurrentVoiceId] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

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

  async function playVoice(voice: Voice, text: string) {
    setLoadingVoiceId(voice.voice_id);
    try {
      const response = await fetch("/api/generate-custom-audio", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ voice: voice.name, text: inputText }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate audio");
      }

      const data = await response.json();
      const audioUrl = data.audioUrl;

      const audio = new Audio(audioUrl);
      audio
        .play()
        .catch((error) => console.error("Erro ao tocar áudio:", error));
    } catch (error) {
      console.error("Erro ao reproduzir áudio:", error);
    } finally {
      setLoadingVoiceId(null);
    }
  }

  function shouldOmitLabel(key: string, value: string): boolean {
    return (
      (key === "gender" &&
        selectedGender.toLowerCase() === value.toLowerCase()) ||
      (key === "accent" &&
        selectedAccent.toLowerCase() === value.toLowerCase()) ||
      (key === "use_case" &&
        selectedUseCase.toLowerCase() === value.toLowerCase()) ||
      (key === "age" && selectedAge.toLowerCase() === value.toLowerCase()) ||
      (key === "description" &&
        selectedDescription.toLowerCase() === value.toLowerCase())
    );
  }

  return (
    <div className="w-full h-full px-2 pt-2">
      <Textarea
        value={inputText}
        className="text-md"
        onChange={(e) => setInputText(e.currentTarget.value)}
        placeholder="Digite aqui o texto que será convertido..."
      />
      <div className="sm:flex sm:px-4 px-0 items-center justify-between">
        <h2 className="font-semibold py-1 sm:py-4">Escolha uma das vozes:</h2>
        <VoiceFilter
          setSelectedGender={setSelectedGender}
          setSelectedAccent={setSelectedAccent}
          setSelectedUseCase={setSelectedUseCase}
          setSelectedAge={setSelectedAge}
          setSelectedDescription={setSelectedDescription}
        />
      </div>

      <ScrollArea className="sm:h-[calc(100dvh-15rem)] h-[calc(100dvh-26rem)] w-full rounded-md border p-4">
        {isLoadingVoices ? (
          <div className="text-center h-full my-12">
            <div className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"></div>
          </div>
        ) : (
          <div className="py-2 space-y-6 md:space-y-0 md:gap-4 md:grid md:grid-cols-2">
            {voices.length !== 0 ? (
              voices.map((voice) => (
                <div key={voice.voice_id}>
                  <Card className=" py-2 px-4 space-y-3">
                    <CardHeader className="p-0 flex flex-col justify-start items-center">
                      <CardTitle>{voice.name}</CardTitle>
                      <CardDescription className="leading-tight	">
                        {voice.category}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="p-0">
                      <div className="text-xs flex-1 text-muted-foreground grid grid-cols-3 gap-2">
                        {voice.labels &&
                          Object.entries(voice.labels).map(([key, value]) =>
                            shouldOmitLabel(key, value as string) ? null : (
                              <div
                                key={key}
                                className="flex border rounded-xl py-1 flex-col items-center justify-center"
                              >
                                <span className="font-semibold">{key}</span>
                                <span>{value}</span>
                              </div>
                            )
                          )}
                        <Button
                          onClick={() =>
                            playPreview(
                              voice.voice_id,
                              voice.preview_url as string
                            )
                          }
                          className="flex border rounded-xl py-1 gap-1 items-center justify-center"
                        >
                          <div className="flex items-center gap-1">
                            <p className="text-xs">Testar</p>
                            {currentVoiceId === voice.voice_id ? (
                              <FaPauseCircle className="flex-1" size={16} />
                            ) : (
                              <FaPlayCircle className="flex-1" size={16} />
                            )}
                          </div>
                        </Button>
                      </div>

                      <div className="py-2 px-0 space-y-2">
                        {inputText && (
                          <Button
                            disabled={loadingVoiceId !== null}
                            onClick={() => playVoice(voice, inputText)}
                            className="w-full gap-2"
                          >
                            <span>Converter Texto</span>
                            {loadingVoiceId === voice.voice_id ? (
                              <div className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"></div>
                            ) : (
                              <FaPlayCircle size={22} />
                            )}
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))
            ) : (
              <div className="text-muted-foreground">
                Nenhuma voz encontrada com esses filtros.
              </div>
            )}
          </div>
        )}
      </ScrollArea>
    </div>
  );
}
