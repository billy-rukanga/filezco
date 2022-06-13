import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>filezco | share files</title>
        <meta name="description" content="Share files" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header>
        <p>LOGO</p>
        <div className="flex">
          <a>Upload</a>
          <a>Board</a>
          <a>Features</a>
        </div>
        <div className="flex">
          <p>Sign up</p>
          <button>Get Started</button>
        </div>
      </header>

      <main className={styles.main} />

      <footer className={styles.footer}>
        Powered by{" "}
        <span className={styles.logo}>
          <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
        </span>
      </footer>
    </div>
  );
}
