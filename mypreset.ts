import { definePreset } from '@primeng/themes';
import Aura from '@primeng/themes/aura';
import { Preset } from '@primeng/themes/types';

const MyPreset: Preset = definePreset(Aura, {
  components: {
    avatar: {
      width: '28px',
      height: '28px',
      fontSize: '14px',
    },
    button: {
      borderRadius: '8px',
      padding: {
        x: '15px',
        y: '7.5px',
      },
      sm: {
        font: {
          size: '14px',
        },
        padding: {
          y: '5.5px',
        },
      },
      secondary: {
        background: 'white !important',
      },
    },
    inputtext: {
      borderRadius: '8px',
    },
    paginator: {
      gap: '8px',
      padding: '0px',
      nav: {
        button: {
          background: 'var(--color-background-2)',
          color: 'var(--text-content-8)',
          borderRadius: '8px',
          width: '36px',
          height: '36px',
          selected: {
            background: 'var(--color-brand-500)',
            color: 'white',
          },
        },
      },
    },
  },
});

export default MyPreset;
