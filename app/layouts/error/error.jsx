import { Button } from '~/components/button';
import { Heading } from '~/components/heading';
import { Text } from '~/components/text';
import styles from './error.module.css';

export function Error({ error }) {
  const status = error?.status || 500;
  const summary =
    status === 404
      ? 'Not found'
      : status === 405
      ? 'Method not allowed'
      : 'Something went wrong';
  const message = error?.statusText || error?.data || error?.message || String(error);

  return (
    <section className={styles.page}>
      <div className={styles.details}>
        <div className={styles.text}>
          <Heading className={styles.title} level={0} weight="bold">
            {status}
          </Heading>
          <Heading aria-hidden className={styles.subheading} as="h2" level={4}>
            {summary}
          </Heading>
          <Text className={styles.description} as="p">
            {message}
          </Text>
          <Button secondary iconHoverShift className={styles.button} href="/" icon="chevron-right">
            Back to homepage
          </Button>
        </div>
      </div>
    </section>
  );
}
