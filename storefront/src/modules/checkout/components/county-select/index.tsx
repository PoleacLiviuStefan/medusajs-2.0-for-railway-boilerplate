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
import { HttpTypes } from "@medusajs/types"

const CountySelect = forwardRef<
  HTMLSelectElement,
  NativeSelectProps & {
    placeholder?: string;
    region?: HttpTypes.StoreRegion;
  }
>(({ placeholder = "Select County",region, defaultValue, ...props }, ref) => {
  const innerRef = useRef<HTMLSelectElement>(null);
  const [counties, setCounties] = useState<{ id: number; name: string }[]>([]);

  useImperativeHandle(ref, () => innerRef.current);

  useEffect(() => {
    const fetchCounties = async () => {
      try {
        const response = await fetch("https://api.fancourier.ro/reports/counties", {
          method: "GET",
        });

        if (response.ok) {
          const data = await response.json();
          setCounties(data.data || []); // Accesează `data` din răspuns
          console.log("data ", data)
        } else {
          console.error("Failed to fetch counties.");
        }
      } catch (error) {
        console.error("Error fetching counties:", error);
      }
    };

    fetchCounties();
  }, []);

  const countyOptions = useMemo(() => {
    return counties.map((county) => ({
      value: county.name, // Folosește numele județului pentru value
      label: county.name, // Folosește numele județului pentru afișare
    }));
  }, [counties]);

  return (
    <NativeSelect
      ref={innerRef}
      placeholder={placeholder}
      defaultValue={defaultValue}
      {...props}
    >
      {countyOptions?.length > 0 ? (
        countyOptions.map(({ value, label }, index) => (
          <option key={index} value={value}>
            {label}
          </option>
        ))
      ) : (
        <option value="" disabled>
          No counties available
        </option>
      )}
    </NativeSelect>
  );
});

CountySelect.displayName = "CountySelect";

export default CountySelect;
