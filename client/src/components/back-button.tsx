import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export function BackButton() {
  return (
    <Button variant="ghost" onClick={() => window.history.back()} className="mb-4">
      <ArrowLeft className="mr-2" /> Back
    </Button>
  );
}
