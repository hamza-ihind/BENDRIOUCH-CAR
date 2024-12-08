import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const session = await auth();
    const userId = session?.user.id;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const values = await req.json();
    const { carId, flightNumber, startDate, endDate } = values;

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

export async function PATCH(req: Request) {
  try {
    const session = await auth();
    const userId = session?.user.id;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const values = await req.json();
    const {
      reservationId,
      flightNumber,
      passportNumber,
      driverLicense,
      startDate,
      endDate,
      action,
    } = values;

    if (action && session.user.role !== "ADMIN") {
      return new NextResponse("Forbidden", { status: 403 });
    }

    // Ensure valid date format for update
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      return new NextResponse("Invalid date format", { status: 400 });
    }

    let reservation;

    // Handle different actions (Update, Confirm, Cancel)
    if (action === "CONFIRM" || action === "CANCEL") {
      reservation = await db.reservation.update({
        where: { id: reservationId },
        data: {
          status: action === "CONFIRM" ? "CONFIRMED" : "CANCELLED",
        },
      });
    } else {
      // Update reservation details
      reservation = await db.reservation.update({
        where: { id: reservationId },
        data: {
          flightNumber,
          startDate: start,
          endDate: end,
        },
      });
    }

    return NextResponse.json(reservation);
  } catch (error) {
    console.log("[RESERVATION_PATCH_ERROR]: ", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
