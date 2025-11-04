import { useSimulacoesStore } from '../stores/SimulacoesStore.js'

export const TabelaSimulacoes = {
    setup() {
        const simulacoesStore = useSimulacoesStore()
        return {
            simulacoesStore
        }
    },
    data() {
        return {
            isShowTotal: false
        }
    },
    methods: {
        salvarSimulacoes() {
            if (!this.simulacoesStore.hasSimulation) return

            const csv = this.simulacoesStore.gerarCSV()

            const link = this.$refs.linkCSV
            link.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv)
            link.target = '_blank'
            link.download = 'simulacoes.csv'
            link.click()
        }
    },
    template: `
    <div class="block is-hidden-mobile has-background-white">
        <table class="table is-fullwidth is-hoverable">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Valor aplicado</th>
                    <th>Taxa a.a</th>
                    <th>Prazo a.m</th>
                    <th>Valor no venc.</th>
                    <th>Rend. bruto</th>
                    <th>IR</th>
                    <th>Rend. líquido</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>

                <tr v-if="!simulacoesStore.hasSimulation">
                    <td colspan="10">
                        <p class="subtitle has-text-centered is-size-6">Preencha os dados e clique em "Comparar"</p>
                    </td>
                </tr>

                <tr v-for="(simulacao, index) in simulacoesStore.lista" :key="index">
                    <td class="is-vcentered">
                        <span>{{ index + 1 }}</span>
                    </td>
                    <td class="is-vcentered">{{ simulacao.montanteAplicado.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) }}</td>
                    <td class="is-vcentered">
                        {{ simulacao.info }}               
                        <span class="tag is-info is-light is-rounded">{{ (simulacao.taxaReal / 100).toLocaleString('pt-BR', {
                            style: 'percent',
                            minimumFractionDigits: 1,
                            maximumFractionDigits: 2,
                        }) }}</span>                        
                    </td>
                    <td class="is-vcentered">{{ simulacao.prazoMes }}</td>
                    <td class="is-vcentered">
                        <span class="">{{ simulacao.valorNoVencimento.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) }}</span>
                        <span class="tag is-danger is-light is-rounded mx-1" v-if="simulacao.inflacaoPeriodo > 0">Inflação {{ (simulacao.inflacaoPeriodo * -1).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) }}</span>                        
                    </td>
                    <td class="is-vcentered">{{ simulacao.bruto.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) }}</td>
                    <td class="has-text-danger is-vcentered">
                        {{ (simulacao.impostoDevido * -1).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) }}
                        <span class="tag is-danger is-light is-rounded" v-if="simulacao.aliquotaIR > 0">{{ simulacao.aliquotaIR.toLocaleString('pt-BR', {
                            style: 'percent',
                            minimumFractionDigits: 1,
                            maximumFractionDigits: 1,
                        }) }}</span>
                        <span class="tag is-success is-light is-rounded" v-if="simulacao.aliquotaIR === 0">Isento</span>
                    </td>
                    <td class="has-text-weight-semibold is-vcentered">{{ simulacao.liquido.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) }}</td>
                    <td class="is-vcentered">
                        <a class="link py-4 has-text-grey-dark"
                            @click="simulacoesStore.remover(index)">
                            <span class="icon">
                                <i class="fas fa-trash-can" aria-hidden="true"></i>
                            </span>
                        </a>
                    </td>
                </tr>
            </tbody>
            <tfoot v-if="isShowTotal && simulacoesStore.count > 1">
                <tr>
                    <th>Total</th>
                    <th>{{ simulacoesStore.totalMontanteAplicado.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) }}</th>
                    <th></th>
                    <th></th>
                    <th>{{ simulacoesStore.totalValorNoVencimento.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) }}</th>
                    <th>{{ simulacoesStore.totalBruto.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) }}</th>
                    <th class="has-text-danger">{{ (simulacoesStore.totalImpostoDevido * -1).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) }}</th>
                    <th>{{ simulacoesStore.totalLiquido.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) }}</th>
                    <th></th>
                    <th></th>
                </tr>
            </tfoot>
        </table>
        <div class="buttons is-right" v-if="simulacoesStore.count > 1">
            <!-- Botão salvar simulação
            <a ref="linkCSV"></a>
            <button class="button is-small is-light" @click="salvarSimulacoes()">
                <span class="icon">
                    <i class="fa-solid fa-file-arrow-down"></i>
                </span>
                <span>
                    Salvar simulação
                </span>
            </button>  
            -->      
            <button class="button is-small is-light is-rounded" @click="isShowTotal = ! isShowTotal">
                <span class="icon">
                    <i class="fa-regular" :class="isShowTotal ? 'fa-eye-slash' : 'fa-eye'"></i>
                </span>
                <span>
                    {{ isShowTotal ? 'Ocultar total' : 'Mostrar total' }}
                </span>
            </button>
            <button class="button is-small is-danger is-light is-rounded" @click="simulacoesStore.limpar()">
                <span class="icon">
                    <i class="fas fa-trash-can" aria-hidden="true"></i>
                </span>
                <span>
                    Limpar todos
                </span>
            </button>
        </div>
    </div>    
    `
}