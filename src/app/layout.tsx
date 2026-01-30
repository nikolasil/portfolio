import Navbar from '@/components/navbar/NavBar';
import StarDotsBackground from '@/components/StarDotsBackground';
import WallPopup from '@/components/WallPopup';
import { ThemeRegistry } from '@/lib/ThemeProvider';
import { Fira_Code } from 'next/font/google';
import HiringModal from '@/components/HiringModal';

const firaCode = Fira_Code({
  subsets: ['latin'],
  weight: ['500'],
  variable: '--font-fira-code',
});

export const metadata = {
  title: 'Iliopoulos Nikolas - Resume',
  description: 'A modern resume built with Next.js 15 and MUI',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={firaCode.variable}>
      <body>
        <ThemeRegistry>
          <Navbar />
          <StarDotsBackground />
          <HiringModal />
          {children}
          <WallPopup />
        </ThemeRegistry>
      </body>
    </html>
  );
}
