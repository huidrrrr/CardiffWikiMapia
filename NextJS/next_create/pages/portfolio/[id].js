import { useRouter } from "next/router";

import React from "react";

export default function PortfolioProductPage() {
  const router = useRouter();
  console.log(router.pathname);
  console.log(router.query);

  return <div>PortfolioProductPage</div>;
}
