import CartStateProvider from "@/data/cartState";
import { BrowserRouter, Route, Routes } from "react-router";
import ProductsListing from "@/pages/ProductsListing/ProductsListing";
import Cart from "@/pages/Checkout/Cart";
import Summary from "@/pages/Checkout/Summary";

function App() {
  return (
    <CartStateProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ProductsListing />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/summary" element={<Summary />} />
        </Routes>
      </BrowserRouter>
    </CartStateProvider>
  );
}
export default App;
