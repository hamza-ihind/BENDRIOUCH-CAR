import { auth } from "@/auth";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { isAdmin } from "@/lib/admin";

export async function POST(req: Request) {
  const session = await auth();
  try {
    const userId = session?.user.id;
    const { name } = await req.json();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const car = await db.car.create({
      data: {
        name,
      },
    });

    return NextResponse.json(car);
  } catch (error) {
    console.log("[CARS_CREATE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const session = await auth();

    if (!session?.user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const cars = await db.car.findMany({
      where: {
        isPublished: true,
      },
    });

    return NextResponse.json(cars);
  } catch (error) {
    console.log("[CARS_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
