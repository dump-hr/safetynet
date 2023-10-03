import { Link } from 'react-router-dom';
import styles from './index.module.scss';
import { Page, routes } from '@/App';

const PrivacyPolicyPage = () => {
  return (
    <div className={styles.about}>
      <div className={styles.about__wrapper}>
        <h1 className={styles.about__header}>POLITIKA PRIVATNOSTI</h1>
        <div className={styles.about__container}>
          <div className={styles.about__content}>
            <div className={styles.content__logo}>SafetyNet</div>
            <div className={styles.about__text}>
              <p>
                Ova obavijest o privatnosti za SafetyNet opisuje kako i zašto
                možemo prikupljati, pohranjivati, koristiti i/ili dijeliti Vaše
                informacije kada koristite naše usluge, kao što su:
              </p>
              <ul>
                <li>
                  Preuzimanje i korištenje naše mobilne aplikacije (SafetyNet)
                </li>
              </ul>
              <p>
                Čitanjem ove obavijesti o privatnosti pomoći će vam razumjeti
                Vaša prava privatnosti i opcije. Ako se ne slažete s našim
                politikama i praksama, nemojte koristiti naše usluge. Ako imate
                bilo kakvih pitanja, kontaktirajte nas na adresi{' '}
                <a href="safetyn.2017@gmail.com">safetyn.2017@gmail.com</a>.
              </p>
              <b>KOJE INFORMACIJE PRIKUPLJAMO?</b>
              <p className={styles.underline}>
                Prikupljamo osobne informacije koje nam pružate.
              </p>
              <p>
                Osobne informacije koje prikupljamo mogu uključivati sljedeće:
              </p>
              <ul>
                <li>ime</li>
                <li>prezime</li>
                <li>škola</li>
                <li>datum rođenja</li>
              </ul>
              <p>Ne obrađujemo osjetljive informacije.</p>
              <p className={styles.underline}>
                Automatski prikupljene informacije
              </p>
              <p>
                Automatski prikupljamo određene informacije kada posjetite ili
                koristite naše usluge. Ove informacije ne otkrivaju Vaš
                specifičan identitet (poput Vašeg imena), ali mogu uključivati
                podatke o uređaju i korištenju. Ove informacije uglavnom su
                potrebne za naše interne analitičke i izvještajne svrhe.
              </p>
              <p>Informacije koje prikupljamo uključuju:</p>
              <ul>
                <li>Prijave i podatke o korištenju</li>
              </ul>
              <b>KAKO OBRAĐUJEMO VAŠE INFORMACIJE?</b>
              <p>
                Obrađujemo Vaše informacije kako bismo pružili i unaprijedili
                naše usluge, komunicirali s Vama, osigurali sigurnost,
                spriječili prijevare te se pridržavali zakona.
              </p>
              <p>
                Opća uredba o zaštiti podataka (GDPR) zahtijeva da objasnimo
                valjane pravne osnove na koje se oslanjamo kako bismo obradili
                Vaše osobne informacije. Stoga se možemo osloniti na sljedeće
                pravne osnove kako bismo obradili Vaše osobne informacije:
              </p>
              <ul>
                <li>
                  <span className={styles.underline}>Suglasnost.</span> Možemo
                  obraditi Vaše informacije ako ste nam dali dopuštenje
                  (suglasnost) za upotrebu Vaših osobnih informacija u određenu
                  svrhu. Suglasnost možete povući u bilo kojem trenutku.
                </li>
                <li>
                  <span className={styles.underline}>Izvršenje ugovora.</span>{' '}
                  Možemo obraditi Vaše osobne informacije kada vjerujemo da je
                  potrebno ispuniti naše obveze prema vama, uključujući pružanje
                  naših usluga.
                </li>
                <li>
                  <span className={styles.underline}>Vitalni interes.</span>{' '}
                  Možemo obraditi Vaše informacije ako vjerujemo da je potrebno
                  za zaštitu Vaših vitalnih interesa, poput situacija koje
                  uključuju potencijalne prijetnje sigurnosti bilo koje osobe.
                </li>
              </ul>
              <b>KADA I S KIM DIJELIMO VAŠE OSOBNE INFORMACIJE?</b>
              <p>
                Možemo dijeliti Vaše podatke s trećim stranama koje obavljaju
                usluge za nas. Kategorije trećih strana s kojima možemo dijeliti
                osobne informacije uključuju:
              </p>
              <ul>
                <li>Usluge analize podataka</li>
              </ul>
              <b>KOLIKO DUGO ČUVAMO VAŠE INFORMACIJE?</b>
              <p>
                Vaše osobne informacije čuvat ćemo onoliko dugo koliko je
                potrebno u svrhe navedene u ovoj obavijesti o privatnosti, osim
                ako zakon ne zahtijeva drukčije.
              </p>
              <p>
                Imate pravo zatražiti pristup osobnim informacijama koje
                prikupljamo od Vas, promijeniti te informacije ili ih izbrisati.
                Zahtjev za pregled, ažuriranje ili brisanje Vaših osobnih
                informacija možete poslati na:{' '}
                <a href="safetyn.2017@gmail.com">safetyn.2017@gmail.com</a>. Na
                Vaš zahtjev za zatvaranjem Vašeg računa, izbrisat ćemo Vaš račun
                i informacije iz naših aktivnih baza podataka.
              </p>
              <b>KAKO ČUVAMO VAŠE INFORMACIJE?</b>
              <p>
                Unatoč našim naporima da osiguramo informacije, nijedna
                elektronička transmisija preko Interneta ili tehnologija za
                pohranu informacija ne može se jamčiti da je 100% sigurna. Ne
                možemo obećati ili jamčiti da hakeri, cyber-kriminalci ili druge
                neovlaštene treće strane neće biti u mogućnosti nadvladati našu
                sigurnost i neovlašteno prikupiti, pristupiti, ukrasti ili
                izmijeniti Vaše informacije. Iako ćemo učiniti sve što je u
                našoj moći da zaštitimo Vaše osobne informacije, prijenos Vaših
                osobnih informacija na naše usluge odvija se na Vaš vlastiti
                rizik.
              </p>
              <p>
                Ako imate pitanja ili komentare, možete nam poslati e-poštu na
                adresu{' '}
                <a href="safetyn.2017@gmail.com">safetyn.2017@gmail.com</a>.
              </p>
            </div>
            <Link to={routes[Page.Home]} className={styles.about__return}>
              Povratak
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
