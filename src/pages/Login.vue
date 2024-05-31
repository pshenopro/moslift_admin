<script setup>
import {reactive, ref} from "vue";
import { useRouter } from 'vue-router'
import { toast } from 'vue3-toastify';

import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword  } from 'firebase/auth';
import { firebaseConfig } from '../constant.js'

const router = useRouter()
const app = initializeApp(firebaseConfig)
const auth = getAuth(app);

  const state = reactive({
    form: false,
    email: null,
    password: null,
    loading: false,
  })

const required = (v) => {
  return !!v || 'Field is required'
}

const fetchlogin = async () => {
  state.loading = true

  try {
    const { user } = await signInWithEmailAndPassword(auth, state.email, state.password)

    state.loading = false
    localStorage.setItem('user', JSON.stringify({
        ...user,
        name: user.email?.split('@')?.[0] || user.email
    }))
    router.push('/home')
  } catch (e) {
    // toast("Ошибка авторизации", {
    //   autoClose: 1000,
    //   position: toast.POSITION.TOP_RIGHT,
    // });
  } finally {
    state.loading = false
  }
}

</script>

<template>
  <div class="login">
    <v-card class="mx-auto px-6 py-8" min-width="400px" elevation="8">
      <v-form
          v-model="state.form"
          @submit.prevent="fetchlogin"
      >
        <v-text-field
            v-model="state.email"
            :readonly="state.loading"
            :rules="[required]"
            class="mb-2"
            label="Email"
            clearable
        ></v-text-field>

        <v-text-field
            v-model="state.password"
            :readonly="state.loading"
            :rules="[required]"
            type="password"
            label="Password"
            placeholder="Enter your password"
            clearable
        ></v-text-field>

        <br>

        <v-progress-circular
            v-if="state.loading"
            :size="30"
            color="amber"
            indeterminate
        ></v-progress-circular>

        <v-btn
            v-else
            :disabled="!state.form"
            :loading="state.loading"
            color="success"
            size="large"
            type="submit"
            variant="elevated"
            block
        >
          Login
        </v-btn>
      </v-form>
    </v-card>
  </div>
</template>

<style lang="scss" scoped>
  .login {
    width: 100%;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #4343439c;
  }

  .v-progress-circular {
    display: flex;
    margin: 0 auto;
  }
</style>
