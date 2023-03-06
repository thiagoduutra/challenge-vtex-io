import React, { useEffect } from "react";
import { useProduct } from "vtex.product-context";

const ProductText = () => {
  const productContextValue = useProduct();
  const pix = productContextValue?.product?.priceRange.sellingPrice.lowPrice;
  const discount = (Number(pix) * 10) / 100;
  const totalPix = Number(pix) - Number(discount.toFixed(2));

  useEffect(() => {
    const inputCep = document.querySelector(".vtex-address-form-4-x-input");
    inputCep?.setAttribute("placeholder", "Digite seu CEP");
  });

  const fetchApi = () => {
    fetch("/api/checkout/pub/orderForms/simulation", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        items: [
          {
            id: productContextValue?.selectedItem?.itemId,
            quantity: productContextValue?.selectedQuantity,
            seller: productContextValue?.selectedItem?.sellers[0].sellerId,
          },
        ],
        country: "BRA",
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      });
  };
  fetchApi();

  return (
    <div className="container-pixDiscount">
      <div>
        <figure className="container-imgPix">
          <img
            src="https://agenciamagma.vteximg.com.br/arquivos/icon-pix-thiagodutra.png"
            alt="pix image"
          />
        </figure>
      </div>
      <div>
        <div className="container-descriptionDiscount">
          <p className="price-discount">R$ {totalPix.toFixed(2)}</p>
          <p className="percent-discount">10% de desconto</p>
        </div>
      </div>
    </div>
  );
};
export default ProductText;
