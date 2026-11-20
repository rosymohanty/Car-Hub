"use client";

import Image from "next/image";
import { useState } from "react";
import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from "@headlessui/react";

import { manufacturers } from "@/constants";
import { SearchManufacturerProps } from "@/types";

const SearchManufacturer = ({
  manufacturer,
  setManufacturer,
}: SearchManufacturerProps) => {
  const [query, setQuery] = useState("");

  const filteredManufacturers =
    query === ""
      ? manufacturers
      : manufacturers.filter((item) =>
          item
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, ""))
        );

  return (
    <div className="search-manufacturer">
      <Combobox
        value={manufacturer}
        onChange={(value) => setManufacturer(value ?? "")}
        onClose={() => setQuery("")}
      >
        <div className="relative w-full">
          <ComboboxButton className="absolute top-[14px]">
            <Image
              src="/car-logo.svg"
              width={20}
              height={20}
              className="ml-4"
              alt="car logo"
            />
          </ComboboxButton>

          <ComboboxInput
            className="search-manufacturer__input"
            displayValue={(item: string) => item}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Volkswagen..."
          />

          <ComboboxOptions
            transition
            className="search-manufacturer__options transition duration-100 ease-in data-[closed]:opacity-0"
          >
            {filteredManufacturers.length === 0 && query !== "" ? (
              <ComboboxOption value={query} className="search-manufacturer__option">
                Create &quot;{query}&quot;
              </ComboboxOption>
            ) : (
              filteredManufacturers.map((item) => (
                <ComboboxOption
                  key={item}
                  value={item}
                  className="group search-manufacturer__option relative text-gray-900 data-[focus]:bg-primary-blue data-[focus]:text-white"
                >
                  <span className="block truncate font-normal group-data-[selected]:font-medium">
                    {item}
                  </span>
                </ComboboxOption>
              ))
            )}
          </ComboboxOptions>
        </div>
      </Combobox>
    </div>
  );
};

export default SearchManufacturer;