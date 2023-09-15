import localFont from 'next/font/local';

const rowan = localFont({
  src: [
    {
      path: '../assets/fonts/Rowan/Rowan-Variable.woff2',
      style: 'normal',
    },
    {
      path: '../assets/fonts/Rowan/Rowan-VariableItalic.woff2',
      style: 'italic',
    },
  ],
  variable: '--font-serif',
  adjustFontFallback: 'Arial',
});

const jakartaSans = localFont({
  src: [
    {
      path: '../assets/fonts/PlusJakartaSans/PlusJakartaSans[wght].ttf',
      style: 'normal',
    },
    {
      path: '../assets/fonts/PlusJakartaSans/PlusJakartaSans-Italic[wght].ttf',
      style: 'italic',
    },
  ],
  variable: '--font-sans',
  adjustFontFallback: 'Times New Roman',
});

export { rowan, jakartaSans };
