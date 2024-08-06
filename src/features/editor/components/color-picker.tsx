import { ChromePicker, CirclePicker, ColorResult } from "react-color";
import { COLORS } from "../constants";
import { rgbaObjectToString } from "../helpers";

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
        className="border rounded-lg"
      />

      <CirclePicker
        color={value}
        colors={COLORS}
        onChangeComplete={handleChange}
      />
    </div>
  );
}