import { Head } from '@inertiajs/react';

export default function PageView({ html, css, seoTitle, seoDescription, seoKeywords }) {
  return (
    <>
      <Head>
        <title>{seoTitle || 'Default Title'}</title>
        <meta name="description" content={seoDescription || 'Default Description'} />
        <meta name="keywords" content={seoKeywords || 'Default, Keywords'} />
      </Head>

      <style>{css}</style>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </>
  );
}
