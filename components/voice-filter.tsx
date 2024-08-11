import React from "react";
import { useVoiceFilter } from "@/app/_hooks/useVoiceFilter";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

export function VoiceFilter({
  setSelectedGender,
  setSelectedAccent,
  setSelectedUseCase,
  setSelectedAge,
  setSelectedDescription,
}: {
  setSelectedGender: (value: string) => void;
  setSelectedAccent: (value: string) => void;
  setSelectedUseCase: (value: string) => void;
  setSelectedAge: (value: string) => void;
  setSelectedDescription: (value: string) => void;
}) {
  const { voices } = useVoiceFilter();

  // Função para normalizar valores
  const normalize = (value: string) => {
    return value.toLowerCase().replace(/\s+/g, "-"); // Converte para minúsculas e substitui espaços por hífen
  };

  // Função para extrair as labels únicas
  const labels = voices.reduce((acc, voice) => {
    const voiceLabels = voice.labels;

    if (voiceLabels) {
      // Verificar se `voiceLabels` está definido
      Object.keys(voiceLabels).forEach((label) => {
        if (!acc[label]) {
          acc[label] = new Set<string>(); // Usando Set para evitar duplicatas
        }
        const normalizedValue = normalize(voiceLabels[label]); // Normaliza o valor
        acc[label].add(normalizedValue);
      });
    }

    return acc;
  }, {} as Record<string, Set<string>>);

  // Converter os Sets para Arrays
  const result = Object.keys(labels).reduce((acc, key) => {
    acc[key] = Array.from(labels[key]);
    return acc;
  }, {} as Record<string, string[]>);

  console.log(result);

  return (
    <div className="grid gap-2 grid-cols-3 sm:flex">
      {Object.entries(result).map(([label, options]) => (
        <Select
          key={label}
          onValueChange={(value) => {
            switch (label) {
              case "gender":
                setSelectedGender(value);
                break;
              case "accent":
                setSelectedAccent(value);
                break;
              case "use_case":
                setSelectedUseCase(value);
                break;
              case "age":
                setSelectedAge(value);
                break;
              case "description":
                setSelectedDescription(value);
                break;
              default:
                break;
            }
          }}
        >
          <div className="flex flex-col py-1">
            <span className="py-1 text-xs">{label}:</span>
            <SelectTrigger>
              <SelectValue placeholder={"Todos"} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              {options.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </div>
        </Select>
      ))}
    </div>
  );
}
