<script setup>
const indicesStore = useIndicesStore()
</script>

<template>
    <div class="columns is-centered is-multiline">

        <div class="column" v-if="indicesStore.isLoading">

            <div class="notification has-background-info-light box has-text-centered">
                <span class="icon is-large has-text-grey">
                    <i class="fas fa-2x fa-hourglass-start"></i>
                </span>
                <p class="title has-text-grey is-size-4">Obtendo índices</p>
                <p class="subtitle">Aguarde...</p>
            </div>

        </div>

        <!-- Mensagem de erro -->
        <div class="column" v-else-if="indicesStore.isErrored">

            <div class="notification is-warning is-light box has-text-centered">
                <span class="icon is-large">
                    <i class="fas fa-2x fa-triangle-exclamation"></i>
                </span>
                <p class="title has-text-warning-dark is-size-4">Não foi possível obter os índices</p>
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
