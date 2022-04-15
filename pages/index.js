import { useRouter } from 'next/router';
import Link from 'next/link';
import { Typography } from '@mui/material';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common']))
  }
});

export default function Home() {
  const router = useRouter();
  const { t } = useTranslation('common');

  return (
    <>
      <Typography>{t('hello')}</Typography>

      {router.locales?.map((locale) => (
        <div key={locale}>
          <Link href={router.asPath} locale={locale}>
            {locale}
          </Link>
        </div>
      ))}
    </>
  );
}
