import type { TagInfo } from "@obzt/database";
import { memo } from "react";
import { cn as clsx } from "@c/utils";

interface TagsProps {
  tags: TagInfo[];
}

export default function Tags({ tags }: TagsProps) {
  if (tags.length === 0) return null;
  return (
    <div className="annot-tags-container">
      {tags.map((tag) => (
        <Tag key={tag.tagID} {...tag} />
      ))}
    </div>
  );
}

const Tag = memo(function Tag({ name }: TagInfo) {
  return <span className={clsx("tag", "annot-tag")}>{name}</span>;
});
