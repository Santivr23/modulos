export const playerDeck = {
    deckShuffle: () => {
        const container = document.getElementById('cards-container');
        const cards = Array.from(container.children);
        for (let i = 0; i < 10; i++) {
            for (let i = cards.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                container.appendChild(container.removeChild(cards[j]));
            }
        }
    },

    // initialDraw: () => {
    //     for (let i = 0; i < 3; i++) {


    //         const playerContainer = document.getElementById('cards-container');
    //         const playerSection = document.createElement('div');
    //         playerSection.classList.add('player-section');
    //         playerSection.id = `player-section-${i}`;
    //         drawCard(playerSection);

    //     }
    //     playerContainer.appendChild(playerSection);
    // },

    // drawCard: (section) => {

    // }

    

}