<template>
  <v-app>
    <v-content>
      <v-container>
        <v-row>
          <v-col>
            <v-card>
              <v-card-title>
                <h1>Welcome</h1>
              </v-card-title>
              <v-card-text>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar tempor.</p>
              </v-card-text>
              <v-card-actions>
                <v-btn color="primary" @click="openRegisterModal">Register</v-btn>
                <v-btn color="secondary" @click="openLoginModal">Login</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
    <v-footer>
      <p>Copyright &copy; {{ currentYear }} MyCompany. All rights reserved.</p>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    currentYear: new Date().getFullYear(),
    showLoginModal: false,
    showRegisterModal: false
  }),
  methods: {
    openLoginModal() {
      this.showLoginModal = true
    },
    openRegisterModal() {
      this.showRegisterModal = true
    },
    closeModal() {
      this.showLoginModal = false
      this.showRegisterModal = false
    }
  },
  apollo: {
    // Apollo queries and mutations go here
  }
}
</script>
