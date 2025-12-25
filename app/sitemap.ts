import { getAllPosts } from '@/lib/posts';
import { MetadataRoute } from 'next';

const BASE_URL = 'https://dailyspark.io';

export default function sitemap(): MetadataRoute.Sitemap {
    const posts = getAllPosts();

    // We assume 'en' is the default and only active locale for now as per "Phase 1: English Default"
    const postsUrls = posts.map(post => ({
        url: `${BASE_URL}/en/quotes/${post.group || 'industry'}/${post.tag || 'real-estate'}/${post.slug}`,
        // Ideally use post.date, but ensure it's valid.
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
    }));

    return [
        {
            url: BASE_URL,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1,
        },
        ...postsUrls,
    ];
}
