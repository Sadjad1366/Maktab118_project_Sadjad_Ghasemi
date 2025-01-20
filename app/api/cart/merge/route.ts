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
    const body = await req.json();
    const { userId, guestProducts, userProducts } = body;

    // بررسی صحت ورودی‌ها
    if (!userId || !Array.isArray(guestProducts) || !Array.isArray(userProducts)) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }

    const data = readCartFile();

    // پیدا کردن سبد خرید کاربر
    let userCart = data.carts.find((cart: any) => cart.userId === userId);

    if (!userCart) {
      // اگر کاربر سبد خرید ندارد، یک سبد جدید ایجاد شود
      userCart = { userId, products: [] };
      data.carts.push(userCart);
    }

    // ساخت نقشه‌ای از محصولات سبد خرید کاربر
    const productMap = new Map<string, any>();

    // افزودن محصولات موجود در سبد کاربر به نقشه
    userProducts.forEach((product: any) => {
      productMap.set(product.id, { ...product });
    });

    // ادغام محصولات مهمان با محصولات کاربر
    guestProducts.forEach((guestProduct: any) => {
      if (productMap.has(guestProduct.id)) {
        // اگر محصول موجود باشد، تعداد (quantity) آن را جمع کنیم
        const existingProduct = productMap.get(guestProduct.id);
        productMap.set(guestProduct.id, {
          ...existingProduct,
          quantity: existingProduct.quantity + guestProduct.quantity,
        });
      } else {
        // اگر محصول وجود نداشته باشد، آن را اضافه کنیم
        productMap.set(guestProduct.id, { ...guestProduct });
      }
    });

    // بروزرسانی محصولات نهایی در سبد خرید کاربر
    userCart.products = Array.from(productMap.values());

    // ذخیره تغییرات در فایل
    writeCartFile(data);

    return NextResponse.json({
      message: "Cart merged successfully",
      cart: userCart.products,
    });
  } catch (error: any) {
    console.error("Error handling POST /api/cart/merge:", error.message);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
