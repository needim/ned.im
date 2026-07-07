import { IconExternalLink } from "@tabler/icons-react";
import type { MDXComponents } from "mdx/types";
import Image, { type ImageProps } from "next/image";

export function useMDXComponents(components: MDXComponents): MDXComponents {
	return {
		img: (props) => (
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
