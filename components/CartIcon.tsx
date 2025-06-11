"use client";

import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useCart } from "@/components/CartContext";

export default function CartIcon() {
  const { itemCount } = useCart();

  return (
    <Link href="/cart" className="relative">
      <ShoppingCart className="w-6 h-6 text-white hover:text-fuchsia-300 cursor-pointer transition-colors" />
      {itemCount > 0 && (
        <span className="absolute -top-2 -right-2 bg-fuchsia-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
          {itemCount}
        </span>
      )}
    </Link>
  );
}
