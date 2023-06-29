const { createApp } = Vue

import { ListaIndices } from '../components/ListaIndicesComponent.js'
import { TabelaSimulacoes } from '../components/TabelaSimulacoesComponent.js'
import { CalculadoraRendaFixa } from '../components/CalculadoraRendaFixaComponent.js'

import { useIndicesStore } from '../stores/IndicesStore.js'

const pinia = Pinia.createPinia()

createApp({    
    setup() {
        const indicesStore = useIndicesStore()
        indicesStore.fetchIndicesOCI()

        return {
            indicesStore
        }
    },
    components: {
        ListaIndices,
        TabelaSimulacoes,
        CalculadoraRendaFixa
    }
})
.use(pinia)
.mount("#app")    