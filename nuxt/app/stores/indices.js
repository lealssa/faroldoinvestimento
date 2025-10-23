export const useIndicesStore = defineStore('indicesStore', {
    state: () => ({
        hasIndices: false,
        isLoading: false,
        isErrored: false,
        oci: {
            SELIC: {},
            Poupanca: {},
            IPCA: {}
        }
    }),
    actions: {
        async fetchIndicesOCI() {
            if (this.isLoading) return;

            this.isLoading = true;
            this.isErrored = false;

            const url = `https://objectstorage.sa-vinhedo-1.oraclecloud.com/n/axjwvnzorobg/b/indices/o/latest.json`;

            try {
                const res = await fetch(url);

                if (!res.ok) {
                    throw new Error(`Falha ao buscar índices: Status ${res.status}`);
                }

                const json = await res.json();

                if (Array.isArray(json)) {
                    this.oci.SELIC = json.find((item) => item.nome === 'SELIC');
                    this.oci.IPCA = json.find((item) => item.nome === 'IPCA');
                    this.oci.Poupanca = json.find((item) => item.nome === 'Poupança');
                    this.hasIndices = true;
                } else {
                    throw new Error('Formato de dados inesperado.');
                }

            } catch (err) {
                this.isErrored = true;
                console.error("Erro ao buscar dados OCI:", err);
            } finally {
                this.isLoading = false;
            }
        }
    },
})