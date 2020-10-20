import React from 'react';
import Layout from 'components/layout';
import Head from 'next/head';
import Date from 'components/date';
import {
  getAllPostIds, getPostData, PostParams, PostData,
} from 'lib/posts';

import utilStyles from 'styles/utils.module.css';

export default function Post({ postData }: PostProps): JSX.Element {
  return (
    <Layout home={false}>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </Layout>
  );
}

export async function getStaticPaths(): Promise<StaticPaths> {
  const paths = getAllPostIds();
  return (
    {
      paths,
      fallback: false,
    }
  );
}

export async function getStaticProps({ params }: StaticPropParam): Promise<StaticProps> {
  const postData = await getPostData(params.id);
  return (
    {
      props: { postData },
    }
  );
}

interface StaticPropParam {
  params: PostParams;
}

interface StaticPaths {
  paths: { params: PostParams }[];
  fallback: boolean;
}

interface PostProps {
  postData: PostData;
}

interface StaticProps {
  props: PostProps
}
