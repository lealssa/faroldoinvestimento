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
        dadosEntrada: {
            montante: 0,
            prazo: 12,
            taxa: 0,
            IR: 'naoIsento'
        },
        tipoIndiceSelecionado: 'pre',
        opcoesIndices: {
            pos: { label: "% da SELIC a.a", taxa: 90 },
            pre: { label: "Taxa a.a", taxa: 0 },
            poupanca: { label: "Poupança a.a", taxa: 0 },
            ipca: { label: "+ IPCA a.a", taxa: 5 },
        },
        resultadoRendimento: {
            montanteAplicado: 0,
            valorNoVencimento: 0,
            bruto: 0,
            liquido: 0,
            impostoDeRenda: 0,
            aliquotaIR: 0,
            prazoMeses: 0,
            info: ''
        },
        init() {

            this.$watch('$store.indices.listaIndices', (value) => {
                this.opcoesIndices.pre.taxa = value['SELIC'].data
                this.opcoesIndices.poupanca.taxa = value['Poupanca'].data

                this.dadosEntrada.taxa = this.opcoesIndices.pre.taxa
            })

            this.$watch('tipoIndiceSelecionado', (value) => {
                this.dadosEntrada.taxa = this.opcoesIndices[value].taxa
            })

            this.$watch('dadosEntrada', () => {
                this.resultadoRendimento = this.rendimento
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
        },
        get isentoIR() {
            return this.dadosEntrada.IR === "isento"
        },
        get rendimento() {

            let resultadoRendimento = {
                montanteAplicado: 0,
                valorNoVencimento: 0,
                bruto: 0,
                liquido: 0,
                impostoDeRenda: 0,
                aliquotaIR: 0,
                prazoMeses: this.dadosEntrada.prazo,
                info: ''
            }

            let taxa = this.dadosEntrada.taxa

            const montante = parseInt(this.dadosEntrada.montante)

            if (this.tipoIndiceSelecionado === 'pos') {
                taxa = (this.dadosEntrada.taxa * this.$store.indices.listaIndices.SELIC.data) / 100
                resultadoRendimento.info = `${this.dadosEntrada.taxa}% da SELIC a.a`

            }                
            else if (this.tipoIndiceSelecionado === 'ipca') {
                taxa = parseFloat(this.dadosEntrada.taxa) + parseFloat(this.$store.indices.listaIndices.IPCA.data)
                resultadoRendimento.info = `${this.dadosEntrada.taxa}% + IPCA a.a`
            }
            else if (this.tipoIndiceSelecionado === 'poupanca') {
                resultadoRendimento.info = `Poupança a.a`
            }            
            else {
                resultadoRendimento.info = `${this.dadosEntrada.taxa}% a.a`
            }

            const valorNoVencimento = montante * Math.pow(1 + taxa / 100 / 12, this.dadosEntrada.prazo)

            if (isNaN(valorNoVencimento))
                return resultadoRendimento

            const rendimentoBruto = valorNoVencimento - montante

            let calculoIR
            let rendimentoLiquido
            let impostoDeRenda = 0
            let aliquotaIR = 0

            if (!this.isentoIR) {
                calculoIR = this.calculaIR(this.dadosEntrada.prazo, rendimentoBruto)
                rendimentoLiquido = rendimentoBruto - calculoIR.impostoDeRenda
                impostoDeRenda = calculoIR.impostoDeRenda
                aliquotaIR = calculoIR.aliquotaIR
            }
            else
                rendimentoLiquido = rendimentoBruto

            resultadoRendimento.montanteAplicado = montante
            resultadoRendimento.valorNoVencimento = valorNoVencimento
            resultadoRendimento.bruto = rendimentoBruto
            resultadoRendimento.liquido = rendimentoLiquido
            resultadoRendimento.impostoDeRenda = impostoDeRenda
            resultadoRendimento.aliquotaIR = aliquotaIR

            return resultadoRendimento
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