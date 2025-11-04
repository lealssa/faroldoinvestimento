<template>
    <NuxtLayout name="default">
        <section class="section has-text-centered">
            <div class="columns is-centered">
                <div class="column is-half">
                    <div class="box">
                        <figure class="image is-128x128 mx-auto mb-5">
                            <img src="/img/not_found.png" alt="Página não encontrada">
                        </figure>

                        <h1 class="title is-1 has-text-grey-dark">{{ error.statusCode }}</h1>
                        <h2 class="subtitle is-4 has-text-grey">
                            {{ error.statusCode === 404 ? 'Página não encontrada' : 'Ops! Algo deu errado' }}
                        </h2>

                        <p class="content has-text-grey">
                            {{ error.statusCode === 404
                                ? 'A página que você está procurando não existe ou foi movida.'
                                : 'Ocorreu um erro inesperado. Tente novamente mais tarde.'
                            }}
                        </p>

                        <div class="buttons is-centered">

                            <NuxtLink to="/" class="button is-warning is-outlined">

                                <span class="icon">
                                    <ClientOnly>
                                        <font-awesome-icon icon="fa-solid fa-home" />
                                    </ClientOnly>
                                </span>
                                <span>Voltar ao início</span>
                            </NuxtLink>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </NuxtLayout>
</template>

<script setup>
defineProps(['error'])
</script>