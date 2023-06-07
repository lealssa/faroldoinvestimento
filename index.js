document.addEventListener('alpine:init', () => {

    Alpine.store('simulacoes', {
        lista: [],
        limpar() {
            this.lista.splice(0, this.lista.length)
        }
    })

    Alpine.store('indices', {
        isLoading: false,
        isErrored: false,
        oci: {
            SELIC: {},
            Poupanca: {},
            IPCA: {}
        },
        init() {
            this.fetchIndicesOCI()
        },
        fetchIndicesOCI() {

            this.isLoading = true

            const hoje = new Date()
            let ano = hoje.getFullYear()
            let mes = hoje.getMonth() + 1
            let dia = hoje.getDate()

            const dataAtual = `${ano}${mes.toString().padStart(2, '0')}${dia.toString().padStart(2, '0')}`

            const url = `https://objectstorage.sa-vinhedo-1.oraclecloud.com/n/axjwvnzorobg/b/indices/o/${dataAtual}.json`

            fetch(url)
                .then((res) => {
                    if (res.status !== 200)
                        throw new Error('Status != 200')

                    return res.json()
                })
                .then((json) => {
                    this.oci.SELIC = json.filter((item) => item.nome === 'SELIC')[0]
                    this.oci.IPCA = json.filter((item) => item.nome === 'IPCA')[0]
                    this.oci.Poupanca = json.filter((item) => item.nome === 'Poupança')[0]
                })
                .catch((err) => {
                    this.isErrored = true
                    console.error(err)
                })
                .finally(() => this.isLoading = false)
        }
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

            this.$watch('$store.indices.oci', (value) => {
                this.opcoesIndices.pre.taxa = value['SELIC'].valor
                this.opcoesIndices.poupanca.taxa = value['Poupanca'].valor

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
                taxa = (this.dadosEntrada.taxa * this.$store.indices.oci.SELIC.valor) / 100
                resultadoRendimento.info = `${this.dadosEntrada.taxa}% da SELIC a.a`

            }
            else if (this.tipoIndiceSelecionado === 'ipca') {
                taxa = parseFloat(this.dadosEntrada.taxa) + parseFloat(this.$store.indices.oci.IPCA.valor)
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