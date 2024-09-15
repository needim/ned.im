import { IconExternalLink } from "@tabler/icons-react";
import type { MDXComponents } from "mdx/types";
import Image, { type ImageProps } from "next/image";

// This file allows you to provide custom React components
// to be used in MDX files. You can import and use any
// React component you want, including inline styles,
// components from other libraries, and more.

export function useMDXComponents(components: MDXComponents): MDXComponents {
	return {
		// Allows customizing built-in components, e.g. to add styling.
		// h1: ({ children }) => (
		//   <h1 style={{ color: 'red', fontSize: '48px' }}>{children}</h1>
		// ),
		img: (props) => (
			// eslint-disable-next-line jsx-a11y/alt-text
			<Image
				sizes="100vw"
				style={{ width: "100%", height: "auto" }}
				{...(props as ImageProps)}
			/>
		),
		a: (props) => {
			const isExternal = props.href?.startsWith("http");
			return (
				<a
					{...props}
					style={{
						display: "inline-flex",
						alignItems: "center",
						gap: "0.25em",
					}}
				>
					{props.children}
					{isExternal ? <IconExternalLink size={16} /> : null}
				</a>
			);
		},
		...components,
	};
}
