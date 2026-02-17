import { useContext } from "react";
import { useStore } from "zustand";
import type { IconToggleProps } from "../../icon";
import { IconToggle } from "../../icon";
import { Context } from "../context";

export type LinkButtonProps = Omit<IconToggleProps, "icon">;

export default function LinkButton(props: LinkButtonProps) {
  const { store, onLinkLiterature } = useContext(Context);
  const follow = useStore(store, (s) => s.follow);
  const isLinked = follow === null;

  return (
    <IconToggle
      {...props}
      onClick={onLinkLiterature}
      icon="file-lock-2"
      active={isLinked}
      aria-label={
        isLinked
          ? "Linked with selected literature"
          : "Link with selected literature"
      }
      aria-label-delay="50"
    />
  );
}
