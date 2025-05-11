import { useContext, type FC, type HTMLProps, type ReactNode } from "react";
import PRODUCTS_JSON, { MAX_ITEMS_IN_CART } from "@/data";
import { formatPrice } from "@/formatters/price";
import type CartState from "@/types/cartstate";
import { CartItemsContext } from "@/data/cartState";
import { Link } from "react-router";

export const getCartTotal = (cartData: CartState | null) => {
  let totalMain = 0;
  let totalFractional = 0;
  if (cartData === null) return formatPrice(0, 0);
  for (let product of PRODUCTS_JSON) {
    if (product.id in cartData.items) {
      const { count } = cartData.items[product.id];
      totalMain += product.price.main * count;
      totalFractional += product.price.fractional * count;
    }
  }
  totalMain += Math.floor(totalFractional / 100);
  totalFractional %= 100;
  return formatPrice(totalMain, totalFractional);
};

export const getSelectItemRange = () => {
  let items = [];
  for (let i = 1; i <= MAX_ITEMS_IN_CART; ++i) {
    items.push(
      <option value={i} key={i}>
        {i}
      </option>,
    );
  }
  return items;
};

export const getCartItems = (cartData: CartState | null) => {
  if (cartData === null) return [];
  let items = [];
  for (let product of PRODUCTS_JSON) {
    if (product.id in cartData?.items) {
      items.push(product);
    }
  }
  return items;
};

export const CartFooter: FC<{
  nextBtnText: string;
  nextBtnHref?: string;
  onClick?: HTMLProps<HTMLButtonElement>["onClick"];
  children?: ReactNode;
}> = (props) => {
  const cartContent = useContext(CartItemsContext);
  return (
    <div id="cartFooter">
      <div id="cartLeftSection">{props.children}</div>
      <div id="cartRightSection">
        <p id="cartTotal">Razem: {getCartTotal(cartContent)}</p>
        {props.nextBtnHref ? (
          <Link to={props.nextBtnHref}>{props.nextBtnText}</Link>
        ) : (
          <button onClick={props.onClick} style={{ cursor: "pointer" }}>
            {props.nextBtnText}
          </button>
        )}
      </div>
    </div>
  );
};

export const getTotalDisplayPrice = (
  count: number,
  main: number,
  fractional: number,
) => {
  let totalFractionalPrice = fractional * count;
  let totalMainPrice = main * count;
  totalMainPrice += Math.floor(totalFractionalPrice / 100);
  totalFractionalPrice %= 100;

  return formatPrice(totalMainPrice, totalFractionalPrice);
};

const getOrderSummary = (cartData: CartState | null) => {
  let summaryData: { items: any[]; totalPrice: string } = {
    items: [],
    totalPrice: "",
  };
  let totalMain = 0;
  let totalFractional = 0;
  if (cartData === null) return summaryData;
  for (let product of PRODUCTS_JSON) {
    if (product.id in cartData.items) {
      const { count } = cartData.items[product.id];
      totalMain += product.price.main * count;
      totalFractional += product.price.fractional * count;
      summaryData.items.push({ name: product.name, count });
    }
  }
  summaryData.totalPrice = getTotalDisplayPrice(1, totalMain, totalFractional);
  return summaryData;
};

export const saveOrderSummary = (cartData: CartState | null) => {
  const orderSummary = getOrderSummary(cartData);
  localStorage.setItem("lastOrderSummary", JSON.stringify(orderSummary));
  const siteBaseUrl = import.meta.env.VITE_SITE_PATH;
  window.location.href = `${siteBaseUrl}/confirm.html`;
};
