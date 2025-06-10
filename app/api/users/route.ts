import { Prisma } from "@prisma/client";
import {prisma} from "@/prisma/prisma-client"
import { NextResponse } from "next/server";
export function Get(){
    const users = await prisma.user.findMany();

    return NextResponse.json({
        users:["user1","user2","user3"],
    });

}   