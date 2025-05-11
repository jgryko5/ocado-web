import { useCallback, useContext, type FC } from "react";
import Table from "@/components/table/Table";
import PRODUCTS_JSON from "@/data";
import { StorePage } from "@/templates/StorePage";
import type ProductData from "@/types/product";
import { CartDispatchContext } from "@/data/cartState";
import { formatPrice } from "@/formatters/price";

const ProductsListing = () => {
  return (
    <StorePage
      title="Sklep internetowy"
      backButtonText="Przejdź do koszyka"
      backButtonHref="/cart"
    >
      <Table columns={["Produkt", "Cena", "Akcja"]}>
        {PRODUCTS_JSON.map((data) => (
          <ProductEntry key={data.id} {...data} />
        ))}
      </Table>
    </StorePage>
  );
};

const ProductEntry: FC<ProductData> = (props) => {
  const dispatch = useContext(CartDispatchContext);
  const displayPrice = formatPrice(props.price.main, props.price.fractional);
  const onAddClicked = useCallback(() => {
    if (!dispatch) return;
    dispatch({ type: "ADD", id: props.id });
    alert(`Dodano pomyślnie ${props.name} do koszyka!`);
  }, [props.id]);

  return (
    <tr id="productRow">
      <td>{props.name}</td>
      <td>{displayPrice}</td>
      <td>
        <button onClick={onAddClicked} style={{ cursor: "pointer" }}>
          Dodaj do koszyka
        </button>
      </td>
    </tr>
  );
};

export default ProductsListing;
