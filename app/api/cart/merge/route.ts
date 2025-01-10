import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const CART_FILE_PATH = path.join(process.cwd(), "data", "cart.json");
const readCartFile = () => {
  try {
    const data = fs.readFileSync(CART_FILE_PATH, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading the cart file:", error);
    return { carts: [] };
  }
};

const writeCartFile = (data: any) => {
  try {
    fs.writeFileSync(CART_FILE_PATH, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error("Error writing to the cart file:", error);
  }
};

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { userId, products } = body;

    if (!userId || !Array.isArray(products)) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }

    const data = readCartFile(); // خواندن فایل JSON
    let userCart = data.carts.find((cart: any) => cart.userId === userId);

    if (!userCart) {
      // اگر کاربر سبد خرید ندارد، یک سبد جدید ایجاد کن
      userCart = { userId, products: [] };
      data.carts.push(userCart);
    }

    const productMap = new Map<string, any>();

    // افزودن محصولات فعلی کاربر
    userCart.products.forEach((product: any) => {
      productMap.set(product.id, { ...product });
    });

    // ادغام محصولات جدید
    products.forEach((product: any) => {
      if (productMap.has(product.id)) {
        const existingProduct = productMap.get(product.id);
        // جمع کردن تعداد محصولات
        existingProduct.quantity += product.quantity;
      } else {
        productMap.set(product.id, { ...product });
      }
    });

    // به‌روزرسانی سبد خرید کاربر
    userCart.products = Array.from(productMap.values());

    // ذخیره تغییرات در فایل
    writeCartFile(data);

    console.log("Merged cart for user:", userCart.products);
    return NextResponse.json({ message: "Cart merged successfully" });
  } catch (error: any) {
    console.error("Error handling POST /api/cart/merge:", error.message);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
