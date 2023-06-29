const { createApp } = Vue

import { LoginUsuario } from '../components/LoginUsuarioComponent.js'

createApp({
    components: {
        LoginUsuario
    }
})
.mount("#app")    