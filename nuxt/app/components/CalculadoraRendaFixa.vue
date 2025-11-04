<script setup>
const simulacoesStore = useSimulacoesStore();
const indicesStore = useIndicesStore();

const opcoesIndices = reactive({
    pos: { label: "% da CDI/SELIC a.a", taxa: 90 },
    pre: { label: "Taxa a.a", taxa: 0 },
    poupanca: { label: "Poupança a.a", taxa: 0 },
    ipca: { label: "+ IPCA a.a", taxa: 5 },
    selic: { label: "+ SELIC a.a", taxa: 0.15 }
});

const dadosEntrada = reactive({
    montante: 0,
    prazo: 12,
    taxa: 0,
    IR: true,
    calcularInflacao: false
});

const tipoIndiceSelecionado = ref('pre');

const resultadoRendimento = reactive({
    montanteAplicado: 0,
    valorNoVencimento: 0,
    bruto: 0,
    liquido: 0,
    impostoDevido: 0,
    aliquotaIR: 0,
    prazoMes: 0,
    info: '',
    taxaReal: 0,
    inflacaoPeriodo: 0,
    divididoNoPrazo: 0
});

const tooltips = reactive({
    montante: false,
    prazo: false,
    taxa: false,
    tipo: false,
    ir: false,
    inflacao: false
});

const showTooltip = (field) => {
    tooltips[field] = true;
};

const hideTooltip = (field) => {
    tooltips[field] = false;
};

const calculaJurosCompostos = (montante, prazoMes, taxaAno) => {
    const taxaAnualDecimal = taxaAno / 100;
    const taxaMensal = Math.pow(1 + taxaAnualDecimal, 1/12) - 1;
    const valorNoVencimento = montante * Math.pow(1 + taxaMensal, prazoMes);    
    return valorNoVencimento;
};

const calculaIR = (prazoMes, rendimentoBruto) => {
    let aliquotaIR;

    if (prazoMes <= 6) {
        aliquotaIR = 0.225;
    } else if (prazoMes > 6 && prazoMes <= 12) {
        aliquotaIR = 0.2;
    } else if (prazoMes > 12 && prazoMes <= 24) {
        aliquotaIR = 0.175;
    } else {
        aliquotaIR = 0.15;
    }

    return {
        impostoDevido: rendimentoBruto * aliquotaIR,
        aliquotaIR: aliquotaIR
    };
};

