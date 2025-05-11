import "./styles.css";
import { useCallback, useContext, useEffect, useRef, type FC } from "react";
import { StorePage } from "@/templates/StorePage";
import { CartDispatchContext, CartItemsContext } from "@/data/cartState";
import Table from "@/components/table/Table";
import type ProductData from "@/types/product";
import { formatPrice } from "@/formatters/price";
import {
  CartFooter,
  getCartItems,
  getSelectItemRange,
  getTotalDisplayPrice,
} from "./utils";
import PRODUCTS_JSON from "@/data";

const Cart: FC = () => {
  const cartContent = useContext(CartItemsContext);
  const dispatch = useContext(CartDispatchContext);
  const displayItems = getCartItems(cartContent);
  const selectRef = useRef<HTMLSelectElement | null>(null);

  useEffect(() => {
    if (!selectRef?.current || !PRODUCTS_JSON) return;
    const firstProduct = PRODUCTS_JSON[0].id;
    selectRef.current.value = firstProduct.toString();
  }, [selectRef]);

  const onAddProductClicked = useCallback(() => {
    if (!dispatch || !selectRef.current) return;
    const id = parseInt(selectRef.current.value);
    if (isNaN(id)) return;
    dispatch({ type: "ADD", id });
  }, [selectRef.current]);

  return (
    <StorePage
      title="Koszyk"
      backButtonText="Powrót do listy produktów"
      backButtonHref="/"
    >
      <Table columns={["Produkt", "Cena", "Ilość", "Suma częściowa", "Akcja"]}>
        {displayItems.map((it) => (
          <CartEntry key={it.id} {...it} />
        ))}
      </Table>
      <CartFooter nextBtnHref="/summary" nextBtnText="Przejdź do podsumowania">
        <div id="addProductSection">
          <p>Dodaj produkt do koszyka:</p>
          <select ref={selectRef}>
            {PRODUCTS_JSON.map((product) => (
              <option value={product.id} key={product.id}>
                {product.name}
              </option>
            ))}
          </select>
          <button onClick={onAddProductClicked}>Dodaj</button>
        </div>
      </CartFooter>
    </StorePage>
  );
};

const CartEntry: FC<ProductData> = (props) => {
  const dispatch = useContext(CartDispatchContext);
  const cartContent = useContext(CartItemsContext);
  const displayPrice = formatPrice(props.price.main, props.price.fractional);
  const count = cartContent ? cartContent.items[props.id].count : 0;
  const onSelectChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const count = parseInt(e.target.value);
      if (!dispatch || isNaN(count)) return;
      dispatch({ type: "SET_COUNT", id: props.id, count });
    },
    [],
  );
  return (
    <tr id="productRow">
      <td>{props.name}</td>
      <td>{displayPrice}</td>
      <td>
        <select name="count" id="count" value={count} onChange={onSelectChange}>
          {getSelectItemRange()}
        </select>
      </td>
      <td>
        {getTotalDisplayPrice(count, props.price.main, props.price.fractional)}
      </td>
      <td>
        <button
          onClick={() => {
            if (!dispatch) return;
            dispatch({ type: "DELETE", id: props.id });
          }}
        >
          Usuń
        </button>
      </td>
    </tr>
  );
};

export default Cart;
