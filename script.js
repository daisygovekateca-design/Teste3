	// Abrir o convite ao clicar no botão
function openInvitation() {
  const audio = document.getElementById('bg-music');
  const playBtn = document.getElementById('play-pause-btn');

  if (audio) {
    audio.play().then(() => {
      if (playBtn) playBtn.innerText = '⏸';
    }).catch(err => console.log("Áudio:", err));
  }

  // Rola suavemente até o conteúdo
  const mainContent = document.getElementById('main-content');
  if (mainContent) {
    mainContent.scrollIntoView({ behavior: 'smooth' });
  }
}

// Controlar Música Flutuante
function toggleMusic() {
  const audio = document.getElementById('bg-music');
  const playBtn = document.getElementById('play-pause-btn');

  if (audio.paused) {
    audio.play();
    playBtn.innerText = '⏸';
  } else {
    audio.pause();
    playBtn.innerText = '▶';
  }
}

// Contagem Regressiva para 03 de Outubro de 2026
const targetDate = new Date('2026-12-18T10:00:00').getTime();

function updateCountdown() {
  const now = new Date().getTime();
  const difference = targetDate - now;

  if (difference > 0) {
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    document.getElementById('days').innerText = days < 10 ? '0' + days : days;
    document.getElementById('hours').innerText = hours < 10 ? '0' + hours : hours;
    document.getElementById('minutes').innerText = minutes < 10 ? '0' + minutes : minutes;
    document.getElementById('seconds').innerText = seconds < 10 ? '0' + seconds : seconds;
  }
}

setInterval(updateCountdown, 1000);
updateCountdown();

document.addEventListener('DOMContentLoaded', function() {
  const rsvpForm = document.getElementById('rsvp-form');

  if (rsvpForm) {
    rsvpForm.addEventListener('submit', function(e) {
      // Impede o recarregamento da página
      e.preventDefault();

      // Captura os dados inseridos
      const nome1 = document.getElementById('nome1') ? document.getElementById('nome1').value : '';
      const nome2 = document.getElementById('nome2') ? document.getElementById('nome2').value : '';
      const presencaOpcao = document.querySelector('input[name="presenca"]:checked');
      const presenca = presencaOpcao ? presencaOpcao.value : 'Sim';
      const mensagem = document.getElementById('mensagem') ? document.getElementById('mensagem').value : '';

      const numeroWhatsApp = "258849301792"; // Número no formato internacional (+258)
      let texto = "";

      // CONDIÇÃO: Mensagem diferente para "Sim" ou "Não"
      if (presenca === "Sim" || presenca === "sim") {
        texto = `*Confirmação de Presença - Casamento*%0A%0A`;
        texto += `Olá! Confirmamos a nossa presença com muito gosto! 🎉%0A%0A`;
        texto += `👤 *Convidado:* ${nome1}%0A`;
        if (nome2) texto += `👥 *Acompanhante:* ${nome2}%0A`;
        if (mensagem) texto += `💬 *Mensagem:* ${mensagem}%0A`;
      } else {
        texto = `*Aviso de Ausência - Casamento*%0A%0A`;
        texto += `Olá! Infelizmente não poderemos estar presentes no vosso grande dia. 💔%0A%0A`;
        texto += `👤 *Convidado:* ${nome1}%0A`;
        if (nome2) texto += `👥 *Acompanhante:* ${nome2}%0A`;
        if (mensagem) texto += `💬 *Mensagem:* ${mensagem}%0A`;
        texto += `%0ADesejamos toda a felicidade do mundo aos noivos!`;
      }

      // Abre o WhatsApp com a mensagem personalizada pronta
      window.open(`https://wa.me/${numeroWhatsApp}?text=${texto}`, '_blank');

      // Limpa os campos do formulário
      rsvpForm.reset();
    });
  }
});
// 1. Função para trocar o destaque visual dos botões Sim/Não
function selecionarOpcao(elemento) {
  const cards = document.querySelectorAll('.radio-card');
  cards.forEach(card => card.classList.remove('active'));
  elemento.classList.add('active');
  
  const radio = elemento.querySelector('input[type="radio"]');
  if (radio) radio.checked = true;
}

