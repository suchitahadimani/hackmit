
//THIS IS THE COMPONENT WHICH MAKES THE BUTTONS ON THE FORM PAGE -- TO ALLOW FOR MULTISELECT AND EASILY CREATE NEW BUTTONS

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";

interface MusicOptionCardsProps {
  options: string[];
  onSelect: (values: string[]) => void;
  initialSelected?: string[];
}

export function MusicOptionCards({ options, onSelect, initialSelected = [] }: MusicOptionCardsProps) {
  const [selected, setSelected] = useState<string[]>(initialSelected);

  const toggleOption = (option: string) => {
    const updatedSelected = selected.includes(option)
      ? selected.filter(item => item !== option)
      : [...selected, option];
    setSelected(updatedSelected);
    onSelect(updatedSelected);
  };

  return (
    <div className="flex flex-wrap gap-2 mb-2">
      {options.map((option) => (
        <Button
          type = "button"
          key={option}
          variant={selected.includes(option) ? "default" : "outline"}
          onClick={() => toggleOption(option)}
        >
          {option}
        </Button>
      ))}
    </div>
  );
}