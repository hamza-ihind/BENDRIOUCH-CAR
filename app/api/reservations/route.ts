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

    const reservation = await db.reservation.create({
      data: {
        flightNumber,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
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

    // Handle different actions (Update, Confirm, Cancel)
    let reservation;
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
          startDate: new Date(startDate),
          endDate: new Date(endDate),
        },
      });
    }

    return NextResponse.json(reservation);
  } catch (error) {
    console.log("[RESERVATION_PATCH_ERROR]: ", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
