const { defineStore } = Pinia

export const useSimulacoesStore = defineStore({
    id: 'simulacoes',
    state: () => ({
        lista: [],
    }),
    getters: {
        hasSimulation: (state) => state.lista.length > 0,
        count: (state) => state.lista.length,
        totalMontanteAplicado: (state) => state.lista.reduce((accumulator, item) => accumulator + item.montanteAplicado, 0),
        totalValorNoVencimento: (state) => state.lista.reduce((accumulator, item) => accumulator + item.valorNoVencimento, 0),
        totalBruto: (state) => state.lista.reduce((accumulator, item) => accumulator + item.bruto, 0),
        totalImpostoDevido: (state) => state.lista.reduce((accumulator, item) => accumulator + item.impostoDevido, 0),
        totalLiquido: (state) => state.lista.reduce((accumulator, item) => accumulator + item.liquido, 0)
    },
    actions: {
        remover(index) {
            this.lista.splice(index, 1)
        },
        limpar() {
            this.lista.splice(0, this.lista.length)
        },
        inserir(simulacao) {
            let exists = this.lista.filter(item => JSON.stringify(item) === JSON.stringify(simulacao)).length > 0
            if (!exists) this.lista.push(simulacao)
        },
        gerarCSV() {
            if (!this.hasSimulation) return

            let csv = '';
            let propriedades = Object.keys(this.lista[0]);
            const header = ["Montante (R$)", "Valor no vencimento (R$)", "Bruto (R$)", "Líquido (R$)", "IR (R$)", "Alíquota IR (%)", "Prazo a.m", "Info", "Taxa a.a",]
            csv += header.join(',') + '\n';
            for (let i = 0; i < this.lista.length; i++) {
                let valores = propriedades.map(propriedade => this.lista[i][propriedade]);
                csv += valores.join(',') + '\n';
            }

            return csv

        }
    }
})