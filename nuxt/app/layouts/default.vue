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
                    <NuxtLink class="navbar-item" to="/">
                        <img src="/img/farol_do_investimento_logo.png" alt="Logo" />
                    </NuxtLink>
                    <NuxtLink class="navbar-item link is-size-5" to="/">
                        Farol do Investimento
                    </NuxtLink>
                </div>
                <div class="navbar-menu mx-5">
                    <div class="navbar-end">
                        <div class="navbar-item">
                            <NuxtLink class="button" to="/termos-de-uso">
                                <span class="icon">
                                    <font-awesome-icon icon="fa-solid fa-file-lines" />
                                </span>
                                <span>Termos de uso</span>
                            </NuxtLink>
                        </div>
                        <div class="navbar-item">
                            <a class="button is-warning is-light is-outlined"
                                href="https://www.instagram.com/faroldoinvestimento?igsh=MWNyN28xNjZpcjdjdQ=="
                                target="_blank">
                                <span class="icon">
                                    <font-awesome-icon icon="fa-brands fa-instagram" />
                                </span>
                                <span>@faroldoinvestimento</span>
                            </a>
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

                    <figure class="image is-128x128 mx-auto">
                        <img src="/img/farol_do_investimento_logo.png" alt="Logo Farol do Investimento" width="432px">
                    </figure>

                    <h1 class="title">Farol do Investimento</h1>
                    <h2 class="subtitle">
                        Seu guia de investimentos.
                    </h2>

                </section>
                <!-- End Center Logo -->

                <!-- Render Page -->
                <slot />
                <!-- End Render Page -->

            </div>
        </main>
        <!-- End Main -->
        <!-- Footer -->
        <div class="hero-foot">
            <footer class="footer has-text-centered p-5">
                <div class="block">
                    <p class="is-size-5 has-text-weight-light">Farol do Investimento {{ (new Date()).getFullYear() }}
                    </p>
                    <a href="https://www.instagram.com/faroldoinvestimento?igsh=MWNyN28xNjZpcjdjdQ==" target="_blank"
                        class="link is-size-3 has-text-grey">
                        <p class="icon has-text-warning-dark">
                            <font-awesome-icon icon="fa-brands fa-instagram" />
                        </p>
                    </a>
                    <p class="is-size-7">Todos os direitos reservados.</p>
                </div>
            </footer>
        </div>
        <!-- End Footer -->
    </div>



</template>
