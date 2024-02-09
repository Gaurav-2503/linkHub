import {Roboto_Slab } from 'next/font/google'
import '../../globals.css'

const roboto = Roboto_Slab({ subsets: ["latin"], weight: [ '100' , '200', "300", '400' , "700"] });

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <main>
          <div className="">{children}</div>
        </main>
      </body>
    </html>
  );
}

