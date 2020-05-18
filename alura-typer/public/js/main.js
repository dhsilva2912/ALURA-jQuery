var tempoInicial = $("#tempo-digitacao").text();
var campo = $(".campo-digitacao");

//Inicializar funcoes na pagina:
$(function(){
    
    atualizaTamanhoFrase();
    inicializaContadores();
    inicializaCronometro();
    inicializaMarcadores();
    $("#botao-reiniciar").click(reiniciaJogo);
    atualizaPlacar();

    $('#usuarios').selectize({
        create: true,
        sortField: 'text'
    });

    $('.tooltip').tooltipster({
        trigger: "custom"
    });

});

//Atualiza Tempo:
function atualizaTempoInicial(tempo){
    tempoInicial = tempo;
    $("#tempo-digitacao").text(tempo);

};

//Tamanho da Frase:
function atualizaTamanhoFrase(){
    var frase = $(".frase").text();
    var numPalavras = frase.split(" ").length;
    var tamanhoFrase = $("#tamanho-frase");

    tamanhoFrase.text(numPalavras);
};

//Gerar Evento de Input e contar Caracteres e Palavras:
function inicializaContadores(){
    
    campo.on("input",function(){
        var conteudo = campo.val();
    
        var qtdPalavras = conteudo.split(/\S+/).length -1;
        $("#contador-palavras").text(qtdPalavras);
        
        var qtdCaracter = conteudo.length;
        $("#contador-caracteres").text(qtdCaracter);
    
    });

};

//Timer Tempo Restante do Jogo:
function inicializaCronometro(){

    campo.one("focus", function(){
        var tempoRestante = $("#tempo-digitacao").text();
        $("#botao-reiniciar").attr("disabled",true);

        var cronometroID = setInterval(function(){

            tempoRestante --;
            
            $("#tempo-digitacao").text(tempoRestante);

            if(tempoRestante < 1){
                clearInterval(cronometroID);
                finalizaJogo();
            }

        },1000);

    });

};

//Finaliza Jogo:
function finalizaJogo(){

    campo.attr("disabled",true);
    $("#botao-reiniciar").attr("disabled",false);
    campo.toggleClass("campo-desativado");
    inserePlacar();

};


//Verifica se frase digitada esta correta e muda Borda do Campo
function inicializaMarcadores(){
    
    campo.on("input",function(){

        var frase = $(".frase").text();    
        var digitado = campo.val();
    
        var comparavel = frase.substr(0,digitado.length);
    
        if(digitado == comparavel){
            
            campo.addClass("borda-verde");
            campo.removeClass("borda-vermelha");
        }else{
            
            campo.addClass("borda-vermelha");
            campo.removeClass("borda-verde");
    
        }
    
    });

};

//Botao Reiniciar Jogo:
function reiniciaJogo(){
    
    campo.attr("disabled",false);
    campo.val("");

    $("#contador-palavras").text("0");
    $("#contador-caracteres").text("0");

    $("#tempo-digitacao").text(tempoInicial);

    inicializaCronometro();
    campo.toggleClass("campo-desativado");
    campo.removeClass("borda-verde");
    campo.removeClass("borda-vermelha");

};
