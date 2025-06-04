
import { Head } from '@inertiajs/react';

export default function OnePost({ post, seo }) {
    return (
        <>
            <Head>
                <title>{seo.title}</title>
                <meta name="description" content={seo.description} />
                <meta name="keywords" content={seo.keywords} />
            </Head>
      <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: post.content }} />

         
        </>
    );
}
