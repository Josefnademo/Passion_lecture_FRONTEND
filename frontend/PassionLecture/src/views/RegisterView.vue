<template>
  <div class="container">
    <h1 class="page-title">Register to Passion Lecture</h1>
    <form class="register-form" @submit.prevent="handleSubmit">
      <div class="form-group">
        <label class="form-label">Name</label>
        <input type="text" v-model="formData.name" placeholder="Albert" class="form-input" />
      </div>
      <div class="form-group">
        <label class="form-label">Password</label>
        <input
          type="password"
          v-model="formData.password"
          placeholder="************"
          class="form-input"
        />
      </div>
      <div class="form-group">
        <label class="form-label">Confirm password</label>
        <input
          type="password"
          v-model="formData.confirmPassword"
          placeholder="************"
          class="form-input"
        />
      </div>
      <div class="form-actions">
        <button type="button" class="cancel-button" @click="handleCancel">Cancel</button>
        <button type="submit" class="confirm-button">Confirm</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'Register',
  data() {
    return {
      formData: {
        name: '',
        password: '',
        confirmPassword: '',
      },
    }
  },
  methods: {
    handleSubmit() {
      // Form submission logic would go here
      console.log('Form submitted:', this.formData)
      // You'd typically validate the form and handle API calls here
    },
    handleCancel() {
      // Cancel logic - for example, redirect or reset form
      this.formData = {
        name: '',
        password: '',
        confirmPassword: '',
      }
      // You might also want to navigate away:
      // this.$router.push('/');
    },
  },
}
</script>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
  padding-top: 5rem; /* Add space for fixed header */
}

.page-title {
  font-size: 2.25rem;
  font-weight: bold;
  color: #3b6992; /* text-medium-blue */
  text-align: center;
  margin-bottom: 3rem;
}

.register-form {
  max-width: 28rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-label {
  display: block;
  margin-bottom: 0.5rem;
  color: #3b6992; /* text-medium-blue */
}

.form-input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #7abc94; /* border-primary-green */
  border-radius: 0.25rem;
}

.form-actions {
  display: flex;
  justify-content: space-between;
  padding-top: 2rem;
}

.cancel-button {
  background-color: #f26565; /* bg-delete-btn */
  color: black;
  padding: 1rem 3rem;
  border-radius: 0.375rem;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s;
}

.cancel-button:hover {
  background-color: #f37777;
}

.confirm-button {
  background-color: #7abc94; /* bg-primary-green */
  color: black;
  padding: 1rem 3rem;
  border-radius: 0.375rem;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s;
}

.confirm-button:hover {
  background-color: #9ed3ac;
}
</style>
