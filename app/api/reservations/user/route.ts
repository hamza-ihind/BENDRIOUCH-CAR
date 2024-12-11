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
    const { flightNumber, startDate, endDate, carId } = values;

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
        status: "PENDING", // Status is initially PENDING
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
    const { reservationId, action } = values;

    if (!reservationId || !action) {
      return new NextResponse("Reservation ID and action are required", {
        status: 400,
      });
    }

    const reservation = await db.reservation.findUnique({
      where: { id: reservationId },
    });

    if (!reservation) {
      return new NextResponse("Reservation not found", { status: 404 });
    }

    let updatedReservation;

    if (action === "CONFIRM" || action === "CANCEL") {
      if (
        reservation.status === "CONFIRMED" ||
        reservation.status === "CANCELLED"
      ) {
        return new NextResponse(
          "Cannot update a confirmed or cancelled reservation",
          { status: 400 }
        );
      }

      updatedReservation = await db.reservation.update({
        where: { id: reservationId },
        data: {
          status: action === "CONFIRM" ? "CONFIRMED" : "CANCELLED",
        },
      });
    } else if (action === "PENDING") {
      if (reservation.status === "PENDING") {
        return new NextResponse("Reservation is already pending", {
          status: 400,
        });
      }

      updatedReservation = await db.reservation.update({
        where: { id: reservationId },
        data: {
          status: "PENDING",
        },
      });
    } else {
      return new NextResponse("Invalid action", { status: 400 });
    }

    return NextResponse.json(updatedReservation);
  } catch (error) {
    console.log("[RESERVATION_PATCH_ERROR]: ", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
