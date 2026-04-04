<template>
  <button 
    :class="[
      'px-4 py-2 rounded-xl font-extrabold transition-all duration-300 flex items-center justify-center gap-2 border border-black/5 active:scale-95', 
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
  if (props.disabled) return "bg-slate-200 text-slate-400 cursor-not-allowed shadow-none border-transparent";
  
  // Kontras ditingkatkan dengan text-white tegas dan shadow kuat agar tidak menyatu dengan background
  const variants = {
    primary: "bg-unimed-green text-white hover:bg-unimed-dark shadow-lg shadow-unimed-green/30",
    secondary: "bg-unimed-yellow text-slate-900 hover:bg-yellow-500 shadow-lg shadow-unimed-yellow/30",
    tertiary: "bg-unimed-blue text-white hover:bg-blue-800 shadow-lg shadow-unimed-blue/30",
    outline: "bg-white border-2 border-unimed-green text-unimed-green hover:bg-green-50 shadow-sm",
    ghost: "bg-transparent text-slate-600 hover:bg-slate-100 shadow-none border-transparent"
  };
  return variants[props.variant] || variants.primary;
});
</script>