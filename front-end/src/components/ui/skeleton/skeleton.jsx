import { cn } from "@/lib/utils";

function Skeleton({ className, ...props }) {
  return (
    <div
      data-slot="skeleton"
      className={cn(
        "animate-pulse rounded-md bg-surface-container border border-border/50",
        className,
      )}
      {...props}
    />
  );
}

export { Skeleton };
