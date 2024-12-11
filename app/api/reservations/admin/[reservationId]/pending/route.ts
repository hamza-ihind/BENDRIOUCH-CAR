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

    // Fetch reservation based on reservationId and userId
    const reservation = await db.reservation.findUnique({
      where: {
        id: params.reservationId,
        userId,
      },
      include: {
        car: true,
        user: true,
      },
    });

    if (!reservation) {
      return new NextResponse("Reservation not found", { status: 404 });
    }

    // Prevent setting a reservation to PENDING if it is already PENDING
    if (reservation.status === "PENDING") {
      return new NextResponse("Reservation is already in PENDING status", {
        status: 400,
      });
    }

    // Update reservation status to PENDING
    const updatedReservation = await db.reservation.update({
      where: { id: params.reservationId },
      data: {
        status: "PENDING",
      },
    });

    return NextResponse.json(updatedReservation);
  } catch (error) {
    console.log("[RESERVATION_PENDING_ERROR]: ", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
