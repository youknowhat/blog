import React from 'react';
import NextHead from 'next/head';
import { globals } from '../globals';

export const Meta: React.FC<{
  meta: {
    title: string;
    link?: string;
    desc?: string;
    image?: string;
  };
}> = (props) => {
  const { meta } = props;
  return (
    <NextHead>
      <title>{meta.title}</title>
      {meta.desc && <meta name="description" content={meta.desc} />}
      <meta property="og:type" content="website" />
      <meta name="og:title" property="og:title" content={meta.title ? meta.title : 'Jeffrey in your area'} />
      {meta.desc && (
        <meta
          name="og:description"
          property="og:description"
          content={meta.desc ? meta.desc : '이런저런 개발 얘기를 공유합니다.'}
        />
      )}
      <meta property="og:site_name" content={globals.siteName} />
      {meta.link && <meta property="og:url" content={meta.link ? meta.link : 'https://jeffarea.site'} />}
      <meta property="og:image" content={meta.image ? meta.image : 'https://jeffarea.site/img/meta_1.png'} />
    </NextHead>
  );
};
