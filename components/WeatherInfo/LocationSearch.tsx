import React from 'react';
import { AutoComplete, Option } from '@/components/ui/autocomplete';
import { GeoLocation } from '@/types/openWeatherMap';

interface LocationSearchProps {
  selectedCity: GeoLocation | null;
  inputValue: string;
  setInputValue: (value: string) => void;
  geoData: GeoLocation[] | undefined;
  isGeoLoading: boolean;
  onSelectCity: (location: GeoLocation) => void;
}

const LocationSearch = ({
  geoData,
  isGeoLoading,
  onSelectCity,
  inputValue,
  setInputValue,
  selectedCity,
}: LocationSearchProps) => {
  // Transform geoData to format expected by AutoComplete
  const locationItems = React.useMemo(() => {
    return (geoData || []).map(location => ({
      value: `${location.lat},${location.lon}`,
      label: `${location.name}, ${location.country}`,
      // Store the full location data to be retrieved when selected
      data: location,
    }));
  }, [geoData]);

  // Extract selected value (lat,lon) from selectedCity
  const selectedLocation = React.useMemo(() => {
    if (!selectedCity) {
      return undefined;
    }
    const value = `${selectedCity.lat},${selectedCity.lon}`;
    const found = locationItems.find(item => item.value === value);
    return found ?? undefined;
  }, [locationItems, selectedCity]);

  const handleSelectedValueChange = (option: Option) => {
    if (!option) {
      return;
    }

    // Find the selected location from the items
    const selected = locationItems.find(item => item.value === option.value);
    if (selected && selected.data) {
      onSelectCity(selected.data);
      setInputValue(option.label);
    }
  };

  return (
    <div className="relative w-full">
      <AutoComplete
        value={selectedLocation}
        onValueChange={handleSelectedValueChange}
        options={locationItems}
        isLoading={isGeoLoading}
        emptyMessage={
          inputValue ? 'No locations found' : 'Type to search locations'
        }
        inputValue={inputValue}
        onInputValueChange={setInputValue}
        placeholder="Search for a city..."
      />
    </div>
  );
};

export default LocationSearch;
