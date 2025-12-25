import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const postsDirectory = path.join(process.cwd(), 'data/md');

export interface PostData {
    slug: string;
    title: string;
    date?: string;
    description?: string;
    contentHtml: string;
    author?: string;
    group?: string;
    tag?: string;
    template_style?: string;
    [key: string]: any;
}

export async function getPostData(slug: string): Promise<PostData> {
    // We need to find the file. Since we now use a nested structure or flat?
    // User said "In data/md/ directory, your Markdown files should look like this...".
    // The user prompt implied a flat structure in data/md that drives the dynamic routes:
    // "Data Layer Design... use existing Markdown file system... through enhanced Frontmatter to implement complex classification logic."
    // This means the FILES are likely flat in `data/md`, and the Frontmatter `group` and `tag` determine the URL.
    // So we search for a file named `${slug}.md` in `data/md`.

    const fullPath = path.join(postsDirectory, `${slug}.md`);

    // Check if file exists
    if (!fs.existsSync(fullPath)) {
        throw new Error(`Post not found: ${slug}`);
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);

    // Use remark to convert markdown into HTML string
    const processedContent = await remark()
        .use(html)
        .process(matterResult.content);
    const contentHtml = processedContent.toString();

    return {
        slug,
        contentHtml,
        title: matterResult.data.title,
        ...matterResult.data,
    };
}

export function getAllPosts(): PostData[] {
    if (!fs.existsSync(postsDirectory)) {
        return [];
    }
    const fileNames = fs.readdirSync(postsDirectory);
    const allPostsData = fileNames.map((fileName) => {
        const slug = fileName.replace(/\.md$/, '');
        const fullPath = path.join(postsDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const matterResult = matter(fileContents);

        return {
            slug,
            contentHtml: '', // Not needed for listing
            title: matterResult.data.title,
            ...matterResult.data,
        };
    });
    return allPostsData;
}

export function getSortedPostsData() {
    const allPosts = getAllPosts();
    return allPosts.sort((a, b) => {
        if (a.date && b.date) {
            return a.date < b.date ? 1 : -1;
        }
        return 0;
    });
}

export function getPostsByGroup(group: string) {
    const allPosts = getAllPosts();
    return allPosts.filter(post => post.group === group);
}

export function getPostsByTag(tag: string) {
    const allPosts = getAllPosts();
    return allPosts.filter(post => post.tag === tag);
}
