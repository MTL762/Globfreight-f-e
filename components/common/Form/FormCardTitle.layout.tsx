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
    <div className="col-span-12 mb-4">
      <div className="flex items-center gap-2 text-xl font-bold text-foreground">
        {icon && <span className="text-primary">{icon}</span>}
        {title}
      </div>
      {description && (
        <p className="text-sm text-muted-foreground mt-1 font-normal">
          {description}
        </p>
      )}
    </div>
  );
}
