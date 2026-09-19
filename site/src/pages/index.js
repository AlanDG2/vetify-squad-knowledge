import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';

import Heading from '@theme/Heading';
import styles from './index.module.css';

function HomepageHeader() {
  return (
    <header className={clsx('hero', styles.heroBanner)}>
      <div className={clsx('container', styles.heroContent)}>
        <span className={styles.eyebrow}>Squad Vetify</span>
        <Heading as="h1" className={styles.title}>
          Todo lo que el equipo necesita saber sobre Vetify
        </Heading>
        <p className={styles.subtitle}>
          Qué es el producto, cómo es el negocio, quiénes son nuestros clientes y quién es quién
          en el equipo — en un solo lugar, en criollo.
        </p>
        <div className={styles.buttons}>
          <Link className="button button--primary button--lg" to="/que-es-vetify">
            Empezar por "Qué es Vetify"
          </Link>
          <Link className="button button--secondary button--lg" to="/organigrama">
            Ver el equipo
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home() {
  return (
    <Layout
      title="Vetify"
      description="Guía del squad Vetify: qué es el producto, cómo funciona el negocio y quién es quién en el equipo.">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
