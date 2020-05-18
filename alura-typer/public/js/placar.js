//Botao Mostrar Placar:
$("#botao-placar").click(mostraPlacar);
$("#botao-sync").click(sincronizaPlacar);

//Insere Placar:
function inserePlacar(){
    
    var corpoTabela = $(".placar").find("tbody");
    var usuario = $("#usuarios").val();
    var numPalavras = $("#contador-palavras").text();

    var botaoRemover =  "<a href='#'><i class='small material-icons'>delete</i></a>"

    var linha = novaLinha(usuario,numPalavras);
    linha.find(".botao-remover").click(removeLinha);

    corpoTabela.prepend(linha);

    $(".placar").slideDown(500);
    
    scrollPlacar();

};

//Move Barra de Rolagem ate o Placar:
function scrollPlacar(){

    var posicaoPlacar = $(".placar").offset().top;

    $("body").animate({

        scrollTop: posicaoPlacar + "px"

    },1000);

};

//Cria Linha na Tabela Atraves de Objeto:
function novaLinha(usuario,numPalavras){

    var linha = $("<tr>");
    var colunaUsuario = $("<td>").text(usuario);
    var colunaPalavras = $("<td>").text(numPalavras);

    var colunaRemover = $("<td>");
    var link = $("<a>").addClass("botao-remover").attr("href","#");
    var icone = $("<i>").addClass("small").addClass("material-icons").text("delete");
    
    link.append(icone);
    colunaRemover.append(link);

    linha.append(colunaUsuario);
    linha.append(colunaPalavras);
    linha.append(colunaRemover);

    return linha;

};

//Remove Linha:
function removeLinha(){

    $(".botao-remover").click(function(event){
        event.preventDefault();

        var linha = $(this).parent().parent()

        linha.fadeOut(1000);
        
        setTimeout(function(){

            linha.remove();

        },1000);
        
    });

};

//Altera Display do Placar:
function mostraPlacar(){

    $(".placar").stop().slideToggle(600);

};

//Sincroniza Placar:
function sincronizaPlacar(){

    var placar = [];
    var linhas = $("tbody>tr");

    linhas.each(function(){

        var usuario = $(this).find("td:nth-child(1)").text();
        var palavras = $(this).find("td:nth-child(2)").text();

        var score = {
            usuario: usuario,
            pontos: palavras
        };
        
        placar.push(score);

    });

    var dados = {
        placar: placar
    };

    $.post("http://localhost:3000/placar",dados,function(){

        console.log("salvou o placar no servidor!");
        
        $(".tooltip").tooltipster("open").tooltipster("content","Sucesso ao sincronizar");

    }).fail(function(){

        $(".tooltip").tooltipster("open").tooltipster("content","Falha ao sincronizar");

    }).always(function(){

        setTimeout(function(){
        
            $(".tooltip").tooltipster("close");
        
        },1200);

    });

};

//Atualiza Placar com o ultimo conteudo Salvo:
function atualizaPlacar(){

    $.get("http://localhost:3000/placar",function(data){

        $(data).each(function(){

            var linha = novaLinha(this.usuario,this.pontos);
            linha.find(".botao-remover").click(removeLinha);
            
            $("tbody").append(linha);

        });

    });

};