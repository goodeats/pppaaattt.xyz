import { DataFunctionArgs, json } from '@remix-run/node';
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from '@remix-run/react';
import { csrf } from './modules/csrf.server';
import { AuthenticityTokenProvider } from 'remix-utils/csrf/react';
import { ChakraProvider } from '~/components';
import { theme } from './lib/styles/theme';
import { combineHeaders } from './utils/misc';

export async function loader({ request }: DataFunctionArgs) {
  const [csrfToken, csrfCookieHeader] = await csrf.commitToken();

  return json(
    { csrfToken },
    {
      headers: combineHeaders(
        csrfCookieHeader ? { 'Set-Cookie': csrfCookieHeader } : {}
      ),
    }
  );
}

export default function App() {
  const data = useLoaderData<typeof loader>();

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
        <link rel="icon" href="/favicons/favicon.svg" type="image/svg+xml" />
      </head>
      <body>
        <AuthenticityTokenProvider token={data.csrfToken}>
          <ChakraProvider resetCSS theme={theme}>
            <Outlet />
          </ChakraProvider>
        </AuthenticityTokenProvider>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
