<template>
  <v-dialog v-model="localModel" width="auto">
    <v-card title="Создание контекста" min-width="500">
      <v-card-text
        ><v-text-field v-model="text" autofocus label="Название контекста" variant="outlined"
      /></v-card-text>

      <template v-slot:actions>
        <v-spacer></v-spacer>
        <v-btn class="ms-auto" text="Отмена" @click="localModel = false"></v-btn>
        <v-btn class="ms-auto" text="Ok" @click="onSave"></v-btn>
      </template>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { type CreateThreadModalEmits, type CreateThreadModalProps } from './types';

const props = defineProps<CreateThreadModalProps>();
const emit = defineEmits<CreateThreadModalEmits>();

const localModel = computed({
  get() {
    return props.modelValue;
  },
  set(newValue) {
    emit('update:modelValue', newValue);
  }
});

const text = ref('');

const onSave = () => {
  emit('create', text.value);
  text.value = '';
  localModel.value = false;
};
</script>
