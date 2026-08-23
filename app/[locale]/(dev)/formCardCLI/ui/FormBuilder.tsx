"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import type React from "react";
import { useState } from "react";

type InputType = "text" | "number" | "select" | "checkbox" | "radio";

interface FormInput {
  name: string;
  type: InputType;
  label: string;
  placeholder?: string;
  options?: string[];
  required: boolean;
}

export default function FormBuilder() {
  const [inputs, setInputs] = useState<FormInput[]>([]);
  const [currentInput, setCurrentInput] = useState<FormInput>({
    name: "",
    type: "text",
    label: "",
    placeholder: "",
    required: false
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCurrentInput(prev => ({ ...prev, [name]: value }));
  };

  const handleTypeChange = (value: InputType) => {
    setCurrentInput(prev => ({ ...prev, type: value }));
  };

  const handleRequiredChange = (checked: boolean) => {
    setCurrentInput(prev => ({ ...prev, required: checked }));
  };

  const handleOptionsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const options = e.target.value.split(",").map(option => option.trim());
    setCurrentInput(prev => ({ ...prev, options }));
  };

  const handleAddInput = () => {
    if (currentInput.name && currentInput.type && currentInput.label) {
      setInputs(prev => [...prev, currentInput]);
      setCurrentInput({
        name: "",
        type: "text",
        label: "",
        placeholder: "",
        required: false
      });
    }
  };

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Add New Input</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="name">Input Name</Label>
            <Input
              id="name"
              name="name"
              value={currentInput.name}
              onChange={handleInputChange}
              placeholder="e.g. firstName"
            />
          </div>
          <div>
            <Label htmlFor="type">Input Type</Label>
            <Select onValueChange={handleTypeChange} value={currentInput.type}>
              <SelectTrigger>
                <SelectValue placeholder="Select input type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="text">Text</SelectItem>
                <SelectItem value="number">Number</SelectItem>
                <SelectItem value="select">Select</SelectItem>
                <SelectItem value="checkbox">Checkbox</SelectItem>
                <SelectItem value="radio">Radio</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="label">Input Label</Label>
            <Input
              id="label"
              name="label"
              value={currentInput.label}
              onChange={handleInputChange}
              placeholder="e.g. First Name"
            />
          </div>
          <div>
            <Label htmlFor="placeholder">Placeholder (optional)</Label>
            <Input
              id="placeholder"
              name="placeholder"
              value={currentInput.placeholder}
              onChange={handleInputChange}
              placeholder="e.g. Enter your first name"
            />
          </div>
        </div>
        {(currentInput.type === "select" || currentInput.type === "radio") && (
          <div>
            <Label htmlFor="options">Options (comma-separated)</Label>
            <Input
              id="options"
              name="options"
              value={currentInput.options?.join(", ")}
              onChange={handleOptionsChange}
              placeholder="e.g. Option 1, Option 2, Option 3"
            />
          </div>
        )}
        <div className="flex items-center space-x-2">
          <Checkbox
            id="required"
            checked={currentInput.required}
            onCheckedChange={handleRequiredChange}
          />
          <Label htmlFor="required">Required</Label>
        </div>
        <Button onClick={handleAddInput}>Add Input</Button>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Form Preview</h2>
        {inputs.map((input, index) => (
          <div key={index} className="space-y-2">
            <Label>
              {input.label}
              {input.required && " *"}
            </Label>
            {input.type === "text" && <Input type="text" placeholder={input.placeholder} />}
            {input.type === "number" && <Input type="number" placeholder={input.placeholder} />}
            {input.type === "select" && (
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder={input.placeholder} />
                </SelectTrigger>
                <SelectContent>
                  {input.options?.map((option, i) => (
                    <SelectItem key={i} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
            {input.type === "checkbox" && (
              <div className="flex items-center space-x-2">
                <Checkbox id={input.name} />
                <Label htmlFor={input.name}>{input.label}</Label>
              </div>
            )}
            {input.type === "radio" && (
              <div className="space-y-2">
                {input.options?.map((option, i) => (
                  <div key={i} className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id={`${input.name}-${i}`}
                      name={input.name}
                      value={option}
                    />
                    <Label htmlFor={`${input.name}-${i}`}>{option}</Label>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
