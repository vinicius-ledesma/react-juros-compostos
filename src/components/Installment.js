import React from "react";
import "./Components.css";

export default function Installment({
  installmentCount,
  newAmount,
  difference,
  percent,
}) {
  return (
    <div className="Container">
      <p className="parcela">{installmentCount}</p>
      <div className="infos">
        <span className="info">
          {Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(newAmount)}
        </span>
        <span className="info">
          {Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(difference)}
        </span>
        <span className="info">{percent.toFixed(2) + " %"}</span>
      </div>
    </div>
  );
}
