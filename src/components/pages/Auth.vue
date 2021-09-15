<template>
  <q-layout>
    <q-page-container>
      <q-page class="flex flex-center">
        <q-card square>
          <q-card-section>
            <div class="text-h5 text-center head">
              Connectez-vous à l'interface
            </div>
          </q-card-section>

          <q-form class="q-gutter-md" @submit="onSubmit">
            <q-card-section>
              <q-input
                id="email"
                v-model.trim="email"
                type="email"
                label="Email"
                :rules="validations['email']"
                lazy-rules
                autofocus
                rounded
                outlined
                dense
                class="full-width q-mb-md"
              />
              <q-input
                id="password"
                v-model="password"
                :type="showPassword ? 'text' : 'password'"
                label="Mot de passe"
                :rules="validations['password']"
                lazy-rules
                rounded
                outlined
                dense
                class="full-width q-mb-md"
              >
                <template #append>
                  <q-icon
                    :name="showPassword ? 'visibility' : 'visibility_off'"
                    class="cursor-pointer"
                    @click="showPassword = !showPassword"
                  />
                </template>
              </q-input>
            </q-card-section>
            <q-card-actions>
              <q-btn
                rounded
                label="Se connecter"
                color="primary"
                :loading="loading"
                type="submit"
                class="full-width"
                :disable="isSubmitBtnDisabled()"
              />
            </q-card-actions>
          </q-form>
        </q-card>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
//import prompts from "app/quasar.extensions.json";
import isEmail from "validator/es/lib/isEmail";
import { defineComponent, ref } from "vue";
export default defineComponent({
  name: "Auth",
  setup() {
    const email = ref("");
    const password = ref("");
    const loading = ref(false);
    const showPassword = ref(false);

    const validations = ref({
      email: [
        (val: string) => !!val || "Email requis",
        (val: string) => isEmail(val) || "Email invalide",
      ],
      password: [
        (val: string) => !!val || "Mot de passe requis",
        (val: string) =>
          val.length > 5 || "Mot de passe doit avoir au minimum 6 caractères",
      ],
    });

    const onSubmit = () => {
      loading.value = true;
      const data = {
        email: email.value,
        password: password.value,
      };
      console.log("$$$$ data : ", data);
    };

    const isSubmitBtnDisabled = () => {
      return !(
        email.value &&
        isEmail(email.value) &&
        password.value &&
        password.value.length > 5
      );
    };

    return {
      email,
      password,
      loading,
      showPassword,
      validations,
      isSubmitBtnDisabled,
      onSubmit,
    };
  },
});
</script>
