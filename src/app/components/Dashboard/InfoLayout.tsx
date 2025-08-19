import { Suspense, ReactNode } from "react";
import LoadingFullPage from "../HomePage/LoadingFullPage";

export default function InfoLayout({ children }: { children: ReactNode }) {
  return (
    <Suspense fallback={<LoadingFullPage />}>
      {children}
    </Suspense>
  );
}
