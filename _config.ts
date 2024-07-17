import lume from "lume/mod.ts";
import tailwindcss from "lume/plugins/tailwindcss.ts";
import postcss from "lume/plugins/postcss.ts";
import jsx from "lume/plugins/jsx_preact.ts";
import esbuild from "lume/plugins/esbuild.ts";
import inline from "lume/plugins/inline.ts";
import nav from "lume/plugins/nav.ts";
import toc from "https://deno.land/x/lume_markdown_plugins@v0.7.0/toc.ts";
import anchor from "npm:markdown-it-anchor@9";

import AUTOLINK_REFERENCES from "./references.json" with { type: "json" };

import tailwindConfig from "./tailwind.config.ts";
import autolink from "./_plugins/autolink.ts";

const site = lume({}, {
  markdown: {
    options: {
      linkify: true,
    },
    plugins: [
      [anchor, {
        permalink: anchor.permalink.linkInsideHeader({
          symbol:
            `<span class="sr-only">Jump to heading</span><span aria-hidden="true" class="anchor">#</span>`,
          placement: "after",
        }),
      }],
      [autolink, {
        references: AUTOLINK_REFERENCES,
      }],
    ],
  },
});

site.copy("static/fonts");
site.copy("static/js");
site.copy("static/logos");

site.use(tailwindcss({ options: tailwindConfig }));
site.use(postcss());
site.use(jsx({}));
site.use(esbuild({ extensions: [".ts"] }));
site.use(inline());
site.use(nav({}));
site.use(toc({ anchor: false }));

export default site;
