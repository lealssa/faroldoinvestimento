<script setup>
const indicesStore = useIndicesStore()

onMounted(() => {
    indicesStore.fetchIndicesOCI()
})
</script>

<template>
    <div class="columns is-centered is-multiline">

        <!-- skeleton -->
        <div class="column" v-if="indicesStore.isLoading || !indicesStore.hasIndices">
            <div class="column">
                <div class="skeleton-block">
                    <p>Aguarde...</p>
                </div>
            </div>
        </div>

        <!-- Mensagem de erro -->
        <div class="column" v-else-if="indicesStore.isErrored">
            <div class="notification is-light box has-text-centered">
                <span class="icon is-large">
                    <font-awesome-icon icon="fa-solid fa-2x fa-triangle-exclamation" />
                </span>
                <p class="title is-size-4">Não foi possível obter os índices</p>
                <p class="subtitle">Tente novamente em instantes</p>
            </div>

        </div>

        <!-- Lista de índices -->
        <div class="column is-4" v-for="(value, index) in indicesStore.oci" v-else>
            <div class="card">
                <div class="card-header has-background-white-ter">
                    <p class="card-header-title has-text-grey-dark">{{ value.nome }}</p>
                </div>
                <div class="card-content">
                    <h3>{{ value.descricao }}</h3>
                    <p><span>{{ value.valor }}</span>% a.a</p>
                </div>
                <div class="card-footer is-size-7">
                    <p class="card-footer-item">
                        <span>{{ value.notas }}</span>
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>
