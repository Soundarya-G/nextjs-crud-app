import { NextResponse } from "next/server"
import { prisma } from "@/app/lib/prisma"

//get all users
export async function GET() {
    try {
        const users = await prisma.user.findMany()
        return NextResponse.json(users)
    }
    catch (err) {
        return NextResponse.json({ err })
    }
}

//save 
export async function POST(request) {
    try {
      const user = await request.json();
  
      // Validate the incoming data (optional but recommended)
      if (!user.username || !user.email || !user.role) {
        return NextResponse.json(
          { error: "Missing required fields: username, email, or role." },
          { status: 400 }
        );
      }
  
      const response = await prisma.user.create({
        data: user,
      });
  
      return NextResponse.json(response, {
        status: 201,
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (err) {
      console.error("Error creating user:", err);
      return NextResponse.json(
        { error: "An error occurred while saving the user." },
        { status: 500 }
      );
    }
  }

//delete
export async function DELETE(request) {
    try {
      const url = new URL(request.url);
      const id = url.searchParams.get("id"); // Get ID from query parameters
  
      if (!id) {
        return NextResponse.json({ message: "User ID not provided", code: 400 });
      }
  
      // Convert ID to number
      const userId = parseInt(id, 10);
  
      // Check if the id is a valid number
      if (isNaN(userId)) {
        return NextResponse.json({ message: "Invalid user ID", code: 400 });
      }
  
      // Delete the user from the database
      await prisma.user.delete({
        where: {
          id: userId, // Use the parsed integer ID
        },
      });
  
      return new NextResponse(null, { status: 204 }); // Successfully deleted (no content)
    } catch (err) {
      console.error("Error deleting user:", err);
      return NextResponse.json({ err: err.message }, { status: 500 });
    }
  }

//update

export async function PUT(request) {
    try {
      const user = await request.json();
      const { id, username, email, role } = user;
  
      if (!id) {
        return NextResponse.json({ message: "User ID not provided", code: 400 });
      }
  
      const updatedUser = await prisma.user.update({
        where: { id },
        data: { username, email, role },
      });
  
      return NextResponse.json(updatedUser, { status: 200 });
    } catch (err) {
      console.error("Error updating user:", err);
      return NextResponse.json({ error: err.message }, { status: 500 });
    }
  }
  