const calculaRendaFixa = () => {
    let taxa = dadosEntrada.taxa;
    let info = 'Pré-fixado';
    let inflacaoPeriodo = 0;

    if (tipoIndiceSelecionado.value === 'pos' && indicesStore.oci.SELIC?.valor) {
        taxa = (dadosEntrada.taxa * indicesStore.oci.SELIC.valor) / 100;
        info = `${dadosEntrada.taxa}% da CDI/SELIC`;
    }
    else if (tipoIndiceSelecionado.value === 'ipca' && indicesStore.oci.IPCA?.valor) {
        taxa = dadosEntrada.taxa + indicesStore.oci.IPCA.valor;
        info = `${dadosEntrada.taxa}% + IPCA`;
    }
    else if (tipoIndiceSelecionado.value === 'selic' && indicesStore.oci.SELIC?.valor) {
        taxa = dadosEntrada.taxa + indicesStore.oci.SELIC.valor;
        info = `${dadosEntrada.taxa}% + SELIC`;
    }
    else if (tipoIndiceSelecionado.value === 'poupanca') {
        info = `Poupança`;
    }

    let taxaReal = taxa;
    
    if (dadosEntrada.calcularInflacao && indicesStore.oci.IPCA?.valor) {
        // Calcula taxa real descontando inflação: (1 + taxa) / (1 + inflação) - 1
        taxaReal = ((1 + taxa/100) / (1 + indicesStore.oci.IPCA.valor/100) - 1) * 100;
        inflacaoPeriodo = calculaJurosCompostos(dadosEntrada.montante, dadosEntrada.prazo, indicesStore.oci.IPCA.valor) - dadosEntrada.montante;
    }
    
    let valorNoVencimento = calculaJurosCompostos(dadosEntrada.montante, dadosEntrada.prazo, taxaReal);

    const rendimentoBruto = valorNoVencimento - dadosEntrada.montante;
    let rendimentoLiquido = 0;
    let calculoIR = {
        impostoDevido: 0,
        aliquotaIR: 0
    };

    if (dadosEntrada.IR) {
        calculoIR = calculaIR(dadosEntrada.prazo, rendimentoBruto);
        rendimentoLiquido = rendimentoBruto - calculoIR.impostoDevido;
    }
    else {
        rendimentoLiquido = rendimentoBruto;
    }

    let dividido = 0;
    if (rendimentoLiquido > 0 && dadosEntrada.prazo > 0)
        dividido = rendimentoLiquido / dadosEntrada.prazo;

    resultadoRendimento.montanteAplicado = dadosEntrada.montante;
    resultadoRendimento.valorNoVencimento = parseFloat(valorNoVencimento.toFixed(2));
    resultadoRendimento.bruto = parseFloat(rendimentoBruto.toFixed(2));
    resultadoRendimento.liquido = parseFloat(rendimentoLiquido.toFixed(2));
    resultadoRendimento.impostoDevido = parseFloat(calculoIR.impostoDevido.toFixed(2));
    resultadoRendimento.aliquotaIR = calculoIR.aliquotaIR;
    resultadoRendimento.prazoMes = dadosEntrada.prazo;
    resultadoRendimento.info = info;
    resultadoRendimento.taxaReal = taxaReal;
    resultadoRendimento.inflacaoPeriodo = inflacaoPeriodo;
    resultadoRendimento.divididoNoPrazo = dividido;
};

const salvarSimulacao = () => {
    if (resultadoRendimento.montanteAplicado <= 0)
        return;

    const result = { ...resultadoRendimento };

    simulacoesStore.inserir(result);
};

// --- Watchers ---

onMounted(() => {
    if (indicesStore.oci.SELIC?.valor) {
        opcoesIndices.pre.taxa = indicesStore.oci.SELIC.valor;
        dadosEntrada.taxa = indicesStore.oci.SELIC.valor;
        calculaRendaFixa();
    }
    if (indicesStore.oci.Poupanca?.valor) {
        opcoesIndices.poupanca.taxa = indicesStore.oci.Poupanca.valor;
    }
});

// Watchers de Store
watch(() => indicesStore.oci.SELIC, (value) => {
    if (value && value.valor) {
        opcoesIndices.pre.taxa = value.valor;
        dadosEntrada.taxa = value.valor;
        calculaRendaFixa();
    }
}, { deep: true });

watch(() => indicesStore.oci.Poupanca, (value) => {
    if (value && value.valor) {
        opcoesIndices.poupanca.taxa = value.valor;
        calculaRendaFixa();
    }
}, { deep: true });

// Watcher de tipoIndiceSelecionado
watch(tipoIndiceSelecionado, (value) => {
    dadosEntrada.taxa = opcoesIndices[value].taxa;
    if (value === 'poupanca')
        dadosEntrada.IR = false;
    else
        dadosEntrada.IR = true;
    calculaRendaFixa();
});

// Watcher de dadosEntrada (deep watch)
watch(dadosEntrada, () => {
    calculaRendaFixa();
}, { deep: true });

// Exportar funções e estados para o template
defineExpose({
    dadosEntrada,
    opcoesIndices,
    tipoIndiceSelecionado,
    resultadoRendimento,
    salvarSimulacao,
    calculaRendaFixa,
});
</script>

