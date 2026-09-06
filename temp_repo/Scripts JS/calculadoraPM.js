// Essa função torna o span de informações visiveis e calcula os valores

function funcCalcular() {

    // Esta parte transforma as entradas de string para números

    metro = parseInt(document.getElementById("metro").value, 10);
    distancia = parseInt(document.getElementById("km").value, 10);

    // Esta parte da função torna o elemento span visivel.

    mostra = document.getElementById("resultado");
    mostra.style.display = "block";

    // Aqui especifica que se o radio-button para piso Outdoor estiver selecionado, fará o calculo e colocará no span

    if (document.getElementById('out').checked) {

        // Calcula os valores que serão exibidos no span

        frete = parseInt(distancia * 2.8);
        piso = parseInt(metro * 140);
        precoTotal = parseInt(frete + piso);
        metroQuadrado = parseFloat(precoTotal / metro);

        // Aqui se faz o teste lógico se é apenas para fornecimento ou se é compra normal

        if (document.getElementById('inst').checked) {


        } else if (document.getElementById('for').checked) {

            //  Caso a distancia seja maior que 1000 km, multiplica por 3.5 e divide por 2 para ter um preço mais acertivo
            if (distancia > 1000) {
                frete = parseInt(distancia * 3.5) / 2;
            }
            //  Impede que o preço seja menor do que o minimo aceitavel
            if (metroQuadrado > 140 ) {
                metroQuadrado = 140;
                piso = metroQuadrado * metro;
                precoTotal = piso + frete;
                metroQuadrado = precoTotal / metro;
            }
        } else {
            alert("Você não especificou se o piso é para fornecimento ou instalação!");

            // Mantem o span invisivel

            fechar = document.getElementById("resultado");
            fechar.style.display = "none";

        }

        //  Aqui imprime os valores na tela, dentro do elemento span

        document.getElementById("precos").innerHTML = ("O preço do frete fica R$: " + frete.toFixed(2) + ".<br>\nO preço do piso fica R$: " + piso.toFixed(2) +
            ".<br>\nO preço total fica R$: " + precoTotal.toFixed(2) + ".<br>\nE o preço do m² fica R$: " + metroQuadrado.toFixed(2) + ".");
    }

    // Aqui especifica que se o radio-button para piso Indoor estiver selecionado, fará o calculo e colocará no span
    else if (document.getElementById('ind').checked) {

        // Calcula os valores que serão exibidos no span

        frete = parseInt(distancia * 2.8);
        piso = parseInt(metro * 150);
        precoTotal = parseInt(frete + piso);
        metroQuadrado = parseFloat(precoTotal / metro);

        // Aqui se faz o teste lógico se é apenas para fornecimento ou se é compra normal

        if (document.getElementById('inst').checked) {


        } 
        else if (document.getElementById('for').checked) {

            //  Caso a distancia seja maior que 1000 km, multiplica por 3.5 e divide por 2 para ter um preço mais acertivo
            if (distancia > 1000) {
                frete = parseInt(distancia * 3.5) / 2;
            }

            //  Impede que o preço seja menor do que o minimo aceitavel
            if (metroQuadrado > 150) {  
                metroQuadrado = 150;
                piso = parseInt(metro * metroQuadrado);
                precoTotal = parseInt(frete + piso);
                metroQuadrado = parseFloat(precoTotal / metro);
            }
        } else {
            alert("Você não especificou se o piso é para fornecimento ou instalação!");

            // Mantem o span invisivel

            fechar = document.getElementById("resultado");
            fechar.style.display = "none";

        }
        //  Aqui imprime os valores na tela, dentro do elemento span 

        document.getElementById("precos").innerHTML = ("O preço do frete fica R$: " + frete.toFixed(2) + ".<br>\nO preço do piso fica R$: " + piso.toFixed(2) +
            ".<br>\nO preço total fica R$: " + precoTotal.toFixed(2) + ".<br>\nE o preço do m² fica R$: " + metroQuadrado.toFixed(2) + ".");
    }

    // Dispara um alerta dizendo que o tipo de piso não foi selecionado
    else {

        alert("Você não especificou se o piso é interno ou externo!");

        // Mantem o span invisivel

        fechar = document.getElementById("resultado");
        fechar.style.display = "none";
    }
}

// Essa finção fecha o span e reinicia o sistema

function funcFechar() {

    // Esta parte da função fecha o elemento span.

    fechar = document.getElementById("resultado");
    fechar.style.display = "none";

    // Esta parte faz o Refresh da página, apagando os dados assim que o "x" do span é clicado

    window.location.reload();
}