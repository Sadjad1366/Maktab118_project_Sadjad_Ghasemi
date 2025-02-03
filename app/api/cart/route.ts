import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

// Define types
interface Product {
  id: string;
  name?: string;
  quantity: number;
}

interface Cart {
  userId: string;
  products: Product[];
}

interface CartData {
  carts: Cart[];
}

// Path to cart JSON file
const CART_FILE_PATH = path.join(process.cwd(), "data", "cart.json");

// Ensure JSON file exists
if (!fs.existsSync(CART_FILE_PATH)) {
  fs.mkdirSync(path.dirname(CART_FILE_PATH), { recursive: true });
  fs.writeFileSync(CART_FILE_PATH, JSON.stringify({ carts: [] }, null, 2));
}

// Helper function: Read cart data
const readCartFile = (): CartData => {
  try {
    const data = fs.readFileSync(CART_FILE_PATH, "utf-8");
    return JSON.parse(data) as CartData;
  } catch (error) {
    console.error("Error reading the cart file:", error);
    return { carts: [] };
  }
};

// Helper function: Write cart data
const writeCartFile = (data: CartData) => {
  try {
    fs.writeFileSync(CART_FILE_PATH, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error("Error writing to the cart file:", error);
  }
};

// ✅ **GET: Retrieve cart**
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return NextResponse.json({ error: "userId is required" }, { status: 400 });
  }

  const data = readCartFile();
  const userCart = data.carts.find((cart) => cart.userId === userId);

  return NextResponse.json(userCart ? userCart : { userId, products: [] });
}

// ✅ **POST: Add product to cart**
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { userId, product } = body as { userId: string; product: Product };

    if (!userId || !product || !product.id || product.quantity <= 0) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }

    const data = readCartFile();
    const userCart = data.carts.find((cart) => cart.userId === userId);

    if (userCart) {
      const existingProduct = userCart.products.find((p) => p.id === product.id);

      if (existingProduct) {
        existingProduct.quantity += product.quantity;
      } else {
        userCart.products.push(product);
      }
    } else {
      data.carts.push({ userId, products: [product] });
    }

    writeCartFile(data);
    return NextResponse.json({ message: "Product added successfully" });
  } catch (error) {
    console.error("Error adding product:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// ✅ **PUT: Update product quantity in cart**
export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { userId, productId, quantity } = body as { userId: string; productId: string; quantity: number };

    if (!userId || !productId || typeof quantity !== "number" || quantity <= 0) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }

    const data = readCartFile();
    const userCart = data.carts.find((cart) => cart.userId === userId);

    if (!userCart) {
      return NextResponse.json({ error: "Cart not found" }, { status: 404 });
    }

    const product = userCart.products.find((p) => p.id === productId);

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    product.quantity = quantity;
    writeCartFile(data);
    return NextResponse.json({ message: "Product updated successfully" });
  } catch (error) {
    console.error("Error updating product:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// ✅ **DELETE: Remove product from cart**
// ✅ **DELETE: Remove product OR clear entire cart**
export async function DELETE(req: Request) {
  try {
    const body = await req.json();
    const { userId, productId } = body as { userId: string; productId?: string };

    if (!userId) {
      return NextResponse.json({ error: "userId is required" }, { status: 400 });
    }

    const data = readCartFile();
    const userCart = data.carts.find((cart) => cart.userId === userId);

    if (!userCart) {
      return NextResponse.json({ error: "Cart not found" }, { status: 404 });
    }

    if (productId) {
      // 🛒 Remove a single product
      userCart.products = userCart.products.filter((p) => p.id !== productId);
      writeCartFile(data);
      return NextResponse.json({ message: "Product removed successfully" });
    } else {
      // 🗑 Clear entire cart
      data.carts = data.carts.filter((cart) => cart.userId !== userId);
      writeCartFile(data);
      return NextResponse.json({ message: "Cart cleared successfully" });
    }
  } catch (error) {
    console.error("Error removing/clearing cart:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

