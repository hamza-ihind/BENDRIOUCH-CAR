import { NextResponse } from "next/server";
import { db } from "@/lib/db"; // Prisma client
import { auth } from "@/auth"; // Assume this is your auth helper

export async function PATCH(
  req: Request,
  { params }: { params: { reservationId: string } }
) {
  try {
    const session = await auth();
    const userId = session?.user.id;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const reservation = await db.reservation.findUnique({
      where: {
        id: params.reservationId,
      },
      include: {
        car: true,
        user: true,
      },
    });

    if (!reservation) {
      return new NextResponse("Reservation not found", { status: 404 });
    }

    // Update both reservation and car
    const updatedReservation = await db.reservation.update({
      where: { id: params.reservationId },
      data: {
        status: "CONFIRMED",
        car: {
          update: {
            where: { id: reservation.carId! },
            data: { availability: false },
          },
        },
      },
      include: {
        car: true,
      },
    });

    return NextResponse.json(updatedReservation);
  } catch (error) {
    console.log("[RESERVATION_CONFIRM_ERROR]: ", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function GET() {
  try {
    // Get all confirmed reservations with unavailable cars
    const reservations = await db.reservation.findMany({
      where: {
        status: "CONFIRMED",
        endDate: {
          lte: new Date(), // Find reservations where end date is less than or equal to now
        },
        car: {
          availability: false,
        },
      },
      include: {
        car: true,
      },
    });

    // Update car availability for completed reservations
    for (const reservation of reservations) {
      if (reservation.carId) {
        await db.car.update({
          where: { id: reservation.carId },
          data: { availability: true },
        });
      }
    }

    return NextResponse.json({
      message: "Car availability updated successfully",
    });
  } catch (error) {
    console.log("[CHECK_AVAILABILITY_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
