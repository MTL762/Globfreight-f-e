import CustomHeader from "@/components/layouts/header/CustomHeader";
import { fetchHelper } from "@/api/fetch";
import type { blog } from "../types";
import AdminBlogView from "@/components/pages/_blog/admin-blog-view";
import { redirect } from "next/navigation";
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
  const { id, locale } = await params;
  const res = await fetchHelper({
    endPoint: ["adminBlogPosts", Number(id)],
    method: "GET"
  });
  const post: blog | undefined = res?.data ?? (res?.id ? res : undefined);

  if (!post || !post.id) {
    redirect(`/${locale}`);
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

