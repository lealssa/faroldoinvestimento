<script setup lang="js">
const isDark = ref(true)
const isMenuOpen = ref(false)

const toggleTheme = () => {
    isDark.value = !isDark.value
}

const toggleMenu = () => {
    isMenuOpen.value = !isMenuOpen.value
}

// Evita hydration mismatch
onMounted(() => {
    // Estado inicial sempre false para consistência
})

useHead({
    title: 'Farol do Investimento',
    htmlAttrs: {
        class: computed(() => isDark.value ? 'theme-dark' : 'theme-light')
    }
})
</script>

<template>
    <div class="hero is-fullheight">

        <!-- Header -->
        <header class="hero-head">
            <nav class="navbar is-fixed-top has-background-white">
                <div class="container is-max-widescreen">
                    <div class="navbar-brand">
                        <NuxtLink class="navbar-item" to="/">
                            <img src="/img/farol_do_investimento_logo.png" alt="Logo" />
                        </NuxtLink>
                        <NuxtLink class="navbar-item link is-size-5" to="/">
                            Farol do Investimento
                        </NuxtLink>
                        <a class="navbar-burger" @click="toggleMenu">
                            <span></span>
                            <span></span>
                            <span></span>
                        </a>
                    </div>
                    <div class="navbar-menu">
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
                                <button class="button" @click="toggleTheme">
                                    <span class="icon">
                                        <font-awesome-icon icon="fa-solid fa-sun" />
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
        <!-- End Header -->

        <!-- Main -->
        <main class="hero-body has-background-light" style="padding-top: 3.25rem;">
            <div class="container is-max-widescreen">

                <!-- Center Logo -->
                <section class="section has-text-centered is-flex is-flex-direction-column logo-section">

                    <figure class="image is-128x128 mx-auto">
                        <img src="/img/farol_do_investimento_logo.png" alt="Logo Farol do Investimento" width="432px">
                    </figure>

                    <div>
                        <h1 class="title">Farol do Investimento</h1>
                        <h2 class="subtitle">
                            Seu guia de investimentos.
                        </h2>
                    </div>


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
                    <p class="is-size-5 has-text-weight-light">Farol do Investimento {{ new Date().getFullYear() }}</p>
                    <a href="https://www.instagram.com/faroldoinvestimento?igsh=MWNyN28xNjZpcjdjdQ==" target="_blank"
                        class="link has-text-warning">
                        @faroldoinvestimento
                    </a>
                    <p class="is-size-7">&copy Todos os direitos reservados.</p>
                </div>
            </footer>
        </div>
        <!-- End Footer -->
    </div>
</template>

<style>
.theme-dark {
    --bulma-scheme-main: #0f172a;
    --bulma-background: #0f172a;
    --bulma-text: #e2e8f0;
    --bulma-border: #334155;
    --bulma-box-background-color: #1e293b;
    --bulma-card-background-color: #1e293b;
    --bulma-navbar-background-color: #1e293b;
    --bulma-footer-background-color: #1e293b;
}

.theme-dark .has-background-light {
    background-color: #0f172a !important;
}

.theme-dark .has-background-white {
    background-color: #1e293b !important;
}

.theme-dark .navbar {
    background-color: #1e293b !important;
}

.theme-dark .has-background-white-ter {
    background-color: #334155 !important;
}

.theme-dark .has-background-white-bis {
    background-color: #334155 !important;
}

.theme-dark .box {
    background-color: #1e293b !important;
    color: #e2e8f0 !important;
    border: 1px solid #334155 !important;
}

.theme-dark .card {
    background-color: #1e293b !important;
    color: #e2e8f0 !important;
}

.theme-dark .input {
    background-color: #334155 !important;
    color: #e2e8f0 !important;
    border-color: #475569 !important;
}

.theme-dark .select select {
    background-color: #334155 !important;
    color: #e2e8f0 !important;
    border-color: #475569 !important;
}

.theme-dark .message {
    background-color: #1e293b !important;
    color: #e2e8f0 !important;
}

.theme-dark .message-body {
    background-color: #1e293b !important;
    color: #e2e8f0 !important;
}

.theme-dark .table {
    background-color: #1e293b !important;
    color: #e2e8f0 !important;
}

.theme-dark .table td,
.theme-dark .table th {
    background-color: #1e293b !important;
    color: #e2e8f0 !important;
    border-color: #334155 !important;
}

.theme-dark .footer {
    background-color: #1e293b !important;
}

.theme-dark .has-background-link-95 {
    background-color: #1e293b !important;
    color: #e2e8f0 !important;
}

.has-background-link-95 {
    background-color: #fefce8 !important;
    color: #333333 !important;
}

.theme-dark .title {
    color: #d0d0d0 !important;
}

.theme-dark .subtitle {
    color: #b0b0b0 !important;
}

.theme-dark .card-header-title {
    color: #d0d0d0 !important;
}

.theme-dark .has-text-grey-dark {
    color: #d0d0d0 !important;
}

.theme-dark .tag {
    background-color: transparent !important;
    border: 1px solid #334155 !important;
    color: #e2e8f0 !important;
}

.box {
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1) !important;
}

.card {
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1) !important;
}

.logo-section {
    gap: 1rem;
}
</style>
