import clsx from "clsx";
import { forwardRef } from "react";

export const ContainerOuter = forwardRef<
  React.ComponentRef<"div">,
  React.ComponentPropsWithoutRef<"div">
>(function OuterContainer({ className, children, ...props }, ref) {
  return (
    <div ref={ref} className={clsx("", className)} {...props}>
      <div className="mx-auto w-full max-w-3xl">{children}</div>
    </div>
  );
});

export const ContainerInner = forwardRef<
  React.ComponentRef<"div">,
  React.ComponentPropsWithoutRef<"div">
>(function InnerContainer({ className, children, ...props }, ref) {
  return (
    <div ref={ref} className={clsx("relative", className)} {...props}>
      <div className="mx-auto max-w-3xl lg:max-w-3xl">{children}</div>
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
