import { CarProps, FilterProps } from "@/types";

export const calculateCarRent = (city_mpg: number | string, year: number) => {
  const basePricePerDay = 50;
  const mileageFactor = 0.1;
  const ageFactor = 0.05;

  const mpg = Number(city_mpg);
  const safeMpg = Number.isFinite(mpg) ? mpg : 25;

  const mileageRate = safeMpg * mileageFactor;
  const ageRate = (new Date().getFullYear() - year) * ageFactor;

  return (basePricePerDay + mileageRate + ageRate).toFixed(0);
};

export const updateSearchParams = (type: string, value: string) => {
  const searchParams = new URLSearchParams(window.location.search);
  if (value) {
    searchParams.set(type, value);
  } else {
    searchParams.delete(type);
  }
  return `${window.location.pathname}?${searchParams.toString()}`;
};

async function queryCars(params: Record<string, string>, apiKey: string) {
  const query = new URLSearchParams(params);
  try {
    const response = await fetch(
      `https://api.api-ninjas.com/v1/cars?${query.toString()}`,
      {
        headers: { "X-Api-Key": apiKey },
        // Cache for 1 hour; revalidate in the background.
        next: { revalidate: 3600 },
      }
    );
    if (!response.ok) {
      console.error("API Ninjas error:", response.status, await response.text());
      return [];
    }
    const data = await response.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("fetchCars failed:", error);
    return [];
  }
}

export async function fetchCars(filters: Partial<FilterProps> = {}) {
  const { manufacturer, year, model, limit = 10, fuel } = filters;

  const apiKey = process.env.API_NINJAS_KEY;
  if (!apiKey) {
    console.error("API_NINJAS_KEY is missing in .env.local");
    return [];
  }

  // Build a single query. Only include params the API actually accepts.
  const params: Record<string, string> = {};
  if (manufacturer) params.make = manufacturer;
  if (model) params.model = model;
  if (fuel) params.fuel_type = fuel;
  if (year) params.year = String(year);

  // If no filters at all, fall back to a couple of popular makes so the
  // page isn't empty on first load.
  if (Object.keys(params).length === 0) {
    const seedMakes = ["toyota", "honda", "bmw"];
    const results = await Promise.all(
      seedMakes.map((make) => queryCars({ make }, apiKey))
    );
    return results.flat().slice(0, limit);
  }

  const cars = await queryCars(params, apiKey);
  return cars.slice(0, limit);
}

export const generateCarImageUrl = (car: CarProps, angle?: string) => {
  const url = new URL("https://cdn.imagin.studio/getimage");
  const { make, model, year } = car;

  url.searchParams.append(
    "customer",
    process.env.NEXT_PUBLIC_IMAGIN_API_KEY || ""
  );
  url.searchParams.append("make", make);
  url.searchParams.append("modelFamily", model.split(" ")[0]);
  url.searchParams.append("zoomType", "fullscreen");
  url.searchParams.append("modelYear", `${year}`);
  if (angle) url.searchParams.append("angle", angle);

  return url.toString();
};