const Scene = require('Scene');
const Diagnostics = require('Diagnostics');
const Patches = require('Patches');
const Reactive = require('Reactive');
let posArray = [];

function shuffle(array) {
  let currentIndex = array.length, randomIndex;

  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }
  posArray = array;
}

(async function () {  // Enables async/await in JS [part 1]

  const [sourcePos0, sourcePos1, sourcePos2, sourcePos3, sourcePos4, sourcePos5, sourcePos6, sourcePos7, triggerShuffle] = await Promise.all([
    Patches.outputs.getVector('Pos_0_Original'),
    Patches.outputs.getVector('Pos_1_Original'),
    Patches.outputs.getVector('Pos_2_Original'),
    Patches.outputs.getVector('Pos_3_Original'),
    Patches.outputs.getVector('Pos_4_Original'),
    Patches.outputs.getVector('Pos_5_Original'),
    Patches.outputs.getVector('Pos_6_Original'),
    Patches.outputs.getVector('Pos_7_Original'),
    Patches.outputs.getPulse('Shuffle_Cards'),
  ]);

  posArray = [sourcePos0, sourcePos1, sourcePos2, sourcePos3, sourcePos4, sourcePos5, sourcePos6, sourcePos7]
  //shuffle(posArray);

  triggerShuffle.subscribe(() => shuffle(posArray));

  Patches.inputs.setVector('Pos_0_Shuffled', posArray[0]);
  Patches.inputs.setVector('Pos_1_Shuffled', posArray[1]);
  Patches.inputs.setVector('Pos_2_Shuffled', posArray[2]);
  Patches.inputs.setVector('Pos_3_Shuffled', posArray[3]);
  Patches.inputs.setVector('Pos_4_Shuffled', posArray[4]);
  Patches.inputs.setVector('Pos_5_Shuffled', posArray[5]);
  Patches.inputs.setVector('Pos_6_Shuffled', posArray[6]);
  Patches.inputs.setVector('Pos_7_Shuffled', posArray[7]);

})(); // Enables async/await in JS [part 2]
