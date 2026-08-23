import { Input } from "@/components/ui/input";

interface NumberInputProps {
  name: string;
  pattern?: string;
}

export default function NumberInput({ name, pattern, ...props }: NumberInputProps): JSX.Element {
  return (
    <Input
      {...props}
      type="number"
      // className="p-[15px] pl-[25px]"
      pattern={pattern ?? "[0-9]*"}
      data-testid={name}
      onKeyPress={e => {
        // Allow only numbers
        if (!/[0-9]/.test(e.key)) {
          e.preventDefault();
        }
      }}
    />
  );
}
