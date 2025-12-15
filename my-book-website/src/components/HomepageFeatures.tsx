import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import styles from './HomepageFeatures.module.css';

type FeatureItem = {
  title: string;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: '5 Chapters, 10 Topics',
    description: (
      <>
        Comprehensive coverage of AI-Native development practices with 5 detailed chapters, each containing 2 focused topics.
      </>
    ),
  },
  {
    title: 'Premium Experience',
    description: (
      <>
        Enjoy a premium reading experience with glassmorphism design, smooth navigation, and progress tracking.
      </>
    ),
  },
  {
    title: 'Modern Tech Stack',
    description: (
      <>
        Built with Docusaurus, React, TypeScript, Tailwind CSS, and MDX for the best developer and reader experience.
      </>
    ),
  },
];

function Feature({title, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}