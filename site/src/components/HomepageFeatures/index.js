import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'Conocimiento del producto',
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        Módulos, reglas de negocio, arquitectura e impedimentos activos de Vetify —
        actualizado a la par de <code>vetify-automation</code>.
      </>
    ),
  },
  {
    title: 'Quién es quién',
    Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <>
        Organigrama del squad y referentes de cada equipo, para saber a quién
        preguntar antes de escalar algo.
      </>
    ),
  },
  {
    title: 'Arquitectura real',
    Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
        Contrato HTTP, catálogo de errores y variables de entorno de los 19 repos
        reales del squad, de primera mano.
      </>
    ),
  },
];

function Feature({Svg, title, description}) {
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
