<template>
  <button 
    :class="[
      'px-4 py-2 rounded-lg font-bold transition-all duration-300 flex items-center justify-center gap-2', 
      variantClasses, 
      customClass
    ]"
    @click="$emit('click')"
    :disabled="disabled"
  >
    <slot />
  </button>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  variant: { type: String, default: 'primary' },
  customClass: { type: String, default: '' },
  disabled: { type: Boolean, default: false }
});

const variantClasses = computed(() => {
  if (props.disabled) return "bg-slate-200 text-slate-400 cursor-not-allowed";
  
  const variants = {
    primary: "bg-unimed-green text-white hover:bg-unimed-dark shadow-md hover:shadow-lg",
    secondary: "bg-unimed-yellow text-slate-900 hover:bg-yellow-500 shadow-md",
    tertiary: "bg-unimed-blue text-white hover:bg-blue-800 shadow-md",
    outline: "border-2 border-unimed-green text-unimed-green hover:bg-green-50",
    ghost: "text-slate-600 hover:bg-slate-100"
  };
  return variants[props.variant] || variants.primary;
});
</script>