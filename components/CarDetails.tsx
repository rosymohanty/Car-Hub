"use client";

import Image from "next/image";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
} from "@headlessui/react";

import { CarProps } from "@/types";

interface CarDetailsProps {
  isOpen: boolean;
  closeModal: () => void;
  car: CarProps;
}

const CarDetails = ({ isOpen, closeModal, car }: CarDetailsProps) => (
  <Dialog open={isOpen} onClose={closeModal} className="relative z-50">
    <DialogBackdrop
      transition
      className="fixed inset-0 bg-black/25 transition duration-300 ease-out data-[closed]:opacity-0"
    />

    <div className="fixed inset-0 overflow-y-auto">
      <div className="flex min-h-full items-center justify-center p-4 text-center">
        <DialogPanel
          transition
          className="car-details__dialog-panel duration-300 ease-out data-[closed]:scale-95 data-[closed]:opacity-0"
        >
          <button
            type="button"
            className="car-details__close-btn"
            onClick={closeModal}
          >
            <Image
              src="/close.svg"
              alt="close"
              width={20}
              height={20}
              className="object-contain"
            />
          </button>

          <div className="relative w-full h-40 bg-primary-blue-100 rounded-lg">
            <Image
              src="/hero.png"
              alt="car model"
              fill
              className="object-contain"
            />
          </div>

          <div className="flex-1 flex flex-col gap-2">
            <h2 className="font-semibold text-xl capitalize">
              {car.make} {car.model}
            </h2>

            <div className="mt-3 flex flex-wrap gap-4">
              {Object.entries(car)
                .filter(
                  ([, value]) =>
                    !String(value).toLowerCase().includes("subscribers")
                )
                .filter(([key]) => key !== "image_url")
                .map(([key, value]) => (
                  <div
                    className="flex justify-between gap-5 w-full text-right"
                    key={key}
                  >
                    <h4 className="text-grey capitalize">
                      {key.split("_").join(" ")}
                    </h4>
                    <p className="text-black-100 font-semibold">
                      {String(value)}
                    </p>
                  </div>
                ))}
            </div>
          </div>
        </DialogPanel>
      </div>
    </div>
  </Dialog>
);

export default CarDetails;