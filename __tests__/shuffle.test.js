const  shuffle  = require('../src/shuffle');
const  bots = require("../src/botsData");
const shuffledBots = shuffle(bots)

describe('shuffle should...', () => {
    test('return a array containing bots', () => {
    expect(shuffledBots).toEqual(expect.arrayContaining(bots))
    });

    test('return same size array as bots', () => {
        expect(shuffledBots.length).toEqual(bots.length)
    });

    test('return a randomized array', () => {
        function isShuffled(array) {
            for (i = 0; i < array.length - 1; ++i){
              if (array[i].id > array[i + 1].id)
                return true;
            }
            return false;
          };

        expect(isShuffled(shuffledBots)).toBeTruthy()
    })
})