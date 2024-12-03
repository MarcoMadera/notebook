import { ThemeContext } from "@/contexts/ThemeContext";
import { useCustomContext } from "@/hooks/useCustomContext";
import { ThemeContextType } from "@/types/theme";

export function useTheme(): ThemeContextType {
  const context = useCustomContext(ThemeContext);
  return context;
}
