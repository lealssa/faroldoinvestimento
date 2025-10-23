<script setup>
const indicesStore = useIndicesStore()

onMounted(() => {
    indicesStore.fetchIndicesOCI()
})
</script>

<template>
    <div class="columns is-centered is-multiline">

        <!-- SELIC -->
        <div class="column is-4">
            <div class="card">
                <div class="card-header has-background-white-ter">
                    <p class="card-header-title has-text-grey-dark">SELIC</p>
                </div>
                <div class="card-content">
                    <h2 class="subtitle is-size-6">Taxa básica de juros atual</h2>
                    <div class="content" v-if="indicesStore.hasIndices">
                        <h1 class="title has-text-grey-dark">{{indicesStore.oci.SELIC.valor }}% a.a</h1>
                        <p class="is-size-7">
                            {{ indicesStore.oci.SELIC.notas }}
                        </p>
                    </div>
                    <div class="skeleton-lines" v-else>
                        <div></div>
                        <div></div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Poupança -->
        <div class="column is-4">
            <div class="card">
                <div class="card-header has-background-white-ter">
                    <p class="card-header-title has-text-grey-dark">Poupança</p>
                </div>
                <div class="card-content">
                    <h2 class="subtitle is-size-6">Rendimento da poupança após 2012</h2>
                    <div class="content" v-if="indicesStore.hasIndices">
                        <h1 class="title has-text-grey-dark">{{indicesStore.oci.Poupanca.valor }}% a.a</h1>
                        <p class="is-size-7">
                            {{ indicesStore.oci.Poupanca.notas }}
                        </p>
                    </div>
                    <div class="skeleton-lines" v-else>
                        <div></div>
                        <div></div>
                    </div>
                </div>
            </div>
        </div>

        <!-- IPCA -->
        <div class="column is-4">
            <div class="card">
                <div class="card-header has-background-white-ter">
                    <p class="card-header-title has-text-grey-dark">Inflação (IPCA)</p>
                </div>
                <div class="card-content">
                    <h2 class="subtitle is-size-6">Inflação acumulada dos últimos 12 meses</h2>
                    <div class="content" v-if="indicesStore.hasIndices">
                        <h1 class="title has-text-grey-dark">{{indicesStore.oci.IPCA.valor }}% a.a</h1>
                        <p class="is-size-7">
                            {{ indicesStore.oci.IPCA.notas }}
                        </p>
                    </div>
                    <div class="skeleton-lines" v-else>
                        <div></div>
                        <div></div>
                    </div>                    
                </div>
            </div>
        </div>
    </div>
</template>
