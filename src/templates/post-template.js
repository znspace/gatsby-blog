// @flow strict
import React, { useEffect } from 'react';
import { graphql } from 'gatsby';

import 'gitalk/dist/gitalk.css';
import Gitalk from 'gitalk';

import Layout from '../components/Layout';
import Post from '../components/Post';
import { useSiteMetadata } from '../hooks';
import type { MarkdownRemark } from '../types';

const siteConfig = require('../../config');

type Props = {
  data: {
    markdownRemark: MarkdownRemark
  }
};

const PostTemplate = ({ data }: Props) => {
  const { title: siteTitle, subtitle: siteSubtitle } = useSiteMetadata();
  const { frontmatter } = data.markdownRemark;
  const {
    title: postTitle,
    description: postDescription,
    socialImage
  } = frontmatter;
  const metaDescription = postDescription !== null ? postDescription : siteSubtitle;
  const { gitalk } = siteConfig;
  // 评论插件

  useEffect(() => {
    const GitTalkInstance = new Gitalk({
      ...gitalk,
      title: postTitle
      // id: id || graphqlId
    });
    GitTalkInstance.render('gitalk-container');
  }, []);

  return (
    <Layout
      title={`${postTitle} - ${siteTitle}`}
      description={metaDescription}
      socialImage={socialImage}>
      <Post post={data.markdownRemark} />

      <div id="gitalk-container" />
    </Layout>
  );
};

export const query = graphql`
  query PostBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      html
      fields {
        slug
        tagSlugs
      }
      frontmatter {
        date
        description
        tags
        title
        socialImage
      }
    }
  }
`;

export default PostTemplate;
