import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { db } from "@/lib/db";

export async function PATCH(
  req: Request,
  { params }: { params: { carId: string } }
) {
  try {
    const session = await auth();
    const userId = session?.user.id;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const car = await db.car.findUnique({
      where: {
        id: params.carId,
      },
    });

    if (!car) {
      return new NextResponse("Not Found", { status: 404 });
    }

    const unpublishedCar = await db.car.update({
      where: {
        id: params.carId,
      },
      data: {
        isPublished: false,
      },
    });

    return NextResponse.json(unpublishedCar);
  } catch (error) {
    console.log("[CAR_ID_UNPUBLISH]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
