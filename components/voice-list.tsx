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
import { useState } from "react";
import { Voice } from "elevenlabs/api";

export default function VoiceList() {
  return (
    <div className="w-full px-2">
      <Textarea placeholder="Digite aqui o seu texto..." />
      <div className="py-2">
        <h2 className="font-semibold">Escolha uma das vozes:</h2>
        <Card className=" py-2 px-4 space-y-2">
          <CardHeader className="p-0 flex flex-col items-center">
            <CardTitle>Elias</CardTitle>
            <CardDescription className="">
              <div>model</div>
            </CardDescription>
          </CardHeader>
          <div className="text-xs flex-1 text-muted-foreground flex justify-between px-2">
            <div className="flex flex-col items-center justify-center">
              <span className="font-semibold">sila</span>
              <span>doaiwdoaw</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="font-semibold">sila</span>
              <span>doaiwdoaw</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="font-semibold">sila</span>
              <span>doaiwdoaw</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="font-semibold">sila</span>
              <span>doaiwdoaw</span>
            </div>
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
        <Card className=" py-2 px-4 space-y-2">
          <CardHeader className="p-0 flex flex-col items-center">
            <CardTitle>Elias</CardTitle>
            <CardDescription className="">
              <div>model</div>
            </CardDescription>
          </CardHeader>
          <div className="text-xs flex-1 text-muted-foreground flex justify-between px-2">
            <div className="flex flex-col items-center justify-center">
              <span className="font-semibold">sila</span>
              <span>doaiwdoaw</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="font-semibold">sila</span>
              <span>doaiwdoaw</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="font-semibold">sila</span>
              <span>doaiwdoaw</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="font-semibold">sila</span>
              <span>doaiwdoaw</span>
            </div>
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
        <Card className=" py-2 px-4 space-y-2">
          <CardHeader className="p-0 flex flex-col items-center">
            <CardTitle>Elias</CardTitle>
            <CardDescription className="">
              <div>model</div>
            </CardDescription>
          </CardHeader>
          <div className="text-xs flex-1 text-muted-foreground flex justify-between px-2">
            <div className="flex flex-col items-center justify-center">
              <span className="font-semibold">sila</span>
              <span>doaiwdoaw</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="font-semibold">sila</span>
              <span>doaiwdoaw</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="font-semibold">sila</span>
              <span>doaiwdoaw</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="font-semibold">sila</span>
              <span>doaiwdoaw</span>
            </div>
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
      </div>
    </div>
  );
}
