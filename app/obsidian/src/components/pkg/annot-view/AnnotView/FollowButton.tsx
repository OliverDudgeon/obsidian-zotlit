import { useContext } from "react";
import { useStore } from "zustand";
import type { IconToggleProps } from "../../icon";
import { Icon, IconToggle } from "../../icon";
import { Context } from "../context";

export type FollowButtonProps = Omit<IconToggleProps, "icon">;

export default function FollowButton(props: FollowButtonProps) {
  const { store, onSetFollow } = useContext(Context);
  const mode = useStore(store, (s) => s.follow);
  const description =
    mode === null
      ? "not following"
      : mode === "ob-note"
      ? "active literature note"
      : "active literature in Zotero reader";

  const icon = mode === null ? "unlink" : "link";
  const followIcon = mode === "ob-note" ? "file-edit" : "book";
  return (
    <div className="flex items-center gap-1">
      <IconToggle
        {...props}
        onClick={onSetFollow}
        icon={icon}
        aria-label={
          "Choose follow mode" +
          (mode === null ? ` (Currently linked with literature)` : "")
        }
        aria-label-delay="50"
      />
      {mode !== null && (
        <Icon
          icon={followIcon}
          size="0.85rem"
          className="opacity-70"
          aria-label={`Following ${description}`}
          aria-label-delay="50"
        />
      )}
    </div>
  );
}
