import type { RegularItemInfoBase } from "@obzt/database";
import { getItemKeyGroupID } from "@obzt/common";
import { useBoolean, useMemoizedFn } from "ahooks";
import { useContext, useEffect, useMemo, useState } from "react";
import { useStore } from "zustand";
import { shallow } from "zustand/shallow";
import { cn as clsx } from "@c/utils";
import { Context } from "../context";
import DetailsButton from "../DetailsButton";
import type { AnnotListProps } from "./AnnotList";
import AnnotList from "./AnnotList";
import AttachmentSelector from "./AttachmentSelector";
import CollapseButton from "./CollapseButton";
import FollowButton from "./FollowButton";
import Header from "./Header";
import { IconToggle } from "../../icon";
import LinkButton from "./LinkButton";

import RefreshButton from "./RefreshButton";

const useOnDbRefresh = () => {
  const { registerDbUpdate, store } = useContext(Context);
  const refresh = useStore(store, (s) => s.refresh);
  useEffect(() => registerDbUpdate(refresh), [registerDbUpdate, refresh]);
};

const useOnNoteUpdate = () => {
  const { registerNoteUpdate } = useContext(Context);
  const [, setVersion] = useState(0);
  useEffect(
    () => registerNoteUpdate(() => setVersion((version) => version + 1)),
    [registerNoteUpdate],
  );
};

export default function AnnotView() {
  useOnDbRefresh();
  useOnNoteUpdate();
  const { store } = useContext(Context);
  const doc = useStore(store, (s) => s.doc);

  if (!doc) {
    return (
      <>
        <Header
          buttons={
            <div className="flex items-center gap-1">
              <FollowButton className="nav-action-button" />
              <LinkButton className="nav-action-button" />
            </div>
          }
        ></Header>
        <div className="pane-empty p-2">Active file not literature note</div>
      </>
    );
  }
  return <AnnotsViewMain docItem={doc.docItem} />;
}

function AnnotsViewMain({ docItem }: { docItem: RegularItemInfoBase }) {
  const { refreshConn, onShowDetails, getTargetNotePath, getBlockKeysInFile } =
    useContext(Context);

  const [isCollapsed, { toggle: toggleCollapsed }] = useBoolean(false);
  const [hideAdded, { toggle: toggleHideAdded }] = useBoolean(true);
  const [hideEmptyText, { toggle: toggleHideEmptyText }] = useBoolean(false);
  const [isAddedSectionCollapsed, { toggle: toggleAddedSectionCollapsed }] =
    useBoolean(true);

  const annotListProps = useAnnotList();
  const partitioned = useMemo(() => {
    if (!annotListProps) return null;

    const file = getTargetNotePath(docItem);
    if (!file) {
      return {
        notInNote: annotListProps.annotations,
        inNote: [] as typeof annotListProps.annotations,
      };
    }

    const blockKeys = getBlockKeysInFile(file);
    const notInNote = [] as typeof annotListProps.annotations;
    const inNote = [] as typeof annotListProps.annotations;

    for (const annotation of annotListProps.annotations) {
      const annotKey = getItemKeyGroupID(annotation, true);
      if (blockKeys.has(annotKey)) {
        inNote.push(annotation);
      } else {
        notInNote.push(annotation);
      }
    }

    return { notInNote, inNote };
  }, [annotListProps, docItem, getBlockKeysInFile, getTargetNotePath]);

  const isEmptyTextAnnotation = useMemoizedFn(
    (annotation: (typeof annotListProps)["annotations"][number]) =>
      (annotation.text ?? "").trim().length === 0,
  );

  const mainAnnotations = useMemo(() => {
    if (!annotListProps || !partitioned) return null;
    const base = hideAdded ? partitioned.notInNote : annotListProps.annotations;
    if (!hideEmptyText) return base;
    return base.filter((annotation) => !isEmptyTextAnnotation(annotation));
  }, [
    annotListProps,
    partitioned,
    hideAdded,
    hideEmptyText,
    isEmptyTextAnnotation,
  ]);

  const hiddenInNoteAnnotations = useMemo(() => {
    if (!partitioned) return null;
    if (!hideEmptyText) return partitioned.inNote;
    return partitioned.inNote.filter(
      (annotation) => !isEmptyTextAnnotation(annotation),
    );
  }, [partitioned, hideEmptyText, isEmptyTextAnnotation]);

  return (
    <>
      <Header
        buttons={
          <div className="flex items-center gap-1" role="toolbar">
            <div className="flex items-center gap-1">
              <DetailsButton
                className="nav-action-button"
                onClick={useMemoizedFn(() =>
                  onShowDetails("doc-item", docItem.itemID),
                )}
              />
              <RefreshButton
                className="nav-action-button"
                onClick={refreshConn}
              />
              <CollapseButton
                className="nav-action-button"
                isCollapsed={isCollapsed}
                onClick={toggleCollapsed}
              />
            </div>

            <div className="mx-1 h-4 w-px bg-[var(--background-modifier-border)]" />

            <div className="flex items-center gap-1">
              <IconToggle
                className="nav-action-button"
                icon="file-check-2"
                active={hideAdded}
                onClick={toggleHideAdded}
                aria-label={
                  hideAdded
                    ? "Showing only annotations not in current note"
                    : "Show only annotations not in current note"
                }
                aria-label-delay="50"
              />
              <IconToggle
                className="nav-action-button"
                icon="text-select"
                active={hideEmptyText}
                onClick={toggleHideEmptyText}
                aria-label={
                  hideEmptyText
                    ? "Hiding annotations with empty text"
                    : "Hide annotations with empty text"
                }
                aria-label-delay="50"
              />
            </div>

            <div className="mx-1 h-4 w-px bg-[var(--background-modifier-border)]" />

            <div className="flex items-center gap-1">
              <FollowButton className="nav-action-button" />
              <LinkButton className="nav-action-button" />
            </div>
          </div>
        }
      >
        <AttachmentSelector />
      </Header>
      <div
        className={clsx(
          "annots-container @container",
          "overflow-auto px-3 pt-1 pb-8 text-xs",
        )}
      >
        {annotListProps && partitioned ? (
          <>
            <AnnotList
              collapsed={isCollapsed}
              annotations={mainAnnotations ?? []}
              getTags={annotListProps.getTags}
            />

            {hideAdded && (hiddenInNoteAnnotations?.length ?? 0) > 0 && (
              <div className="mt-3">
                <button
                  type="button"
                  className="mb-2 text-left"
                  onClick={toggleAddedSectionCollapsed}
                >
                  {isAddedSectionCollapsed ? "▶" : "▼"} Already in note (
                  {hiddenInNoteAnnotations?.length ?? 0})
                </button>
                {!isAddedSectionCollapsed && (
                  <AnnotList
                    collapsed
                    annotations={hiddenInNoteAnnotations ?? []}
                    getTags={annotListProps.getTags}
                  />
                )}
              </div>
            )}
          </>
        ) : (
          <>Loading</>
        )}
      </div>
    </>
  );
}

const useAnnotList = (): Pick<
  AnnotListProps,
  "annotations" | "getTags"
> | null =>
  useStore(
    useContext(Context).store,
    (s) => {
      if (!s.doc || !s.annotations || !s.attachment) return null;
      return {
        annotations: s.annotations,
        getTags: (itemId: number) => s.tags[itemId] ?? [],
      };
    },
    shallow,
  );
