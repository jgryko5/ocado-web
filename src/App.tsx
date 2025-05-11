import CartStateProvider from "@/data/cartState";
import { HashRouter, Route, Routes } from "react-router";
import ProductsListing from "@/pages/ProductsListing/ProductsListing";
import Cart from "@/pages/Checkout/Cart";
import Summary from "@/pages/Checkout/Summary";

function App() {
  return (
    <CartStateProvider>
      <HashRouter>
        <Routes>
          <Route path="/" element={<ProductsListing />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/summary" element={<Summary />} />
        </Routes>
      </HashRouter>
    </CartStateProvider>
  );
}
export default App;
