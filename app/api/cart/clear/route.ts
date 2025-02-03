import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const CART_FILE_PATH = path.join(process.cwd(), "data", "cart.json");

// Define the structure of a cart item
interface Cart {
  userId: string;
  items: { productId: string; quantity: number }[];
}

interface CartData {
  carts: Cart[];
}

// Read cart file and ensure correct typing
const readCartFile = (): CartData => {
  try {
    const data = fs.readFileSync(CART_FILE_PATH, "utf-8");
    return JSON.parse(data) as CartData; // Use type assertion
  } catch (error) {
    console.error("Error reading the cart file:", error);
    return { carts: [] };
  }
};

// Write to cart file
const writeCartFile = (data: CartData) => {
  try {
    fs.writeFileSync(CART_FILE_PATH, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error("Error writing to the cart file:", error);
  }
};

// DELETE method to clear user's cart
export async function DELETE(req: Request) {
  try {
    const body = await req.json();
    const { userId } = body;

    if (!userId) {
      return NextResponse.json({ error: "userId is required" }, { status: 400 });
    }

    const data = readCartFile();
    const userCartIndex = data.carts.findIndex((cart) => cart.userId === userId);

    if (userCartIndex === -1) {
      return NextResponse.json({ error: "Cart not found" }, { status: 404 });
    }

    // Remove user's cart
    data.carts.splice(userCartIndex, 1);
    writeCartFile(data);

    return NextResponse.json({ message: "Cart cleared successfully" });
  } catch (error) {
    console.error("Error clearing cart:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
