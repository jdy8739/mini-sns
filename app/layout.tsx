import './globals.css';

import NavBar from '@/components/navbar';
import { getSession } from '@/utils/session';

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const userId = (await getSession()).id;

  return (
    <html lang="en">
      <body className="relative bg-gray-50">
        {userId && <NavBar />}
        <div className="flex flex-col min-h-screen justify-center items-center">
          {children}
        </div>
      </body>
    </html>
  );
}
