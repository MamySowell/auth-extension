<template>
  <q-layout>
    <q-page-container>
      <q-page class="flex flex-center">
        <q-card square>
          <q-card-section>
            <div class="text-h5 text-center head">
              {{ $t("auth.title") }}
            </div>
          </q-card-section>

          <q-form class="q-gutter-md" @submit="onSubmit">
            <q-card-section>
              <q-input
                id="email"
                v-model.trim="emailOrPhone"
                type="email"
                :label="$t('auth.email')"
                :rules="validations['emailOrPhone']"
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
                :label="$t('auth.password')"
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
            <div class="forgottenPass">
              <q-btn
                @click="forgottenPassword = true"
                no-caps
                flat
                :label="$t('auth.forgottenPassword')"
              />
            </div>
            <q-card-actions>
              <q-btn
                rounded
                :label="$t('auth.login')"
                color="primary"
                :loading="loading"
                type="submit"
                class="full-width"
              />
            </q-card-actions>
          </q-form>
        </q-card>
        <div>
          <q-dialog v-model="forgottenPassword" persistent>
            <q-card style="min-width: 350px">
              <q-card-section>
                <p class="resetPasswordTitle">
                  {{ $t("auth.tapEmail") }}
                </p>
              </q-card-section>

              <q-card-section class="q-pt-none">
                <q-input
                  v-model="emailResetPassword"
                  dense
                  rounded
                  outlined
                  :placeholder="$t('auth.email')"
                  autofocus
                />
              </q-card-section>

              <q-card-actions align="right">
                <q-btn
                  outline
                  rounded
                  :label="$t('common.cancel')"
                  class="btn-min"
                  v-close-popup
                />
                <q-btn
                  rounded
                  color="primary"
                  :label="$t('common.send')"
                  class="btn-min"
                  @click="resetPassword"
                />
              </q-card-actions>
            </q-card>
          </q-dialog>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import prompts from "app/quasar.extensions.json";
import { useQuasar } from "quasar";
import { useRouter } from "vue-router";
import { ref, onMounted, defineComponent, inject } from "vue";
import isEmail from "validator/es/lib/isEmail";
import { useI18n } from "vue-i18n";
import { AuthHelper } from "../../utils/helpers";
import { Store } from "vuex";
import { AxiosInstance } from "axios";

export default defineComponent({
  name: "Auth",
  setup() {
    const { t } = useI18n();

    const {
      "@gastienne/auth": {
        AUTH_TYPE,
        LOCAL_SUCCESS_REDIRECTION_ROUTE,
        LOCAL_CHECK_CODE_ROUTE,
      },
    } = prompts;

    const $store = inject("$store") as Store<any>;
    const $auth = inject("$auth") as AuthHelper;
    const $q = useQuasar();
    const $router = useRouter();
    const $axios = inject("$axios") as AxiosInstance;
    const phoneRegex = /\+.[0-9]/;
    const emailOrPhone = ref("");
    const password = ref("");
    const loading = ref(false);
    const showPassword = ref(false);
    const forgottenPassword = ref(false);
    const emailResetPassword = ref("");

    onMounted(() => {
      if ($store.state.auth.token) {
        $router.replace(LOCAL_SUCCESS_REDIRECTION_ROUTE);
      }
    });

    const validations = ref({
      emailOrPhone: [
        (val: string) => !!val || t("auth.emailPresenceError"),
        (val: string) =>
          isEmail(val) ||
          phoneRegex.test(val) ||
          t("auth.emailValidationError"),
      ],
      password: [(val: any) => !!val || t("auth.passwordPresenceError")],
    });

    const resetPassword = () => {
      let data = null;
      if (isEmail(emailResetPassword.value)) {
        data = {
          email: emailResetPassword.value,
        };
      } else if (phoneRegex.test(emailResetPassword.value)) {
        data = {
          phone_number: emailResetPassword.value,
        };
      }

      $auth
        .resetPassword(data)
        .then(() => {
          $q.notify({
            message: t("auth.emailSent"),
            color: "positive",
            position: "top",
          });
          $router.push(LOCAL_CHECK_CODE_ROUTE);
        })
        .catch(() => {
          $q.notify({
            message: t("auth.emailNotRecognize"),
            color: "negative",
            position: "top",
          });
        });
    };

    const onSubmit = () => {
      loading.value = true;
      let data = null;

      if (isEmail(emailOrPhone.value)) {
        data = {
          email: emailOrPhone.value,
          password: password.value,
        };
      } else if (phoneRegex.test(emailOrPhone.value)) {
        data = {
          phone_number: emailOrPhone.value,
          password: password.value,
        };
      }

      $auth
        .signIn(data)
        .then((response: any) => {
          const token = response.data.token;
          $store.dispatch("auth/updateToken", token);

          $axios.defaults.headers.Authorization = `${AUTH_TYPE} ${token}`;

          $router.push(LOCAL_SUCCESS_REDIRECTION_ROUTE);
        })
        .catch(() => {
          loading.value = false;
          $q.notify({
            message: t("auth.loginFailed"),
            color: "negative",
            position: "top",
          });
        });
    };

    return {
      emailOrPhone,
      password,
      loading,
      showPassword,
      validations,
      onSubmit,
      forgottenPassword,
      emailResetPassword,
      resetPassword,
    };
  },
});
</script>
