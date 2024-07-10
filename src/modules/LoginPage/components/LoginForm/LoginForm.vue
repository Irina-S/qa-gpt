<template>
  <v-card title="Вход" variant="outlined" border="opacity-25 sm" class="loginForm px-4 pb-6">
    <v-text-field v-model="form.login" label="Логин" variant="outlined" />
    <v-text-field v-model="form.password" label="Пароль" type="password" variant="outlined" />

    <div v-if="error" class="error">{{ error }}</div>

    <v-card-actions class="d-flex justify-end"
      ><v-btn
        variant="flat"
        size="large"
        class="bg-light-blue-darken-3 font-weight-medium"
        @click="onSubmit"
        >Войти</v-btn
      ></v-card-actions
    >
  </v-card>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { type LoginFormEmits } from './types';

const USERNAME = 'admin';
const PASSWORD = 'admin';

const emit = defineEmits<LoginFormEmits>();

const form = ref({ login: '', password: '' });
const error = ref('');

const onSubmit = () => {
  error.value = '';

  if (form.value.login === USERNAME && form.value.password === PASSWORD) {
    emit('login');
    return;
  }
  error.value = 'Неверный логин или пароль';
};
</script>

<style lang="scss" scoped>
.loginForm {
  min-width: 450px;

  &::v-deep {
    .v-card-title {
      margin-bottom: 16px;
    }
  }
}

.error {
  color: #d50000;
}
</style>
