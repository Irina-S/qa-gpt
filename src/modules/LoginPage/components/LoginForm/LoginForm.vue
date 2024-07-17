<template>
  <v-card title="Вход" class="loginForm rounded-xl pa-0">
    <div class="px-6 py-10">
      <v-text-field v-model="form.login" placeholder="Логин" variant="outlined" />
      <v-text-field
        v-model="form.password"
        placeholder="Пароль"
        type="password"
        variant="outlined"
      />

      <div v-if="error" class="error mb-5">{{ error }}</div>

      <v-btn
        block
        variant="flat"
        size="large"
        class="loginBtn rounded-pill font-weight-medium"
        @click="onSubmit"
        >Войти</v-btn
      >
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
      padding: 24px 30px;

      text-align: center;
      background: var(--color-gradient);

      .v-card-title {
        font-weight: bold;
        color: white;
      }
    }
  }
}

.error {
  color: #d50000;
}

.loginBtn {
  background: var(--color-gradient);
  color: white;
}
</style>
