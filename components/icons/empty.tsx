import type { SVGProps } from "react";
const IconEmpty = (props: SVGProps<SVGSVGElement>) => (
	<svg
		viewBox="0 0 24 24"
		width="1em"
		height="1em"
		fill="none"
		stroke="currentColor"
		strokeWidth="2"
		strokeLinecap="round"
		strokeLinejoin="round"
		xmlns="http://www.w3.org/2000/svg"
		preserveAspectRatio="xMidYMid"
		{...props}
	>
		<path stroke="none" d="M0 0h24v24H0z" fill="none" />
		<path d="M4 6v-1a1 1 0 0 1 1 -1h1m5 0h2m5 0h1a1 1 0 0 1 1 1v1m0 5v2m0 5v1a1 1 0 0 1 -1 1h-1m-5 0h-2m-5 0h-1a1 1 0 0 1 -1 -1v-1m0 -5v-2" />
	</svg>
);
export default IconEmpty;
