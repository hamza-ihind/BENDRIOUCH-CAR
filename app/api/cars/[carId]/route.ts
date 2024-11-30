import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { db } from "@/lib/db";

export async function DELETE(
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

    const deletedCar = await db.car.delete({
      where: {
        id: params.carId,
      },
    });

    return NextResponse.json({
      ...deletedCar,
    });
  } catch (error) {
    console.log("[CAR_ID_DELETE_ERROR]: ", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { carId: string } }
) {
  const session = await auth();

  try {
    const userId = session?.user.id;
    const { carId } = params;
    const values = await req.json();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const {
      name,
      model,
      pricePerDay,
      imageUrl,
      description,
      availability,
      fuelType,
      seats,
      transmission,
      isPublished,
    } = values;

    const updateData: any = {
      ...(name && { name }),
      ...(model && { model }),
      ...(pricePerDay !== undefined && { pricePerDay }),
      ...(imageUrl && { imageUrl }),
      ...(description && { description }),
      ...(availability !== undefined && { availability }),
      ...(fuelType && { fuelType }),
      ...(seats !== undefined && { seats }),
      ...(transmission && { transmission }),
      ...(isPublished !== undefined && { isPublished }),
    };

    const car = await db.car.update({
      where: {
        id: carId,
      },
      data: updateData,
    });

    return NextResponse.json({
      ...car,
    });
  } catch (error) {
    console.log("[CAR_ID_PATCH_ERROR]: ", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
