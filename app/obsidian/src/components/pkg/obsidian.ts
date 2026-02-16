import type { ReactNode } from "react";
import { createContext } from "react";

export interface ObsidianContextType {
  sanitize(html: string): string;
  setIcon(parent: HTMLElement, iconId: string): void;
  renderMarkdown(content: string): ReactNode;
}

export const ObsidianContext = createContext({} as ObsidianContextType);
