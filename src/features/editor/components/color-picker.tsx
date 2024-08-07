import { ChromePicker, CirclePicker, ColorResult } from 'react-color';

import { rgbaObjectToString } from '../helpers';
import { COLORS } from '../constants';

type ColorPickerProps = {
  value: string;
  onChange: (value: string) => void;
};

export default function ColorPicker(props: ColorPickerProps) {
  const {
    value,
    onChange
  } = props;

  /**
   * Handles the color change action.
   */
  const handleChange = (color: ColorResult) => {
    const formattedValue = rgbaObjectToString(color.rgb);

    onChange(formattedValue);
  };

  return (
    <div className="w-full space-y-4">
      <ChromePicker
        color={value}
        onChange={handleChange}
        className="rounded-lg border"
      />

      <CirclePicker
        color={value}
        colors={COLORS}
        onChangeComplete={handleChange}
      />
    </div>
  );
}