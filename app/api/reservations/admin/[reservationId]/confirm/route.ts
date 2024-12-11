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

    const reservation = db.reservation.findUnique({
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

    const updatedReservation = await db.reservation.update({
      where: { id: params.reservationId },
      data: {
        status: "CONFIRMED",
      },
    });

    return NextResponse.json(updatedReservation);
  } catch (error) {
    console.log("[RESERVATION_CONFIRM_ERROR]: ", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
