import React, { useEffect, useState } from "react";
import Title from "@/components/shared/Title";
import CarsList from "@/components/cars/cars-list";
import { Car } from "lucide-react";
import { getCars } from "@/actions/get-cars";
import { db } from "@/lib/db";

const Page = async () => {
  const cars = await db.car.findMany({});

  return (
    <div>
      <Title
        title="Notre Catalogue"
        description="je suis une description"
        icon={Car}
      />

      <CarsList cars={cars} />
    </div>
  );
};

export default Page;
