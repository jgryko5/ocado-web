import { useCallback, useContext, type FC } from "react";
import { StorePage } from "@/templates/StorePage";
import {
  CartFooter,
  getCartItems,
  getTotalDisplayPrice,
  saveOrderSummary,
} from "./utils";
import { CartItemsContext } from "@/data/cartState";
import type ProductData from "@/types/product";
import { formatPrice } from "@/formatters/price";
import { Table } from "@/components/table";

const Summary: FC = () => {
  const cartContent = useContext(CartItemsContext);
  const displayItems = getCartItems(cartContent);
  const onOrderSaved = useCallback(() => {
    if (cartContent && Object.keys(cartContent.items).length === 0) {
      alert("Zamówienie jest puste!");
      return;
    }
    saveOrderSummary(cartContent);
  }, [cartContent]);
  return (
    <StorePage
      title="Podsumowanie zamówienia"
      backButtonHref="/cart"
      backButtonText="Powrót do koszyka"
    >
      <Table columns={["Produkt", "Ilość", "Cena", "Suma częściowa"]}>
        {displayItems.map((it) => (
          <CartEntry key={it.id} {...it} />
        ))}
      </Table>
      <CartFooter nextBtnText="Złóż zamówienie" onClick={onOrderSaved} />
    </StorePage>
  );
};

const CartEntry: FC<ProductData> = (props) => {
  const cartContent = useContext(CartItemsContext);
  const displayPrice = formatPrice(props.price.main, props.price.fractional);
  const count = cartContent ? cartContent.items[props.id].count : 0;
  return (
    <tr id="productRow">
      <td>{props.name}</td>
      <td>{count}</td>
      <td>{displayPrice}</td>
      <td>
        {getTotalDisplayPrice(count, props.price.main, props.price.fractional)}
      </td>
    </tr>
  );
};

export default Summary;
