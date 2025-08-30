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

export async function PATCH(req: Request) {
  try {
    const session = await auth();
    const userId = session?.user.id;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Get data from request
    const values = await req.json();

    const { firstName, lastName, phone, image, city, country, birthday } =
      values;

    // Calculer isOnboarded basé sur les champs essentiels (image optionnelle)
    const isOnboarded =
      !!firstName &&
      !!lastName &&
      !!phone &&
      !!city &&
      !!country &&
      !!birthday;

    // Update the user
    const updatedUser = await db.user.update({
      where: { id: userId },
      data: {
        firstName,
        lastName,
        phone,
        image,
        city,
        country,
        birthday: birthday ? new Date(birthday) : null,
        isOnboarded,
      },
    });

    return NextResponse.json({
      ...updatedUser,
      password: undefined, // Exclude sensitive fields
    });
  } catch (error) {
    console.error("[USER_PATCH_ERROR]: ", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
