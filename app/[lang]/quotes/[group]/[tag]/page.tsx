import Link from 'next/link';
import { getPostsByTag } from '@/lib/posts';
import { getDictionary } from '@/lib/get-dictionary';
import { addLocaleToPath } from '@/lib/i18n-config';
import { ArrowLeft } from 'lucide-react';

export async function generateMetadata({ params }: { params: Promise<{ group: string; tag: string }> }) {
    const { group, tag } = await params;
    return {
        title: `${tag.replace(/-/g, ' ')} Quotes | DailySpark`,
        description: `Best quotes about ${tag.replace(/-/g, ' ')} for ${group}.`,
    };
}

export default async function CategoryPage({ params }: { params: Promise<{ lang: string; group: string; tag: string }> }) {
    const { lang, group, tag } = await params;

    // Fetch posts filtering by tag
    // Note: In a real app we might want to filter by group AND tag, 
    // but the file system structure is flat, so relies on frontmatter.
    const posts = await getPostsByTag(tag);

    const dict = await getDictionary(lang);
    const homePath = addLocaleToPath('/', lang);

    return (
        <div className="container mx-auto px-4 py-12 max-w-6xl">
            <nav className="mb-8">
                <Link href={homePath} className="text-gray-500 hover:text-blue-600 inline-flex items-center gap-2 text-sm">
                    <ArrowLeft size={16} /> Back to Home
                </Link>
            </nav>

            <header className="mb-12 text-center">
                <span className="inline-block py-1 px-3 rounded-full bg-blue-50 text-blue-600 text-sm font-semibold mb-4 capitalize">
                    {group} Collection
                </span>
                <h1 className="text-4xl md:text-5xl font-extrabold capitalize text-slate-900 mb-4">
                    {tag.replace(/-/g, ' ')} Quotes
                </h1>
                <p className="text-xl text-slate-500 max-w-2xl mx-auto">
                    Browse our curated list of quotes specifically selected for {tag.replace(/-/g, ' ')}.
                </p>
            </header>

            {posts.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {posts.map((post) => (
                        <Link
                            key={post.slug}
                            href={addLocaleToPath(`/quotes/${post.group}/${post.tag}/${post.slug}`, lang)}
                            className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition border border-gray-100 flex flex-col h-full group"
                        >
                            <div className="mb-4">
                                <span className={`inline-block w-8 h-1 bg-blue-500 rounded-full group-hover:w-16 transition-all duration-300`}></span>
                            </div>
                            <blockquote className="text-lg font-medium text-gray-900 mb-6 flex-grow">
                                "{post.title}"
                            </blockquote>
                            <div className="mt-auto flex items-center justify-between text-sm text-gray-500">
                                <span className="font-semibold text-gray-700">— {post.author}</span>
                                <span className="text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity">
                                    Customize →
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>
            ) : (
                <div className="text-center py-20 bg-gray-50 rounded-xl">
                    <p className="text-gray-500 text-lg">No quotes found for this category yet.</p>
                    <Link href={homePath} className="text-blue-600 font-medium mt-4 inline-block hover:underline">
                        Explore other categories
                    </Link>
                </div>
            )}
        </div>
    );
}
