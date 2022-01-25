//Grab a couple of things
const section = document.querySelector('section');
const attemptLeft = document.querySelector('span');
let attempt = 8;

//Link the text
attemptLeft.textContent = attempt;

//Generate the data.
const getImg = () => [
    { imgSrc: "./img/chewbacca.jpg", name: "Chewbacca"},
    { imgSrc: "./img/darkVader.jpg", name: "Dark Vader"},
    { imgSrc: "./img/han-solo.jpg", name: "Han Solo"},
    { imgSrc: "./img/leia-sky.jpg", name: "Leia"},
    { imgSrc: "./img/Luke-sky.jpg", name: "Luke"},
    { imgSrc: "./img/robots.jpg", name: "Robots"},
    { imgSrc: "./img/yoda.jpg", name: "Yoda"},
    { imgSrc: "./img/ewok.png", name: "Ewok"},
    { imgSrc: "./img/chewbacca.jpg", name: "Chewbacca"},
    { imgSrc: "./img/darkVader.jpg", name: "Dark Vader"},
    { imgSrc: "./img/han-solo.jpg", name: "Han Solo"},
    { imgSrc: "./img/leia-sky.jpg", name: "Leia"},
    { imgSrc: "./img/Luke-sky.jpg", name: "Luke"},
    { imgSrc: "./img/robots.jpg", name: "Robots"},
    { imgSrc: "./img/yoda.jpg", name: "Yoda"},
    { imgSrc: "./img/ewok.png", name: "Ewok"},
];

const randomize = () => {
    const cardImg = getImg();
    cardImg.sort(() => Math.random() - 0.5);
    console.log(cardImg);
    return cardImg;
};

// randomize();

//Card generator function
const cardGenerator = () => {
    const cardImg = randomize();

    //Loop true the images
    cardImg.forEach((item) => {
        // Gneratate the HTML
        const card = document.createElement("div");
        const front = document.createElement("img");
        const back = document.createElement("div");

        card.classList = "card";
        front.classList = "front";
        back.classList = "back";

        //attach the src-info to the cards
        front.src = item.imgSrc;

        card.setAttribute('name', item.name);

        //attach the cards to the section
        section.appendChild(card);
        card.appendChild(front);
        card.appendChild(back);

        //flippping the cards
        card.addEventListener('click', (e) => {
          card.classList.toggle('toggleCard'); 
          checkCards(e);   
        });
    });
};

//check if the cards are the same
const checkCards = (e) => {
    const clickedCard = e.target;
    clickedCard.classList.add("flipped");
    const flippedCard = document.querySelectorAll(".flipped");
    const toggleCard = document.querySelectorAll(".toggleCard");
    //logic
    if(flippedCard.length === 2){
        if(
            flippedCard[0].getAttribute("name") ===
            flippedCard[1].getAttribute("name")
        ) {
            console.log("match");
            flippedCard.forEach((card) => {
                card.classList.remove("flipped");
                card.style.pointerEvents = "none";
            });
        }else {
            console.log("not a match");
            flippedCard.forEach(card => {
                card.classList.remove("flipped");
                setTimeout(() => card.classList.remove("toggleCard"), 1000);
            });
            attempt--;
            attemptLeft.textContent = attempt;
            if(attempt === 0){
                restart("try again");
            }
        }
    }
    // run a check if we won the game
    if(toggleCard.length === 8){
        restart("Yeay");
    }
};

//restart
const restart = (text) => {
    let cardImg = randomize();
    let fronts = document.querySelectorAll(".front");
    let cards = document.querySelectorAll(".card");

    section.style.pointerEvents = " none";

    cardImg.forEach((item, index) => {
        cards[index].classList.remove("toggleCard");
        //randomize
        setTimeout(() => {
            cards[index].style.pointerEvents = "all";
            fronts[index].src = item.imgSrc;
            cards[index].setAttribute("name", item.name); 
            section.style.pointerEvents = "all";
        }, 1000);
    });
    attempt = 8;
    attemptLeft.textContent = attempt;
    setTimeout(() => window.alert(text), 100);
};

cardGenerator();