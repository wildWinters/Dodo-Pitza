import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { randomUUID } from "crypto";
    
interface IUserData{
    id: string |  number;
    name: string;
    password: null;
    phone: null;
    email: null;
}

const userData: IUserData = [{
    id: null,
    name: null,
    password: null,
    phone: null,
    email: null,
}]

// GET handler
export async function GET(request: NextRequest) {
  return NextResponse.json({ message: "hello world my dear friend" });
}

// POST handler
export async function POST(client: NextRequest) {
    const body = await client.json();
  return NextResponse.json({ received: body });
}

// User factory
export function createUser(name: string, password: string, id: string = randomUUID()) {
  return {
    id,
    name,
    password,
  };
}
