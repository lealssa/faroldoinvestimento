document.addEventListener('alpine:init', () => {

    Alpine.store('simulacoes', {
        lista: []
    })

    Alpine.store('indices', {
        listaIndices: {
            SELIC: { data: null, error: null, info: { name: "SELIC", description: "Taxa básica de juros", notes: null } },
            Poupanca: { data: null, error: null, info: { name: "Poupanca", description: "Rendimento dos últimos 12 meses", notes: null } },
            IPCA: { data: null, error: null, info: { name: "IPCA", description: "Inflação acumulada dos últimos 12 meses", notes: null } }
        },
        init() {
            this.fetchSELIC(),
            this.fetchPoupanca(),
            this.fetchIPCA()
        },
        get loading() {
            return (this.listaIndices.SELIC.data === null || this.listaIndices.IPCA.data === null || this.listaIndices.Poupanca.data === null)
        },
        fetchData(url, handleData, propName) {
            fetch(url)
                .then((res) => {
                    if (res.status !== 200)
                        this.listaIndices[propName].error = `status ${res.status}`
                    return res.json()
                })
                .then((json) => (this.listaIndices[propName].data = handleData(json)))
                .catch((err) => {
                    this.listaIndices[propName].error = err
                })
        },
        fetchIPCA() {
            const date = new Date();
            let year = date.getFullYear();
            let month = date.getMonth();
            if (month === 0) {
                month = 12;
                year--;
            }
            const period = `${year}${month.toString().padStart(2, '0')}`;
            const urlIPCA = `https://servicodados.ibge.gov.br/api/v3/agregados/7062/periodos/${period}/variaveis/1120?localidades=N1[all]&classificacao=315[7169]`;
            this.listaIndices.IPCA.info.notes = `Medido em ${new Date(year, month - 1).toLocaleString('pt-BR', { month: 'long' })} de ${year} pelo IBGE`
            this.fetchData(urlIPCA, (json) => json[0].resultados[0].series[0].serie[period], "IPCA")
        },
        fetchSELIC() {
            const date = new Date();
            const year = date.getFullYear();
            const month = (date.getMonth() + 1).toString().padStart(2, '0');
            const day = date.getDate().toString().padStart(2, '0');
            const period = `${day}/${month}/${year}`;
            const urlSELIC = `https://api.bcb.gov.br/dados/serie/bcdata.sgs.432/dados?formato=json&dataInicial=${period}&dataFinal=${period}`;
            this.listaIndices.SELIC.info.notes = `Obtido em ${new Intl.DateTimeFormat("pt-BR", { dateStyle: "short", timeStyle: "medium", }).format(new Date())}`
            this.fetchData(urlSELIC, (json) => json[0].valor, "SELIC")
        },
        fetchPoupanca() {
            const urlPoupanca = `https://api.bcb.gov.br/dados/serie/bcdata.sgs.195/dados/ultimos/12?formato=json`;
            this.listaIndices.Poupanca.info.notes = `Obtido em ${new Intl.DateTimeFormat("pt-BR", { dateStyle: "short", timeStyle: "medium", }).format(new Date())}`
            this.fetchData(urlPoupanca, (json) => json.reduce((accumulator, currentValue) => { return accumulator + parseFloat(currentValue.valor) }, 0), "Poupanca")
        },
    })

    Alpine.data('simulador', () => ({
        montante: 0,
        prazo: 12,
        tipo: 'pre',
        taxa: 0,
        defaultTaxaPos: 90,
        IR: "naoIsento",
        resultadoRendimento: {
            montanteAplicado: 0,
            valorNoVencimento: 0,
            bruto: 0,
            liquido: 0,
            impostoDeRenda: 0,
            aliquotaIR: 0
        },
        init() {

            this.taxa = this.$store.indices.listaIndices.SELIC.data ?? 0

            this.$watch('$store.indices.listaIndices.SELIC.data', (value) => {
                this.taxa = value;
            })

            this.$watch('tipo', (value) => {
                if (value === 'pos')
                    this.taxa = this.defaultTaxaPos
                else
                    this.taxa = this.$store.indices.listaIndices.SELIC.data
            })
        },
        salvar() {
            const result = { ...this.rendimento }

            if (isNaN(result.valorNoVencimento) || result.valorNoVencimento === 0)
                return

            const existe = this.$store.simulacoes.lista.filter(item => JSON.stringify(item) === JSON.stringify(result))

            if (existe.length > 0)
                return


            this.$store.simulacoes.lista.push(result)

            this.montante = 0
        },
        get isentoIR() {
            return this.IR === "isento"
        },
        get rendimento() {

            let taxa = this.taxa

            const montante = parseInt(this.montante)

            if (this.tipo === 'pos')
                taxa = (this.taxa * this.$store.indices.listaIndices.SELIC.data) / 100

            const valorNoVencimento = montante * Math.pow(1 + taxa / 100 / 12, this.prazo)

            if (isNaN(valorNoVencimento))
                return this.resultadoRendimento

            const rendimentoBruto = valorNoVencimento - montante

            let calculoIR
            let rendimentoLiquido
            let impostoDeRenda = 0
            let aliquotaIR = 0

            if (!this.isentoIR) {
                calculoIR = this.calculaIR(this.prazo, rendimentoBruto)
                rendimentoLiquido = rendimentoBruto - calculoIR.impostoDeRenda
                impostoDeRenda = calculoIR.impostoDeRenda
                aliquotaIR = calculoIR.aliquotaIR
            }
            else
                rendimentoLiquido = rendimentoBruto

            this.resultadoRendimento.montanteAplicado = montante
            this.resultadoRendimento.valorNoVencimento = valorNoVencimento
            this.resultadoRendimento.bruto = rendimentoBruto
            this.resultadoRendimento.liquido = rendimentoLiquido
            this.resultadoRendimento.impostoDeRenda = impostoDeRenda
            this.resultadoRendimento.aliquotaIR = aliquotaIR

            return this.resultadoRendimento
        },
        calculaIR(prazoMes, rendimentoBruto) {
            let aliquotaIR

            if (prazoMes <= 6) {
                aliquotaIR = 0.225
            } else if (prazoMes > 6 && prazoMes <= 12) {
                aliquotaIR = 0.2
            } else if (prazoMes > 12 && prazoMes <= 24) {
                aliquotaIR = 0.175
            } else {
                aliquotaIR = 0.15
            }

            return {
                impostoDeRenda: rendimentoBruto * aliquotaIR,
                aliquotaIR: aliquotaIR
            }
        }
    }))

})