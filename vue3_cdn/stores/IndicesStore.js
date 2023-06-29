const { defineStore } = Pinia

export const useIndicesStore = defineStore({
    id: 'indices',
    state: () => ({
        isLoading: false,
        isErrored: false,
        oci: {
            SELIC: {},
            Poupanca: {},
            IPCA: {}
        }
    }),
    actions: {
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
    }
})