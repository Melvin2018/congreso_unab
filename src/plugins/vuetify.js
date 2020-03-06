import Vue from 'vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import colors from 'vuetify/lib/util/colors';
import es from 'vuetify/es5/locale/es';

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        options: {
            customProperties: true,
        },
        themes: {
            light: {
                primary: colors.blue.darken1,
                secondary: colors.pink.darken1,
                tertiary: colors.lightGreen.accent2,
                titulo: colors.blueGrey.base,
                footer: colors.lightBlue.accent1,
                app: colors.blueGrey.lighten2,
                accent: '#82B1FF',
                error: '#FF5252',
                info: '#2196F3',
                success: '#4CAF50',
                warning: '#FFC107'
            },
        },
    },
    lang: {
        locales: { es },
        current: 'es',
    },
});