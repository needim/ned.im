import Image from "next/image";
import React from "react";

export function StackList({
  items,
  title,
  description,
}: {
  title: string;
  description: string;
  items: any[];
}): React.ReactElement {
  return (
    <div className="mt-12">
      <h2 className="text-3xl mt-8">{title}</h2>
      <p className="text-muted-foreground">{description}</p>
      <ul
        role="list"
        className="divide-y mt-4 divide-border rounded-md border bg-zinc-100/75 dark:bg-zinc-900/75"
      >
        {items.map((product, index) => (
          <li
            key={index}
            className="flex items-center justify-between py-2 pl-4 pr-5 text-sm leading-6 group"
          >
            <div className="flex w-0 flex-1 items-center">
              <div className="w-24 font-medium text-muted-foreground">
                {product.category}
              </div>
              <div className="ml-4 flex min-w-0 flex-1 gap-2">
                <span className="flex-shrink-0 text-muted-foreground">
                  {product.brand}
                </span>
                <span className="truncate font-medium">{product.name}</span>
              </div>
            </div>
            <div className="ml-4 flex-shrink-0">
              <Image
                src={product.imageSrc}
                alt={product.name}
                width={500}
                height={500}
                className="object-cover object-center opacity-0 size-10 scale-0 group-hover:opacity-100 group-hover:scale-150 transition-all duration-300 hover:size-24 ease-in-out"
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
