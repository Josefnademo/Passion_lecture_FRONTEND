<template>
  <footer>
    <h1 class="footer-title">Passion Lecture</h1>
    <div class="footer-content">
      <div class="footer-section">
        <h2 class="section-title">App Creators:</h2>
        <ul class="creator-list">
          <li>Yosef N.</li>
          <li>Antoine P.</li>
          <li>Charles-Henri M.</li>
        </ul>
      </div>
      <div class="footer-section">
        <h2 class="section-title">Contacts</h2>
        <ul class="contact-list">
          <li><a href="mailto:pn25kdv@eduvaud.ch">pn25kdv@eduvaud.ch</a></li>
          <li><a href="mailto:pn01kbc@eduvaud.ch">pn01kbc@eduvaud.ch</a></li>
          <li><a href="mailto:pc01zcg@eduvaud.ch">pc01zcg@eduvaud.ch</a></li>
        </ul>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'AppFooter',
}
</script>

<style scoped>
footer {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  background-color: #b6e1c6;
  color: white;
  padding: 20px 0;
  z-index: 100;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
}

.footer-title {
  text-align: center;
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  color: #f5ffed;
}

.footer-content {
  display: flex;
  justify-content: space-around;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.footer-section {
  text-align: center;
}

.section-title {
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 0.8rem;
  color: #f5ffed;
}

.creator-list,
.contact-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.creator-list li,
.contact-list li {
  margin: 0.5rem 0;
  font-size: 1rem;
}

.contact-list a {
  color: white;
  text-decoration: none;
  transition: color 0.3s;
}

.contact-list a:hover {
  color: #2c3e50;
  text-decoration: underline;
  border-radius: 5%;
}

@media (max-width: 768px) {
  .footer-content {
    flex-direction: column;
    gap: 1.5rem;
  }

  .footer-title {
    font-size: 1.3rem;
    margin-bottom: 1rem;
  }
}
</style>
