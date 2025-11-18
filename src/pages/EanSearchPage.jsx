import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
  isValidEan,
  buildGalaxusSearchUrl,
  buildToppreiseSearchUrl,
  buildBrackSearchUrl,
  buildFustSearchUrl,
} from "@/mock/mock";

// NOTE: This is a purely frontend implementation using local state and helper
// functions from mock.js. No backend calls are made yet (explicit **mock** phase).

export default function EanSearchPage() {
  const [eanOrName, setEanOrName] = useState("");
  const [productName, setProductName] = useState("");
  const [error, setError] = useState("");

  const validateQuery = (value) => {
    const trimmed = value.trim();

    if (!trimmed) {
      setError("Bitte EAN oder Produktname eingeben.");
      return null;
    }

    // If the query looks like a numeric EAN, validate its length.
    if (/^\d+$/.test(trimmed) && !isValidEan(trimmed)) {
      setError("Ungültige EAN. Erlaubt sind 8, 12, 13 oder 14 Ziffern.");
      return null;
    }

    setError("");
    return trimmed;
  };

  const handleOpen = (target) => {
    const primary = eanOrName.trim();
    const secondary = productName.trim();

    const queryBase = target === "galaxus" ? primary : secondary || primary;
    const validQuery = validateQuery(queryBase);
    if (!validQuery) return;

    let url;
    switch (target) {
      case "galaxus":
        url = buildGalaxusSearchUrl(validQuery);
        break;
      case "toppreise":
        url = buildToppreiseSearchUrl(validQuery);
        break;
      case "brack":
        url = buildBrackSearchUrl(validQuery);
        break;
      case "fust":
        url = buildFustSearchUrl(validQuery);
        break;
      default:
        return;
    }

    // Open in new tab as requested
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const onChangeMain = (event) => {
    setEanOrName(event.target.value);
    if (error) setError("");
  };

  const onChangeProductName = (event) => {
    setProductName(event.target.value);
    if (error) setError("");
  };

  return (
    <div className="min-h-screen bg-[#f5f5f5] flex items-center justify-center px-4">
      <Card className="w-full max-w-[520px] bg-white border border-neutral-200 shadow-sm">
        <CardHeader className="space-y-2">
          {/* Logo container – replace src later as needed */}
          <div
            id="tobco-logo-container"
            className="w-full flex justify-center mb-4"
          >
            <img
              src="https://customer-assets.emergentagent.com/job_product-scout-38/artifacts/niroz0zi_RZ-logo-wortbild-li-blau-gelb.png"
              alt="Tobco Logo"
              className="h-10 w-auto max-w-[120px] object-contain"
            />
          </div>
          <CardTitle className="text-2xl font-bold tracking-tight text-foreground">
            Tobco Preischecker
          </CardTitle>
          <CardDescription className="text-sm text-muted-foreground">
            EAN oder Produktname eingeben und direkt bei Galaxus, Toppreise, Brack und Fust vergleichen.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="space-y-4">
            <div className="space-y-2">
              <label
                htmlFor="ean-or-name-input"
                className="block text-sm font-medium text-muted-foreground"
              >
                EAN oder Produktname
              </label>
              <Input
                id="ean-or-name-input"
                type="text"
                placeholder="EAN oder Produktname"
                value={eanOrName}
                onChange={onChangeMain}
                className="w-full bg-background/60"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="product-name-input"
                className="block text-sm font-medium text-muted-foreground"
              >
                Produktname (optional)
              </label>
              <Input
                id="product-name-input"
                type="text"
                placeholder="Optional: genauer Produktname"
                value={productName}
                onChange={onChangeProductName}
                className="w-full bg-background/60"
              />
            </div>

            {error && (
              <p className="text-xs text-destructive mt-1">
                {error}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-3 gap-y-4 pt-1">
            <Button
              type="button"
              variant="outline"
              className="w-full h-11 rounded-md bg-[#d4d4d4] text-[#2b2b2b] border border-[#cfcfcf] hover:bg-[#c4c4c4] px-4"
              onClick={() => handleOpen("galaxus")}
            >
              Suche auf Galaxus
            </Button>
            <Button
              type="button"
              variant="outline"
              className="w-full h-11 rounded-md bg-[#d4d4d4] text-[#2b2b2b] border border-[#cfcfcf] hover:bg-[#c4c4c4] px-4"
              onClick={() => handleOpen("toppreise")}
            >
              Suche auf Toppreise
            </Button>
            <Button
              type="button"
              variant="outline"
              className="w-full h-11 rounded-md bg-[#d4d4d4] text-[#2b2b2b] border border-[#cfcfcf] hover:bg-[#c4c4c4] px-4"
              onClick={() => handleOpen("brack")}
            >
              Suche auf Brack
            </Button>
            <Button
              type="button"
              variant="outline"
              className="w-full h-11 rounded-md bg-[#d4d4d4] text-[#2b2b2b] border border-[#cfcfcf] hover:bg-[#c4c4c4] px-4"
              onClick={() => handleOpen("fust")}
            >
              Suche auf Fust
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
