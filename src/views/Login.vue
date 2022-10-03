<template>
  <section class="bg-image">
    <section class="container-login">
      <div class="card-login">
        <h2><span class="purple-color">Smart</span> Quick</h2>
        <p>Iniciar Sesion</p>
        <p>Bienvenido por favor ingresa tu cuenta.</p>
        <div>
          <form id="form-login" class="my-3">
            <div role="group" class="mb-3">
              <label for="input-name">Usuario:</label>
              <b-form-input
                id="input-name"
                v-model="form.user"
                :state="userState"
                aria-describedby="input-live-help input-live-feedback"
                placeholder="Enter your name"
                trim
              ></b-form-input>

              <!-- This will only be shown if the preceding input has an invalid state -->
              <b-form-invalid-feedback id="input-live-feedback">
                Ingresa al menos 3 caracteres
              </b-form-invalid-feedback>
            </div>

            <div role="group">
              <label for="input-password">Contraseña:</label>
              <b-form-input
                id="input-password"
                v-model="form.password"
                :state="passwordState"
                aria-describedby="input-live-help input-live-feedback"
                placeholder=" Ingresa tu password"
                trim
                type="password"
              ></b-form-input>

              <!-- This will only be shown if the preceding input has an invalid state -->
              <b-form-invalid-feedback id="input-live-feedback">
                La contraseña debe tener 8 caracteres
              </b-form-invalid-feedback>
            </div>
            <div class="row group-actions">
              <div class="check-remindme col-6 col-m-12">
                <b-form-checkbox
                  id="checkbox-1"
                  v-model="remindMe"
                  name="checkbox-1"
                  value="accepted"
                  unchecked-value="not_accepted"
                >
                  Recuerdame
                </b-form-checkbox>
              </div>
              <div class="forgetPasssword col-6 col-m-12">
                <p>Olvidaste la contraseña</p>
              </div>
            </div>
            <div class="mt-3">
              <b-button
                type="submit"
                variant="success"
                @click="handleLogin"
                :disabled="!(userState && passwordState) || isLoading"
                >{{ isLoading ? 'Verificando....' : 'Iniciar Sesion' }}</b-button
              >
            </div>
          </form>
        </div>
      </div>
    </section>
  </section>
</template>

<script>
import { usersAllow } from '../helpers/users';
import { AlertForm, ICON } from '../helpers/Alert';
export default {
  name: 'login-app',
  data() {
    return {
      login: false,
      isLoading: false,
      form: {
        user: '',
        password: '',
      },
      remindMe: 'not_accepted',
    };
  },
  computed: {
    userState() {
      if (this.form.user.length === 0) return null;
      return this.form.user.length > 2 ? true : false;
    },
    passwordState() {
      if (this.form.password.length === 0) return null;
      return this.form.password.length >= 8 ? true : false;
    },
  },
  methods: {
    handleLogin() {
      this.isLoading = true;
      setTimeout(() => {
        //validacion Login
        let findUser = usersAllow.find((el) => el.user === this.form.user && el.password === this.form.password);
        if (findUser) {
          AlertForm({ title: `Bienvenido ${findUser.firstname} ${findUser.lastname}`, icon: ICON.SUCCESS });
          localStorage.setItem('dataUser', JSON.stringify(findUser));
          this.$router.push({ name: 'Home' });
        } else {
          AlertForm({ title: 'Usuario y/o contraseña Erroneo, intentalo nuevamente', icon: ICON.WARNING });
        }
        this.isLoading = false;
      }, 3000);
    },
  },
};
</script>

<style>
.bg-image {
  background: url('../assets/img/edificios.jpg') no-repeat;
  background-size: 100% 100%;
  min-height: 100vh;
}
.container-login {
  padding: 2rem;
  max-width: 1480px;
  height: 100vh;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
}

.card-login {
  background-color: white;
  border-radius: 1.5rem;
  box-shadow: 0 0 8px 5px #00000024;
  min-width: 450px;
  padding: 2rem;
  text-align: center;
}

.purple-color {
  color: purple;
}

.row.group-actions {
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;
}
.group-actions > .check-remindme {
  text-align: start;
}
.group-actions > .check-remindme input {
  margin-right: 0.6rem;
}
.group-actions > .forgetPasssword {
  text-align: end;
  color: purple;
}
.group-actions > .forgetPasssword:hover {
  text-decoration: underline;
  cursor: pointer;
}
button:disabled:hover {
  cursor: not-allowed;
  opacity: 0.5;
}
</style>
