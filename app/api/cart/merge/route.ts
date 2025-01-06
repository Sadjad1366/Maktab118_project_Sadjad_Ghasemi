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

    userCart.products.forEach((product: any) => {
      if (!productMap.has(product.id)) {
        productMap.set(product.id, { ...product });
      }
    });
    products.forEach((product: any) => {
      if (productMap.has(product.id)) {
        const existingProduct = productMap.get(product.id);
        existingProduct.quantity = Math.max(existingProduct.quantity, product.quantity); // جلوگیری از افزایش اشتباه
      } else {
        productMap.set(product.id, { ...product });
      }
    });
    console.log("Final product map after merge:", Array.from(productMap.values()));


    // تبدیل نقشه به آرایه
    userCart.products = Array.from(productMap.values());
    console.log("User Cart after merging:", userCart.products);

    writeCartFile(data); // ذخیره تغییرات
    return NextResponse.json({ message: "Cart merged successfully" });
  } catch (error: any) {
    console.error("Error handling POST /api/cart/merge:", error.message);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
