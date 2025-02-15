import { IconExternalLink } from "@tabler/icons-react";
import type { MDXComponents } from "mdx/types";
import Image, { type ImageProps } from "next/image";
import { cn } from "@/lib/utils";
import MDXLayout from '@/components/blocks/mdx-layout';
import type { ComponentProps } from "react";

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
		wrapper: MDXLayout,
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
		table: ({ className, ...props }) => (
			<div className="my-6 w-full overflow-y-auto">
				<table className={cn("w-full border-collapse border border-border bg-card text-sm", className)} {...props} />
			</div>
		),
		thead: ({ className, ...props }) => (
			<thead className={cn("bg-muted/50 border-b border-border", className)} {...props} />
		),
		tbody: ({ className, ...props }) => (
			<tbody className={cn("divide-y divide-border", className)} {...props} />
		),
		tr: ({ className, ...props }) => (
			<tr className={cn("border-b border-border transition-colors hover:bg-muted/50", className)} {...props} />
		),
		th: ({ className, ...props }) => (
			<th
				className={cn(
					"h-10 px-4 text-left align-middle font-medium text-muted-foreground border-r border-border last:border-r-0",
					className
				)}
				{...props}
			/>
		),
		td: ({ className, ...props }) => (
			<td
				className={cn(
					"p-4 align-middle border-r border-border last:border-r-0",
					className
				)}
				{...props}
			/>
		),
		h2: ({ className, ...props }: ComponentProps<'h2'>) => (
			<h2 className={cn("mt-10 scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0", className)} {...props} />
		),
		ul: ({ className, ...props }: ComponentProps<'ul'>) => (
			<ul className={cn("list-disc ml-8 my-4", className)} {...props} />
		),
		li: ({ className, ...props }: ComponentProps<'li'>) => (
			<li className={cn("mb-1", className)} {...props} />
		),
		...components,
	};
}
