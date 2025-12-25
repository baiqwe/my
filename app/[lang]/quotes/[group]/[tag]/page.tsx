import Link from 'next/link';
import { getPostsByTag } from '@/lib/posts';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }: { params: Promise<{ tag: string }> }) {
    const { tag } = await params;
    const tagName = tag.replace('-', ' ');
    return {
        title: `Top ${tagName} Quotes for Social Media | DailySpark`,
        description: `Browse the best ${tagName} quotes. Download free image templates for Instagram, LinkedIn and Slack.`,
    };
}

export default async function CategoryPage({ params }: { params: Promise<{ lang: string, group: string, tag: string }> }) {
    const { lang, group, tag } = await params;
    // Use getPostsByTag from lib/posts.ts
    const posts = getPostsByTag(tag);

    if (!posts || posts.length === 0) {
        // If no posts found, show empty state
        return (
            <div className="container mx-auto px-4 py-20 text-center">
                <h1 className="text-3xl font-bold mb-4">Coming Soon</h1>
                <p className="text-gray-600">We are curating quotes for {tag}. Check back later!</p>
                <Link href={`/${lang}`} className="text-blue-600 mt-4 inline-block hover:underline">← Back Home</Link>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-12">
            <header className="mb-12 text-center">
                <div className="text-sm font-bold text-blue-600 uppercase tracking-wider mb-2">{group}</div>
                <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 capitalize mb-4">
                    {tag.replace(/-/g, ' ')} Quotes
                </h1>
                <p className="text-xl text-gray-500">
                    {posts.length} curated quotes ready for your social media feed.
                </p>
            </header>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.map((post) => (
                    <Link
                        key={post.slug}
                        href={`/${lang}/quotes/${post.group}/${post.tag}/${post.slug}`}
                        className="group relative bg-white p-8 rounded-2xl border border-gray-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                    >
                        <blockquote className="text-xl font-serif text-slate-800 mb-6 leading-relaxed">
                            “{post.title}”
                        </blockquote>
                        <div className="flex items-center justify-between border-t border-gray-100 pt-4">
                            <span className="font-bold text-sm text-gray-600">{post.author}</span>
                            <span className="text-blue-600 text-sm font-bold group-hover:underline">Customize →</span>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
