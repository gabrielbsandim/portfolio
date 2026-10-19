import { Portfolio } from '@/components/portfolio';
import { PERSON_JSON_LD } from '@/content/site';

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(PERSON_JSON_LD) }} />
      <Portfolio />
    </>
  );
}
