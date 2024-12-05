import { NextResponse } from "next/server"
import { prisma } from "@/app/lib/prisma"

//get all users
export async function GET(request, { params }) {
    try {
        const id = params.id
        const user = await prisma.user.findUnique({
            where: {
                id: id
            }
        })
        console.log(user)
        if (!user) {
            return NextResponse.json({ message: 'User Not Founnd', code: 404 })
        }
        return NextResponse.json(user)
    }
    catch (err) {
        return NextResponse.json({ err })
    }
}

//update 

export async function PUT(request, { params }) {
    try {
        const id = params.id
        const user = await request.json()
        console.log('user',user)
        const updatedUser = await prisma.user.update({
            where: {
                id: id
            },
            data: user
        })
        if (!updatedUser) {
            return NextResponse.json({ message: 'User Not Found', code: 404 })
        }
        return NextResponse.json(updatedUser)
    }
    catch (err) {
        return NextResponse.json({ err })
    }
}

export async function DELETE(request, { params }) {
    try {
        const id = params.id
        if (!id) {
            return NextResponse.json({ message: 'User Not Found', code: 404 })
        }

        await prisma.user.delete({
            where: {
                id: id
            }
        })

        return new NextResponse(null, { status: 404 })
    }
    catch (err) {
        return NextResponse.json({ err })
    }
}