document.addEventListener('DOMContentLoaded', function() {
  
  // 2. Envio da Confirmação de Presença
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

  // 3. Publicar Mensagem no Mural
  document.addEventListener("DOMContentLoaded", function() {
  carregarMensagensDoStorage();

  const muralForm = document.getElementById("mural-form");
  if (muralForm) {
    muralForm.addEventListener("submit", function(e) {
      e.preventDefault();

      const nome = document.getElementById("mural-nome").value.trim();
      const texto = document.getElementById("mural-texto").value.trim();

      if (!nome || !texto) return;

      // Obter data atual formatada (ex: 10 de Outubro, 2026)
      const dataAtual = new Date().toLocaleDateString("pt-PT", {
        day: "numeric",
        month: "long",
        year: "numeric"
      });

      const novaMensagem = {
        nome: nome,
        texto: texto,
        data: dataAtual
      };

      // Guardar no localStorage
      let mensagens = JSON.parse(localStorage.getItem("muralMensagens") || "[]");
      mensagens.unshift(novaMensagem); // Adiciona no início da lista
      localStorage.setItem("muralMensagens", JSON.stringify(mensagens));

      // Atualizar o mural na tela e limpar formulário
      carregarMensagensDoStorage();
      muralForm.reset();
    });
  }
});

function carregarMensagensDoStorage() {
  const muralCards = document.getElementById("mural-cards");
  if (!muralCards) return;

  // Mensagens padrão iniciais (Maria João e Carlos Mendes) + as novas guardadas
  const mensagensGuardadas = JSON.parse(localStorage.getItem("muralMensagens") || "[]");

  // HTML padrão de exemplo inicial caso queiras mantê-los fixos ou podes deixar dinâmico:
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

  // Adicionar as mensagens enviadas pelos utilizadores dinamicamente
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

// Função de segurança simples para evitar erros de formatação no texto
function escapeHtml(text) {
  return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
}
// Função para abrir e fechar os detalhes do M-Pesa / Banco abaixo do botão
function toggleDetalhes(tipo) {
  const mpesa = document.getElementById('detalhes-mpesa');
  const banco = document.getElementById('detalhes-banco');

  if (tipo === 'mpesa') {
    // Alterna o M-Pesa e fecha o banco se estiver aberto
    if (mpesa.style.display === 'block') {
      mpesa.style.display = 'none';
    } else {
      mpesa.style.display = 'block';
      if (banco) banco.style.display = 'none';
    }
  } else if (tipo === 'banco') {
    // Alterna o Banco e fecha o M-Pesa se estiver aberto
    if (banco.style.display === 'block') {
      banco.style.display = 'none';
    } else {
      banco.style.display = 'block';
      if (mpesa) mpesa.style.display = 'none';
    }
  }
}

function marcarPresente(item) {
  alert("Obrigado por escolher oferecer: " + item + "!.");
}
// Função para fazer os elementos ascenderem ao rolar a página
// Função para fazer os elementos ascenderem SEMPRE que surgem no ecrã
function animarAoScroll() {
  const elementos = document.querySelectorAll('.reveal');
  const alturaJanela = window.innerHeight;

  elementos.forEach(elemento => {
    const rect = elemento.getBoundingClientRect();
    const posicaoTopo = rect.top;
    const posicaoBase = rect.bottom;

    // Se o elemento entra no ecrã ao rolar
    if (posicaoTopo < alturaJanela * 0.85 && posicaoBase > 0) {
      elemento.classList.add('active');
    } else {
      // Remove a classe quando sai do ecrã, para poder ascender novamente
      elemento.classList.remove('active');
    }
  });
}

// Escuta a rolagem da página e executa ao carregar
window.addEventListener('scroll', animarAoScroll);
document.addEventListener('DOMContentLoaded', animarAoScroll);