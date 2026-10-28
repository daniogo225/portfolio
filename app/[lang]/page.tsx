import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Portfolio from "../components/Portfolio";
import { content } from "../data/content";
import { pageMetadata, personJsonLd } from "../data/metadata";
import { isLocale } from "../data/site";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const t = content[lang];
  return pageMetadata(lang, "", t.meta.title, t.meta.description);
}

export default async function Home({ params }: Props) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd(lang)).replace(/</g, "\\u003c") }}
      />
      <Portfolio locale={lang} t={content[lang]} />
    </>
  );
}
