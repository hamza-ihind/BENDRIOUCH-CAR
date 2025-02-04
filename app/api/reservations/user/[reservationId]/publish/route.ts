import { auth } from "@/auth";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function PATCH(
  req: Request,
  { params }: { params: { reservationId: string } }
) {
  const session = await auth();

  if (!session?.user) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const { reservationId } = params;
  const { isPublished } = await req.json();

  if (!reservationId) {
    return new NextResponse("Missing reservationId", { status: 400 });
  }

  try {
    const reservation = await db.reservation.update({
      where: {
        id: reservationId,
        userId: session.user.id,
      },
      data: {
        isPublished: isPublished,
      },
    });

    return NextResponse.json(reservation);
  } catch (error) {
    console.error("Error updating reservation", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
