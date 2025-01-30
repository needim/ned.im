// contentlayer.config.ts
import { defineDocumentType, makeSource } from "contentlayer/source-files";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
var Note = defineDocumentType(() => ({
  name: "Note",
  filePathPattern: "notes/**/*.mdx",
  contentType: "mdx",
  fields: {
    title: { type: "string", required: true },
    date: { type: "date", required: true },
    description: { type: "string", required: true },
    cover: { type: "string", required: false },
    main_color: { type: "string", required: false },
    categories: { type: "string", required: false },
    tags: { type: "list", of: { type: "string" }, required: false },
    ai: { type: "list", of: { type: "string" }, required: false },
    sticky: { type: "number", required: false },
    updated: { type: "date", required: false }
  },
  computedFields: {
    url: {
      type: "string",
      resolve: (note) => `/notes/${note._raw.flattenedPath.replace(/notes\/?/, "")}`
    }
  }
}));
var Geek = defineDocumentType(() => ({
  name: "Geek",
  filePathPattern: "geek/**/*.mdx",
  contentType: "mdx",
  fields: {
    title: { type: "string", required: true },
    date: { type: "date", required: true },
    description: { type: "string", required: true },
    cover: { type: "string", required: false },
    main_color: { type: "string", required: false },
    categories: { type: "string", required: false },
    tags: { type: "list", of: { type: "string" }, required: false },
    updated: { type: "date", required: false }
  },
  computedFields: {
    url: {
      type: "string",
      resolve: (post) => `/geek/${post._raw.flattenedPath.replace(/geek\/?/, "")}`
    }
  }
}));
var QA = defineDocumentType(() => ({
  name: "QA",
  filePathPattern: "qa/**/*.mdx",
  contentType: "mdx",
  fields: {
    title: { type: "string", required: true },
    date: { type: "date", required: true },
    description: { type: "string", required: true },
    cover: { type: "string", required: false },
    main_color: { type: "string", required: false },
    categories: { type: "string", required: false },
    tags: { type: "list", of: { type: "string" }, required: false },
    updated: { type: "date", required: false }
  },
  computedFields: {
    url: {
      type: "string",
      resolve: (post) => `/qa/${post._raw.flattenedPath.replace(/qa\/?/, "")}`
    }
  }
}));
var contentlayer_config_default = makeSource({
  contentDirPath: "content",
  documentTypes: [Note, Geek, QA],
  mdx: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      [
        rehypePrettyCode,
        {
          theme: "github-dark",
          onVisitLine(node) {
            if (node.children.length === 0) {
              node.children = [{ type: "text", value: " ", children: [] }];
            }
          },
          onVisitHighlightedLine(node) {
            if (node.properties?.className) {
              node.properties.className.push("line--highlighted");
            }
          },
          onVisitHighlightedWord(node) {
            if (node.properties) {
              node.properties.className = ["word--highlighted"];
            }
          }
        }
      ],
      [
        rehypeAutolinkHeadings,
        {
          properties: {
            className: ["anchor"]
          }
        }
      ]
    ]
  }
});
export {
  contentlayer_config_default as default
};
//# sourceMappingURL=compiled-contentlayer-config-EZKWG46M.mjs.map
