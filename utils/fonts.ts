import {Inter, Roboto_Mono, Source_Code_Pro, Fira_Code, Roboto ,Open_Sans, Lato, Nunito  } from 'next/font/google'


export const inter = Inter({ subsets: ['latin'] })

export const robotoMono = Roboto_Mono({
    weight: ['400', '500', '700'],
    subsets: ['latin', 'latin-ext'],
});

export const sourceCodePro = Source_Code_Pro({
    weight: ['400', '500', '600', '700'],
    subsets: ['latin', 'latin-ext'],
});

export const firaCode = Fira_Code({
    weight: ['400', '500', '600', '700'], 
    subsets: ['latin', 'latin-ext'], 
});

export const roboto = Roboto({
    weight: ['400', '500', '700'],
    subsets: ['latin', 'latin-ext'],
});

export const openSans = Open_Sans({
    weight: ['400', '500', '700'],
    subsets: ['latin', 'latin-ext'],
});

export const lato = Lato({
    weight: ['400', '700'],
    subsets: ['latin', 'latin-ext'],
});

export const nunito = Nunito({
    weight: ['400', '500', '700'],
    subsets: ['latin', 'latin-ext'],
});