document.addEventListener("DOMContentLoaded", () => {
  // Menu hamburger (toggle) para dispositivos móveis
  const navToggle = document.querySelector(".nav-toggle");
  const navMenu = document.querySelector("nav ul");

  if (navToggle && navMenu) {
    navToggle.addEventListener("click", () => {
      navMenu.classList.toggle("nav-open");
      navToggle.classList.toggle("active");
    });
  }

  // Scroll suave para links internos
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", e => {
      e.preventDefault();
      const targetID = anchor.getAttribute("href").substring(1);
      const targetElement = document.getElementById(targetID);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  // Validação simples do formulário de contacto
  const form = document.getElementById("formulario-contato");
  if (form) {
    form.addEventListener("submit", e => {
      e.preventDefault();

      // Obter campos (assumindo que existem campos nome, email e mensagem)
      const nome = form.querySelector('input[name="nome"]');
      const email = form.querySelector('input[name="email"]');
      const mensagem = form.querySelector('textarea[name="mensagem"]');

      // Limpar mensagens anteriores
      clearErrors(form);

      let valid = true;

      // Validações básicas
      if (!nome.value.trim()) {
        showError(nome, "Por favor, insira o seu nome.");
        valid = false;
      }
      if (!validateEmail(email.value)) {
        showError(email, "Por favor, insira um email válido.");
        valid = false;
      }
      if (!mensagem.value.trim()) {
        showError(mensagem, "Por favor, escreva uma mensagem.");
        valid = false;
      }

      if (valid) {
        // Simular envio - aqui podes implementar o envio real se necessário
        alert("Mensagem enviada com sucesso!");
        form.reset();
      }
    });
  }

  // Mostrar/ocultar erros
  function showError(element, message) {
    const error = document.createElement("small");
    error.className = "error-message";
    error.textContent = message;
    element.classList.add("input-error");
    element.parentNode.appendChild(error);
  }

  function clearErrors(form) {
    form.querySelectorAll(".error-message").forEach(e => e.remove());
    form.querySelectorAll(".input-error").forEach(e => e.classList.remove("input-error"));
  }

  // Validador básico de email
  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  // Animação simples: destacar secções quando entram no viewport
  const sections = document.querySelectorAll("section");
  const observerOptions = {
    threshold: 0.25
  };

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, observerOptions);

  sections.forEach(section => observer.observe(section));
});
