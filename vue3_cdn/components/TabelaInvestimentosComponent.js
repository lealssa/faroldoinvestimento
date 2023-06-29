export const TabelaInvestimentos = {
    props: {
        investimentos: []
    },           
    template: `
    <!-- Tabela investimentos -->
    <div class="has-background-white">

        <!-- Tabela -->
        <table class="table is-fullwidth is-hoverable">
            <thead>
                <tr>
                    <th>Categoria</th>
                    <th>Descrição</th>
                    <th>Corretora/banco</th>
                    <th>Montante</th>
                    <th>Taxa a.a</th>
                    <th>Indexador</th>
                    <th>Data aporte</th>
                    <th>Data vencimento</th>
                    <th></th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(investimento, index) in investimentos" :key="index">
                    <td>{{ investimento.categoria }}</td>
                    <td>{{ investimento.descricao }}</td>
                    <td>{{ investimento.corretora }}</td>
                    <td>{{ investimento.montante ? investimento.montante.toLocaleString('pt-BR', { style: 'currency',currency: 'BRL' }) : '' }}</td>
                    <td>{{ investimento.taxa ? investimento.taxa.toLocaleString('pt-BR', {
                        style: 'percent',
                        minimumFractionDigits: 1,
                        maximumFractionDigits: 1,
                        }) : '' }}</td>
                    <td>{{ investimento.indexador }}</td>
                    <td>{{ investimento.dataAporte }}</td>
                    <td>{{ investimento.dataVencimento }}</td>
                    <td>
                        <button class="button has-text-grey-dark" @click="$emit('edit-investimento', investimento.id)">
                            <span class="icon">
                                <i class="fas fa-pencil" aria-hidden="true"></i>
                            </span>                          
                        </button>         
                        <button class="button has-text-grey-dark" @click="$emit('delete-investimento', investimento.id)">
                            <span class="icon">
                                <i class="fas fa-trash" aria-hidden="true"></i>
                            </span>                          
                        </button>   
                    <td>
                </tr>
            </tbody>
        </table>

        <hr>

        <!-- Resultado total -->
        <div class="columns is-centered">

            <div class="column has-text-centered is-4">
                <p class="subtitle">Qtd. investimentos</p>
                <p class="title is-size-4">{{ investimentos.length }}</p>
            </div>

            <div class="column has-text-centered is-4">
                <p class="subtitle">Total investido</p>
                <p class="title is-size-4">{{ investimentos.reduce((accumulator,
                    currentValue) => accumulator + currentValue.montante,
                    0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}}</p>
            </div>

            <div class="column has-text-centered is-4">
                <p class="subtitle">Total projetado</p>
                <p class="title is-size-4">{{ investimentos.reduce((accumulator,
                    currentValue) => accumulator + currentValue.montante, 0)}}</p>
            </div>

        </div>
    </div>
    `
}