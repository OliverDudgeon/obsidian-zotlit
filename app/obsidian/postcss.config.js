import base from "../../postcss.base.mjs";
import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";
import discard from "postcss-discard";
import prefixSelector from "postcss-prefix-selector";
import tailwindConfig from "./tailwind.config.js";

/** @type {import("postcss").Plugin} */
const prefix = prefixSelector({
  prefix: ".obzt",
  transform: (prefix, selector, prefixedSelector, _filePath, _rule) => {
    if (selector.includes(".theme-dark")) {
      return selector.replace(".theme-dark", `.theme-dark ${prefix}`);
    } else if (selector.includes(".obzt-")) {
      return selector;
    } else {
      return prefixedSelector;
    }
  },
});

export default {
  plugins: [
    tailwindcss(tailwindConfig),
    autoprefixer({}),
    ...(Array.isArray(base.plugins) ? base.plugins : []),
    prefix,
    discard({
      rule: ["html", "body"],
    }),
  ],
};
