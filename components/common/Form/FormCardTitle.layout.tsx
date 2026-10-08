export default function FormCardTitle({
  title,
  icon,
  description
}: {
  icon?: JSX.Element;
  title: string | JSX.Element;
  description?: string | JSX.Element;
}) {
  return (
    <div className="col-span-12 pb-4 mb-1 border-b border-border/60">
      <div className="flex items-start sm:items-center gap-3">
        {icon && (
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/20">
            {icon}
          </div>
        )}
        <div className="min-w-0 flex-1">
          <h3 className="text-base sm:text-lg font-semibold text-foreground tracking-tight leading-snug">
            {title}
          </h3>
          {description && (
            <p className="text-xs sm:text-sm text-muted-foreground mt-0.5 font-normal leading-relaxed">
              {description}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
