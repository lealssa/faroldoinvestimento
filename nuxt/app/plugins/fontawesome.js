import { library, config } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faBrazilianRealSign, faCalculator, faCalendar, faChartLine, faChevronUp, faEye, faEyeSlash, faFileLines, faGraduationCap, faHome, faLightbulb, faLink, faPercent, faPlus, faTrashCan, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons'
import { faInstagram } from '@fortawesome/free-brands-svg-icons'

// This is important, we are going to let Nuxt worry about the CSS
config.autoAddCss = false

// You can add your icons directly in this plugin. See other examples for how you
// can add other styles or just individual icons.
library.add(faLightbulb,faHome, faInstagram, faEye, faEyeSlash, faGraduationCap, faCalculator, faPlus, faBrazilianRealSign, faPercent, faCalendar, faFileLines, faChevronUp, faLink, faChartLine, faTriangleExclamation, faTrashCan)

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.component('font-awesome-icon', FontAwesomeIcon)
})