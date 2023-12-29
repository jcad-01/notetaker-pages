import { Input } from "postcss";
import { z } from "zod";

import bcrypt from "bcrypt";

import {
    createTRPCRouter,
    protectedProcedure,
    publicProcedure,
} from "~/server/api/trpc";

export const userRouter = createTRPCRouter({
    create: publicProcedure.input(
        z.object({
            name: z.string().min(1),
            email: z.string().min(1),
            image: z.string().nullish(),
            password: z.string().min(1),

        })
    ).mutation(async ({ input, ctx }) => {
        const password = await bcrypt.hash(input.password, 10);
        await ctx.db.user.create({
            data: {
                name: input.name,
                email: input.email,
                password,
                image: input.image,
            },
        });
        return "User created successfully";
    })
});