<template>
  <footer>
    <h1>Passion Lecture</h1>
    <div>
      <div class="text-left">
        <h2 class="titleCreators">Créateurs d’application:</h2>
        <p>Yosef N.</p>
        <p>Antoine P.</p>
        <p>Charles-Henri M.</p>
      </div>
      <div class="text-right">
        <h2 class="titleContact">Contacts:</h2>
        <p>pn25kdv@eduvaud.ch</p>
        <p>pn01kbc@eduvaud.ch</p>
        <p>pc01zcg@eduvaud.ch</p>
      </div>
    </div>
  </footer>
</template>

<script></script>

<style scoped>
footer {
  justify-content: center;
  align-items: center;
  width: 100%;
  background-color: #b6e1c6;
  color: rgb(255, 255, 255);
  padding: 20px;
}

footer div {
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
}

footer h1 {
  text-align: center;
  font-size: 24px;
  margin-bottom: 20px;
}
footer h2 {
  text-decoration: wavy;
}

.text-left,
.text-right {
  display: inline-block;
  vertical-align: top;
  margin: 0 40px;
}

.text-left h2,
.text-right h2 {
  font-size: 18px;
  margin-bottom: 10px;
}

.text-left p,
.text-right p {
  margin: 5px 0;
  font-size: 16px;
}
</style>
