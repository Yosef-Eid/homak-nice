import { Suspense } from "react";
import HomeClient from "./components/client";

export default function Page() {
  return (
    <Suspense fallback={null}>
      <HomeClient />
    </Suspense>
  );
}
