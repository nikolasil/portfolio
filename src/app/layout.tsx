import Navbar from '@/components/navbar/NavBar';
import { ThemeRegistry } from '@/lib/ThemeProvider';

export const metadata = {
  title: 'My Resume',
  description: 'A modern resume built with Next.js 15 and MUI',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Fira+Code&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <ThemeRegistry>
          <Navbar />
          {children}
        </ThemeRegistry>
      </body>
    </html>
  );
}
