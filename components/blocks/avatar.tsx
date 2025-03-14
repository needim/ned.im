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
      className={clsx(className, "pointer-events-auto flex items-center")}
      {...props}
    >
      <Image
        src="/avatar.png"
        alt=""
        // sizes={large ? "4rem" : "2.25rem"}
        width="140"
        height="140"
        className={clsx(" object-cover", large ? "h-16 w-16" : "size-7")}
        priority
      />
    </Link>
  );
}
