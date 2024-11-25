import React, { useMemo } from 'react';
import Select from 'react-select';
import { FellowshipCenter } from '../types';

interface StreetSelectorProps {
  fellowshipCenters: FellowshipCenter[];
  onSelect: (street: string) => void;
}

export default function StreetSelector({ fellowshipCenters, onSelect }: StreetSelectorProps) {
  const options = useMemo(() => {
    const allStreets = fellowshipCenters.flatMap(center => 
      center.streets.map(street => ({
        value: street,
        label: street,
        group: center.name
      }))
    );
    
    return allStreets.sort((a, b) => a.label.localeCompare(b.label));
  }, [fellowshipCenters]);

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-300">
        Select Your Street
      </label>
      <Select
        options={options}
        onChange={(option) => option && onSelect(option.value)}
        className="street-select"
        classNamePrefix="street-select"
        placeholder="Type or select your street..."
        theme={(theme) => ({
          ...theme,
          colors: {
            ...theme.colors,
            primary: '#E50914',
            primary25: '#2F2F2F',
            neutral0: '#1F1F1F',
            neutral80: '#FFFFFF',
          },
        })}
        styles={{
          input: (base) => ({
            ...base,
            color: '#FFFFFF'
          }),
          option: (base) => ({
            ...base,
            color: '#FFFFFF'
          }),
        }}
      />
    </div>
  );
}