<template>
  <b-container>
    <v-form ref="form" v-model="valid" lazy-validation container>
      <v-text-field
        v-model="nickname"
        :counter="10"
        label="Username"
        :disabled="!valid"
        required
      ></v-text-field>
      <v-text-field
        v-model="name"
        :counter="10"
        label="Name"
        :disabled="!valid"
        required
      ></v-text-field>

      <v-text-field
        v-model="email"
        label="E-mail"
        required
        :disabled="!valid"
      ></v-text-field>
      <v-text-field
        v-model="roles"
        label="Role"
        :disabled="!valid"
        required
      ></v-text-field>

      <v-textarea
        name="description"
        filled
        label="description"
        auto-grow
        v-model="description"
        :disabled="!valid"
      ></v-textarea>
      <v-btn :disabled="!valid" color="success" class="mr-4" @click="validate">
        Update
      </v-btn>

      <v-btn color="warning" @click="editForm"> {{ editFormBtn }} </v-btn>
    </v-form>
  </b-container>
</template>
<script>
// @ts-check

import { useUserStore } from "../stores/user";

export default {
  data: () => {
    return {
      user: useUserStore().user,
      valid: true,
      /** @type String */
      nickname: useUserStore().user.username,
      /** @type String */
      name: useUserStore().user.firstName + " " + useUserStore().user.lastName,
      nameRules: [
        (v) => !!v || "Name is required",
        (v) => (v && v.length <= 10) || "Name must be less than 10 characters",
      ],
      /** @type String */
      email: useUserStore().user.email,
      emailRules: [
        (v) => !!v || "E-mail is required",
        (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
      ],
      /** @type String */
      roles: useUserStore().user.roles[0],
      /** @type String */
      description: useUserStore().user.description,
      /** @type String */
      avatar: useUserStore().user.avatar_url,
      isAuthenticated: useUserStore().user.isAuthenticated,
      editFormBtn: "Edit",
    };
  },

  computed: {
    checkAuth() {
      if (useUserStore().user.isAuthenticated) {
        return useUserStore().user;
      } else {
        useUserStore().getCurrentUser();
        return useUserStore().user;
      }
    },
    checkUserStore() {
      if (useUserStore().user.roles[0]) {
        return useUserStore().user;
      } else {
        useUserStore().getCurrentUser();
        return useUserStore().user;
      }
    },
  },

  methods: {
    validate() {
      console.log("form clicked", this.$refs);
      this.$refs.form.validate();
    },
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },
    editForm() {
      this.valid = !this.valid;
      if (this.valid) {
        this.editFormBtn = "Cancel";
      } else {
        this.editFormBtn = "Edit";
      }
    },
  },
};

console.log("profile user", useUserStore().user.roles[0]);
</script>
