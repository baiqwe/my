import Link from "next/link";

export default async function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        <div className="container mx-auto px-4 text-center">
          <span className="inline-block py-1 px-3 rounded-full bg-blue-50 text-blue-600 text-sm font-semibold mb-6">
            ✨ New: AI-Powered Social Posts
          </span>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 mb-8">
            The World's Best Quotes, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              Ready for Instagram.
            </span>
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-10">
            Don't just read quotes. <strong>Use them.</strong> Browse curated collections for Real Estate, Business, and Teams. Download professional images in one click.
          </p>

          <div className="flex justify-center gap-4">
            <Link href="/en/quotes/industry/real-estate" className="px-8 py-4 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition">
              🏠 Real Estate Quotes
            </Link>
            <Link href="/en/quotes/occasion/monday-morning" className="px-8 py-4 bg-white text-slate-900 border-2 border-slate-200 rounded-xl font-bold hover:border-slate-300 transition">
              💼 Team Motivation
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Popular Collections</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <Link href="/en/quotes/industry/real-estate" className="group block bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition">
              <div className="text-4xl mb-4">🏡</div>
              <h3 className="text-xl font-bold mb-2 group-hover:text-blue-600">Real Estate Agents</h3>
              <p className="text-slate-500">Quotes to engage buyers and sellers on social media.</p>
            </Link>
            {/* Card 2 */}
            <Link href="/en/quotes/occasion/monday-morning" className="group block bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition">
              <div className="text-4xl mb-4">☕️</div>
              <h3 className="text-xl font-bold mb-2 group-hover:text-blue-600">Monday Motivation</h3>
              <p className="text-slate-500">Energize your team for the week ahead.</p>
            </Link>
            {/* Card 3 */}
            <Link href="/en/quotes/author/steve-jobs" className="group block bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition">
              <div className="text-4xl mb-4">💡</div>
              <h3 className="text-xl font-bold mb-2 group-hover:text-blue-600">Leadership Wisdom</h3>
              <p className="text-slate-500">Timeless advice from world's greatest leaders.</p>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
