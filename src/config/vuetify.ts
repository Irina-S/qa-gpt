import { createVuetify } from 'vuetify';
import {
  VAvatar,
  VCard,
  VBtn,
  VChip,
  VList,
  VListItem,
  VListItemTitle,
  VListItemSubtitle,
  VIcon,
  VFileInput,
  VField,
  VTextField,
  VTextarea,
  VSnackbar,
  VProgressCircular,
  VSkeletonLoader,
  VSwitch
} from 'vuetify/components';

const vuetify = createVuetify({
  components: {
    VAvatar,
    VCard,
    VBtn,
    VChip,
    VList,
    VListItem,
    VListItemTitle,
    VListItemSubtitle,
    VProgressCircular,
    VIcon,
    VFileInput,
    VField,
    VTextField,
    VTextarea,
    VSnackbar,
    VSkeletonLoader,
    VSwitch
  },
  icons: {
    defaultSet: 'mdi'
  },
  theme: {
    themes: {
      light: {
        dark: false,
        colors: {
          primary: '#9351FF',
          secondary: '#9351FF26'
        }
      }
    }
  }
});

export { vuetify };
