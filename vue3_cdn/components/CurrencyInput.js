

export const CurrencyInput = {
    props: ['value'],
    computed: {
      formattedValue() {
        return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(this.value || 0);
      }
    },
    methods: {
      updateValue(value) {
        const rawValue = value.replace(/[^\d]/g, '');
        this.$emit('input', rawValue);
      }
    },
    template: `
    <input class="input" type="text" :value="formattedValue" @input="updateValue($event.target.value)" />
    `    
}
