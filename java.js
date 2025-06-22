document.addEventListener("DOMContentLoaded", function() {

	// Menu Links
	const menuLinks = document.querySelectorAll(".menu-link");
	const sections = document.querySelectorAll("section");

	const hideAllSections = () => {
		sections.forEach(section => section.classList.add("hidden"));
	};

	menuLinks.forEach(link => {
		link.addEventListener("click", (e) => {
			e.preventDefault();
			const targetId = link.getAttribute("href").substring(1);
			const targetSection = document.getElementById(targetId);

			if (targetSection) {
				hideAllSections();
				targetSection.classList.remove("hidden");
				targetSection.scrollIntoView({
					behavior: "smooth"
				});
			}
		});
	});

	const homeSection = document.getElementById("home");
	if (homeSection) {
		hideAllSections();
		homeSection.classList.remove("hidden");
	}

	// Menu Logo Toggle
	const menuLogo = document.querySelector(".menu-logo");
	const menuContent = document.querySelector(".menu-content");
	if (menuLogo && menuContent) {
		menuLogo.addEventListener("click", () => {
			menuContent.classList.toggle("show-menu");
		});
	}

	// --- DESCONTOS POR DISTRIBUIDORA PARA O SIMULADOR DE ENERGIA POR ASSINATURA ---
	const descontosPorDistribuidora = {
	    "AL": [
	        { nome: "Equatorial AL", desconto: 0.10 }
	    ],
	    "CE": [
	        { nome: "Enel CE", desconto: 0.15 }
	    ],
	    "DF": [
	        { nome: "Neoenergia (CEBDIS)", desconto: 0.10 }
	    ],
	    "ES": [
	        { nome: "EDP ES", desconto: 0.10 }
	    ],
	    "GO": [
	        { nome: "Equatorial GO", desconto: 0.10 }
	    ],
	    "MG": [
	        { nome: "CEMOG", desconto: 0.18 },
	        { nome: "Energisa (EMR)", desconto: 0.18 }
	    ],
	    "MS": [
	        { nome: "Energisa (EMS)", desconto: 0.15 }
	    ],
	    "MT": [
	        { nome: "Energisa", desconto: 0.15 }
	    ],
	    "PA": [
	        { nome: "Equatorial PA", desconto: 0.10 }
	    ],
	    "PE": [
	        { nome: "Neoenergia", desconto: 0.10 }
	    ],
	    "PR": [
	        { nome: "Copel", desconto: 0.15 }
	    ],
	    "RJ": [
	        { nome: "Enel RJ", desconto: 0.15 }
	    ],
	    "RS": [
	        { nome: "RGE", desconto: 0.15 },
	        { nome: "CEEE", desconto: 0.10 }
	    ],
	    "SC": [
	        { nome: "Celesc (DIS)", desconto: 0.15 }
	    ],
	    "SP": [
	        { nome: "CPFL Paulista", desconto: 0.10 },
	        { nome: "EDP SP", desconto: 0.10 },
	        { nome: "Energisa SP", desconto: 0.10 },
	        { nome: "CPFL Santa Cruz", desconto: 0.10 },
	        { nome: "Elektro", desconto: 0.15 }
	    ]
	};

	// --- SIMULADOR ENERGIA POR ASSINATURA ---
	const estadoSelect = document.getElementById("estado-independente");
	const distribuidoraSelect = document.getElementById("distribuidora-independente");
	const simularButton = document.getElementById("simular-independente");
	const resultadoSimulacao = document.getElementById("resultado-simulacao-independente");
	const valorSimulacao = document.getElementById("valor-simulacao-independente");

	if (estadoSelect && distribuidoraSelect && simularButton && resultadoSimulacao && valorSimulacao) {
	    // Preenche distribuidoras ao trocar o estado
	    estadoSelect.addEventListener("change", () => {
	        const estado = estadoSelect.value;
	        distribuidoraSelect.innerHTML = '<option value="">Selecione sua distribuidora</option>';
	        if (descontosPorDistribuidora[estado]) {
	            descontosPorDistribuidora[estado].forEach(distribuidora => {
	                const option = document.createElement("option");
	                option.value = distribuidora.nome;
	                option.textContent = distribuidora.nome;
	                distribuidoraSelect.appendChild(option);
	            });
	        }
	    });

	    // Simulação do desconto
	    simularButton.addEventListener("click", (e) => {
	        e.preventDefault();
	        const estado = estadoSelect.value.trim();
	        const distribuidoraNome = distribuidoraSelect.value;
	        const consumo = parseFloat(document.getElementById("consumo-independente").value.trim());

	        if (estado && distribuidoraNome && !isNaN(consumo) && consumo > 0) {
	            const dist = descontosPorDistribuidora[estado].find(d => d.nome === distribuidoraNome);
	            if (!dist) {
	                alert("Distribuidora não encontrada para o estado selecionado.");
	                return;
	            }
	            const desconto = dist.desconto;
	            // Validação de consumo mínimo
	            if (estado === "PA" && consumo < 500) {
	                alert("O valor mínimo para simulação no estado do Pará é de R$ 500.");
	                return;
	            }
	            if (estado !== "PA" && consumo < 300) {
	                alert("O valor mínimo para simulação é de R$ 300.");
	                return;
	            }
	            const valorDesconto = consumo * desconto;
	            valorSimulacao.textContent = `R$ ${valorDesconto.toFixed(2)}`;
	            resultadoSimulacao.style.display = "block";
	        } else {
	            alert("Por favor, preencha todos os campos corretamente.");
	        }
	    });

	    // Botão WhatsApp
	    const btnWhatsapp = document.getElementById('btn-fale-whatsapp');
	    if (btnWhatsapp) {
	        btnWhatsapp.addEventListener('click', function() {
	            const estado = estadoSelect.value;
	            const distribuidora = distribuidoraSelect.options[distribuidoraSelect.selectedIndex].text;
	            const consumo = document.getElementById('consumo-independente').value;
	            const desconto = valorSimulacao.textContent;

	            const mensagem = `Olá! Realizei uma simulação de desconto na fatura de energia e gostaria de mais detalhes sobre o serviço.
Estado: ${estado}
Distribuidora: ${distribuidora}
Valor Médio de Consumo: R$ ${consumo}	
Desconto Simulado: ${desconto}
Aguardo retorno e obrigado desde já!`;

	            const numero = '55996608587'; // Exemplo: '5599999999999'
	            const url = `https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`;
	            window.open(url, '_blank');
	        });
	    }
	}

	// Cards e Modais
	const cards = document.querySelectorAll(".card");
	const modalTitle = document.getElementById("serviceModalLabel");
	const carouselInner = document.querySelector("#serviceCarousel .carousel-inner");

	const cardImages = {
		"Energia por Assinatura": [
			"media/img/energiacomp.jpeg",
			"media/img/energiacomp2.jpeg",
			"media/img/energiacomp3.jpeg"
		],
		"Mercado Livre de Energia": [
			"media/img/livredeenergia.jpeg",
			"media/img/livredeenergia2.jpeg",
			"media/img/livredeenergia3.jpeg"
		],
		"Sistemas Fotovoltaicos": [
			"media/img/painelfotovoltaico.jpeg",
			"media/img/painelfotovoltaico2.jpeg",
			"media/img/painelfotovoltaico3.jpeg"
		],
		"Baterias": [
			"media/img/baterias.jpeg",
			"media/img/baterias2.jpeg",
			"media/img/baterias3.jpeg"
		]
	};

	cards.forEach(card => {
		card.addEventListener("click", () => {
			const cardTitle = card.querySelector(".card-title").textContent;
			modalTitle.textContent = cardTitle;

			const images = cardImages[cardTitle];
			carouselInner.innerHTML = images
				.map((img, index) => `
						<div class="carousel-item ${index === 0 ? "active" : ""}">
							<img src="${img}" class="d-block w-100" alt="Imagem ${index + 1}">
						</div>
					`)
				.join("");

			const modal = new bootstrap.Modal(document.getElementById("serviceModal"));
			modal.show();
		});
	});


	// --- Distribuidoras por Estado para Proposta ---
	const distribuidorasPorEstadoProposta = {
		"AC": ["Energisa Acre"],
		"AL": ["Equatorial Energia Alagoas"],
		"AM": ["Amazonas Energia"],
		"AP": ["CEA", "Equatorial Energia Amapá"],
		"BA": ["Neoenergia Coelba"],
		"CE": ["Enel Distribuição Ceará"],
		"DF": ["Neoenergia Distribuição Brasília"],
		"ES": ["EDP Espírito Santo"],
		"GO": ["Equatorial Energia Goiás"],
		"MA": ["Equatorial Energia Maranhão"],
		"MG": [
			"CEMIG Distribuição",
			"Energisa Minas Gerais",
			"DMED"
		],
		"MS": ["Energisa Mato Grosso do Sul"],
		"MT": ["Energisa Mato Grosso"],
		"PA": ["Equatorial Energia Pará"],
		"PB": ["Energisa Paraíba"],
		"PE": ["Neoenergia Pernambuco"],
		"PI": ["Equatorial Energia Piauí"],
		"PR": ["Copel Distribuição"],
		"RJ": [
			"Light",
			"Enel Distribuição Rio",
			"Energisa Nova Friburgo"
		],
		"RN": ["Neoenergia Cosern"],
		"RO": ["Energisa Rondônia"],
		"RR": ["Roraima Energia"],
		"RS": [
			"CEEE Equatorial",
			"RGE Sul"
		],
		"SC": [
			"Celesc Distribuição",
			"Energisa Sul-Sudeste"
		],
		"SE": ["Energisa Sergipe"],
		"SP": [
			"Enel Distribuição São Paulo",
			"CPFL Paulista",
			"CPFL Piratininga",
			"CPFL Santa Cruz",
			"EDP São Paulo",
			"Elektro"
		],
		"TO": ["Energisa Tocantins"]
	};

	const estadoProposta = document.getElementById("estado");
	const distribuidoraProposta = document.getElementById("distribuidora");

	if (estadoProposta && distribuidoraProposta) {
		estadoProposta.addEventListener("change", function() {
			const estado = this.value;
			distribuidoraProposta.innerHTML = '<option value="">Selecione sua distribuidora</option>';
			if (distribuidorasPorEstadoProposta[estado]) {
				distribuidorasPorEstadoProposta[estado].forEach(function(distribuidora) {
					const option = document.createElement("option");
					option.value = distribuidora;
					option.textContent = distribuidora;
					distribuidoraProposta.appendChild(option);
				});
			}
		});
	}

	// Dropdown dos serviços
	function esconderTodosCards() {
		document.querySelectorAll('.servico-card-container').forEach(card => card.style.display = 'none');
	}

	function mostrarCard(servico) {
		esconderTodosCards();
		const card = document.querySelector(`.servico-card-container[data-servico="${servico}"]`);
		if (card) card.style.display = 'block';
		document.querySelectorAll('section').forEach(sec => sec.classList.add('hidden'));
		document.getElementById('servicos').classList.remove('hidden');
		window.scrollTo({
			top: document.getElementById('servicos').offsetTop - 70,
			behavior: 'smooth'
		});
	}
	document.querySelectorAll('.servico-link').forEach(link => {
		link.addEventListener('click', function(e) {
			e.preventDefault();
			mostrarCard(this.dataset.servico);
		});
	});
	esconderTodosCards();

	// Menu navegação (já tratado acima)

	// --- Distribuidoras por Estado para selects dinâmicos ---
	const distribuidorasPorEstado = {
		"AC": ["Energisa Acre"],
		"AL": ["Equatorial Energia Alagoas"],
		"AM": ["Amazonas Energia"],
		"AP": ["CEA", "Equatorial Energia Amapá"],
		"BA": ["Neoenergia Coelba"],
		"CE": ["Enel Distribuição Ceará"],
		"DF": ["Neoenergia Distribuição Brasília"],
		"ES": ["EDP Espírito Santo"],
		"GO": ["Equatorial Energia Goiás"],
		"MA": ["Equatorial Energia Maranhão"],
		"MG": ["CEMIG Distribuição", "Energisa Minas Gerais", "DMED"],
		"MS": ["Energisa Mato Grosso do Sul"],
		"MT": ["Energisa Mato Grosso"],
		"PA": ["Equatorial Energia Pará"],
		"PB": ["Energisa Paraíba"],
		"PE": ["Neoenergia Pernambuco"],
		"PI": ["Equatorial Energia Piauí"],
		"PR": ["Copel Distribuição"],
		"RJ": ["Light", "Enel Distribuição Rio", "Energisa Nova Friburgo"],
		"RN": ["Neoenergia Cosern"],
		"RO": ["Energisa Rondônia"],
		"RR": ["Roraima Energia"],
		"RS": ["CEEE Equatorial", "RGE Sul"],
		"SC": ["Celesc Distribuição", "Energisa Sul-Sudeste"],
		"SE": ["Energisa Sergipe"],
		"SP": ["Enel Distribuição São Paulo", "CPFL Paulista", "CPFL Piratininga", "CPFL Santa Cruz", "EDP São Paulo", "Elektro"],
		"TO": ["Energisa Tocantins"]
	};

	function setupDistribuidoraSelect(estadoId, distribuidoraId) {
		const estado = document.getElementById(estadoId);
		const distribuidora = document.getElementById(distribuidoraId);
		if (estado && distribuidora) {
			estado.addEventListener('change', function() {
				const estado = this.value;
				distribuidora.innerHTML = '<option value="">Selecione sua distribuidora</option>';
				if (distribuidorasPorEstado[estado]) {
					distribuidorasPorEstado[estado].forEach(function(nome) {
						const option = document.createElement('option');
						option.value = nome;
						option.textContent = nome;
						distribuidora.appendChild(option);
					});
				}
			});
		}
	}
	setupDistribuidoraSelect('estado-mercado', 'distribuidora-mercado');
	setupDistribuidoraSelect('estado-fotovoltaico', 'distribuidora-fotovoltaico');
	setupDistribuidoraSelect('estado-baterias', 'distribuidora-baterias');
	setupDistribuidoraSelect('estado-cotacao', 'distribuidora-cotacao');

	// FAQ toggle
	document.querySelectorAll('.faq-item').forEach(function(item) {
		// Clique no botão OU no texto da pergunta
		const btn = item.querySelector('.faq-toggle');
		const question = item.querySelector('.faq-question');
		function toggleFaq() {
			const answer = item.querySelector('.faq-answer');
			const arrow = item.querySelector('.faq-arrow svg');
			const expanded = btn.getAttribute('aria-expanded') === 'true';
			answer.style.display = expanded ? 'none' : 'block';
			btn.setAttribute('aria-expanded', !expanded);
			arrow.style.transform = expanded ? 'rotate(0deg)' : 'rotate(180deg)';
			arrow.style.transition = "transform 0.2s";
		}
		btn.addEventListener('click', function(e) {
			e.stopPropagation();
			toggleFaq();
		});
		// Permite clicar em qualquer lugar da pergunta (exceto no botão)
		question.addEventListener('click', function(e) {
			if (e.target !== btn && !btn.contains(e.target)) {
				toggleFaq();
			}
		});
	});

	// Mensagem de sucesso
	const params = new URLSearchParams(window.location.search);
	if (params.get("sucesso") === "1") {
		const msg = document.getElementById("mensagem-sucesso");
		if (msg) {
			msg.style.display = "block";
			setTimeout(() => {
				msg.style.display = "none";
				// Remove o parâmetro da URL sem recarregar a página
				window.history.replaceState({}, document.title, window.location.pathname);
			}, 7000);
		}
	}
});