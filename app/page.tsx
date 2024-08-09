import { VoiceList } from "../components/voice-list";

export default async function Home() {
  return (
    <div className="flex flex-col items-center">
      <div className="py-2 text-center border px-1 rounded-md my-2">
        <h1 className="font-bold text-xl">Text to Speech</h1>
        <p className="text-sm text-muted-foreground">
          Converta textos para voz
        </p>
      </div>
      <VoiceList />
    </div>
  );
}
