<template>
  <button 
    :class="[
      'px-4 py-2 rounded-xl font-extrabold transition-all duration-300 ease-out flex items-center justify-center gap-2 active:scale-95', 
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
  if (props.disabled) return "bg-slate-200 dark:bg-slate-700 text-slate-400 dark:text-slate-500 cursor-not-allowed shadow-none border-transparent";
  
  // BUG FIXED: Mengembalikan animasi hover terangkat (-translate-y-1) dan transisi shadow yang elegan
  const variants = {
    primary: "bg-unimed-green text-white hover:bg-unimed-dark hover:-translate-y-1 hover:shadow-xl hover:shadow-unimed-green/40 shadow-lg shadow-unimed-green/30 dark:shadow-none",
    secondary: "bg-unimed-yellow text-slate-900 hover:bg-yellow-400 hover:-translate-y-1 hover:shadow-xl hover:shadow-unimed-yellow/40 shadow-lg shadow-unimed-yellow/30 dark:shadow-none",
    tertiary: "bg-unimed-blue text-white hover:bg-blue-700 hover:-translate-y-1 hover:shadow-xl hover:shadow-unimed-blue/40 shadow-lg shadow-unimed-blue/30 dark:shadow-none",
    outline: "bg-transparent border-2 border-unimed-green text-unimed-green hover:bg-unimed-green hover:text-white dark:hover:text-white hover:-translate-y-1 hover:shadow-lg hover:shadow-unimed-green/30 shadow-sm",
    ghost: "bg-transparent text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-white hover:-translate-y-1 shadow-none border-transparent"
  };
  
  return variants[props.variant] || variants.primary;
});
</script>