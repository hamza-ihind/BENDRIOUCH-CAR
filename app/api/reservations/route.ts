import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { db } from "@/lib/db";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    const reservation = await db.reservation.findUnique({
      where: { id },
    });

    return NextResponse.json(reservation);
  } catch (error) {
    console.log("[RESERVATION_GET_ERROR]: ", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await auth();
    const userId = session?.user.id;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const values = await req.json();
    const { flightNumber, startDate, endDate, carId, startPlace, endPlace } =
      values;

    // Set default values for dates if not provided
    const start = startDate ? new Date(startDate) : new Date();
    const end = endDate
      ? new Date(endDate)
      : new Date(start.getTime() + 24 * 60 * 60 * 1000); // Default to one day after start date

    // Validate date format
    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      return new NextResponse("Invalid date format", { status: 400 });
    }

    // Ensure start date is before end date
    if (start >= end) {
      return new NextResponse("Start date must be before end date", {
        status: 400,
      });
    }

    const reservation = await db.reservation.create({
      data: {
        flightNumber,
        startDate: start,
        endDate: end,
        startPlace,
        endPlace,
        userId,
        carId,
        status: "PENDING",
      },
    });

    return NextResponse.json(reservation);
  } catch (error) {
    console.log("[RESERVATION_CREATE_ERROR]: ", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
