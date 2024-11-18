import React, { useState } from 'react';

export default function RadioButton({ options, defaultValue, onChange }) {
  // State untuk menyimpan pilihan yang aktif
  const [selected, setSelected] = useState(defaultValue || options[0]?.value);

  // Fungsi untuk menangani perubahan seleksi
  const handleSelectionChange = (value) => {
    setSelected(value); // Update state lokal
    if (onChange) onChange(value); // Panggil fungsi callback dari props
  };

  return (
    <div className="flex gap-4 flex-wrap">
      {options.map((option) => (
        <label
          key={option.value}
          className="flex items-center cursor-pointer gap-2"
        >
          <input
            type="radio"
            name="customRadio"
            value={option.value}
            checked={selected === option.value}
            onChange={() => handleSelectionChange(option.value)}
            className="hidden" // Sembunyikan input asli
          />
          {/* Lingkaran Radio Button */}
          <span
            className={`w-4 h-4 flex items-center justify-center rounded-full border transition-all duration-200 ${
              selected === option.value
                ? 'bg-[#6173E6] border-[#6173E6]'
                : 'border-[#656666]'
            }`}
            style={{ width: '16px', height: '16px', borderWidth: '1px' }}
          >
            {selected === option.value && (
              <span className="w-2.5 h-2.5 bg-white rounded-full"></span>
            )}
          </span>
          {/* Label Radio Button */}
          <span
            className={`ml-2 text-sm transition-all duration-200 ${
              selected === option.value ? 'text-[#081116] font-medium' : 'text-[#656666]'
            }`}
          >
            {option.label}
          </span>
        </label>
      ))}
    </div>
  );
}
