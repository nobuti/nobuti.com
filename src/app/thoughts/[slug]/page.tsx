import { getAllArticles } from "@/lib/mdx";
import dayjs from "dayjs";
import type { Metadata } from "next";

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;
  const { default: Post, metadata } = await import(`@/posts/${slug}.mdx`);

  return (
    <div className="py-lg prose prose-slate max-w-none [&_h1]:text-[1.75rem] md:[&_h1]:text-[2rem] [&_h1]:font-bold [&_h1]:pt-lg [&_h1]:pb-0 [&_h1]:leading-tight [&_h2]:text-2xl md:[&_h2]:text-[1.75rem] [&_h2]:font-semibold [&_h2]:pt-md [&_h2]:pb-sm [&_h2]:leading-tight [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:pt-md [&_h3]:pb-xs [&_ul]:list-disc [&_ul]:list-outside [&_ul]:ml-md [&_ul]:mb-md [&_ul]:p-0 [&_ol]:list-decimal [&_ol]:list-outside [&_ol]:ml-md [&_ol]:mb-md [&_ol]:p-0 [&_p]:text-base [&_p]:leading-base [&_p]:mb-md [&_li]:text-base [&_li]:leading-base [&_a]:text-accent [&_a]:font-normal [&_a]:underline hover:[&_a]:text-accent-hover focus:[&_a]:text-accent-hover [&_pre]:font-mono [&_pre]:text-sm [&_pre]:p-md [&_pre]:rounded [&_pre]:overflow-x-auto [&_pre]:mb-md [&_pre]:bg-border [&_code]:font-mono [&_code]:text-sm [&_pre_code]:bg-transparent [&_:not(pre)>code]:bg-border [&_:not(pre)>code]:px-1 [&_:not(pre)>code]:py-0.5 [&_:not(pre)>code]:rounded [&_blockquote]:border-l-[3px] [&_blockquote]:border-border [&_blockquote]:pl-md [&_blockquote]:my-md [&_blockquote]:text-secondary [&_blockquote]:italic">
      <h1>{metadata.title}</h1>
      <div className="text-xs font-normal text-secondary mb-lg">
        {dayjs(metadata.date).format("MMMM D, YYYY")}
      </div>
      <Post />
    </div>
  );
}

export async function generateStaticParams() {
  const allTheArticles = await getAllArticles();

  return allTheArticles.map((article) => ({
    slug: article.slug.replace(/\.mdx$/, ""),
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = (await params).slug;

  const { metadata } = await import(`@/posts/${slug}.mdx`);

  return {
    ...metadata,
    description: metadata.description || metadata.excerpt,
  };
}

export const dynamicParams = false;
