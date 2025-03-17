import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";

export function Avatar({
	large = false,
	className,
	...props
}: Omit<React.ComponentPropsWithoutRef<typeof Link>, "href"> & {
	large?: boolean;
}) {
	return (
		<Link
			href="/"
			aria-label="Home"
			className={clsx(
				className,
				"pointer-events-auto grow-0 flex items-center relative isolate group",
				large ? "size-16" : "size-7",
			)}
			{...props}
		>
			<Image
				src="/avatar-dark.svg"
				alt=""
				sizes={large ? "4rem" : "2.25rem"}
				width="140"
				height="140"
				className={clsx(
					"z-50 object-cover hidden dark:block",
					large ? "size-16" : "size-7",
				)}
				priority
			/>
			<Image
				src="/avatar-light.svg"
				alt=""
				sizes={large ? "4rem" : "2.25rem"}
				width="140"
				height="140"
				className={clsx(
					"z-50 object-cover block dark:hidden",
					large ? "size-16" : "size-7",
				)}
				priority
			/>
			<Image
				src="https://avatars.githubusercontent.com/needim"
				alt=""
				sizes={large ? "4rem" : "2.25rem"}
				width="140"
				height="140"
				className={clsx(
					"z-50 group-hover:opacity-100 opacity-0 transition-opacity grayscale duration-300 object-cover absolute inset-0",
					large ? "size-16" : "size-7",
				)}
				priority
			/>
		</Link>
	);
}
