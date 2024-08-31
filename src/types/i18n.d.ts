// src/i18n.d.ts
import 'vue-i18n';

declare module 'vue-i18n' {
  // Extiende los tipos de vue-i18n
  export interface VueI18n {
    locale: string;
  }
}

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $i18n: VueI18n;
  }
}
