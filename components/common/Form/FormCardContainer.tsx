import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export default function FormCardContainer({
  width,
  children,
  index
}: {
  width: number;
  children: React.ReactNode;
  index: number | string;
}) {
  return (
    <Card
      key={index}
      className={cn(
        index !== "default" && "border border-border/60",
        "h-full rounded-2xl p-5 shadow-sm",
        width === 1
          ? "col-span-12 md:col-span-2 lg:col-span-1"
          : width === 2
            ? "col-span-12 md:col-span-3 lg:col-span-2"
            : width === 3
              ? "col-span-12 md:col-span-4 lg:col-span-3"
              : width === 4
                ? "col-span-12 md:col-span-6 lg:col-span-4"
                : width === 5
                  ? "col-span-12 md:col-span-6 lg:col-span-5"
                  : width === 6
                    ? "col-span-12 md:col-span-6 lg:col-span-6"
                    : width === 7
                      ? "col-span-12 md:col-span-6 lg:col-span-7"
                      : width === 8
                        ? "col-span-12 md:col-span-8 lg:col-span-8"
                        : width === 9
                          ? "col-span-12 md:col-span-9 lg:col-span-9"
                          : width === 10
                            ? "col-span-12 md:col-span-10 lg:col-span-10"
                            : width === 11
                              ? "col-span-12 md:col-span-11 lg:col-span-11"
                              : "col-span-12"
      )}
    >
      <div className="grid grid-cols-12 relative gap-5">{children}</div>
    </Card>
  );
}
