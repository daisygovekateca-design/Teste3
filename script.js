// 1. Abrir o convite ao clicar no botão e reproduzir a música
function openInvitation() {
  const audio = document.getElementById('bg-music');
  const playBtn = document.getElementById('play-pause-btn');

  if (audio) {
    audio.play().then(() => {
      if (playBtn) playBtn.innerText = '⏸';
    }).catch(err => {
      console.log("Erro ao reproduzir áudio:", err);
    });
  }

  // Rola suavemente até o conteúdo principal
  const mainContent = document.getElementById('main-content');
  if (mainContent) {
    mainContent.scrollIntoView({ behavior: 'smooth' });
  }
}

// 2. Controlar Música Flutuante manualmente
function toggleMusic() {
  const audio = document.getElementById('bg-music');
  const playBtn = document.getElementById('play-pause-btn');

  if (!audio) return;

  if (audio.paused) {
    audio.play().then(() => {
      playBtn.innerText = '⏸';
    }).catch(err => {
      console.log("Erro ao dar play:", err);
    });
  } else {
    audio.pause();
    playBtn.innerText = '▶';
  }
}

// 3. Contagem Regressiva para 18 de Dezembro de 2026
const targetDate = new Date('2026-12-18T10:00:00').getTime();

function updateCountdown() {
  const now = new Date().getTime();
  const difference = targetDate - now;

  if (difference > 0) {
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');

    if (daysEl) daysEl.innerText = days < 10 ? '0' + days : days;
    if (hoursEl) hoursEl.innerText = hours < 10 ? '0' + hours : hours;
    if (minutesEl) minutesEl.innerText = minutes < 10 ? '0' + minutes : minutes;
    if (secondsEl) secondsEl.innerText = seconds < 10 ? '0' + seconds : seconds;
  }
}

setInterval(updateCountdown, 1000);
updateCountdown();

// 4. RSVP / Confirmação de Presença
function selecionarOpcao(elemento) {
  const cards = document.querySelectorAll('.radio-card');
  cards.forEach(card => card.classList.remove('active'));
  elemento.classList.add('active');
  
  const radio = elemento.querySelector('input[type="radio"]');
  if (radio) radio.checked = true;
}

document.addEventListener('DOMContentLoaded', function() {
  const rsvpForm = document.getElementById('rsvp-form');
  if (rsvpForm) {
    rsvpForm.addEventListener('submit', function(e) {
      e.preventDefault();

      const nome1 = document.getElementById('nome1').value;
      const nome2 = document.getElementById('nome2').value;
      const presencaOpcao = document.querySelector('input[name="presenca"]:checked');
      const presenca = presencaOpcao ? presencaOpcao.value : 'sim';

      const numeroWhatsApp = "258849301792";
      let texto = "";

      if (presenca === "sim") {
        texto = `*Confirmação de Presença - Casamento*%0A%0A`;
        texto += `Olá! Confirmamos a nossa presença com muito gosto! 🎉%0A%0A`;
        texto += `👤 *Convidado:* ${nome1}%0A`;
        if (nome2) texto += `👥 *Acompanhante:* ${nome2}%0A`;
      } else {
        texto = `*Aviso de Ausência - Casamento*%0A%0A`;
        texto += `Olá! Infelizmente não poderemos estar presentes no vosso grande dia. 💔%0A%0A`;
        texto += `👤 *Convidado:* ${nome1}%0A`;
        if (nome2) texto += `👥 *Acompanhante:* ${nome2}%0A`;
        texto += `%0ADesejamos toda a felicidade do mundo aos noivos!`;
      }

      window.open(`https://wa.me/${numeroWhatsApp}?text=${texto}`, '_blank');
      rsvpForm.reset();
    });
  }

  // 5. Mural de Mensagens
  const muralForm = document.getElementById("mural-form");
  if (muralForm) {
    muralForm.addEventListener("submit", function(e) {
      e.preventDefault();
      const nome = document.getElementById("mural-nome").value.trim();
      const texto = document.getElementById("mural-texto").value.trim();

      if (!nome || !texto) return;

      const dataAtual = new Date().toLocaleDateString("pt-PT", {
        day: "numeric",
        month: "long",
        year: "numeric"
      });

      const novaMensagem = { nome, texto, data: dataAtual };
      let mensagens = JSON.parse(localStorage.getItem("muralMensagens") || "[]");
      mensagens.unshift(novaMensagem);
      localStorage.setItem("muralMensagens", JSON.stringify(mensagens));

      carregarMensagensDoStorage();
      muralForm.reset();
    });
  }

  carregarMensagensDoStorage();
  animarAoScroll();
});

