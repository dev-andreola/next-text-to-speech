import { useState, useEffect } from "react";
import { Voice } from "elevenlabs/api";

export function useVoiceFilter() {
  const [voices, setVoices] = useState<Voice[]>([]);
  const [isLoadingVoices, setIsLoadingVoices] = useState(true);
  const [selectedGender, setSelectedGender] = useState<string>("all");
  const [selectedAccent, setSelectedAccent] = useState<string>("all");
  const [selectedUseCase, setSelectedUseCase] = useState<string>("all");
  const [selectedAge, setSelectedAge] = useState<string>("all");

  useEffect(() => {
    async function fetchVoices() {
      try {
        const response = await fetch("/api/get-voices");
        const data = await response.json();

        let filteredVoices = data.voices;

        if (selectedGender !== "all") {
          filteredVoices = filteredVoices.filter(
            (voice: Voice) =>
              voice.labels?.gender.toLowerCase() ===
              selectedGender.toLowerCase()
          );
        }
        if (selectedAccent !== "all") {
          filteredVoices = filteredVoices.filter(
            (voice: Voice) =>
              voice.labels?.accent.toLowerCase() ===
              selectedAccent.toLowerCase()
          );
        }
        if (selectedUseCase !== "all") {
          filteredVoices = filteredVoices.filter(
            (voice: Voice) =>
              voice.labels?.use_case.toLowerCase() ===
              selectedUseCase.toLowerCase()
          );
        }
        if (selectedAge !== "all") {
          filteredVoices = filteredVoices.filter(
            (voice: Voice) =>
              voice.labels?.age.toLowerCase() === selectedAge.toLowerCase()
          );
        }

        setVoices(filteredVoices);
      } catch (error) {
        console.error("Failed to fetch voices:", error);
      } finally {
        setIsLoadingVoices(false);
      }
    }

    fetchVoices();
  }, [selectedGender, selectedAccent, selectedUseCase, selectedAge]);

  return {
    voices,
    isLoadingVoices,
    setSelectedGender,
    setSelectedAccent,
    setSelectedUseCase,
    setSelectedAge,
  };
}
