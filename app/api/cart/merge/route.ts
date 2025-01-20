import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const CART_FILE_PATH = path.join(process.cwd(), "data", "cart.json");

// خواندن فایل JSON
const readCartFile = () => {
  try {
    const data = fs.readFileSync(CART_FILE_PATH, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading the cart file:", error);
    return { carts: [] };
  }
};

// نوشتن در فایل JSON
const writeCartFile = (data: any) => {
  try {
    fs.writeFileSync(CART_FILE_PATH, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error("Error writing to the cart file:", error);
  }
};

export async function POST(req: Request) {
  try {
    const { userId, guestProducts, userProducts } = await req.json();

    // ترکیب محصولات مهمان و کاربر
    const productMap = new Map<string, any>();

    [...userProducts, ...guestProducts].forEach((product: any) => {
      if (productMap.has(product.id)) {
        const existingProduct = productMap.get(product.id);
        const totalQuantity = existingProduct.quantity + product.quantity;

        // محدود کردن تعداد به موجودی انبار
        productMap.set(product.id, {
          ...existingProduct,
          quantity: Math.min(totalQuantity, product.stock),
        });
      } else {
        productMap.set(product.id, { ...product });
      }
    });

    const mergedCart = Array.from(productMap.values());

    // ذخیره سبد خرید جدید در فایل یا دیتابیس
    const data = readCartFile();
    const userCart = data.carts.find((cart: any) => cart.userId === userId);
    if (userCart) {
      userCart.products = mergedCart;
    } else {
      data.carts.push({ userId, products: mergedCart });
    }
    writeCartFile(data);

    return NextResponse.json({ message: "Cart merged successfully", cart: mergedCart });
  } catch (error: any) {
    console.error("Error merging carts:", error.message);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
