import Head from 'next/head';
import { generateRSS } from '../rssUtil';
import { PostData, loadBlogPosts } from '../loader';
import { PostCard } from '../components/PostCard';

const Home = (props: {
  posts: PostData[];
}) => {
  return (
    <div className="content">
      <Head>
        <title>Jeffrey in your area</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="section">
        <div className="post-card-container">
          {props.posts.map((post, j) => {
            return <PostCard post={post} key={j} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Home;

export const getStaticProps = async () => {
  const posts = await loadBlogPosts();

  // comment out to turn off RSS generation during build step.
  await generateRSS(posts);

  const props = {
    posts,
  };

  return { props };
};
