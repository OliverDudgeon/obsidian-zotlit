import type { AnnotationInfo } from "@obzt/database";
import type { ItemKeyGroup } from "@obzt/common";
import type { KeyboardEvent, MouseEvent } from "react";
import { createContext } from "react";
import type { DataModel, StoreAPI } from "./store";

export interface ContextType<R = {}> {
  store: StoreAPI;
  getImgSrc(annotation: AnnotationInfo): string;
  onSetFollow(event: KeyboardEvent | MouseEvent): any;
  onLinkLiterature(event: KeyboardEvent | MouseEvent): any;
  annotRenderer: {
    storeSelector(store: DataModel): R;
    get(annot: AnnotationInfo, props: R): (() => string) | null;
  };
  onDragStart(
    evt: React.DragEvent<HTMLDivElement>,
    render: () => string,
    container: HTMLDivElement | null,
  ): any;
  onMoreOptions(
    evt: React.MouseEvent | React.KeyboardEvent,
    annotation: AnnotationInfo,
  ): any;
  registerDbUpdate(callback: () => void): () => void;
  registerNoteUpdate(callback: () => void): () => void;
  refreshConn(): Promise<void>;
  onShowDetails(type: "annot" | "doc-item", itemId: number): any;
  getTargetNotePath(item: ItemKeyGroup): string | null;
  getBlockKeysInFile(file: string): Set<string>;
}

export const Context = createContext({} as ContextType);
