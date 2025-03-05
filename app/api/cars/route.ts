import { auth } from "@/auth";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

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
    const cars = await db.car.findMany({
      where: {
        isPublished: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(cars);
  } catch (error) {
    console.log("[CARS_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
