import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Train Pilgrims',
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        Fight back against the demons that roam earth by training pilgrims. Build up their strength with relics found on previous expeditions in order to take on stronger foe.
      </>
    ),
  },
  {
    title: 'Discover Caches',
    Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <>
        Send your pilgrims out into the hellish wastelands in search of relics. Utilise the relics to become stronger, or display your most rare discoveries as trophies to other players.
      </>
    ),
  },
  {
    title: 'Trade',
    Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
        List items for sale at your colony. If another player discovers your location, they can trade with you. Find other player's colonies to engage in trade, make emergency purchases during long pilgramages.
      </>
    ),
  },
];

function Feature({title, Svg, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container" style={{  }}>
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
