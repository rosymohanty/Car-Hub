"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";

import { CustomFilterProps, OptionProps } from "@/types";
import { updateSearchParams } from "@/utils";

export default function CustomFilter({ title, options }: CustomFilterProps) {
  const router = useRouter();
  const [selected, setSelected] = useState<OptionProps>(options[0]);

  const handleUpdateParams = (option: OptionProps) => {
    router.push(updateSearchParams(title, option.value.toLowerCase()), {
      scroll: false,
    });
  };

  return (
    <div className="w-fit">
      <Listbox
        value={selected}
        onChange={(option) => {
          setSelected(option);
          handleUpdateParams(option);
        }}
      >
        <div className="relative w-fit z-10">
          <ListboxButton className="custom-filter__btn">
            <span className="block truncate">{selected.title}</span>
            <Image
              src="/chevron-up-down.svg"
              width={20}
              height={20}
              className="ml-4 object-contain"
              alt="chevron up down"
            />
          </ListboxButton>

          <ListboxOptions
            transition
            className="custom-filter__options transition duration-100 ease-in data-[closed]:opacity-0"
          >
            {options.map((option) => (
              <ListboxOption
                key={option.title}
                value={option}
                className="group relative cursor-default select-none py-2 px-4 text-gray-900 data-[focus]:bg-primary-blue data-[focus]:text-white"
              >
                <span className="block truncate font-normal group-data-[selected]:font-medium">
                  {option.title}
                </span>
              </ListboxOption>
            ))}
          </ListboxOptions>
        </div>
      </Listbox>
    </div>
  );
}