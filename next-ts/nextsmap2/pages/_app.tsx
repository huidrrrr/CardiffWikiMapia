import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../components/pageLayout/pageLayout";
function MyApp({ Component, pageProps }: AppProps) {
  if (pageProps) {
    const { userType } = pageProps;
    if (userType === "user") {
      return (
        <Layout>
          <Component {...pageProps} />
        </Layout>
      );
    }
  }

  return <Component {...pageProps} />;
}

export default MyApp;
