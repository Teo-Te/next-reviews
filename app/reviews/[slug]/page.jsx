import Heading from "@/components/Heading";
import Image from "next/image";
import ShareLinkButton from "@/components/ShareLinkButton";
import { getReview, getSlugs } from "@/lib/reviews";

// export async function generateStaticParams(){
//     const slugs = await getSlugs();
//     return slugs.map((slug) => ({slug}));
// }

export const dynamic = 'force-dynamic';

export async function generateMetadata({params: { slug }}){
    const review = await getReview(slug);
    return {
        title: review.title,
    };
}

export default async function ReviewPage ({params: { slug }}) {
    const review = await getReview(slug);

    return (
        <>
            <Heading>{review.title}</Heading>
            <p className="pb-3 font-semibold">{review.subtitle}</p>
            <div className="flex gap-3 items-baseline">
                <p className="text-sm text-gray-500 pb-2">Published on {review.date}</p>
                <ShareLinkButton />
            </div>
            <Image src={review.image} priority alt="GTA 5" width="640" height="360" className="mb-2 rounded" />
            <article dangerouslySetInnerHTML={{ __html: review.body }} className="max-w-screen-sm prose prose-slate" />
        </>
    );
}