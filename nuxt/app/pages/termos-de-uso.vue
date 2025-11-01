<script setup>
useHead({
    title: 'Termos de Uso',
    meta: [
        { name: 'description', content: 'Termos de uso do Farol do Investimento. Conheça nossas políticas de privacidade e limitações de responsabilidade.' },
        { name: 'robots', content: 'index, follow' }
    ]
})
</script>

<template>
    <div class="box is-shadowless"
        style="box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);">

        <nav class="breadcrumb" aria-label="breadcrumbs">
            <ul>
                <li>
                    <NuxtLink to="/" class="has-text-grey">Página inicial</NuxtLink>
                </li>
                <li class="is-active"><a href="#" aria-current="page" class="has-text-grey">Termos de Uso</a></li>
            </ul>
        </nav>

        <div class="content p-5">

            <h1 class="title is-3 has-text-centered has-text-grey-dark mb-4">
                Termos de Uso
            </h1>

            <p class="subtitle is-6 has-text-centered has-text-grey mb-6">
                Última atualização: 26 de agosto de 2025
            </p>

            <div class="content">
                <p>Bem-vindo ao Farol do Investimento! Estes Termos de Uso ("Termos") regem o uso do nosso site e dos
                    serviços que oferecemos, incluindo o simulador de investimentos. Ao acessar ou usar nosso site, você
                    concorda em cumprir estes Termos. Se você não concorda com qualquer parte destes Termos, não deve
                    utilizar nosso site.</p>

                <h2 class="title is-4 mt-6 mb-3">1. Uso dos Dados</h2>
                <p>Nós utilizamos seus dados <strong>apenas para fins de navegação</strong> e para melhorar sua
                    experiência em nosso
                    site. Não coletamos, armazenamos ou compartilhamos dados pessoais com terceiros para fins de
                    marketing
                    ou qualquer outra finalidade comercial.</p>
                <p>A única informação que utilizamos é aquela gerada durante a sua sessão de navegação (como cookies,
                    por
                    exemplo), visando a funcionalidade e o desempenho do nosso serviço. Seus dados de navegação são
                    tratados
                    com segurança, e nossa prioridade é a sua privacidade.</p>

                <h2 class="title is-4 mt-6 mb-3">2. Limitação de Responsabilidade</h2>
                <p>O Farol do Investimento fornece conteúdo e ferramentas, como o simulador, com o objetivo de
                    <strong>educação e
                        informação</strong>. É fundamental que você entenda os seguintes pontos:
                </p>

                <ul>
                    <li><strong>Conteúdo Educacional:</strong> Nossos artigos, guias e qualquer outro material de apoio
                        são
                        para fins informativos. Eles não constituem <strong>aconselhamento financeiro, jurídico ou de
                            investimento</strong>. A rentabilidade de investimentos passados não garante retornos
                        futuros.</li>
                    <li><strong>Simulador de Investimentos:</strong> O simulador é uma ferramenta para ajudar você a
                        entender conceitos e calcular projeções com base em dados inseridos. Ele não prevê o desempenho
                        real
                        de um investimento. Os resultados são <strong>aproximações e estimativas</strong>, e não devem
                        ser usados como
                        base única para suas decisões de investimento.</li>
                    <li><strong>Decisões Pessoais:</strong> Você é <strong>totalmente responsável</strong> pelas suas
                        decisões
                        financeiras e de investimento. Antes de tomar qualquer decisão, recomendamos que procure a
                        orientação de um profissional de finanças qualificado.</li>
                    <li><strong>Isenção de Garantia:</strong> Não garantimos a precisão, confiabilidade ou completude
                        das
                        informações ou dos resultados do simulador. O uso do site e das suas ferramentas é de sua
                        inteira
                        responsabilidade. Não seremos responsáveis por quaisquer perdas ou danos, diretos ou indiretos,
                        resultantes do uso das informações ou do simulador.</li>
                </ul>

                <h2 class="title is-4 mt-6 mb-3">3. Alterações nos Termos</h2>
                <p>Reservamo-nos o direito de modificar estes Termos a qualquer momento. Quaisquer alterações entrarão
                    em
                    vigor imediatamente após a sua publicação. É sua responsabilidade revisar periodicamente esta página
                    para se manter informado sobre as atualizações. O uso contínuo do site após a publicação das
                    alterações
                    constitui sua aceitação dos novos Termos.</p>
                <p>Ao usar o Farol do Investimento, você reconhece que leu e concorda com estes Termos de Uso.</p>
            </div>
            <div class="buttons is-centered">
                <NuxtLink to="/" class="button">
                    <span class="icon">
                        <font-awesome-icon icon="fa-solid fa-home" />
                    </span>
                    <span>Voltar</span>
                </NuxtLink>
            </div>

        </div>


    </div>
</template>

<style scoped>
/*
 * O Bulma não possui classes utilitárias para margem vertical (my-8) ou sombra (shadow-lg) 
 * no elemento pai 'box'. Portanto, usamos estilos embutidos/scoped para replicar o efeito:
 */
.box {
    margin-top: 2rem;
    /* my-8 */
    margin-bottom: 2rem;
    /* my-8 */
    /* Usando box-shadow manual para replicar shadow-lg, já que o .box padrão do Bulma é leve */
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

/* Ajustes de margem para o título principal (mb-6) e subtítulo (mb-8) */
.title.is-3 {
    margin-bottom: 1.5rem !important;
}

.subtitle.is-6 {
    margin-bottom: 2rem !important;
}

/* Ajuste de margem top/bottom para h2 (mt-8 mb-4) */
.content h2 {
    margin-top: 2rem !important;
    margin-bottom: 1rem !important;
}

/* Ajuste de padding p-6 md:p-10. O 'content' dentro do box já tem um padding natural. */
/* Se precisar de mais padding: */
.box>.content {
    padding: 2.5rem !important;
    /* Aproximação de p-10/md:p-10 */
}
</style>