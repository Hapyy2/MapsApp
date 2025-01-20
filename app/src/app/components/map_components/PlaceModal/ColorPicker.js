import React from "react";

export default function ColorPicker({
  value,
  onChange,
  title = "Select pin color",
}) {
  const handleColorChange = (e) => {
    const background = e.target.value;
    onChange({
      background,
      borderColor: "#ffffff",
      glyphColor: background > "#777777" ? "#000000" : "#ffffff",
    });
  };

  return (
    <div className="flex items-center space-x-4">
      <input
        type="color"
        value={value.background}
        onChange={handleColorChange}
        className="w-16 h-16 border-2 rounded cursor-pointer"
        title={title}
      />
      <span className="text-sm">Pin Color: {value.background}</span>
    </div>
  );
}
