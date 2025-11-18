import React, { useState, useMemo } from "react";
import products from "./data/tobco-products.json";

function normalizeEAN(value) {
  if (value == null) return "";

  return String(value)
    .trim()
    .replace(/[^\d]/g, "")   // alles, was keine Ziffer ist, entfernen
    .replace(/\.0+$/, "")    // .0 am Ende entfernen (falls doch mal drin)
    .replace(/^0+/, "");     // führende Nullen entfernen
}

function findProductByEAN(ean) {
  const input = normalizeEAN(ean);
  if (!input) return null;

  return (
    products.find((p) => normalizeEAN(p.ean) === input) || null
  );
}

function buildSearchUrl(base, ean, name) {
  const query = (ean || name || "").trim();
  if (!query) return base;
  return `${base}${encodeURIComponent(query)}`;
}

function App() {
  const [ean, setEan] = useState("");
  const [productName, setProductName] = useState("");

  const matchedProduct = useMemo(() => findProductByEAN(ean), [ean]);

  const searchGalaxus = () => {
    window.open(
      buildSearchUrl("https://www.galaxus.ch/de/search?q=", ean, productName),
      "_blank"
    );
  };

  const searchToppreise = () => {
    window.open(
      buildSearchUrl("https://www.toppreise.ch/index.php?search=", ean, productName),
      "_blank"
    );
  };

  const searchBrack = () => {
    window.open(
      buildSearchUrl("https://www.brack.ch/search?query=", ean, productName),
      "_blank"
    );
  };

  const searchFust = () => {
    window.open(
      buildSearchUrl("https://www.fust.ch/de/search.html?query=", ean, productName),
      "_blank"
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-xl bg-white rounded-xl shadow-md p-8">

        <h1 className="text-2xl font-semibold text-slate-900 mb-2">
          Tobco Preischecker
        </h1>

        <p className="text-sm text-slate-600 mb-6">
          EAN oder Produktname eingeben und direkt bei Galaxus, Toppreise, Brack
          und Fust vergleichen.
        </p>

        <div className="space-y-4">
          <input
            type="text"
            value={ean}
            onChange={(e) => setEan(e.target.value)}
            className="w-full rounded-md border px-3 py-2"
            placeholder="EAN"
          />

          <input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            className="w-full rounded-md border px-3 py-2"
            placeholder="Optionaler Produktname"
          />

          {matchedProduct && (
            <div className="p-3 border rounded bg-slate-100 text-sm">
              <strong>{matchedProduct.name}</strong>
              <div>Tobco-Nr: {matchedProduct.artnr_tobco}</div>
              <div>Hersteller-Nr: {matchedProduct.artnr_hersteller}</div>
              <div>EAN: {matchedProduct.ean}</div>
              <div>UVP: {matchedProduct.uvp}</div>
            </div>
          )}

          <div className="grid grid-cols-2 gap-3 mt-6">
            <button onClick={searchGalaxus} className="bg-black text-white p-2 rounded">
              Galaxus
            </button>
            <button onClick={searchToppreise} className="bg-gray-300 p-2 rounded">
              Toppreise
            </button>
            <button onClick={searchBrack} className="bg-gray-300 p-2 rounded">
              Brack
            </button>
            <button onClick={searchFust} className="bg-gray-300 p-2 rounded">
              Fust
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
