import { Car } from "@prisma/client";
import { db } from "@/lib/db";

export const getCars = async (): Promise<Car[]> => {
  try {
    const cars = await db.car.findMany({
      orderBy: {
        createdAt: "desc", // Ordering by creation date
      },
    });
    return cars;
  } catch (error) {
    console.error("[GET_CARS]", error);
    return [];
  }
};
