<template>
  <v-card title="Вход" class="loginForm border rounded-xl pa-0" elevation="0">
    <div class="px-6 pt-5 pb-6">
      <v-text-field v-model="form.login" label="Логин" variant="solo-filled" />
      <v-text-field v-model="form.password" label="Пароль" type="password" variant="solo-filled" />

      <div v-if="error" class="error mb-5">{{ error }}</div>

      <v-btn block variant="flat" size="large" class="primary" @click="onSubmit">Войти</v-btn>
    </div>
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
  min-width: 400px;

  &::v-deep {
    .v-card-item {
      padding: 20px 30px 12px;

      text-align: center;

      .v-card-title {
        font-weight: bold;
        font-size: 24px;
      }
    }
  }
}

.error {
  color: #d50000;
}
</style>
