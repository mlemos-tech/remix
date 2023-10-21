import { type LinksFunction } from "@remix-run/node";
import appStylesHref from "./app.css";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: appStylesHref },
];

import {
  Links,
  LiveReload,
  Meta,
  Scripts,
  Outlet,
  ScrollRestoration
} from "@remix-run/react";

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
        <title>Dload cadastro de usuários</title>
      </head>
      <body>

        <main id="main">
          <Outlet />
        </main>

        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
