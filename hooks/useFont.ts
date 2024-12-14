import { FontContextType } from "@/app/(main)/settings/types";
import { FontContext } from "@/contexts/FontContext";
import { useCustomContext } from "@/hooks/useCustomContext";

export function useFont(): FontContextType {
  const context = useCustomContext(FontContext);
  return context;
}
