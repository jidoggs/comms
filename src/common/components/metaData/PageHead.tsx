import Head from 'next/head';
import React from 'react';

type PageHeadProps = {
  description?: string;
  title?: string;
};

const PageHead = ({ description, title }: PageHeadProps) => {
  return (
    <Head>
      <title>Correspondence{title ? ` | ${title}` : ''}</title>
      <meta name="description" content={description} />
      <link rel="icon" href="/logo.svg" />
    </Head>
  );
};

export default PageHead;
