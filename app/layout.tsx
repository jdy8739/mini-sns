import NavBar from '@/components/navbar';
import './globals.css';
import { getSession } from '@/utils/session';

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const userId = (await getSession()).id;

  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen justify-center items-center">
        {userId && <NavBar />}
        {children}
      </body>
    </html>
  );
}