<template>
    <div class="block">

        <!-- Aviso mobile -->
        <article class="message is-info is-hidden-tablet">
            <div class="message-body has-text-centered">
                <span class="icon pr-3">
                    <ClientOnly>
                        <font-awesome-icon icon="fas fa-lightbulb" />
                    </ClientOnly>
                </span>
                <span>Use um PC para acessar o simulador completo</span>
            </div>
        </article>

        <!-- Simulador -->
        <div class="card">

            <!-- Título -->
            <div class="card-header has-background-white-ter">
                <p class="card-header-title has-text-grey-dark">Simulação #{{ simulacoesStore.lista.length + 1 }}</p>
            </div>

            <!-- Conteúdo do simulador -->
            <div class="card-content">
                <fieldset :disabled="!indicesStore.hasIndices">
                    <!-- Campos -->
                    <div class="columns is-centered is-multiline is-variable">
                        <!-- Montante -->
                        <div class="column is-3">
                            <div class="field">
                                <label class="label has-text-weight-light is-flex is-align-items-center">
                                    Montante
                                    <button type="button" class="button is-small is-ghost p-1 ml-1" @mouseenter="showTooltip('montante')" @mouseleave="hideTooltip('montante')">
                                        <ClientOnly>
                                            <font-awesome-icon icon="fa-solid fa-question-circle" class="has-text-info is-size-7" />
                                        </ClientOnly>
                                    </button>
                                </label>
                                <div v-if="tooltips.montante" class="tooltip-box">
                                    Valor inicial que você pretende investir
                                </div>
                                <div class="control has-icons-left">
                                    <span class="icon is-small is-left">
                                        <ClientOnly>
                                            <font-awesome-icon icon="fa-solid fa-brazilian-real-sign" />
                                        </ClientOnly>
                                    </span>
                                    <InputMoney v-model="dadosEntrada.montante" placeholder="0,00" />
                                </div>
                            </div>
                        </div>
                        <!-- Prazo -->
                        <div class="column">
                            <div class="field">
                                <label class="label has-text-weight-light is-flex is-align-items-center">
                                    Prazo a.m
                                    <button type="button" class="button is-small is-ghost p-1 ml-1" @mouseenter="showTooltip('prazo')" @mouseleave="hideTooltip('prazo')">
                                        <ClientOnly>
                                            <font-awesome-icon icon="fa-solid fa-question-circle" class="has-text-info is-size-7" />
                                        </ClientOnly>
                                    </button>
                                </label>
                                <div v-if="tooltips.prazo" class="tooltip-box">
                                    Tempo em meses que o dinheiro ficará investido
                                </div>
                                <div class="control has-icons-left">
                                    <span class="icon is-small is-left">
                                        <ClientOnly>
                                            <font-awesome-icon icon="fa-solid fa-calendar" />
                                        </ClientOnly>
                                    </span>
                                    <input class="input" type="text" placeholder="Prazo em meses"
                                        v-model.number="dadosEntrada.prazo">
                                </div>
                            </div>
                        </div>
                        <!-- Taxa -->
                        <div class="column">
                            <div class="field">
                                <label class="label has-text-weight-light is-flex is-align-items-center">
                                    {{ opcoesIndices[tipoIndiceSelecionado].label }}
                                    <button type="button" class="button is-small is-ghost p-1 ml-1" @mouseenter="showTooltip('taxa')" @mouseleave="hideTooltip('taxa')">
                                        <ClientOnly>
                                            <font-awesome-icon icon="fa-solid fa-question-circle" class="has-text-info is-size-7" />
                                        </ClientOnly>
                                    </button>
                                </label>
                                <div v-if="tooltips.taxa" class="tooltip-box">
                                    Taxa de juros anual do investimento. Varia conforme o tipo selecionado
                                </div>
                                <div class="control has-icons-right">
                                    <input class="input" type="number" placeholder="Taxa a.a"
                                        v-model.number="dadosEntrada.taxa">
                                    <span class="icon is-small is-right">
                                        <ClientOnly>
                                            <font-awesome-icon icon="fa-solid fa-percentage" />
                                        </ClientOnly>
                                    </span>
                                </div>
                                <p class="help is-info">Taxa real {{ ((resultadoRendimento.taxaReal > 0 ?
                                    resultadoRendimento.taxaReal : opcoesIndices.pre.taxa) /
                                    100.0).toLocaleString('pt-BR',
                                        {
                                            style: 'percent',
                                            minimumFractionDigits: 1,
                                            maximumFractionDigits: 2,
                                        }) }}</p>
                            </div>
                        </div>
                        <!-- Tipo -->
                        <div class="column is-2">
                            <div class="field">
                                <label class="label has-text-weight-light is-flex is-align-items-center">
                                    Tipo
                                    <button type="button" class="button is-small is-ghost p-1 ml-1" @mouseenter="showTooltip('tipo')" @mouseleave="hideTooltip('tipo')">
                                        <ClientOnly>
                                            <font-awesome-icon icon="fa-solid fa-question-circle" class="has-text-info is-size-7" />
                                        </ClientOnly>
                                    </button>
                                </label>
                                <div v-if="tooltips.tipo" class="tooltip-box">
                                    Modalidade do investimento: pré (taxa fixa), pós (% do CDI), IPCA+ ou SELIC+
                                </div>
                                <div class="control">
                                    <div class="select is-fullwidth">
                                        <select v-model="tipoIndiceSelecionado">
                                            <option value="pre">Pré-fixado</option>
                                            <option value="pos">Pós-fixado</option>
                                            <option value="poupanca">Poupança</option>
                                            <option value="ipca">IPCA+</option>
                                            <option value="selic">SELIC+</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- IR -->
                        <div class="column">
                            <div class="field">
                                <label class="label has-text-weight-light is-flex is-align-items-center">
                                    Isento IR
                                    <button type="button" class="button is-small is-ghost p-1 ml-1" @mouseenter="showTooltip('ir')" @mouseleave="hideTooltip('ir')">
                                        <ClientOnly>
                                            <font-awesome-icon icon="fa-solid fa-question-circle" class="has-text-info is-size-7" />
                                        </ClientOnly>
                                    </button>
                                </label>
                                <div v-if="tooltips.ir" class="tooltip-box">
                                    Se o investimento é isento de Imposto de Renda (ex: LCI, LCA, CRA, CRI)
                                </div>
                                <div class="control">
                                    <label class="b-radio radio">
                                        <input type="radio" name="ir" :value="false" v-model="dadosEntrada.IR">
                                        <span class="check is-info"></span>
                                        <span class="control-label">Sim</span>
                                    </label>
                                    <label class="b-radio radio">
                                        <input type="radio" name="ir" :value="true" v-model="dadosEntrada.IR">
                                        <span class="check is-info"></span>
                                        <span class="control-label">Não</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                        <!-- Inflação -->
                        <div class="column">
                            <div class="field">
                                <label class="label has-text-weight-light is-flex is-align-items-center">
                                    Inflação
                                    <button type="button" class="button is-small is-ghost p-1 ml-1" @mouseenter="showTooltip('inflacao')" @mouseleave="hideTooltip('inflacao')">
                                        <ClientOnly>
                                            <font-awesome-icon icon="fa-solid fa-question-circle" class="has-text-info is-size-7" />
                                        </ClientOnly>
                                    </button>
                                </label>
                                <div v-if="tooltips.inflacao" class="tooltip-box">
                                    Se deve descontar a inflação (IPCA) do rendimento para calcular o ganho real
                                </div>
                                <div class="control">
                                    <label class="b-radio radio">
                                        <input type="radio" name="inflacao" :value="true"
                                            v-model="dadosEntrada.calcularInflacao">
                                        <span class="check is-info"></span>
                                        <span class="control-label">Sim</span>
                                    </label>
                                    <label class="b-radio radio">
                                        <input type="radio" name="inflacao" :value="false"
                                            v-model="dadosEntrada.calcularInflacao">
                                        <span class="check is-info"></span>
                                        <span class="control-label">Não</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Resultado -->
                    <div class="columns is-vcentered has-text-centered">

                        <!-- valor vencimento -->
                        <div class="column">
                            <div class="box">
                                <p class="subtitle is-size-6">Valor no vencimento</p>
                                <p class="title is-size-5">{{
                                    resultadoRendimento.valorNoVencimento.toLocaleString('pt-BR',
                                        { style: 'currency', currency: 'BRL' }) }}</p>
                                <hr>
                                <p class="subtitle is-size-7">Inflação no período</p>
                                <p class="title is-size-6 has-text-danger">{{ (resultadoRendimento.inflacaoPeriodo *
                                    -1).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) }}</p>
                            </div>
                        </div>

                        <!-- rendimento bruto -->
                        <div class="column">
                            <div class="box">
                                <p class="subtitle is-size-6">Rendimento bruto</p>
                                <p class="title is-size-5">{{ resultadoRendimento.bruto.toLocaleString('pt-BR', {
                                    style:
                                        'currency', currency: 'BRL'
                                    }) }}</p>
                                <hr>
                                <p class="subtitle is-size-7">IR devido {{
                                    resultadoRendimento.aliquotaIR.toLocaleString('pt-BR', {
                                        style: 'percent',
                                        minimumFractionDigits: 1,
                                        maximumFractionDigits: 1,
                                    }) }}</p>
                                <p class="title is-size-6 has-text-danger">{{ (resultadoRendimento.impostoDevido *
                                    -1).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) }}</p>
                            </div>
                        </div>

                        <!-- rendimento liq. -->
                        <div class="column">
                            <div class="box">
                                <p class="subtitle is-size-6">Rendimento líquido</p>
                                <p class="title is-size-5">{{ resultadoRendimento.liquido.toLocaleString('pt-BR', {
                                    style:
                                        'currency', currency: 'BRL'
                                    }) }}</p>
                                <hr>
                                <p class="subtitle is-size-7">Dividido por {{ dadosEntrada.prazo > 0 ?
                                    dadosEntrada.prazo :
                                    0 }} meses</p>
                                <p class="title is-size-6">{{
                                    resultadoRendimento.divididoNoPrazo.toLocaleString('pt-BR', {
                                        style: 'currency', currency: 'BRL'
                                    }) }}</p>
                            </div>
                        </div>

                    </div>

                    <!-- Disclaimer -->
                    <div class="block is-size-7">
                        <p>* Valores aproximados e apenas para simulação. Não é uma indicação de aplicação.</p>
                        <p>** O cálculo da inflação é baseado no IPCA dos últimos 12 meses.</p>
                    </div>

                    <!-- Botão adicionar -->
                    <button class="button is-rounded is-warning is-light is-outlined is-hidden-mobile"
                        @click="salvarSimulacao()">
                        <span class="icon">
                            <ClientOnly>
                                <font-awesome-icon icon="fa-solid fa-plus" />
                            </ClientOnly>
                        </span>

                        <span>
                            Comparar
                        </span>
                    </button>
                </fieldset>
            </div>
        </div>
    </div>
</template>

<style scoped>
.field {
    position: relative;
}

.tooltip-box {
    position: absolute;
    top: 100%;
    left: 0;
    z-index: 1000;
    background: #3273dc;
    color: white;
    padding: 0.5rem;
    border-radius: 4px;
    font-size: 0.75rem;
    box-shadow: 0 2px 8px rgba(0,0,0,0.15);
    max-width: 250px;
    margin-top: 0.25rem;
}

.tooltip-box::before {
    content: '';
    position: absolute;
    top: -4px;
    left: 1rem;
    width: 0;
    height: 0;
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    border-bottom: 4px solid #3273dc;
}
</style>