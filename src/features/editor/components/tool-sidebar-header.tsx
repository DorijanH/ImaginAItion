type ToolSidebarHeaderProps = {
  title: string;
  description?: string;
}

export default function ToolSidebarHeader(props: ToolSidebarHeaderProps) {
  const {
    title,
    description
  } = props;

  return (
    <div className="h-[68px] space-y-1 border-b p-4">
      <p className="text-sm font-medium">
        {title}
      </p>

      {description && (
        <p className="text-sm text-muted-foreground">
          {description}
        </p>
      )}
    </div>
  );
}