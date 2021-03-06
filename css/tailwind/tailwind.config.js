module.exports = {
  purge: {
    mode: 'all',
    content: [
      './purge/samples/*.html',
      './purge/**/*.html'
      ],
    options: {
      keyframes: true,
    },
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      'sans': '"LatoLatinWeb", IRANYekan, ui-sans-serif, system-ui, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif',
      'siftal': 'siftal',
      'mono': ['ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace'],
      'IRANSansX': 'IRANSansX',
      'IRANYekan': 'IRANYekan',
      'LatoLatinWeb': 'LatoLatinWeb',
      'Vazir': 'Vazir',
      'tahoma': 'tahoma',
      'GanjNamehSans': 'GanjNamehSans',
      'NikaWeb': 'NikaWeb',
      'BehdadWeb': 'BehdadWeb',
      'WebNastaliq': 'WebNastaliq',
      'Lalezar': 'Lalezar',
    },
    fontSize: {
      'reset': ['16px',    '24px'],
      '2xs':   ['.625em',  '0.875em'],
      'xs':    ['.75em',   '1em'],
      'sm':    ['.875em',  '1.25em'],
      'md':    ['.9375em', '1.4em'],
      'base':  ['1em',     '1.5em'],
      'lg':    ['1.125em', '1.75em'],
      'xl':    ['1.25em',  '1.75em'],
      '2xl':   ['1.5em',   '2em'],
      '3xl':   ['1.875em', '2.25em'],
      '4xl':   ['2.25em',  '2.5em'],
      '5xl':   ['3em',     '1'],
      '6xl':   ['3.75em',  '1'],
      '7xl':   ['4.5em',   '1'],
      '8xl':   ['6em',     '1'],
      '9xl':   ['8em',     '1'],
    },
    extend: {
      lineHeight: {
        '3': '.75em',
        '4': '1em',
        '5': '1.25em',
        '6': '1.5em',
        '7': '1.75em',
        '8': '2em',
        '9': '2.25em',
        '10': '2.5em',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('tailwindcss-rtl'),
    require('@tailwindcss/aspect-ratio'),
  ],
}
