import {PrismaClient} from "@prisma/client"
export const prismaClientSingleton = () => new PrismaClient();

declare global {
    var prismaGlobal: undefined | ReturnType<typeof prismaClientSingleton>;
}

export const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

if(process.env.NODE_ENV !=="production" ) globalThis.prismaGlobal = prisma;