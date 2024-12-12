import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { db } from "@/lib/db";

export async function PATCH(
  req: Request,
  { params }: { params: { reservationId: string } }
) {
  const session = await auth();

  try {
    const userId = session?.user.id;
    const { reservationId } = params;
    const values = await req.json();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const {
      flightNumber,
      startDate,
      endDate,
      startPlace,
      endPlace,
      status,
      isPublished,
      carId,
    } = values;

    // Prepare the data to be updated
    const updateData: any = {
      ...(flightNumber && { flightNumber }),
      ...(startDate && { startDate: new Date(startDate) }),
      ...(endDate && { endDate: new Date(endDate) }),
      ...(startPlace && { startPlace }),
      ...(endPlace && { endPlace }),
      ...(status && { status }),
      ...(isPublished !== undefined && { isPublished }),
      ...(carId && { carId }),
    };

    // Find the reservation
    const reservation = await db.reservation.findUnique({
      where: {
        id: reservationId,
      },
    });

    if (!reservation) {
      return new NextResponse("Not Found", { status: 404 });
    }

    // Check if the reservation belongs to the authenticated user
    if (reservation.userId !== userId) {
      return new NextResponse("Forbidden", { status: 403 });
    }

    // Update the reservation
    const updatedReservation = await db.reservation.update({
      where: {
        id: reservationId,
      },
      data: updateData,
    });

    return NextResponse.json({
      ...updatedReservation,
    });
  } catch (error) {
    console.log("[RESERVATION_ID_PATCH_ERROR]: ", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
