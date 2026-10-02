// Cria o cartão de um Pokémon (usado na lista e na busca)
function criarCartao(pokemon) {
    const cartao = document.createElement("article");

    const titulo = document.createElement("h2");
    titulo.textContent = pokemon.name;

    const imagem = document.createElement("img");
    imagem.src = pokemon.sprites.front_default;
    imagem.alt = `Imagem de ${pokemon.name}`;

    const numero = document.createElement("p");
    numero.textContent = `Número: ${pokemon.id}`;

    const tipo = document.createElement("p");
    tipo.textContent = `Tipo: ${pokemon.types[0].type.name}`;

    const altura = document.createElement("p");
    altura.textContent = `Altura: ${pokemon.height / 10} m`;

    const peso = document.createElement("p");
    peso.textContent = `Peso: ${pokemon.weight / 10} kg`;

    cartao.appendChild(titulo);
    cartao.appendChild(imagem);
    cartao.appendChild(numero);
    cartao.appendChild(tipo);
    cartao.appendChild(altura);
    cartao.appendChild(peso);

    return cartao;
}

// Procura um Pokémon pelo nome ou número digitado
async function buscarPokemon() {
    const mensagem = document.querySelector("#mensagem");
    const lista = document.querySelector("#listaPokemons");
    const campo = document.querySelector("#campoBusca");

    const termo = campo.value.trim().toLowerCase();

    if (termo === "") {
        mensagem.textContent = "Digite um nome ou número para procurar.";
        return;
    }

    mensagem.textContent = "Procurando...";
    lista.textContent = "";

    try {
        const resposta = await fetch(`https://pokeapi.co/api/v2/pokemon/${termo}`);

        if (!resposta.ok) {
            mensagem.textContent = `Não encontramos "${termo}". Confira o nome ou o número.`;
            return;
        }

        const pokemon = await resposta.json();

        lista.appendChild(criarCartao(pokemon));
        mensagem.textContent = "Pokémon encontrado!";
    } catch (erro) {
        mensagem.textContent = "Erro ao buscar o Pokémon. Tente novamente.";
        console.log(erro);
    }
}

// Carrega uma lista com 12 Pokémon
async function carregarPokemons() {
    const mensagem = document.querySelector("#mensagem");
    const lista = document.querySelector("#listaPokemons");

    mensagem.textContent = "Iniciando a busca...";
    lista.textContent = "";

    try {
        const resposta = await fetch("https://pokeapi.co/api/v2/pokemon?limit=12");
        const dados = await resposta.json();
        const pokemons = dados.results;

        for (let cont = 0; cont < pokemons.length; cont++) {
            const respostaDetalhe = await fetch(pokemons[cont].url);
            const pokemon = await respostaDetalhe.json();

            lista.appendChild(criarCartao(pokemon));
        }

        mensagem.textContent = "Pokémon carregados!";
    } catch (erro) {
        mensagem.textContent = "Erro ao buscar os Pokémon. Tente novamente.";
        console.log(erro);
    }
}