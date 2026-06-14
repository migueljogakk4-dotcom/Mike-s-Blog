// ===== MENU =====

const opcoes =
document.querySelectorAll(".opcao");

const paginas = [
    "home",
    "blog",
    "links",
    "perfil",
    "sobre"
];

let selecionado = 0;

// ===== DIÁLOGOS =====

const mensagens = [
    "* Você está cheio de DETERMINAÇÃO.",
    "* Abrindo o blog...",
    "* Abrindo seus links...",
    "* Carregando perfil...",
    "* Informações do projeto."
];

// ===== MENU =====

function atualizarMenu(){

    opcoes.forEach(op =>
        op.classList.remove(
            "selecionada"
        )
    );

    opcoes[selecionado]
        .classList.add(
            "selecionada"
        );

    const heart =
        document.getElementById(
            "heart"
        );

    const rect =
        opcoes[selecionado]
        .getBoundingClientRect();

    const menu =
        document.getElementById(
            "menu"
        )
        .getBoundingClientRect();

    heart.style.left =
        (rect.left - menu.left - 25)
        + "px";

    heart.style.top =
        (rect.top - menu.top)
        + "px";
}

// ===== ABRIR PÁGINA =====

function abrirPagina(id){

    document
    .querySelectorAll(".pagina")
    .forEach(p =>
        p.classList.remove(
            "ativa"
        )
    );

    document
    .getElementById(id)
    .classList.add(
        "ativa"
    );
}

// ===== TEXTO LETRA POR LETRA =====

let intervalo;

function escrever(texto){

    const dialogo =
        document.getElementById(
            "dialogo"
        );

    clearInterval(
        intervalo
    );

    dialogo.textContent = "";

    let i = 0;

    intervalo =
    setInterval(() => {

        if(i >= texto.length){

            clearInterval(
                intervalo
            );

            return;
        }

        dialogo.textContent +=
            texto[i];

        i++;

    }, 25);
}

// ===== TECLAS =====

document.addEventListener(
"keydown",
(e)=>{

    if(
        e.key ===
        "ArrowRight"
    ){

        selecionado++;

        if(
            selecionado >=
            opcoes.length
        ){
            selecionado = 0;
        }

        atualizarMenu();
    }

    if(
        e.key ===
        "ArrowLeft"
    ){

        selecionado--;

        if(
            selecionado < 0
        ){
            selecionado =
            opcoes.length - 1;
        }

        atualizarMenu();
    }

    if(
        e.key ===
        "Enter"
    ){

        abrirPagina(
            paginas[
                selecionado
            ]
        );

        escrever(
            mensagens[
                selecionado
            ]
        );
    }

});

// ===== BLOG =====

function publicarPost(){

    const titulo =
        document
        .getElementById(
            "titulo"
        )
        .value
        .trim();

    const texto =
        document
        .getElementById(
            "texto"
        )
        .value
        .trim();

    if(
        titulo === "" ||
        texto === ""
    ){
        return;
    }

    const posts =
        JSON.parse(
            localStorage.getItem(
                "posts"
            ) || "[]"
        );

    posts.unshift({

        titulo,
        texto,

        data:
        new Date()
        .toLocaleString()

    });

    localStorage.setItem(
        "posts",
        JSON.stringify(
            posts
        )
    );

    document
    .getElementById(
        "titulo"
    )
    .value = "";

    document
    .getElementById(
        "texto"
    )
    .value = "";

    carregarPosts();

    escrever(
        "* Post publicado."
    );
}

// ===== EXCLUIR =====

function excluirPost(indice){

    const posts =
        JSON.parse(
            localStorage.getItem(
                "posts"
            ) || "[]"
        );

    posts.splice(
        indice,
        1
    );

    localStorage.setItem(
        "posts",
        JSON.stringify(
            posts
        )
    );

    carregarPosts();

    escrever(
        "* Post removido."
    );
}

// ===== CARREGAR POSTS =====

function carregarPosts(){

    const area =
        document.getElementById(
            "posts"
        );

    const posts =
        JSON.parse(
            localStorage.getItem(
                "posts"
            ) || "[]"
        );

    area.innerHTML = "";

    posts.forEach(
    (post, indice)=>{

        area.innerHTML += `
        <div class="post">

            <h3>${post.titulo}</h3>

            <small>
                ${post.data}
            </small>

            <p>
                ${post.texto}
            </p>

            <button
            onclick="
            excluirPost(${indice})
            ">
            EXCLUIR
            </button>

        </div>
        `;

    });

}

// ===== INICIAR =====

window.onload = () => {

    carregarPosts();

    atualizarMenu();

    escrever(
        "* Bem-vindo ao Subsolo."
    );

};
