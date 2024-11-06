import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';
import { GiRobe, GiTrade } from 'react-icons/gi';
import { IconType } from 'react-icons';
import { FaRegLightbulb } from "react-icons/fa";
import { PiTreasureChestFill } from 'react-icons/pi';
import { MdConveyorBelt } from 'react-icons/md';

type FeatureItem = {
  title: string;
  Icon: IconType;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Learn',
    Icon: FaRegLightbulb,
    description: (
      <>
        Learn a new programming language or reinforce your skills in this competitive, multiplayer game. Use any language you like to call each of the endpoints.
      </>
    ),
  },
  {
    title: 'Train Pilgrims',
    Icon: GiRobe,
    description: (
      <>
        Strengthen your pilgrims with relics and prepare them for stronger foes in the wastelands.
      </>
    ),
  },
  {
    title: 'Discover Caches',
    Icon: PiTreasureChestFill,
    description: (
      <>
        Explore dangerous lands in search of relics. Showcase your findings and gain strength.
      </>
    ),
  },
  {
    title: 'Trade',
    Icon: GiTrade,
    description: (
      <>
        Trade items with other players, build alliances, and acquire essentials for survival.
      </>
    ),
  },
  {
    title: 'Automate',
    Icon: MdConveyorBelt,
    description: (
      <>
        Want the best loot? The chances of getting something super rare are extremely low. Automate everything, refine your processes, maximise your income.
      </>
    ),
  },
];

function Feature({ title, Icon, description }: FeatureItem) {
  return (
    <div className="w-full text-center p-6">
      <div className="w-32 h-32 mx-auto mb-4 flex items-center justify-center">
        <Icon className="w-full h-full" />
      </div>
      <Heading as="h3" className="text-xl font-semibold mb-2">{title}</Heading>
      <p>{description}</p>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className="features bg-[#2D3142] pt-10">
      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-8">
        {FeatureList.map((feature, idx) => (
          <Feature key={idx} {...feature} />
        ))}
      </div>
    </section>
  );
}
