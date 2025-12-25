import { getPostData } from '@/lib/posts';
import Link from 'next/link';
import { ArrowLeft, ChevronRight } from 'lucide-react';
import { getDictionary } from '@/lib/get-dictionary';
import { addLocaleToPath } from '@/lib/i18n-config';
import QuoteGenerator from '@/components/QuoteGenerator';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    try {
        const postData = await getPostData(slug);
        return {
            title: `${postData.title} | DailySpark Quotes`,
            description: postData.description || `Inspirational quote by ${postData.author}`,
        };
    } catch (e) {
        return {
            title: 'Quote Not Found | DailySpark',
        };
    }
}

export default async function Post({ params }: { params: Promise<{ lang: string; slug: string; group: string; tag: string }> }) {
    const { lang, slug, group, tag } = await params;

    // Verify that the route params match the post data. 
    // Ideally we should check if postData.group === group && postData.tag === tag
    // If not, maybe 404 or redirect. For now, let's just load the post.
    let postData;
    try {
        postData = await getPostData(slug);
    } catch (e) {
        notFound();
    }

    // Optional: Strict checking
    // if (postData.group !== group || postData.tag !== tag) { notFound(); }

    const dict = await getDictionary(lang);
    const homePath = addLocaleToPath('/', lang);
    const postsPath = addLocaleToPath('/posts', lang); // Or /quotes in the new structure

    const author = postData.author || "Unknown";

    return (
        <article className="container mx-auto px-4 py-12 max-w-6xl">

            {/* Top Navigation */}
            <nav className="flex items-center text-sm text-gray-500 mb-8">
                <Link href={homePath} className="hover:text-blue-600">Home</Link>
                <ChevronRight className="mx-2" size={16} />
                <span className="capitalize">{group}</span>
                <ChevronRight className="mx-2" size={16} />
                <span className="capitalize">{tag}</span>
                <ChevronRight className="mx-2" size={16} />
                <span className="text-gray-900 truncate max-w-[200px]">{postData.title}</span>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

                {/* Left Column: SEO Content (7 cols) */}
                <div className="lg:col-span-7">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                        {postData.title}
                    </h1>

                    {/* SEO Meta Box */}
                    <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mb-8 text-blue-800 text-sm">
                        🎯 <strong>Pro Tip:</strong> Use this quote for your Monday Morning team huddle or Instagram story.
                    </div>

                    <div
                        className="prose prose-lg max-w-none text-gray-600"
                        dangerouslySetInnerHTML={{ __html: postData.contentHtml }}
                    />

                    <div className="mt-12 pt-8 border-t border-gray-100">
                        <Link href={homePath} className="text-blue-600 hover:text-blue-800 inline-flex items-center gap-2 font-medium">
                            <ArrowLeft size={20} />
                            Back to Home
                        </Link>
                    </div>
                </div>

                {/* Right Column: Tools (5 cols) - Sticky */}
                <div className="lg:col-span-5 lg:sticky lg:top-8">
                    <QuoteGenerator
                        title={postData.title}
                        author={author}
                        description={postData.description}
                    />
                </div>

            </div>

            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Quotation",
                        "text": postData.title,
                        "creator": {
                            "@type": "Person",
                            "name": author
                        },
                        "keywords": [group, tag, "quote", "daily spark"].join(", "),
                        "image": `https://dailyspark.io/api/og?title=${encodeURIComponent(postData.title)}` // Placeholder
                    })
                }}
            />
        </article>
    )
}
