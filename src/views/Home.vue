<template>
  <section>
    <Navbar :user="nameUser" :role="role" />
    <section class="container p-3">
      <div v-if="role === 'administrador'" class="section-coordinador">
        <Administrator />
      </div>
      <div v-else class="section-maintenance">
        <Maintenance />
      </div>
    </section>
  </section>
</template>

<script>
import Navbar from '../components/Navbar.vue';
import Maintenance from '../components/Maintenance.vue';
import Administrator from '../components/Administrator.vue';

export default {
  name: 'home-app',
  components: {
    Navbar,
    Maintenance,
    Administrator,
  },
  data() {
    return {
      role: '',
      nameUser: '',
    };
  },
  mounted() {
    let dataUser = JSON.parse(localStorage.getItem('dataUser'));
    this.role = dataUser.user;
    this.nameUser = `${dataUser.firstname} ${dataUser.lastname}`;
  },
};
</script>

<style></style>