// Funções do Mural
function carregarMensagensDoStorage() {
  const muralCards = document.getElementById("mural-cards");
  if (!muralCards) return;

  const mensagensGuardadas = JSON.parse(localStorage.getItem("muralMensagens") || "[]");
  let htmlConteudo = `
      <div class="mural-card">
        <h4>Maria João</h4>
        <span class="mural-date">10 de Outubro, 2026</span>
        <p>"Desejo toda a felicidade do mundo a vocês dois! Que este amor seja eterno."</p>
        <span class="mural-footer">Com carinho</span>
      </div>
      <div class="mural-card">
        <h4>Carlos Mendes</h4>
        <span class="mural-date">18 de Outubro, 2026</span>
        <p>"Parabéns pelo grande dia! Mal posso esperar para celebrar convosco."</p>
        <span class="mural-footer">Com carinho</span>
      </div>
  `;

  mensagensGuardadas.forEach(msg => {
    htmlConteudo += `
      <div class="mural-card">
        <h4>${escapeHtml(msg.nome)}</h4>
        <span class="mural-date">${msg.data}</span>
        <p>"${escapeHtml(msg.texto)}"</p>
        <span class="mural-footer">Com carinho</span>
      </div>
    `;
  });

  muralCards.innerHTML = htmlConteudo;
}

function escapeHtml(text) {
  return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
}

// 6. Detalhes de Pagamento (M-Pesa / Banco)
function toggleDetalhes(tipo) {
  const mpesa = document.getElementById('detalhes-mpesa');
  const banco = document.getElementById('detalhes-banco');

  if (tipo === 'mpesa') {
    if (mpesa.style.display === 'block') {
      mpesa.style.display = 'none';
    } else {
      mpesa.style.display = 'block';
      if (banco) banco.style.display = 'none';
    }
  } else if (tipo === 'banco') {
    if (banco.style.display === 'block') {
      banco.style.display = 'none';
    } else {
      banco.style.display = 'block';
      if (mpesa) mpesa.style.display = 'none';
    }
  }
}

// 7. Escolha de Presentes da Lista
function escolherPresente(presente, btn) {
  const dataHora = new Date().toLocaleString("pt-PT");
  let registos = JSON.parse(localStorage.getItem("registosPresentes") || "[]");
  
  if (!registos.some(item => item.presente === presente)) {
    registos.push({ presente: presente, data: dataHora });
    localStorage.setItem("registosPresentes", JSON.stringify(registos));
  }

  marcarComoEscolhido(btn);

  const numeroTelefone = "258845770605";
  const textoMensagem = `Olá! O seguinte presente foi escolhido na lista do site: 🎁 *${presente}* (Data: ${dataHora})`;
  const urlWhatsapp = `https://wa.me/${numeroTelefone}?text=${encodeURIComponent(textoMensagem)}`;

  window.open(urlWhatsapp, "_blank");
}

function marcarComoEscolhido(btn) {
  btn.innerText = "Presente Escolhido";
  btn.style.backgroundColor = "#999999";
  btn.style.cursor = "not-allowed";
  btn.disabled = true;
}

// 8. Efeito de animação ao fazer scroll
function animarAoScroll() {
  const elementos = document.querySelectorAll('.reveal');
  const alturaJanela = window.innerHeight;

  elementos.forEach(elemento => {
    const rect = elemento.getBoundingClientRect();
    if (rect.top < alturaJanela * 0.85 && rect.bottom > 0) {
      elemento.classList.add('active');
    } else {
      elemento.classList.remove('active');
    }
  });
}

window.addEventListener('scroll', animarAoScroll);