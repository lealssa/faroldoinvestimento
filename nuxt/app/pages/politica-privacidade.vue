<template>
    <div class="box is-shadowless"
        style="box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);">

        <nav class="breadcrumb" aria-label="breadcrumbs">
            <ul>
                <li>
                    <NuxtLink to="/" class="has-text-grey">Página inicial</NuxtLink>
                </li>
                <li class="is-active"><a href="#" aria-current="page" class="has-text-grey">Política de Privacidade</a></li>
            </ul>
        </nav>

        <div class="content p-5">

            <h1 class="title is-3 has-text-centered has-text-grey-dark mb-4">
                Política de Privacidade
            </h1>

            <p class="subtitle is-6 has-text-centered has-text-grey mb-6">
                Última atualização: 26 de agosto de 2025
            </p>

            <div class="content">
                <p>O Farol do Investimento está comprometido em proteger sua privacidade. Esta Política de Privacidade explica como coletamos, usamos e protegemos suas informações quando você visita nosso site.</p>

                <h2 class="title is-4 mt-6 mb-3">1. Informações que Coletamos</h2>
                <p>Coletamos apenas informações mínimas necessárias para o funcionamento do site:</p>
                <ul>
                    <li><strong>Dados de Navegação:</strong> Informações sobre como você usa nosso site, incluindo páginas visitadas e tempo de permanência</li>
                    <li><strong>Preferências do Usuário:</strong> Configurações como tema (claro/escuro) armazenadas localmente em seu dispositivo</li>
                    <li><strong>Dados de Simulação:</strong> Valores inseridos no simulador de investimentos, armazenados apenas localmente em seu navegador</li>
                </ul>

                <h2 class="title is-4 mt-6 mb-3">2. Como Usamos suas Informações</h2>
                <p>Utilizamos as informações coletadas exclusivamente para:</p>
                <ul>
                    <li>Melhorar a funcionalidade e experiência do usuário em nosso site</li>
                    <li>Manter suas preferências de tema e configurações</li>
                    <li>Permitir o funcionamento adequado do simulador de investimentos</li>
                    <li>Analisar o uso do site para melhorias futuras</li>
                </ul>

                <h2 class="title is-4 mt-6 mb-3">3. Armazenamento de Dados</h2>
                <p>Seus dados são armazenados da seguinte forma:</p>
                <ul>
                    <li><strong>Armazenamento Local:</strong> Preferências e dados de simulação ficam apenas em seu navegador</li>
                    <li><strong>Não compartilhamos dados:</strong> Não vendemos, alugamos ou compartilhamos suas informações com terceiros</li>
                    <li><strong>Sem coleta de dados pessoais:</strong> Não coletamos nome, email, telefone ou outros dados pessoais identificáveis</li>
                </ul>

                <h2 class="title is-4 mt-6 mb-3">4. Cookies e Tecnologias Similares</h2>
                <p>Utilizamos tecnologias de armazenamento local para:</p>
                <ul>
                    <li>Salvar suas preferências de tema</li>
                    <li>Lembrar seu consentimento para uso de cookies</li>
                    <li>Manter dados de simulações durante sua sessão</li>
                </ul>
                <p>Você pode limpar esses dados a qualquer momento através das configurações do seu navegador.</p>

                <h2 class="title is-4 mt-6 mb-3">5. Seus Direitos</h2>
                <p>Você tem o direito de:</p>
                <ul>
                    <li>Limpar todos os dados armazenados localmente através do seu navegador</li>
                    <li>Desabilitar o armazenamento local nas configurações do navegador</li>
                    <li>Solicitar esclarecimentos sobre esta política através de nossos canais de contato</li>
                </ul>

                <h2 class="title is-4 mt-6 mb-3">6. Segurança</h2>
                <p>Implementamos medidas de segurança adequadas para proteger suas informações contra acesso não autorizado, alteração, divulgação ou destruição. Como não coletamos dados pessoais sensíveis, os riscos são minimizados.</p>

                <h2 class="title is-4 mt-6 mb-3">7. Alterações nesta Política</h2>
                <p>Podemos atualizar esta Política de Privacidade periodicamente. Quaisquer alterações serão publicadas nesta página com a data de atualização. Recomendamos que você revise esta política regularmente.</p>

                <h2 class="title is-4 mt-6 mb-3">8. Contato</h2>
                <p>Se você tiver dúvidas sobre esta Política de Privacidade, entre em contato conosco através do Instagram <a href="https://www.instagram.com/faroldoinvestimento" target="_blank" class="link has-text-warning-70">@faroldoinvestimento</a>.</p>
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
.box {
    margin-top: 2rem;
    margin-bottom: 2rem;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

.title.is-3 {
    margin-bottom: 1.5rem !important;
}

.subtitle.is-6 {
    margin-bottom: 2rem !important;
}

.content h2 {
    margin-top: 2rem !important;
    margin-bottom: 1rem !important;
}

.box>.content {
    padding: 2.5rem !important;
}
</style>