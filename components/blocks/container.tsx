import { cn } from "@/lib/utils";
import { forwardRef } from "react";

export const ContainerOuter = forwardRef<
	React.ComponentRef<"div">,
	React.ComponentPropsWithoutRef<"div">
>(function OuterContainer({ className, children, ...props }, ref) {
	return (
		<div ref={ref} className={cn("py-8", className)} {...props}>
			{children}
		</div>
	);
});

export const ContainerInner = forwardRef<
	React.ComponentRef<"div">,
	React.ComponentPropsWithoutRef<"div">
>(function InnerContainer({ className, children, ...props }, ref) {
	return (
		<div
			ref={ref}
			className={cn("relative mx-auto max-w-3xl", className)}
			{...props}
		>
			{children}
		</div>
	);
});

export const Container = forwardRef<
	React.ComponentRef<typeof ContainerOuter>,
	React.ComponentPropsWithoutRef<typeof ContainerOuter>
>(function Container({ children, ...props }, ref) {
	return (
		<ContainerOuter ref={ref} {...props}>
			<ContainerInner>{children}</ContainerInner>
		</ContainerOuter>
	);
});
