import Link from 'next/link';
import { getSortedPostsData } from '@/lib/posts';

// Homepage SEO
export const metadata = {
  title: 'Best Motivational Quotes for Work & Real Estate (2025) | DailySpark',
  description: 'Browse curated quotes for Real Estate, Teams, and Sales. Instantly generate social media images and automate your daily inspiration.',
};

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  // Get latest 6 posts
  const recentPosts = getSortedPostsData().slice(0, 6);

  return (
    <div className="container mx-auto px-4 py-16">
      {/* Hero Section */}
      <section className="text-center mb-20">
        <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 mb-6 tracking-tight">
          Automate Your <br />
          <span className="text-blue-600">Daily Inspiration.</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10">
          Don't just read quotes. <strong>Use them.</strong> Instantly generate professional social media posts for Real Estate, Teams, and Business.
        </p>
        <div className="flex justify-center gap-4">
          <Link href={`/${lang}/quotes/industry/real-estate`} className="bg-slate-900 text-white px-8 py-4 rounded-full font-bold hover:bg-slate-800 transition">
            Browse Quotes
          </Link>
          <Link href="/tools/social-poster" className="bg-white text-slate-900 border border-gray-300 px-8 py-4 rounded-full font-bold hover:bg-gray-50 transition">
            Try Automation
          </Link>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="mb-20">
        <h2 className="text-2xl font-bold mb-8 text-center">Popular Categories</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { title: '🏡 Real Estate', slug: 'real-estate', group: 'industry' },
            { title: '💼 Team Motivation', slug: 'team-building', group: 'occasion' },
            { title: '☕️ Monday Morning', slug: 'monday-morning', group: 'occasion' },
          ].map((cat) => (
            <Link
              key={cat.slug}
              href={`/${lang}/quotes/${cat.group}/${cat.slug}`}
              className="group block p-8 bg-gray-50 rounded-2xl border border-gray-100 hover:border-blue-200 hover:shadow-lg transition-all"
            >
              <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600">{cat.title}</h3>
              <p className="text-gray-500 mt-2 text-sm">Generate images for {cat.slug.replace('-', ' ')}.</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Recent Drops */}
      <section>
        <h2 className="text-2xl font-bold mb-8">Fresh Drops</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recentPosts.map((post) => (
            <Link
              key={post.slug} // changed id to slug as per our datamodel
              href={`/${lang}/quotes/${post.group || 'industry'}/${post.tag || 'general'}/${post.slug}`}
              className="block p-6 rounded-xl border border-gray-200 hover:border-slate-900 transition-colors"
            >
              <p className="font-serif text-lg text-slate-800 mb-4 line-clamp-3">"{post.title}"</p>
              <div className="flex items-center justify-between text-sm text-gray-500">
                <span>{post.author}</span>
                <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs uppercase font-bold">{post.tag}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
