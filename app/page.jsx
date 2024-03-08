import Link from "next/link";
import Heading from "@/components/Heading";
import { getReviews } from "@/lib/reviews";
import Image from "next/image";

export const dynamic = 'force-dynamic';

export default async function HomePage () {
    const latests = await getReviews(3);

    return (
        <>
            <Heading>Next Reviews</Heading>
            <p className="pb-3">Reviews of my favorite games.</p>
            <ul className="flex flex-col gap-3">
                {latests.map((latest, index) => (
                    <li key={latest.slug} className="bg-white border rounded shadow w-80 hover:shadow-2xl sm:w-full">
                    <Link href={`/reviews/${latest.slug}`} className="flex flex-col sm:flex-row"> 
                        <Image src={latest.image} priority={index === 0} alt="gta" width="320" height="180" 
                        className="mb-2 rounded-t sm:rounded-l sm:rounded-r-none sm:mb-0"/> 
                        <div className="px-2 py-1 text-center sm:text-left"> 
                            <h2 className="font-blckops font-semibold ">
                                {latest.title}
                            </h2>
                            <p className="hidden pt-2 sm:block">
                                {latest.subtitle}
                            </p>
                        </div>
                        
                        
                    </Link>
            </li>
                ))}
            </ul>
        </>
    );
}