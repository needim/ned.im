"use client";

import { Popover, Transition } from "@headlessui/react";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment, useEffect, useRef } from "react";
import { motion } from "framer-motion";

import { Container } from "@/components/blocks/container";
import { ThemeToggle } from "@/components/blocks/theme-toggle";
import { navigation } from "@/lib/utils";

type NavigationItem = {
	href: string;
	label: string;
};

function CloseIcon(props: React.ComponentPropsWithoutRef<"svg">) {
	return (
		<svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
			<path
				d="m17.25 6.75-10.5 10.5M6.75 6.75l10.5 10.5"
				fill="none"
				stroke="currentColor"
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
}

function ChevronDownIcon(props: React.ComponentPropsWithoutRef<"svg">) {
	return (
		<svg viewBox="0 0 8 6" aria-hidden="true" {...props}>
			<path
				d="M1.75 1.75 4 4.25l2.25-2.5"
				fill="none"
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
}

function MobileNavItem({
	href,
	children,
}: {
	href: string;
	children: React.ReactNode;
}) {
	return (
		<li>
			<Popover.Button as={Link} href={href} className="block py-2">
				{children}
			</Popover.Button>
		</li>
	);
}

function MobileNavigation(
	props: React.ComponentPropsWithoutRef<typeof Popover>,
) {
	return (
		<Popover {...props}>
			<Popover.Button className="group flex items-center px-4 py-2 text-sm font-medium rounded-full">
				Menu
				<ChevronDownIcon className="ml-3 h-auto w-2 stroke-primary" />
			</Popover.Button>
			<Transition.Root>
				<Transition.Child
					as={Fragment}
					enter="duration-150 ease-out"
					enterFrom="opacity-0"
					enterTo="opacity-100"
					leave="duration-150 ease-in"
					leaveFrom="opacity-100"
					leaveTo="opacity-0"
				>
					<Popover.Overlay className="fixed inset-0 z-50 bg-zinc-800/40 backdrop-blur-xs dark:bg-black/80" />
				</Transition.Child>
				<Transition.Child
					as={Fragment}
					enter="duration-150 ease-out"
					enterFrom="opacity-0 scale-95"
					enterTo="opacity-100 scale-100"
					leave="duration-150 ease-in"
					leaveFrom="opacity-100 scale-100"
					leaveTo="opacity-0 scale-95"
				>
					<Popover.Panel
						focus
						className="fixed inset-x-4 top-8 z-50 origin-top rounded-3xl bg-white p-8 ring-1 ring-zinc-900/5 dark:bg-zinc-900 dark:ring-zinc-800"
					>
						<div className="flex flex-row-reverse items-center justify-between">
							<Popover.Button aria-label="Close menu" className="-m-1 p-1">
								<CloseIcon className="h-6 w-6 text-zinc-500 dark:text-zinc-400" />
							</Popover.Button>
							<h2 className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
								Navigation
							</h2>
						</div>
						<nav className="mt-6">
							<ul className="-my-2 divide-y divide-zinc-100 text-base text-zinc-800 dark:divide-zinc-100/5 dark:text-zinc-300">
								{navigation.map((item: NavigationItem) => (
									<MobileNavItem key={item.href} href={item.href}>
										{item.label}
									</MobileNavItem>
								))}
							</ul>
						</nav>
					</Popover.Panel>
				</Transition.Child>
			</Transition.Root>
		</Popover>
	);
}

function NavItem({
	href,
	children,
}: {
	href: string;
	children: React.ReactNode;
}) {
	const isActive = usePathname() === href;

	return (
		<li>
			<Link
				href={href}
				className={clsx(
					"relative block px-3 py-2 transition shrink-0",
					isActive
						? "text-zinc-950 dark:text-zinc-50 dark:hover:text-zinc-50"
						: "text-zinc-500 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-zinc-300",
				)}
			>
				{children}
				{isActive && (
					<span className="absolute inset-x-1 -bottom-px h-px bg-linear-to-r from-transparent via-indigo-700 to-transparent dark:from-zinc-400/0 dark:via-indigo-400/40 dark:to-transparent" />
				)}
			</Link>
		</li>
	);
}

function DesktopNavigation(props: React.ComponentPropsWithoutRef<"nav">) {
	return (
		<nav {...props}>
			<ul className="flex rounded-full bg-zinc-0 px-3 text-sm font-medium text-zinc-800 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur-sm dark:bg-zinc-800/30 dark:text-zinc-200 dark:ring-white/10">
				{navigation.map((item) => (
					<NavItem key={item.href} href={item.href}>
						{item.label}
					</NavItem>
				))}
			</ul>
		</nav>
	);
}

function clamp(number: number, a: number, b: number) {
	const min = Math.min(a, b);
	const max = Math.max(a, b);
	return Math.min(Math.max(number, min), max);
}

function AvatarContainer({
	className,
	...props
}: React.ComponentPropsWithoutRef<"div">) {
	return (
		<div
			className={clsx(
				className,
				"h-10 w-10 rounded-full bg-white/90 p-0.5 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur-sm dark:bg-zinc-800/90 dark:ring-white/10",
			)}
			{...props}
		/>
	);
}

export function Avatar({
	large = false,
	className,
	...props
}: Omit<React.ComponentPropsWithoutRef<typeof Link>, "href"> & {
	large?: boolean;
}) {
	const isHomePage = usePathname() === "/";

	return (
		<Link
			href="/"
			aria-label="Home"
			className={clsx(
				className,
				"pointer-events-auto will-change-transform",
				"transition-all duration-300 ease-in-out",
				isHomePage ? "translate-x-0 translate-y-0 scale-100" : "-translate-x-4 -translate-y-3 scale-75"
			)}
			{...props}
		>
			<Image
				src="https://avatars.githubusercontent.com/laogou717"
				alt=""
				sizes={large ? "4rem" : "2.25rem"}
				width="140"
				height="140"
				className={clsx(
					"rounded-full bg-zinc-100 object-cover dark:bg-zinc-800",
					large ? "h-16 w-16" : "h-9 w-9"
				)}
				priority
			/>
		</Link>
	);
}

export function Header() {
	const isHomePage = usePathname() === "/";

	const headerRef = useRef<React.ElementRef<"div">>(null);
	const avatarRef = useRef<React.ElementRef<"div">>(null);
	const isInitial = useRef(true);

	useEffect(() => {
		const downDelay = avatarRef.current?.offsetTop ?? 0;
		const upDelay = 64;

		function setProperty(property: string, value: string) {
			document.documentElement.style.setProperty(property, value);
		}

		function removeProperty(property: string) {
			document.documentElement.style.removeProperty(property);
		}

		if (isHomePage) {
			setProperty("--avatar-image-transform", "translate3d(0rem, 1rem, 0) scale(1)");
			setProperty("--avatar-border-transform", "translate3d(0rem, 1rem, 0) scale(1)");
			setProperty("--avatar-border-opacity", "0");
		}

		function updateHeaderStyles() {
			if (!headerRef.current) {
				return;
			}

			const { top, height } = headerRef.current.getBoundingClientRect();
			const scrollY = clamp(
				window.scrollY,
				0,
				document.body.scrollHeight - window.innerHeight,
			);

			if (isInitial.current) {
				setProperty("--header-position", "sticky");
			}

			setProperty("--content-offset", `${downDelay}px`);

			if (isInitial.current || scrollY < downDelay) {
				setProperty("--header-height", `${downDelay + height}px`);
				setProperty("--header-mb", `${-downDelay}px`);
			} else if (top + height < -upDelay) {
				const offset = Math.max(height, scrollY - upDelay);
				setProperty("--header-height", `${offset}px`);
				setProperty("--header-mb", `${height - offset}px`);
			} else if (top === 0) {
				setProperty("--header-height", `${scrollY + height}px`);
				setProperty("--header-mb", `${-scrollY}px`);
			}

			if (top === 0 && scrollY > 0 && scrollY >= downDelay) {
				setProperty("--header-inner-position", "fixed");
				removeProperty("--header-top");
				removeProperty("--avatar-top");
			} else {
				removeProperty("--header-inner-position");
				setProperty("--header-top", "0px");
				setProperty("--avatar-top", "0px");
			}
		}

		function updateAvatarStyles() {
			if (!isHomePage) {
				return;
			}

			const fromScale = 1;
			const toScale = 36 / 64;
			const fromX = 0;
			const toX = 2 / 16;
			const fromY = 1;
			const toY = 0;

			const scrollY = downDelay - window.scrollY;

			let scale = (scrollY * (fromScale - toScale)) / downDelay + toScale;
			scale = clamp(scale, fromScale, toScale);

			let x = (scrollY * (fromX - toX)) / downDelay + toX;
			x = clamp(x, fromX, toX);

			let y = (scrollY * (fromY - toY)) / downDelay + toY;
			y = clamp(y, fromY, toY);

			setProperty(
				"--avatar-image-transform",
				`translate3d(${x}rem, ${y}rem, 0) scale(${scale})`,
			);

			const borderScale = 1 / (toScale / scale);
			const borderX = (-toX + x) * borderScale;
			const borderY = (-toY + y) * borderScale;
			const borderTransform = `translate3d(${borderX}rem, ${borderY}rem, 0) scale(${borderScale})`;

			setProperty("--avatar-border-transform", borderTransform);
			setProperty("--avatar-border-opacity", scale === toScale ? "1" : "0");
		}

		function updateStyles() {
			updateHeaderStyles();
			updateAvatarStyles();
			isInitial.current = false;
		}

		updateStyles();
		window.addEventListener("scroll", updateStyles, { passive: true });
		window.addEventListener("resize", updateStyles);

		return () => {
			window.removeEventListener("scroll", updateStyles);
			window.removeEventListener("resize", updateStyles);
		};
	}, [isHomePage]);

	return (
		<>
			<header
				className="pointer-events-none relative z-50 flex flex-none flex-col"
				style={{
					height: "var(--header-height)",
					marginBottom: "var(--header-mb)",
				}}
			>
				{isHomePage && (
					<>
						<div
							ref={avatarRef}
							className="order-last mt-[calc(--spacing(16)-(--spacing(3)))]"
						/>
						<Container
							className="top-0 order-last -mb-3 pt-3"
							style={{
								position:
									"var(--header-position)" as React.CSSProperties["position"],
							}}
						>
							<div
								className="top-(--avatar-top,--spacing(3)) w-full"
								style={{
									position:
										"var(--header-inner-position)" as React.CSSProperties["position"],
								}}
							>
								<div className="relative">
									<AvatarContainer
										className="absolute left-0 top-3 origin-left transition-opacity"
										style={{
											opacity: "var(--avatar-border-opacity, 0)",
											transform: "var(--avatar-border-transform)",
										}}
									/>
									<Avatar
										large
										className="block size-16 origin-left"
										style={{ transform: "var(--avatar-image-transform)" }}
									/>
								</div>
							</div>
						</Container>
					</>
				)}
				<div
					ref={headerRef}
					className="top-0 z-10 h-16 pt-6"
					style={{
						position:
							"var(--header-position)" as React.CSSProperties["position"],
					}}
				>
					<Container
						className="top-(--header-top,--spacing(6)) w-full"
						style={{
							position:
								"var(--header-inner-position)" as React.CSSProperties["position"],
						}}
					>
						<div className="relative flex gap-4 items-center">
							<div className="flex flex-1">
								{!isHomePage && (
									<AvatarContainer>
										<Avatar />
									</AvatarContainer>
								)}
							</div>
							<div className="flex flex-1 justify-end md:justify-center min-h-10">
								<MobileNavigation className="pointer-events-auto md:hidden" />
								<DesktopNavigation className="pointer-events-auto hidden md:block shrink-0" />
							</div>
							<div className="flex justify-end md:flex-1">
								<div className="pointer-events-auto">
									<ThemeToggle hideIndicator />
								</div>
							</div>
						</div>
					</Container>
				</div>
			</header>
			{isHomePage && (
				<div
					className="flex-none"
					style={{ height: "var(--content-offset)" }}
				/>
			)}
		</>
	);
}
