import CustomHeader from "@/components/layouts/header/CustomHeader";
import { fetchHelper } from "@/api/fetch";
import type { blog } from "../types";
import AdminBlogView from "@/components/pages/_blog/admin-blog-view";
import { Link } from "@/i18n/navigation";
import { FileQuestion, ArrowLeft } from "lucide-react";
import type { Metadata } from "next";

export async function generateMetadata({
  params
}: {
  params: Promise<{ id: string; locale: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  return {
    title: `Blog Post #${id} | Globfreight Admin`,
    description: "Manage and preview blog post publication"
  };
}

const page = async ({ params }: { params: Promise<{ id: string; locale: string }> }) => {
  const { id } = await params;
  const res = await fetchHelper({
    endPoint: ["adminBlogPosts", Number(id)],
    method: "GET"
  });

  const post: blog | undefined = res?.data ?? (res?.id ? res : undefined);

  if (!post || !post.id) {
    return (
      <div className="space-y-6">
        <CustomHeader />
        <div className="mx-auto max-w-xl p-8 rounded-2xl border border-border/80 bg-card text-center space-y-4 shadow-xs mt-6">
          <div className="h-16 w-16 mx-auto rounded-2xl bg-muted/60 text-muted-foreground flex items-center justify-center">
            <FileQuestion className="h-8 w-8" />
          </div>
          <div className="space-y-1">
            <h2 className="text-lg font-bold text-foreground">Post Not Found</h2>
            <p className="text-xs text-muted-foreground">
              The requested blog post with ID #{id} could not be retrieved from the server or does not exist.
            </p>
          </div>
          <Link
            href="/admin/blog"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-primary-foreground text-xs font-semibold hover:opacity-90 transition-all shadow-xs"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Return to Blog List</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <CustomHeader />
      <div className="px-4">
        <AdminBlogView blogData={post} />
      </div>
    </div>
  );
};

export default page;

