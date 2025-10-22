<script setup lang="js">
useHead({
    title: 'Farol do Investimento',
    htmlAttrs: {
        class: 'theme-light',
    },
})
</script>

<template>
    <div class="hero is-fullheight">

        <!-- Header -->
        <header class="hero-head">
            <nav class="navbar">
                <div class="navbar-brand">
                    <a class="navbar-item" href="/">
                        <img src="/img/farol_do_investimento_logo.png" alt="Logo" />
                    </a>
                    <a class="navbar-item link" href="/">Farol do Investimento</a>
                </div>
                <div class="navbar-menu mx-5">
                    <div class="navbar-end">
                        <div class="navbar-item">
                            <button class="button is-warning is-light is-outlined">
                                <span class="icon">
                                    <i class="fas fa-envelope" aria-hidden="true"></i>
                                </span>
                                <span>Contato</span>
                            </button>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
        <!-- End Header -->

        <!-- Main -->
        <main class="hero-body has-background-light">

            <div class="container is-max-widescreen">

                <!-- Center Logo -->
                <section class="section has-text-centered">

                    <figure class="image is-128x128 has-image-centered mx-auto">
                        <img src="/img/farol_do_investimento_logo.png" alt="Logo Farol do Investimento" width="432px">
                    </figure>

                    <h1 class="title has-text-grey-dark has-text-weight-normal">Farol do Investimento</h1>
                    <h2 class="subtitle has-text-weight-light">
                        Seu guia de investimentos exclusivo.
                    </h2>

                </section>
                <!-- End Center Logo -->

                <!-- Render Page -->
                <slot />
                <!-- End Render Page -->

            </div>
        </main>
        <!-- End Main -->
    </div>



</template>
