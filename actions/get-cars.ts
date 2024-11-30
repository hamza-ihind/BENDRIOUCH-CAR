import { Car } from "@prisma/client";
import { db } from "@/lib/db";

export const getCars = async () => {
  try {
    const cars = await db.car.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return cars;
  } catch (error) {
    console.log("[GET_CARS]", error);
    return [];
  }
};
