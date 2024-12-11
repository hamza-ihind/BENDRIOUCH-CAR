import { auth } from "@/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const session = await auth();
    const userId = session?.user.id;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const values = await req.json();
    const { flightNumber, startDate, endDate } = values;

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      return new NextResponse("Invalid date format", { status: 400 });
    }

    const reservation = await db.reservation.create({
      data: {
        flightNumber,
        startDate: start,
        endDate: end,
        userId,
        status: "PENDING",
      },
      include: {
        car: true,
        user: true,
      },
    });

    return NextResponse.json(reservation);
  } catch (error) {
    console.log("[RESERVATION_CREATE_ERROR]: ", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
