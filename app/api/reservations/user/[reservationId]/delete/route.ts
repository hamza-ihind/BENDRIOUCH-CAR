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

    const reservation = await db.reservation.findUnique({
      where: {
        id: params.reservationId,
      },
    });

    if (!reservation) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const deletedReservation = await db.reservation.delete({
      where: {
        id: params.reservationId,
      },
    });

    return NextResponse.json(deletedReservation);
  } catch (error) {
    console.log("[RESERVATION_ID_DELETE]: ", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
