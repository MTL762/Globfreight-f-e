"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface UserCellProps {
  name: string;
  email: string;
  image?: string;
}

export function UserCell({ name, email, image }: UserCellProps) {
  return (
    <div className="flex items-center gap-3">
      <Avatar className="h-10 w-10 border border-border/50">
        <AvatarImage src={image} alt={name} className="object-cover" />
        <AvatarFallback className="bg-primary/10 text-primary font-medium">
          {name?.charAt(0).toUpperCase() || "U"}
        </AvatarFallback>
      </Avatar>
      <div className="flex flex-col">
        <span className="font-semibold text-sm text-foreground leading-none mb-1">
          {name}
        </span>
        <span className="text-xs text-muted-foreground">
          {email}
        </span>
      </div>
    </div>
  );
}
