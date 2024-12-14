import React, {
    forwardRef,
    useImperativeHandle,
    useEffect,
    useMemo,
    useRef,
    useState,
  } from "react";
  import NativeSelect, {
    NativeSelectProps,
  } from "@modules/common/components/native-select";
  
  const LocalitySelect = forwardRef<
    HTMLSelectElement,
    NativeSelectProps & {
      placeholder?: string;
      county: string; // Județul selectat
    }
  >(({ placeholder = "Select Locality", county, defaultValue, ...props }, ref) => {
    const innerRef = useRef<HTMLSelectElement>(null);
    const [localities, setLocalities] = useState<{ name: string }[]>([]);
  
    useImperativeHandle(ref, () => innerRef.current);
  
    useEffect(() => {
      if (!county) {
        setLocalities([]);
        return;
      }
  
      const fetchLocalities = async () => {
        try {
          const response = await fetch(
            `https://api.fancourier.ro/reports/localities?county=${encodeURIComponent(
              county
            )}`,
            {
              method: "GET",
            }
          );
  
          if (response.ok) {
            const data = await response.json();
            setLocalities(data.data || []);
          } else {
            console.error("Failed to fetch localities.");
          }
        } catch (error) {
          console.error("Error fetching localities:", error);
        }
      };
  
      fetchLocalities();
    }, [county]);
  
    const localityOptions = useMemo(() => {
      return localities.map((locality) => ({
        value: locality.name,
        label: locality.name,
      }));
    }, [localities]);
  
    return (
      <NativeSelect
        ref={innerRef}
        placeholder={placeholder}
        defaultValue={defaultValue}
        {...props}
      >
        {localityOptions?.length > 0 ? (
          localityOptions.map(({ value, label }, index) => (
            <option key={index} value={value}>
              {label}
            </option>
          ))
        ) : (
          <option value="" disabled>
            No localities available
          </option>
        )}
      </NativeSelect>
    );
  });
  
  LocalitySelect.displayName = "LocalitySelect";
  
  export default LocalitySelect;
  