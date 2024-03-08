import Link from 'next/link';
import Heading from '@/components/Heading';
import Image from 'next/image';
import { getReviews } from '@/lib/reviews';

export const dynamic = 'force-dynamic';

export default async function ReviewsPage () {
    const reviews = await getReviews(8);

    return (
        <>
            <Heading>Next.js Reviews</Heading>
            <p>Reviews of my favorite games.</p>
            <ul className="flex flex-row flex-wrap gap-3">
                {reviews.map((review, index) => (
                 <li key ={review.slug}
                  className="bg-white border rounded shadow w-80 hover:shadow-2xl">
                     <Link href={`/reviews/${review.slug}`}>
                         <Image src={review.image} priority={index === 0} alt="COD" width="320" height="180" className="mb-2 rounded"/>
                         <h2 className="py-1 text-center">
                             {review.title}
                         </h2>
                     </Link>
                 </li>
                ))}
            </ul>
        </>
    );
}