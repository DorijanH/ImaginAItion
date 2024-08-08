import { Minus, Plus } from 'lucide-react';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

type FontSizeInputProps = {
  value: number;
  onChange: (value: number) => void;
}

export default function FontSizeInput(props: FontSizeInputProps) {
  const {
    value,
    onChange
  } = props;

  /**
   * Handles the increment action.
   */
  const handleIncrement = () => {
    onChange(value + 1);
  };

  /**
   * Handles the decrement action.
   */
  const handleDecrement = () => {
    onChange(value - 1);
  };

  /**
   * Handles the change action.
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);

    onChange(value);
  };

  return (
    <div className="flex items-center">
      <Button
        size="icon"
        variant="outline"
        onClick={handleDecrement}
        className="rounded-r-none border-r-0 p-2"
      >
        <Minus className="size-4" />
      </Button>

      <Input
        value={value}
        onChange={handleChange}
        className="h-8 w-[50px] rounded-none focus-visible:ring-0 focus-visible:ring-offset-0"
      />

      <Button
        size="icon"
        variant="outline"
        onClick={handleIncrement}
        className="rounded-l-none border-l-0 p-2"
      >
        <Plus className="size-4" />
      </Button>
    </div>
  );
}