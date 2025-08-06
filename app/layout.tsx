export const metadata = {
  title: 'Dienstplan WebApp',
  description: 'Verwaltung leicht gemacht',
};

export default function RootLayout({ children }) {
  return (
    <html lang="de">
      <head />
      <body>{children}</body>
    </html>
  );
}
