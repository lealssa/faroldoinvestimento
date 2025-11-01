<script setup>
const indicesStore = useIndicesStore()
</script>

<template>
    <!-- Intro -->
    <section class="section has-text-centered pb-1">
        <div class="columns">
            <div class="column is-flex">
                <div class="content box py-6">

                    <span class="icon is-size-4 mb-5">
                        <font-awesome-icon icon="fa-solid fa-graduation-cap" />
                    </span>

                    <p class="is-size-5 has-text-left">
                        Aprenda como funcionam os investimentos em <strong>Renda Fixa</strong> e aplique seu dinheiro de
                        forma correta e com o
                        maior rendimento.
                    </p>

                    <p class="is-size-5 has-text-left">
                        <a href="#rendafixa" class="link has-text-warning-70">Abaixo</a> você encontra um guia
                        introdutório
                        super didático que elaboramos para você.
                    </p>

                </div>
            </div>
            <div class="column is-flex">
                <div class="content box py-6">
                    <span class="icon is-size-4 mb-5">
                        <font-awesome-icon icon="fa-solid fa-calculator" />
                    </span>

                    <p class="is-size-5 has-text-left">
                        Use nosso exclusivo <strong>simulador de rendimento</strong>, compare e escolha os mais
                        rentáveis. Ou simplesmente monte uma carteira com vários investimentos e obtenha
                        o valor total na mesma simulação.
                    </p>

                    <a class="button is-warning is-outlined is-fullwidth has-text-warning-70"
                        href="#simuladorrendafixa">Simulador</a>
                </div>
            </div>
            <div class="column is-flex">
                <div class="content box py-6">
                    <span class="icon is-size-4 mb-5">
                        <font-awesome-icon icon="fa-solid fa-chart-line" />
                    </span>

                    <p class="is-size-5 has-text-left">
                        Cadastre-se em uma corretora à sua escolha e invista nos títulos de Renda Fixa
                        com maior retorno.
                    </p>

                    <p class="is-size-5 has-text-left">
                        Lembre-se de escolher corretoras com mais solidez e tempo de mercado.
                        <a href="https://sistemas.cvm.gov.br/asp/cvmwww/InvNRes/tabecus.asp"
                            class="link has-text-warning-70" target="_blank">
                            Clique aqui
                        </a>para consultar
                        a lista de corretoras registradas na <strong>CVM</strong>, que é o orgão responsável por regular
                        as atividades
                        delas.
                    </p>
                </div>
            </div>
        </div>
    </section>
    <!-- End Intro -->

    <!-- Learn -->
    <section class="section is-size-5 has-text-left">

        <ContentCollapsible :is-expanded="true" id="rendafixa">
            <template v-slot:title>
                O que é investimento em Renda Fixa?
            </template>

            <div class="content">
                <p class="has-background-link-95 p-4">
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

            <div class="content px-5">
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

            <div class="content px-5">
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

            <div class="content px-5">
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

            <div class="content px-5">
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

            <div class="content px-5">
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