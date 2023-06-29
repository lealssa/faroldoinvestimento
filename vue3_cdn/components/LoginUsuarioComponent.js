export const LoginUsuario = {
    props: {
        loginEndpoint: String,
        redirectEndpoint: String
    },
    data() {
        return {
            loginLoading: false,
            loginErrored: false,
            loginErrorMessage: 'Ocorreu um erro fazendo login',
            usuarioFieldErrored: false,
            senhaFieldErrored: false,
            usuario: '',
            senha: ''
        }
    },
    watch: {
        usuario(value) {
            this.usuarioFieldErrored = value === ''
        },
        senha(value) {
            this.senhaFieldErrored = value === ''
        }
    },
    methods: {
        login() {

            console.log(this.loginEndpoint)

            this.usuarioFieldErrored = this.usuario === ''
            this.senhaFieldErrored = this.senha === ''

            if (this.usuarioFieldErrored || this.senhaFieldErrored)
                return

            this.checaLogin(this.usuario, this.senha)
        },
        checaLogin(usuario, senha) {
            this.loginLoading = true
            fetch(this.loginEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ usuario, senha })
            })
                .then(response => response.json())
                .then(data => {
                    this.loginErrored = data.errored
                    if (data.message) this.loginErrorMessage = data.message
                })
                .catch(error => {
                    console.log(error)
                    this.loginErrored = true
                })
                .finally(() => {
                    this.loginLoading = false
                    if (!this.loginErrored)
                        window.location.assign(this.redirectEndpoint)
                })
        }
    },
    template: `
    <section class="content">
        <div class="columns is-centered">
            <div class="column is-5 box section">
                
                <div class="content has-text-centered">
                    <figure class="image is-128x128" style="margin: auto;">
                        <img src="./img/farol_do_investimento_logo.png" alt="Logo" width="432px">
                    </figure>                                
                    <h1 class="title is-size-3 has-text-weight-medium">Logon de usuário</h1>
                    <h2 class="subtitle is-size-6 has-text-weight-medium">Faça login para acessar a página</h2>
                </div>

                <div class="notification is-danger is-light has-text-centered" :class="{ 'is-hidden': !loginErrored}">
                    <p>{{ loginErrorMessage }}</p>
                </div>

                <div class="field">
                    <label for="user" class="label">Usuário</label>
                    <div class="control">
                        <input type="text" class="input" id="user" v-model="usuario" :class="{ 'is-danger': usuarioFieldErrored}">
                    </div>
                    <p class="help is-danger" :class="{ 'is-hidden': !usuarioFieldErrored}">Informe o usuário</p>
                </div>

                <div class="field">
                    <label for="password" class="label">Senha</label>
                    <div class="control">
                        <input type="password" class="input" id="password" v-model="senha" :class="{ 'is-danger': senhaFieldErrored}">
                    </div>
                    <p class="help is-danger" :class="{ 'is-hidden': !senhaFieldErrored}">Informe a senha</p>
                </div>

                <div class="field">
                    <div class="control">
                        <button class="button is-fullwidth is-warning is-light is-outlined" @click="login()" :class="{ 'is-loading': loginLoading }">Entrar</button>
                    </div>
                </div>                

            </div>
        </div>
    </section>
    `
}
