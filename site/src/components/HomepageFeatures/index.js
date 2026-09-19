import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'Qué es Vetify',
    icon: '🐾',
    to: '/que-es-vetify',
    description: 'El producto, qué incluye y los 4 caminos por los que alguien termina siendo cliente.',
  },
  {
    title: 'Tipos de clientes',
    icon: '🧭',
    to: '/tipos-de-clientes',
    description: 'B2C, OSDE Adquirente, OSDE Capitado, Flux Capitado — qué cambia entre uno y otro.',
  },
  {
    title: 'Los planes',
    icon: '📋',
    to: '/los-planes',
    description: 'De Emergencias a Premium: qué suma cada nivel, explicado sin vueltas.',
  },
  {
    title: 'Reintegros y Nexus',
    icon: '💳',
    to: '/reintegros',
    description: 'Cómo se pide un reintegro, quién lo revisa, y qué resolvió Nexus por dentro.',
  },
];

function Feature({title, icon, to, description}) {
  return (
    <div className="col col--6 margin-bottom--lg">
      <Link to={to} className={styles.featureCard}>
        <span className={styles.featureIcon}>{icon}</span>
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </Link>
    </div>
  );
}

export default function HomepageFeatures() {
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
