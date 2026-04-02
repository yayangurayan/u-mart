<template>
  <button 
    :class="[
      'px-4 py-2 rounded-lg font-bold transition-all duration-300 flex items-center justify-center gap-2', 
      variantClasses, 
      customClass
    ]"
    @click="$emit('click')"
  >
    <slot />
  </button>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  variant: {
    type: String,
    default: 'primary'
  },
  customClass: {
    type: String,
    default: ''
  }
});

const variantClasses = computed(() => {
  const variants = {
    primary: "bg-[#008542] text-white hover:bg-[#006e36] shadow-md hover:shadow-lg",
    secondary: "bg-[#FDB913] text-slate-900 hover:bg-[#e5a60e] shadow-md",
    tertiary: "bg-[#00539C] text-white hover:bg-[#00427a] shadow-md",
    outline: "border-2 border-[#008542] text-[#008542] hover:bg-green-50",
    ghost: "text-slate-600 hover:bg-slate-100"
  };
  return variants[props.variant] || variants.primary;
});
</script>