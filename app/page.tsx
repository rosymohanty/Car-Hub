import { Suspense } from "react";
import { Hero, SearchBar, CustomFilter, CarCard } from "@/components";
import { fetchCars } from "@/utils";
import { fuels, yearsOfProduction } from "@/constants";
import { CarProps } from "@/types";

type SearchParams = Promise<{
  manufacturer?: string;
  year?: string;
  fuel?: string;
  limit?: string;
  model?: string;
}>;

async function CarList({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;

  const allCars = await fetchCars({
    manufacturer: params.manufacturer || "",
    year: params.year ? Number(params.year) : undefined,
    fuel: params.fuel || "",
    limit: Number(params.limit) || 10,
    model: params.model || "",
  });

  if (!Array.isArray(allCars) || allCars.length < 1) {
    return (
      <div className="home__error-container">
        <h2 className="text-black text-xl font-bold">Oops, no results</h2>
        <p>Try changing your filters.</p>
      </div>
    );
  }

  return (
    <section>
      <div className="home__cars-wrapper">
        {allCars.map((car: CarProps, index: number) => (
          <CarCard key={`${car.make}-${car.model}-${index}`} car={car} />
        ))}
      </div>
    </section>
  );
}

export default function Home({ searchParams }: { searchParams: SearchParams }) {
  return (
    <main className="overflow-hidden">
      <Hero />

      <div className="mt-12 padding-x padding-y max-width" id="discover">
        <div className="home__text-container">
          <h1 className="text-4xl font-extrabold">Car Catalogue</h1>
          <p>Explore the cars you might like</p>
        </div>

        <div className="home__filters">
          <SearchBar />
          <div className="home__filter-container">
            <CustomFilter title="fuel" options={fuels} />
            <CustomFilter title="year" options={yearsOfProduction} />
          </div>
        </div>

        <Suspense fallback={<p className="mt-16 text-center">Loading cars...</p>}>
          <CarList searchParams={searchParams} />
        </Suspense>
      </div>
    </main>
  );
}