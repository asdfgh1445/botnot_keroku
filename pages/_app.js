import Head from "next/head";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import { AppProvider, Layout, Frame } from "@shopify/polaris";
import { Provider, useAppBridge } from "@shopify/app-bridge-react";
import { authenticatedFetch } from "@shopify/app-bridge-utils";
import { Redirect } from "@shopify/app-bridge/actions";
import "@shopify/polaris/dist/styles.css";
import "../assets/Styles.scss";
import translations from "@shopify/polaris/locales/en.json";
import axios from "axios";
import { getSessionToken } from "@shopify/app-bridge-utils";
import { usePostHog } from "next-use-posthog";
import { LiveChatLoaderProvider } from "react-live-chat-loader";

import Header from "../components/Header";
import Menu from "../components/Menu";

function userLoggedInFetch(app) {
  const fetchFunction = authenticatedFetch(app);

  return async (uri, options) => {
    const response = await fetchFunction(uri, options);

    if (
      response.headers.get("X-Shopify-API-Request-Failure-Reauthorize") === "1"
    ) {
      const authUrlHeader = response.headers.get(
        "X-Shopify-API-Request-Failure-Reauthorize-Url"
      );

      const redirect = Redirect.create(app);
      redirect.dispatch(Redirect.Action.APP, authUrlHeader || `/auth`);
      return null;
    }

    return response;
  };
}

function MyProvider(props) {
  const app = useAppBridge();

  const client = new ApolloClient({
    fetch: userLoggedInFetch(app),
    fetchOptions: {
      credentials: "include",
    },
  });

  const authAxios = axios.create();
  authAxios.interceptors.request.use(function (config) {
    return getSessionToken(app).then((token) => {
      config.headers["Authorization"] = `Bearer ${token}`;

      return config;
    });
  });

  const Component = props.Component;

  return (
    <ApolloProvider client={client}>
      <Component {...props} authAxios={authAxios} />
    </ApolloProvider>
  );
}
function MyApp({ Component, pageProps, host }) {
  const router = useRouter();
  usePostHog(POSTHOG_KEY, {
    api_host: POSTHOG_URL,
    loaded: (posthog) => {
      posthog.identify("Andrei-san");
    },
  });
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter&display=swap"
          rel="stylesheet"
        ></link>
        <link
          href="https://fonts.googleapis.com/css2?family=Work+Sans&display=swap"
          rel="stylesheet"
        ></link>
      </Head>
      <LiveChatLoaderProvider providerKey={BEACON_KEY} provider="helpScout">
        <AppProvider i18n={translations}>
          <Provider
            config={{
              apiKey: API_KEY,
              host: host,
              forceRedirect: true,
            }}
          >
            <Frame>
              <div className="home-page">
                <div className="inner">
                  <Header />
                  <div className="content container">
                    <Layout>
                      <nav className="navigation">
                        <Layout.Section secondary>
                          <Menu />
                        </Layout.Section>
                      </nav>
                      <Layout.Section>
                        <MyProvider Component={Component} {...pageProps} />
                      </Layout.Section>
                    </Layout>
                  </div>
                </div>
              </div>
            </Frame>
          </Provider>
        </AppProvider>
      </LiveChatLoaderProvider>
    </>
  );
}

MyApp.getInitialProps = async ({ ctx }) => {
  return {
    host: ctx.query.host,
  };
};

export default MyApp;
