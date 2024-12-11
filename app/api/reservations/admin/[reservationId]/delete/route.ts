import { NextResponse } from "next/server";
import { db } from "@/lib/db"; // Prisma client
import { auth } from "@/auth"; // Authentication helper

export async function DELETE(
  req: Request,
  { params }: { params: { reservationId: string } }
) {
  try {
    const session = await auth();
    const userId = session?.user.id;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Fetch the reservation based on reservationId and userId
    const reservation = await db.reservation.findUnique({
      where: {
        id: params.reservationId,
        userId,
      },
    });

    if (!reservation) {
      return new NextResponse("Reservation not found", { status: 404 });
    }

    // Delete the reservation
    await db.reservation.delete({
      where: {
        id: params.reservationId,
      },
    });

    return new NextResponse("Reservation deleted successfully", {
      status: 200,
    });
  } catch (error) {
    console.log("[RESERVATION_DELETE_ERROR]: ", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
