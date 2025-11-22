"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

const flags = [
  { country: "France", image: "/flags/france.png" },
  { country: "Germany", image: "/flags/germany.png" },
  { country: "Italy", image: "/flags/italy.png" },
  { country: "Japan", image: "/flags/japan.png" },
  { country: "Brazil", image: "/flags/brazil.png" },
];

export default function FlagIdentification() {
  const [selectedFlag, setSelectedFlag] = useState(flags[Math.floor(Math.random() * flags.length)]);
  const [guess, setGuess] = useState("");
  const [result, setResult] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (guess.trim().toLowerCase() === selectedFlag.country.toLowerCase()) {
      setResult("Correct!");
    } else {
      setResult(`Wrong! It was ${selectedFlag.country}.`);
    }
  };

  const handleNewFlag = () => {
    setSelectedFlag(flags[Math.floor(Math.random() * flags.length)]);
    setGuess("");
    setResult(null);
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <h3 className="text-xl font-semibold">Guess the Flag</h3>
      </CardHeader>
      <CardContent>
        <img
          src={selectedFlag.image}
          alt="Country flag"
          className="w-full h-auto rounded-md mb-4"
        />
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <Label htmlFor="guess">Your Guess</Label>
          <Input
            id="guess"
            value={guess}
            onChange={(e) => setGuess(e.target.value)}
            placeholder="Enter country name"
          />
          <Button type="submit" className="mt-2">
            Submit
          </Button>
        </form>
        {result && <p className={cn("mt-4 font-medium", result === "Correct!" ? "text-green-600" : "text-red-600")}>{result}</p>}
      </CardContent>
      <CardFooter>
        <Button variant="outline" onClick={handleNewFlag}>
          New Flag
        </Button>
      </CardFooter>
    </Card>
  );
}
