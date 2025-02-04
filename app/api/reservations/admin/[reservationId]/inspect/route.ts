import { NextResponse } from "next/server";
import { db } from "@/lib/db"; // Prisma client

export async function GET(
  req: Request,
  { params }: { params: { reservationId: string } }
) {
  const { reservationId } = params;

  try {
    const reservation = await db.reservation.findUnique({
      where: { id: reservationId },
    });

    return NextResponse.json(reservation);
  } catch (error) {
    console.log("[RESERVATION_GET_ERROR]: ", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
