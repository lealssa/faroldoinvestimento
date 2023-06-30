const { createApp, h, createVNode } = Vue
const { useVuelidate } = Vuelidate
const { required, requiredIf, minValue, helpers, decimal } = VuelidateValidators

// const pinia = Pinia.createPinia()

import { TabelaInvestimentos } from '../components/TabelaInvestimentosComponent.js'
  
createApp({
    components: {
        TabelaInvestimentos
    },
    setup() {

        return { 
            v$: useVuelidate()
        }
    },
    data() {
        
        const investimento = this.investimentoFactory()

        const mainMessage = {
            severityClass: 'is-danger',
            isActive: false,
            message: ''
        }

        const indexadores = {
            'Pré-fixado': 'Taxa a.a',
            'Pós-fixado': '% da CDI/SELIC a.a',
            'IPCA+': '% + IPCA a.a'
        }

        return {
            showConfirm: false,
            showCadastroInvestimento: false,
            showModalMessage: false,
            categoriasInvestimento: [ "CDB", "LCI/LCA", "Tesouro", "Poupança" ],
            indexadores,
            mainMessage,
            investimento,
            listaInvestimentos: []
        }
    },
    validations() {

        let investimento = {
            descricao: { required: helpers.withMessage('Informe a descrição', required), $autoDirty: true },
            corretora: { required: helpers.withMessage('Informe a corretora', required), $autoDirty: true },
            montante: {
                required: helpers.withMessage('Informe o montante', required),
                decimal: helpers.withMessage('Montante inválido', decimal),
                minValue: helpers.withMessage('O montante precisa ser maior que 0', minValue(1)),
                $autoDirty: true
            },
            taxa: {
                required: helpers.withMessage('Informe a taxa', required),
                decimal: helpers.withMessage('Taxa inválida', decimal),
                minValue: helpers.withMessage('A taxa precisa ser maior que 0', minValue(1)),
                $autoDirty: true
            },             
            dataAporte: { required: helpers.withMessage('Informe a data do aporte', required), $autoDirty: true },
            dataVencimento: { required: helpers.withMessage('Informe a data do vencimento', required), $autoDirty: true }                         
        }

        if (this.investimento.categoria === "Poupança") {
            investimento.taxa = {}             
            investimento.dataVencimento = {}            
        }

        return { investimento }
    },
    methods: {
        investimentoFactory() {

            const investimento = {
                id: '',
                categoria: 'CDB',
                descricao: '',
                corretora: '',
                montante: 0,
                taxa: 0,
                indexador: 'Pré-fixado',
                dataAporte: '',
                dataVencimento: ''
            }
            
            return investimento
        },
        async salvar() {
            this.showModalMessage = false

            const isFormCorrect = await this.v$.$validate()

            if (!isFormCorrect) return      
            
            if (this.investimento.id === '')  {
                this.investimento.id = Math.random().toString(36).substr(2, 9)
                this.listaInvestimentos.push({ ...this.investimento })
            }                          
            else {
                const index = this.listaInvestimentos.findIndex(item => item.id === this.investimento.id)
                this.listaInvestimentos.splice(index, 1, { ...this.investimento })            
            }

            this.showModalMessage = true
        },
        fecharCadastroInvestimento() {
            this.showCadastroInvestimento = false
            this.investimento = this.investimentoFactory()
            this.v$.$reset()            
        },
        abrirCadastroInvestimento() {
            this.investimento = this.investimentoFactory()
            this.v$.$reset()            
            this.showCadastroInvestimento = true
            this.mainMessage.isActive = false
            this.showModalMessage = false   
        },
        deletarInvestimento(idInvestimento) {
            const index = this.listaInvestimentos.findIndex(item => item.id === idInvestimento)
            if (index !== -1)
                this.listaInvestimentos.splice(index, 1)                  
        },
        editarInvestimento(idInvestimento) {
            const index = this.listaInvestimentos.findIndex(item => item.id === idInvestimento)
            
            if (index === -1) return

            this.investimento = this.listaInvestimentos[index]

            this.v$.$reset()     
            this.showCadastroInvestimento = true
            this.mainMessage.isActive = false
            this.showModalMessage = false
        }
    }
})
// .use(pinia)
.mount("#app")    