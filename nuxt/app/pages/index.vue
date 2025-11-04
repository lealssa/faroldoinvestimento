<script setup>
const indicesStore = useIndicesStore()
</script>

<template>
    <!-- Intro -->
    <section class="section has-text-centered">
        <div class="columns is-variable is-8">
            <div class="column is-flex">
                <div class="card intro-card">
                    <div class="card-content has-text-centered">
                        <div class="intro-icon-wrapper mb-4">
                            <span class="icon is-size-2 has-text-warning">
                                <font-awesome-icon icon="fa-solid fa-graduation-cap" />
                            </span>
                        </div>

                        <h3 class="title is-5 mb-4">Aprenda e invista</h3>

                        <p class="is-size-6 mb-4">
                            Tenha autonomia para investir seu dinheiro da melhor forma. Aqui você vai entender os
                            conceitos básicos sobre <strong>investimentos em Renda Fixa</strong> e aplicar seu dinheiro
                            com
                            inteligência e maior rentabilidade.
                        </p>

                        <a href="#rendafixa" class="button is-warning is-light is-rounded">
                            <span class="icon">
                                <font-awesome-icon icon="fa-solid fa-book-open" />
                            </span>
                            <span>Começar Agora</span>
                        </a>
                    </div>
                </div>
            </div>
            <div class="column is-flex">
                <div class="card intro-card intro-card-featured">
                    <div class="card-content has-text-centered">
                        <div class="intro-icon-wrapper mb-4">
                            <span class="icon is-size-2 has-text-warning">
                                <font-awesome-icon icon="fa-solid fa-calculator" />
                            </span>
                        </div>

                        <h3 class="title is-5 mb-4">Simulador Exclusivo</h3>

                        <p class="is-size-6 mb-4">
                            Compare rendimentos, monte carteiras e tome decisões inteligentes com nossa calculadora que
                            simula diversos tipos de investimento, com base no montante a ser investido.
                            <strong class="has-text-warning">Totalmente grátis</strong>.
                        </p>

                        <a class="button is-warning is-rounded" href="#simuladorrendafixa">
                            <span class="icon">
                                <font-awesome-icon icon="fa-solid fa-rocket" />
                            </span>
                            <span>Simular Agora</span>
                        </a>
                    </div>
                </div>
            </div>
            <div class="column is-flex">
                <div class="card intro-card">
                    <div class="card-content has-text-centered">
                        <div class="intro-icon-wrapper mb-4">
                            <span class="icon is-size-2 has-text-warning">
                                <font-awesome-icon icon="fa-solid fa-chart-line" />
                            </span>
                        </div>

                        <h3 class="title is-5 mb-4">Invista com Segurança</h3>

                        <p class="is-size-6 mb-4">
                            Escolha apenas corretoras regulamentadas pela <strong>CVM</strong> e invista
                            com total segurança e transparência. A CVM é um orgão do governo brasileiro responsável por
                            controlar o mercado de investimentos no país.
                        </p>

                        <a href="https://sistemas.cvm.gov.br/asp/cvmwww/InvNRes/tabecus.asp"
                            class="button is-warning is-light is-rounded" target="_blank">
                            <span class="icon">
                                <font-awesome-icon icon="fa-solid fa-shield-halved" />
                            </span>
                            <span>Ver Corretoras</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <!-- End Intro -->

    <section class="section">
        <div class="box has-text-centered">
            <span class="icon-text is-size-6">
                <span class="icon has-text-warning">
                    <font-awesome-icon icon="fa-solid fa-shoe-prints" />
                </span>
                <span class="has-text-weight-semibold has-text-grey-dark">Dê os seus primeiros passos com nosso breve tutorial abaixo</span>
            </span>
        </div>
    </section>

    <!-- Learn -->
    <section class="section is-size-5 has-text-left">

        <ContentCollapsible :is-expanded="true" id="rendafixa">
            <template v-slot:title>
                O que é investimento em Renda Fixa?
            </template>

            <div class="content">
                <p class="has-background-link-95 p-4 is-size-6">
                    Investimento em renda fixa é uma categoria de investimento em que o rendimento é
                    <strong>fixado por algum indexador</strong> e a rentabilidade pode ser previsível enquanto o
                    dinheiro
                    está aplicado. O investidor “empresta” o dinheiro para alguém - que, nesse caso, pode ser o governo,
                    bancos ou outras empresas -, e, no futuro, recebe esse valor de volta, acrescido de juros.
                </p>
            </div>
        </ContentCollapsible>

        <ContentCollapsible id="tiposrendafixa">
            <template v-slot:title>
                Quais os tipos de investimento de Renda Fixa?
            </template>

            <div class="content px-5 is-size-6">
                <p>
                    Existem vários tipos de investimentos em renda fixa, como <strong> Tesouro Direto
                        (títulos do governo), CDBs e RDBs (títulos de bancos), Debêntures e Notas Promissórias (títulos
                        de
                        empresas), LCIs e LCAs (títulos de bancos)</strong>, entre outros.
                </p>
            </div>
        </ContentCollapsible>

        <ContentCollapsible id="riscosrendafixa">
            <template v-slot:title>
                Existe algum risco investir em Renda Fixa?
            </template>

            <div class="content px-5 is-size-6">
                <p>
                    Este tipo de investimento é conhecido por possuir <strong>menores riscos
                        associados</strong>, quando comparados
                    aos de renda variável (investimentos da bolsa, por exemplo...). No entanto, é importante notar
                    que a rentabilidade da renda fixa pode variar de acordo com as condições do mercado e do emissor do
                    título.
                </p>
            </div>
        </ContentCollapsible>

        <ContentCollapsible id="indicesvariamrendafixa">
            <template v-slot:title>
                Os índices da Renda Fixa variam ao longo do tempo?
            </template>

            <div class="content px-5 is-size-6">
                <p>
                    <strong>Os índices da renda fixa podem variar ao longo do prazo do
                        investimento</strong>, o que pode impactar no rendimento ao final.
                </p>
                <p>
                    Um rendimento pós-fixado, onde aplica-se um percentual
                    sobre um determinado índice - geralmente CDI/SELIC -
                    está mais exposto a essas variações, visto que o índice pode ir sofrendo variações
                    durante o período e o rendimento o acompanha; já em um rendimento pré-fixado,
                    onde a taxa é definida no momento da aplicação, isso não ocorre, pois permenecerá a mesma
                    durante o período.
                </p>
            </div>
        </ContentCollapsible>

        <ContentCollapsible id="impostorendafixa">
            <template v-slot:title>
                Preciso pagar imposto sobre o rendimento de Renda Fixa?
            </template>

            <div class="content px-5 is-size-6">
                <p>
                    A depender do tipo de investimento de renda fixa, o governo cobra Imposto de Renda sobre o
                    rendimento seguindo uma tabela regressiva, onde o percentual do imposto
                    diminui de acordo com o prazo.
                </p>
                <p>
                    <strong>A tabela regressiva do Imposto de Renda em aplicações de renda fixa varia entre
                        22,5% e 15% </strong>, e incide apenas sobre o rendimento. As faixas de tributação para a tabela
                    regressiva do Imposto de Renda são:
                </p>
                <ul>
                    <li>Até 180 dias: 22,5%</li>
                    <li>De 181 a 360 dias: 20%</li>
                    <li>De 361 a 720 dias: 17,5%</li>
                    <li>A partir de 721 dias: 15%</li>
                </ul>
                <p>
                    Dessa forma, os investimentos em renda fixa de longo prazo e tributados pelo IR se tornam
                    mais atrativos do que os resgatados no curto prazo.
                </p>
            </div>
        </ContentCollapsible>

        <ContentCollapsible id="investimentostributadosrendafixa">
            <template v-slot:title>
                Quais investimentos de Renda Fixa são tributados e quais são isentos?
            </template>

            <div class="content px-5 is-size-6">
                <p>
                    Existem vários tipos de investimentos em renda fixa que são tributados pelo Imposto de
                    Renda (IR), como <strong>Tesouro Direto (títulos do governo), CDBs e RDBs (títulos de bancos),
                        Debêntures e Notas Promissórias (títulos de empresas) </strong>, entre outros. Conforme vimos, a
                    tributação desses investimentos segue a tabela regressiva do IR, que varia entre 22,5% e 15%, e
                    incide
                    apenas sobre o rendimento.
                </p>
                <p>
                    No entanto, também existem alguns investimentos em renda fixa que são isentos de Imposto
                    de Renda, como a <strong>poupança, as Letras de Crédito Imobiliário (LCI), as Letras de Crédito do
                        Agronegócio (LCA) e as Debêntures incentivadas</strong>.
                </p>
                <p>
                    É importante notar que, mesmo nos investimentos isentos de IR, os rendimentos devem ser
                    declarados na Declaração Anual de Imposto de Renda.
                </p>
            </div>
        </ContentCollapsible>

    </section>
    <!-- End Learn -->

    <!-- Header Índices -->
    <section class="section has-text-centered">
        <h1 class="title is-size-4" id="indicesrendafixa">
            Índices da renda fixa
            <a href="#indicesrendafixa" class="link is-size-6 has-text-grey">
                <span class="icon">
                    <font-awesome-icon icon="fa-solid fa-link" />
                </span>
            </a>
        </h1>
        <h2 class="subtitle is-size-5">
            Estes índices são usados como indexadores do rendimento das aplicações na Renda Fixa
        </h2>
    </section>
    <!-- End Header Índices -->

    <!-- Lista Índices -->
    <!-- <ListaIndices></ListaIndices> -->
    <IndicesRendaFixa></IndicesRendaFixa>
    <!-- End Lista Índices  -->

    <!-- Header simulador -->
    <section class="section has-text-centered">
        <h1 class="title" id="simuladorrendafixa">
            Simulador de rendimento
            <a href="#simuladorrendafixa" class="link is-size-6 has-text-grey">
                <span class="icon">
                    <font-awesome-icon icon="fa-solid fa-link" />
                </span>
            </a>
        </h1>
        <h2 class="subtitle is-size-5">
            Simule e compare quanto rende seu dinheiro aplicado na Renda Fixa
        </h2>
    </section>
    <!-- End Header simulador -->

    <!-- Tabela Simulações -->
    <TabelaSimulacoes></TabelaSimulacoes>
    <!-- End Tabela Simulações -->

    <!-- Calculadora -->
    <CalculadoraRendaFixa></CalculadoraRendaFixa>
    <!-- End Calculadora -->
</template>
<style scoped>
.intro-card {
    height: 100%;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    border: 2px solid transparent;
}

.intro-card:hover {
    transform: translateY(-8px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.intro-card-featured {
    border-color: #ffdd57;
    position: relative;
}



.intro-icon-wrapper {
    background: rgba(255, 221, 87, 0.1);
    width: 80px;
    height: 80px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
}

.theme-dark .intro-icon-wrapper {
    background: rgba(255, 221, 87, 0.2);
}
</style>