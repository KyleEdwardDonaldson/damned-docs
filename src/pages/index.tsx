import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Heading from '@theme/Heading';
import styles from './index.module.css';

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className="hero bg-transparent">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">{siteConfig.title}</h1>
          <p className="py-6">{siteConfig.tagline}</p>
          <Link className="btn btn-primary mx-2 bg-[#FF5733] hover:bg-[#F52D00] hover:text-white" to="/docs/Getting%20Started/start">
            Get Started
          </Link>
          <Link className="btn btn-primary mx-2 bg-[#5DFDCB] hover:bg-[#0DFDB1] hover:text-white" to="/docs/intro">
            Join our Discord
          </Link>
        </div>
      </div>
    </header>
  );
}

function AboutGameSection() {
  return (
    <section className="py-16 bg-transparent">
      <div className="container max-w-5xl mx-auto px-4">
        <Heading as="h2" className="text-center text-3xl font-bold mb-8">
          About the Game
        </Heading>
        <p className="text-center text-lg">
          Damned is an API-based game where you guide pilgrims through a perilous, post-rapture Earth.
          Train your pilgrims, discover valuable caches, and trade with other players in a dark, hostile
          world filled with demons and unknown dangers.
        </p>
      </div>
    </section>
  );
}

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      description="Join the journey in a dark, post-rapture world."
    >
      <div style={{ backgroundImage: 'url(/img/bg.jpg)', backgroundSize: 'cover', backgroundPosition: 'center', minHeight: '100vh' }}>
        <HomepageHeader />
        <main>
          <HomepageFeatures />
          <AboutGameSection />
          {/* Add other sections here, using `styles.alternateBackground` for every second section */}
        </main>
      </div>
    </Layout>
  );
}
