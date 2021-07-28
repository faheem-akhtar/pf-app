import '../src/styles/common/variables.scss';
import '../src/styles/common/keyframes.scss';
import '../src/styles/common/storybook.scss';
import '../src/styles/common/html.scss';
import '../src/styles/common/language.scss';

const customViewports = {
  mobile: {
    name: 'Mobile',
    styles: {
      width: '375px',
      height: '812px',
    },
  },
  tablet: {
    name: 'Tablet',
    styles: {
      width: '768px',
      height: '1024px',
    },
  },
};

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  viewport: { viewports: customViewports },
};

export const globalTypes = {
  locale: {
    name: 'Locale',
    description: 'Internationalization locale',
    defaultValue: 'en',
    toolbar: {
      icon: 'globe',
      items: [
        { value: 'en', right: '🇺🇸', title: 'English' },
        { value: 'ar', right: '🇦🇪', title: 'عربي' },
      ],
    },
  },
};
