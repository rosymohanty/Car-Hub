"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import SearchManufacturer from "./SearchManufacturer";
import { updateSearchParams } from "@/utils";

const SearchBar = () => {
  const router = useRouter();
  const [manufacturer, setManufacturer] = useState("");
  const [model, setModel] = useState("");

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const params = new URLSearchParams(window.location.search);
    if (model) params.set("model", model.toLowerCase());
    else params.delete("model");
    if (manufacturer) params.set("manufacturer", manufacturer.toLowerCase());
    else params.delete("manufacturer");

    router.push(`${window.location.pathname}?${params.toString()}`, {
      scroll: false,
    });
  };

  return (
    <form className="searchbar" onSubmit={handleSearch}>
      <div className="searchbar__item">
        <SearchManufacturer
          manufacturer={manufacturer}
          setManufacturer={setManufacturer}
        />
      </div>

      <div className="searchbar__item">
        <Image
          src="/model-icon.png"
          width={25}
          height={25}
          className="absolute w-[20px] h-[20px] ml-4"
          alt="car model"
        />
        <input
          type="text"
          name="model"
          value={model}
          onChange={(e) => setModel(e.target.value)}
          placeholder="Tiguan..."
          className="searchbar__input"
        />
        <button type="submit" className="-ml-3 z-10">
          <Image
            src="/magnifying-glass.svg"
            alt="search"
            width={40}
            height={40}
            className="object-contain"
          />
        </button>
      </div>
    </form>
  );
};

export default SearchBar;