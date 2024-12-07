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

    const values = await req.json();

    const {
      firstName,
      lastName,
      phone,
      image,
      permis,
      passport,
      city,
      country,
      birthday,
    } = values;

    const updateData: any = {
      ...(firstName && { firstName }),
      ...(lastName && { lastName }),
      ...(phone && { phone }),
      ...(image && { image }),
      ...(permis && { permis }),
      ...(passport && { passport }),
      ...(city && { city }),
      ...(country && { country }),
      ...(birthday && { birthday: new Date(birthday) }),
    };

    const user = await db.user.update({
      where: {
        id: userId,
      },
      data: updateData,
    });

    return NextResponse.json({
      ...user,
      // Optionally exclude sensitive fields
      password: undefined,
    });
  } catch (error) {
    console.log("[USER_ID_PATCH_ERROR]: ", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
