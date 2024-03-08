import matter from "gray-matter";
import { readdir, readFile } from "node:fs/promises";
import { marked } from "marked";
import qs from "qs";

const cmsUrl = "http://localhost:1337";

// export async function getSlugs () {
//     const files = await readdir("./content/reviews");
//     return files.filter((file) => file.endsWith(".md"))
//         .map((file) => file.slice(0, -'.md'.length));
// }

export async function getSlugs() {
    const url = 'http://localhost:1337/api/reviews?' + qs.stringify({
        fields: ['slug'],
        sort: ['publishedAt:desc'],
        pagination: { pageSize: 100 },
      }, { encodeValuesOnly: true });

const response = await fetch(url);
const {data} = await response.json();
return data.map(({ attributes }) => attributes.slug);

}

// export async function getReview (slug) {
//     const text = await readFile(`./content/reviews/${slug}.md`, "utf-8");
//     const { content, data: {title, date, image} } = matter(text);
//     const body = marked(content);
//     return { slug, title, date, image, body };
// }

export async function getReview (slug) {
    const url = 'http://localhost:1337/api/reviews?' + qs.stringify({
        filters: { slug: slug},
        fields: ['slug', 'title', 'subtitle', 'publishedAt', 'body'],
        populate: { image: { fields: ['url'] } },
        pagination: { pageSize: 1, withCount: false },
      }, { encodeValuesOnly: true });

const response = await fetch(url);
const {data} = await response.json();
const {attributes} = data[0];
return {
    slug: attributes.slug,
    title: attributes.title,
    subtitle: attributes.subtitle,
    date: attributes.publishedAt.slice(0, 'YYYY-MM-DD'.length),
    image: cmsUrl + attributes.image.data.attributes.url,
    body: marked(attributes.body),
    }
}

// export async function getReviews () {
//     const slugs = await getSlugs();
//     const reviews = [];
//     for (const slug of slugs) {
//         const review = await getReview(slug);
//         reviews.push(review);
//     }
//     reviews.sort((a, b) => b.date - a.date);
//     return reviews;
// }

export async function getReviews (pageSize) {
    const url = 'http://localhost:1337/api/reviews?' + qs.stringify({
    fields: ['slug', 'title', 'subtitle', 'publishedAt'],
    populate: {image: {fields: ['url']}},
    sort: ['publishedAt:desc'],
    pagination: { pageSize },
}, { encodeValuesOnly: true });

const response = await fetch(url);
const {data} = await response.json();
return data.map(({ attributes }) => ({
    slug: attributes.slug,
    title: attributes.title,
    subtitle: attributes.subtitle,
    date: attributes.publishedAt.slice(0, 'YYYY-MM-DD'.length),
    image: cmsUrl + attributes.image.data.attributes.url,
}))

}

// export async function getLatestReview () {
//     const reviews = await getReviews();
//     return reviews[0];
// }

