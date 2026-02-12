<script setup>
useHead({
    title: 'Corretoras CVM',
    meta: [
        { name: 'description', content: 'Lista de corretoras da CVM. A Comissão de Valores Mobiliários registra as corretoras para operarem no mercado financeiro.' },
        { name: 'robots', content: 'index, follow' }
    ]
})

const corretoras = ref([])
const aguardando = ref(true)
const errored = ref(false)
const busca = ref('')

onMounted(async () => {
    const url = 'https://axjwvnzorobg.objectstorage.sa-vinhedo-1.oci.customer-oci.com/n/axjwvnzorobg/b/misc/o/corretoras_cvm.json'
    aguardando.value = true
    errored.value = false
    try {
        const data = await $fetch(url)
        corretoras.value = data
    } catch (err) {
        console.error(err)
        errored.value = true

    } finally {
        aguardando.value = false
    }

})

const corretorasFiltradas = computed(() => {
    // Se não houver busca, retorna a lista completa
    if (!busca.value) return corretoras.value

    const termo = busca.value.toLowerCase()

    return corretoras.value.filter(c => {
        // Filtra pelo Nome Social ou pelo CNPJ
        return c.nome?.toLowerCase().includes(termo) ||
            c.cnpj?.includes(termo)
    })
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
                <li class="is-active"><a href="#" aria-current="page" class="has-text-grey">Corretoras CVM</a></li>
            </ul>
        </nav>

        <div class="content p-5">

            <h1 class="title is-3 has-text-centered has-text-grey-dark mb-4">
                Lista de corretoras da CVM
            </h1>

            <div class="content">
                <p>A CVM (Comissão de Valores Mobiliários) é uma autarquia federal, vinculada ao Ministério da Fazenda,
                    que atua como no mercado de capitais brasileiro, sendo responsável por disciplinar,
                    fiscalizar e desenvolver o setor. Sua importância reside na proteção dos investidores contra fraudes
                    e irregularidades, garantindo que as empresas de capital aberto divulguem informações transparentes
                    e fidedignas, o que assegura a integridade e a eficiência das negociações na bolsa de valores. Ao
                    promover um ambiente de confiança e transparência, a CVM facilita a captação de recursos pelas
                    empresas e o acesso do público a diversos produtos financeiros, sendo um pilar fundamental para a
                    estabilidade e o crescimento econômico do Brasil.</p>

                <p>A lista de corretoras abaixo foi obtidas direto do site da CVM e são registradas para operarem no
                    mercado.</p>

                <div class="box" v-if="aguardando">
                    <p>Aguarde...</p>
                </div>
                <div class="box" v-else-if="errored">
                    <p>Erro buscando corretoras</p>
                </div>
                <div class="box" v-else>
                    <div class="field">
                        <div class="control has-icons-left">
                            <span class="icon has-text-warning">
                                <ClientOnly>
                                    <font-awesome-icon icon="fa-solid fa-magnifying-glass" />
                                </ClientOnly>
                            </span>
                            <input type="text" class="input" placeholder="Buscar corretora" v-model="busca">
                        </div>
                    </div>

                    <table class="table is-striped is-hoverable is-fullwidth">
                        <thead>
                            <tr>
                                <th>CNPJ</th>
                                <th>Nome</th>
                            </tr>
                        </thead>
                        <tbody>

                            <template v-for="c in corretorasFiltradas" :key="c.cnpj">
                                <tr>
                                    <td>{{ c.cnpj }}</td>
                                    <td>{{ c.nome }}</td>
                                </tr>
                            </template>

                            <template v-if="corretorasFiltradas.length <= 0">
                                <tr>
                                    <td colspan="2">
                                        <p class="has-text-centered">Corretora não encontrada</p>
                                    </td>
                                </tr>
                            </template>
                        </tbody>
                    </table>
                </div>



            </div>
            <div class="buttons is-centered">
                <NuxtLink to="/" class="button">
                    <span class="icon">
                        <ClientOnly>
                            <font-awesome-icon icon="fa-solid fa-home" />
                        </ClientOnly>
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