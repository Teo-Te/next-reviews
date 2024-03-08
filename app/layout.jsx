import NavBar from '@/components/NavBar';
import "./global.css";
import { blckops, exo2 } from './fonts';

export const metadata = {
    title: { 
        default: "Next Reviews",
        template: "%s | Next Reviews",
    },
};

export default function RootLayout ({ children }) {
    return (
        <html lang="en" className={`${blckops.variable} ${exo2.variable}`}> 
            <body className="bg-orange-50 flex flex-col px-4 py-2 min-h-screen">
                <header>
                    <NavBar />
                </header>
                <main className="grow py-3">
                    {children}
                </main>
                <footer className="border-t py-3 text-center text-xs text-slate-500">
                    Game data taken from <a href="https://rawg.io/" target='_blank' className="text-orange-800 hover:underline">RAWG</a>
                </footer>
            </body>
        </html>
    );
}