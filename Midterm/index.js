try {
    fetch("data.json")
        .then(response => response.json())
        .then(myGames => loadGames(myGames));
}
catch (error) {
    console.error(error);
}
    

function loadGames(myGames){
    var imgGTA = document.getElementById("imgGTA");
    var imgRDR2 = document.getElementById("imgRDR2");
    var imgDR2 = document.getElementById("imgDR2");
    var imgW2 = document.getElementById("imgW2");
    var imgF4 = document.getElementById("imgF4");
    var imgHLA = document.getElementById("imgHLA");
    var imgHogwarts = document.getElementById("imgHogwarts");
    var imgNoire = document.getElementById("imgNoire");
    var imgJC3 = document.getElementById("imgJC3");
    var imgacmirage = document.getElementById("imgacmirage");
    var imgatomicheart = document.getElementById("imgatomicheart");
    var imgwildhearts = document.getElementById("imgwildhearts");
    var imgsonsoftheforest = document.getElementById("imgsonsoftheforest");
    var imgswjedi = document.getElementById("imgswjedi");
    var imgd2lightfall = document.getElementById("imgd2lightfall");
    
    var textGTA = document.getElementById("textGTA");
    var textRDR2 = document.getElementById("textRDR2");
    var textDR2 = document.getElementById("textDR2");
    var textW2 = document.getElementById("textW2");
    var textF4 = document.getElementById("textF4");
    var textHLA = document.getElementById("textHLA");
    var textHogwarts = document.getElementById("textHogwarts");
    var textNoire = document.getElementById("textNoire");
    var textJC3 = document.getElementById("textJC3");
    var textacmirage = document.getElementById("textacmirage");
    var textatomicheart = document.getElementById("textatomicheart");
    var textwildhearts = document.getElementById("textwildhearts");
    var textsonsoftheforest = document.getElementById("textsonsoftheforest");
    var textswjedi = document.getElementById("textswjedi");
    var textd2lightfall = document.getElementById("textd2lightfall");

    for(var i = 0; i <myGames.games.length; ++i){
        let name = myGames.games[i].productName;
        let url = myGames.games[i].url;
        let dev = myGames.games[i].developer;
        let price = myGames.games[i].priceList;
        let date = myGames.games[i].releaseDate;

        let imgGame = document.createElement("div");
        imgGame.innerHTML = `<img src=${url} class="card-img-top" alt=${name}></img>`;

        let textGame = document.createElement("p");
        textGame.innerHTML = `<p class="card-text"> <strong>${name} <br> Developer: ${dev} <br>Price: ${price} <br>Release Date: ${date}</strong>`

        try {
            if(myGames.games[i].productId === "product001"){
                imgGTA.appendChild(imgGame);
                textGTA.appendChild(textGame);
            }else if(myGames.games[i].productId === "product002"){
                imgRDR2.appendChild(imgGame);
                textRDR2.appendChild(textGame);
            }else if(myGames.games[i].productId === "product003"){
                imgDR2.appendChild(imgGame);
                textDR2.appendChild(textGame);
            }else if(myGames.games[i].productId === "product004"){
                imgW2.appendChild(imgGame);
                textW2.appendChild(textGame);
            }else if(myGames.games[i].productId === "product005"){
                imgF4.appendChild(imgGame);
                textF4.appendChild(textGame);
            }else if(myGames.games[i].productId === "product006"){
                imgHLA.appendChild(imgGame);
                textHLA.appendChild(textGame);
            }else if(myGames.games[i].productId === "product007"){
                imgHogwarts.appendChild(imgGame);
                textHogwarts.appendChild(textGame);
            }else if(myGames.games[i].productId === "product008"){
                imgNoire.appendChild(imgGame);
                textNoire.appendChild(textGame);
            }else if(myGames.games[i].productId === "product009"){
                imgJC3.appendChild(imgGame);
                textJC3.appendChild(textGame);
            }else if(myGames.games[i].productId === "product101_1"){
                imgacmirage.appendChild(imgGame);
                textacmirage.appendChild(textGame);
            }else if(myGames.games[i].productId === "product102_1"){
                imgatomicheart.appendChild(imgGame);
                textatomicheart.appendChild(textGame);
            }else if(myGames.games[i].productId === "product103_1"){
                imgd2lightfall.appendChild(imgGame);
                textd2lightfall.appendChild(textGame);
            }else if(myGames.games[i].productId === "product104_1"){
                imgsonsoftheforest.appendChild(imgGame);
                textsonsoftheforest.appendChild(textGame);
            }else if(myGames.games[i].productId === "product105_1"){
                imgswjedi.appendChild(imgGame);
                textswjedi.appendChild(textGame);
            }else if(myGames.games[i].productId === "product106_1"){
                imgwildhearts.appendChild(imgGame);
                textwildhearts.appendChild(textGame);
            }
        }

        catch (error) {
            console.error(error);
        }
    }
}

