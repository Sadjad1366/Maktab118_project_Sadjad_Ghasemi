import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const CART_FILE_PATH = path.join(process.cwd(), "data", "cart.json");

// Type definitions for cart and products
interface Product {
  id: string;
  name: string;
  quantity: number;
  stock: number;
}

interface Cart {
  userId: string;
  products: Product[];
}

interface CartData {
  carts: Cart[];
}

// Function to read cart data from JSON file
const readCartFile = (): CartData => {
  try {
    const data = fs.readFileSync(CART_FILE_PATH, "utf-8");
    return JSON.parse(data) as CartData;
  } catch (error) {
    console.error("Error reading the cart file:", error);
    return { carts: [] };
  }
};

// Function to write cart data to JSON file
const writeCartFile = (data: CartData) => {
  try {
    fs.writeFileSync(CART_FILE_PATH, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error("Error writing to the cart file:", error);
  }
};

// API Route: Merge guest and user cart
export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { userId, guestProducts, userProducts } = body as {
      userId: string;
      guestProducts: Product[];
      userProducts: Product[];
    };

    if (!userId) {
      return NextResponse.json({ error: "userId is required" }, { status: 400 });
    }

    // Merge guest and user products
    const productMap = new Map<string, Product>();

    [...userProducts, ...guestProducts].forEach((product) => {
      if (productMap.has(product.id)) {
        const existingProduct = productMap.get(product.id)!;
        const totalQuantity = existingProduct.quantity + product.quantity;

        // Ensure stock limit
        productMap.set(product.id, {
          ...existingProduct,
          quantity: Math.min(totalQuantity, product.stock),
        });
      } else {
        productMap.set(product.id, { ...product });
      }
    });

    const mergedCart = Array.from(productMap.values());

    // Save merged cart
    const data = readCartFile();
    const userCart = data.carts.find((cart) => cart.userId === userId);

    if (userCart) {
      userCart.products = mergedCart;
    } else {
      data.carts.push({ userId, products: mergedCart });
    }

    writeCartFile(data);

    return NextResponse.json({ message: "Cart merged successfully", cart: mergedCart });
  } catch (error) {
    console.error("Error merging carts:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
