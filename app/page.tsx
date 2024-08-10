import { Textarea } from "@/components/ui/textarea";
import { VoiceList } from "../components/voice-list";
import { BsFileWordFill, BsGithub, BsLinkedin } from "react-icons/bs";
import { CgWebsite } from "react-icons/cg";
import { BiWorld } from "react-icons/bi";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function Home() {
  return (
    <div className="flex relative flex-col items-center h-screen">
      <div className="py-2 flex-shrink-0 text-center border px-4 bg-white rounded-md my-2">
        <h1 className="font-bold text-xl">Text to Speech</h1>
        <p className="text-sm text-muted-foreground">
          Converta textos para voz
        </p>
      </div>

      <div className="hidden sm:block absolute right-3 top-3">
        <div className="flex items-center justify-center ">
          <Link target="_blank" href={"https://github.com/dev-andreola"}>
            <Button variant={"ghost"} size={"icon"}>
              <BsGithub size={22} />
            </Button>
          </Link>
          <Link
            target="_blank"
            href={"https://www.linkedin.com/in/dev-andreola/"}
          >
            <Button variant={"ghost"} size={"icon"}>
              <BsLinkedin size={22} />
            </Button>
          </Link>
          <Link target="_blank" href={"https://vt-code.vercel.app/"}>
            <Button variant={"ghost"} size={"icon"}>
              <BiWorld size={22} />
            </Button>
          </Link>
        </div>
      </div>

      <VoiceList />

      <div className="sm:hidden">
        <div className="flex py-2 items-center justify-center ">
          <Link target="_blank" href={"https://github.com/dev-andreola"}>
            <Button variant={"ghost"} size={"icon"}>
              <BsGithub size={22} />
            </Button>
          </Link>
          <Link
            target="_blank"
            href={"https://www.linkedin.com/in/dev-andreola/"}
          >
            <Button variant={"ghost"} size={"icon"}>
              <BsLinkedin size={22} />
            </Button>
          </Link>
          <Link target="_blank" href={"https://vt-code.vercel.app/"}>
            <Button variant={"ghost"} size={"icon"}>
              <BiWorld size={22} />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
