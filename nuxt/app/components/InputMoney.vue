<template>
    <input 
        class="input" 
        type="text" 
        :placeholder="placeholder"
        :value="displayValue"
        @input="handleInput"
        @blur="handleBlur"
    />
</template>

<script setup>
const props = defineProps({
    modelValue: {
        type: Number,
        default: 0
    },
    placeholder: {
        type: String,
        default: '0,00'
    }
})

const emit = defineEmits(['update:modelValue'])

const displayValue = ref('')

const formatMoney = (value) => {
    if (!value && value !== 0) return ''
    return new Intl.NumberFormat('pt-BR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(value)
}

const parseMoney = (value) => {
    if (!value) return 0
    const numbers = value.replace(/[^\d]/g, '')
    return parseFloat(numbers) / 100
}

const handleInput = (event) => {
    const value = event.target.value
    const numericValue = parseMoney(value)
    displayValue.value = formatMoney(numericValue)
    emit('update:modelValue', numericValue)
}

const handleBlur = () => {
    displayValue.value = formatMoney(props.modelValue)
}

watch(() => props.modelValue, (newValue) => {
    displayValue.value = formatMoney(newValue)
}, { immediate: true })
</script>