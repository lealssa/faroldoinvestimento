import { useSimulacoesStore } from '../stores/SimulacoesStore.js'
import { useIndicesStore } from '../stores/IndicesStore.js'

export const CalculadoraRendaFixa = {
    setup() {
        const simulacoesStore = useSimulacoesStore()   
        const indicesStore = useIndicesStore()

        return {
            simulacoesStore,
            indicesStore
        }
    },
    data() {

        const opcoesIndices = {
            pos: { label: "% da CDI/SELIC a.a", taxa: 90 },
            pre: { label: "Taxa a.a", taxa: 0 },
            poupanca: { label: "Poupança a.a", taxa: 0 },
            ipca: { label: "+ IPCA a.a", taxa: 5 }
        }

        const dadosEntrada = {
            montante: 0,
            prazo: 12,
            taxa: 0,
            IR: true
        }

        const tipoIndiceSelecionado = 'pre'

        if (!this.indicesStore.isLoading) {
            opcoesIndices.pre.taxa = this.indicesStore.oci.SELIC.valor
            opcoesIndices.poupanca.taxa = this.indicesStore.oci.Poupanca.valor
            dadosEntrada.taxa = this.indicesStore.oci.SELIC.valor
        }

        const resultadoRendimento = {
            montanteAplicado: 0,
            valorNoVencimento: 0,
            bruto: 0,
            liquido: 0,
            impostoDevido: 0,
            aliquotaIR: 0,
            prazoMes: 0,
            info: ''
        }        

        return {
            tipoIndiceSelecionado,
            dadosEntrada,
            opcoesIndices,
            resultadoRendimento
        }
    },
    watch: {
        'indicesStore.oci.SELIC'(value) {
            this.opcoesIndices.pre.taxa = value.valor
            this.dadosEntrada.taxa = value.valor
        },
        'indicesStore.oci.Poupanca'(value) { 
            this.opcoesIndices.poupanca.taxa = value.valor 
        },
        tipoIndiceSelecionado(value) {
            this.dadosEntrada.taxa = this.opcoesIndices[value].taxa
            if (value === 'poupanca')
                this.dadosEntrada.IR = false
            else
                this.dadosEntrada.IR = true
        },
        dadosEntrada: {
            handler() {
                this.calculaRendaFixa()
            },
            deep: true            
        }  
    },
    methods: {
        calculaRendaFixa() {

            let taxa = this.dadosEntrada.taxa
            let info = ''

            if (this.tipoIndiceSelecionado === 'pos') {
                taxa = (this.dadosEntrada.taxa * this.indicesStore.oci.SELIC.valor) / 100
                info = `${this.dadosEntrada.taxa}% da CDI/SELIC`
            }
            else if (this.tipoIndiceSelecionado === 'ipca') {
                taxa = this.dadosEntrada.taxa + this.indicesStore.oci.IPCA.valor
                info = `${this.dadosEntrada.taxa}% + IPCA`
            }
            else if (this.tipoIndiceSelecionado === 'poupanca') {
                info = `Poupança`                
            }
            else {
                info = `${this.dadosEntrada.taxa}%`
            }  
            
            const valorNoVencimento = this.calculaJurosCompostos(this.dadosEntrada.montante, this.dadosEntrada.prazo, taxa)
            const rendimentoBruto = valorNoVencimento - this.dadosEntrada.montante
            let rendimentoLiquido = 0
            let calculoIR = {
                impostoDevido: 0,
                aliquotaIR: 0
            }

            if (this.dadosEntrada.IR) {
                calculoIR = this.calculaIR(this.dadosEntrada.prazo, rendimentoBruto)
                rendimentoLiquido = rendimentoBruto - calculoIR.impostoDevido
            }
            else
                rendimentoLiquido = rendimentoBruto     

            this.resultadoRendimento = {
                montanteAplicado: this.dadosEntrada.montante,
                valorNoVencimento: parseFloat(valorNoVencimento.toFixed(2)),
                bruto: parseFloat(rendimentoBruto.toFixed(2)),
                liquido: parseFloat(rendimentoLiquido.toFixed(2)),
                impostoDevido: parseFloat(calculoIR.impostoDevido.toFixed(2)),
                aliquotaIR: calculoIR.aliquotaIR,
                prazoMes: this.dadosEntrada.prazo,
                info: info,
                taxaReal: taxa
            }               
        },
        salvarSimulacao() {

            if (this.resultadoRendimento.montanteAplicado <= 0)
                return

            const result = { ...this.resultadoRendimento }

            this.simulacoesStore.inserir(result)
        },        
        calculaJurosCompostos(montante, prazoMes, taxaAno) {
            const valorNoVencimento = montante * Math.pow(1 + taxaAno / 100 / 12, prazoMes)
            return valorNoVencimento
        },
        calculaJurosCompostosDiarios(montante, prazoMes, taxaAno) {
            const taxaDiaria = Math.pow(1 + taxaAno / 100, 1 / 252) - 1;
            const prazoDias = prazoMes * 30;
            const valorNoVencimento = montante * Math.pow(1 + taxaDiaria, prazoDias);
            return valorNoVencimento;
        },        
        calculaIR(prazoMes, rendimentoBruto) {
            let aliquotaIR

            if (prazoMes <= 6) {
                aliquotaIR = 0.225
            } else if (prazoMes > 6 && prazoMes <= 12) {
                aliquotaIR = 0.2
            } else if (prazoMes > 12 && prazoMes <= 24) {
                aliquotaIR = 0.175
            } else {
                aliquotaIR = 0.15
            }

            return {
                impostoDevido: rendimentoBruto * aliquotaIR,
                aliquotaIR: aliquotaIR
            }
        }        
    },
    template: `
    <div class="block">

        <!-- Aviso mobile virar horizontal -->
        <article class="message is-info is-hidden-tablet">
            <div class="message-body has-text-centered">
                <span class="icon">
                    <i class="fas fa-lightbulb"></i>
                </span>
                <span>Deixe seu celular na horizontal para acessar o simulador completo</span>        
            </div>
        </article>    

        <div class="card">

            <div class="card-header has-background-white-ter">
                <p class="card-header-title has-text-grey-dark">Simulação #{{ simulacoesStore.lista.length + 1 }}</p>
            </div>

            <div class="card-content">
                <!-- Campos -->
                <div class="columns is-centered is-multiline">
                    <!-- Montante -->
                    <div class="column is-2">
                        <div class="field">
                            <label class="label has-text-weight-light">Montante</label>
                            <div class="control">
                                <input class="input" type="text" placeholder="Montante" v-model.number="dadosEntrada.montante">
                            </div>
                        </div>
                    </div>
                    <!-- Prazo -->
                    <div class="column is-2">
                        <div class="field">
                            <label class="label has-text-weight-light">Prazo
                                a.m</label>
                            <div class="control">
                                <input class="input" type="text" placeholder="Prazo a.m"
                                    v-model.number="dadosEntrada.prazo">
                            </div>
                        </div>
                    </div>
                    <!-- Taxa -->
                    <div class="column is-2">
                        <div class="field">
                            <label class="label has-text-weight-light">{{ opcoesIndices[tipoIndiceSelecionado].label }}</label>
                            <div class="control has-icons-right">
                                <input class="input" type="text" placeholder="Taxa a.a"
                                    v-model.number="dadosEntrada.taxa">
                                <span class="icon is-small is-right">
                                    <i class="fas fa-percentage"></i>
                                </span>
                            </div>
                        </div>
                    </div>
                    <!-- Tipo -->
                    <div class="column is-2">
                        <div class="field">
                            <label class="label has-text-weight-light">Tipo</label>
                            <div class="control">
                                <div class="select is-fullwidth">
                                    <select v-model="tipoIndiceSelecionado">
                                        <option value="pre">Pré-fixado</option>
                                        <option value="pos">Pós-fixado</option>
                                        <option value="poupanca">Poupança</option>
                                        <option value="ipca">IPCA+</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- IR -->
                    <div class="column is-2">
                        <div class="field">
                            <label class="label has-text-weight-light">Isento
                                IR?</label>
                            <div class="control">
                                <label class="radio">
                                    <input type="radio" id="isento" name="ir" :value="false" v-model="dadosEntrada.IR">
                                    Sim
                                </label>
                                <label class="radio">
                                    <input type="radio" id="naoIsento" name="ir" :value="true"
                                        v-model="dadosEntrada.IR">
                                    Não
                                </label>
                            </div>
                        </div>
                    </div>

                </div>

                <!-- Resultado mobile -->
                <div class="tile is-ancestor has-text-centered">

                    <div class="tile is-parent">
                        <div class="tile is-child box">
                            <p class="subtitle is-size-6">Valor no vencimento</p>
                            <p class="title is-size-5">{{ resultadoRendimento.valorNoVencimento.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) }}</p>
                        </div>
                    </div>
                    <div class="tile is-parent">
                        <div class="tile is-child box">
                            <p class="subtitle is-size-6">Rendimento bruto</p>
                            <p class="title is-size-5">{{ resultadoRendimento.bruto.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) }}</p>
                        </div>
                    </div>
                    <div class="tile is-parent">
                        <div class="tile is-child box">
                            <p class="subtitle is-size-6">IR devido</p>
                            <p class="title is-size-5">{{ resultadoRendimento.impostoDevido.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) }}</p>
                        </div>
                    </div>
                    <div class="tile is-parent">
                        <div class="tile is-child box">
                            <p class="subtitle is-size-6">Rendimento líquido</p>
                            <p class="title is-size-5">{{ resultadoRendimento.liquido.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) }}</p>
                        </div>
                    </div>
                    <div class="tile is-parent">
                        <div class="tile is-child box">
                            <p class="subtitle is-size-6">Alíquota IR</p>
                            <p class="title is-size-5">{{ resultadoRendimento.aliquotaIR.toLocaleString('pt-BR', {
                                    style: 'percent',
                                    minimumFractionDigits: 1,
                                    maximumFractionDigits: 1,
                                }) }}
                            </p>

                        </div>
                    </div>

                </div>

                <p class="block is-size-7">* Valores aproximados e apenas para simulação. Não é uma indicação de aplicação.</p>

                <!-- Botão adicionar -->
                <button class="button is-rounded is-warning is-light is-outlined is-hidden-mobile"
                    @click="salvarSimulacao()">
                    <span class="icon">
                        <i class="fas fa-plus" aria-hidden="true"></i>
                    </span>
                    <span>
                        Comparar
                    </span>                                
                </button>
            </div>
        </div>
    </div>
    `    
}