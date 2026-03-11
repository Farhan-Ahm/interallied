import './globals.css';

export const metadata = {
  title: 'Interallied — Transformers, Switchgear & Switchboards',
  description:
    'Interallied supplies premium power transformers, distribution transformers, LV switchboards, MV switchgear, control panels and busbar trunking solutions.',
  keywords: 'transformers, switchgear, switchboards, power, electrical, interallied',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link
          href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;600;700;800&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.css"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
