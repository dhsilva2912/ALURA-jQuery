$("#botao-frase").click(fraseAleatoria);
$("#botao-frase-id").click(buscaFrase);

//Realiza Comando GET no Server + Error Handling + Spinner:
function fraseAleatoria(){
    
    $("#spinner").show();

    $.get("http://localhost:3000/frases",trocaFraseAleatoria).fail(function(){

        $("#erro").show();

        setTimeout(function(){
        
            $("#erro").toggle();
        
        },1500);        

    }).always(function(){
        $("#spinner").toggle();
    });

};

//Busca Frase Aleatoria em um JSON:
function trocaFraseAleatoria(data){

    var frase = $(".frase");

    var numeroAleatorio = Math.floor(Math.random() * data.length);

    frase.text(data[numeroAleatorio].texto);

    atualizaTamanhoFrase();

    atualizaTempoInicial(data[numeroAleatorio].tempo);

};

//Busca por frase Especifica no JSON:
function buscaFrase(){

    $("#spinner").show();

    var fraseId = $("#frase-id").val();
    var dados = {id:fraseId};

    $.get("http://localhost:3000/frases", dados, trocaFrase)
    .fail(function(){

        $("#erro").toggle();

        setTimeout(function(){
        
            $("#erro").toggle();
        
        },1500);

    })
    .always(function(){
        $("#spinner").toggle();
    });

};

//Realiza a troca da Frase Especifica:
function trocaFrase(data){
    
    var frase = $(".frase");
    
    frase.text(data.texto);
    
    atualizaTamanhoFrase();
    atualizaTempoInicial(data.tempo);
    

};
