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
}: {
  setSelectedGender: (value: string) => void;
  setSelectedAccent: (value: string) => void;
  setSelectedUseCase: (value: string) => void;
  setSelectedAge: (value: string) => void;
}) {
  return (
    <div className="flex gap-2">
      <Select onValueChange={setSelectedGender}>
        <SelectTrigger>
          <SelectValue placeholder="gender" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todos</SelectItem>
          <SelectItem value="male">Male</SelectItem>
          <SelectItem value="female">Female</SelectItem>
        </SelectContent>
      </Select>
      <Select onValueChange={setSelectedAccent}>
        <SelectTrigger>
          <SelectValue placeholder="accent" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todos</SelectItem>
          <SelectItem value="american">American</SelectItem>
          <SelectItem value="british">British</SelectItem>
          <SelectItem value="australian">Australian</SelectItem>
        </SelectContent>
      </Select>
      <Select onValueChange={setSelectedUseCase}>
        <SelectTrigger>
          <SelectValue placeholder="use_case" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todos</SelectItem>
          <SelectItem value="narration">Narration</SelectItem>
          <SelectItem value="conversational">Conversational</SelectItem>
        </SelectContent>
      </Select>
      <Select onValueChange={setSelectedAge}>
        <SelectTrigger>
          <SelectValue placeholder="age" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todos</SelectItem>
          <SelectItem value="young">Young</SelectItem>
          <SelectItem value="middle-aged">Middle-aged</SelectItem>
          <SelectItem value="old">Old</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
