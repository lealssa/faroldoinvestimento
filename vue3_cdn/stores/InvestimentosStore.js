const { defineStore } = Pinia

export const useInvestimentosStore = defineStore({
    id: 'investimentos',
    state: () => ({
        investimentos: []
    }),
    actions: {
        limpar() {
            this.investimentos.splice(0, this.lista.length)
        },
        adicionar(investimento) {
            this.investimentos.push(investimento)
        }
    }    
})