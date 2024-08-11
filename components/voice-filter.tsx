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

  const normalize = (value: string) => {
    return value.toLowerCase().replace(/\s+/g, "-");
  };

  const labels = voices.reduce((acc, voice) => {
    const voiceLabels = voice.labels;

    if (voiceLabels) {
      Object.keys(voiceLabels).forEach((label) => {
        if (!acc[label]) {
          acc[label] = new Set<string>();
        }
        const normalizedValue = normalize(voiceLabels[label]);
        acc[label].add(normalizedValue);
      });
    }

    return acc;
  }, {} as Record<string, Set<string>>);

  const result = Object.keys(labels).reduce((acc, key) => {
    acc[key] = Array.from(labels[key]);
    return acc;
  }, {} as Record<string, string[]>);

  console.log(result);

  return (
    <div className="grid grid-cols-3 gap-2 sm:flex sm:gap-2">
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
