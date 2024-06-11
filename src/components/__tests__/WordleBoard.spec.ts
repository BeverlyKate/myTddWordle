// import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import WordleBoard from '../WordleBoard.vue'
import {VICTORY_MESSAGE} from "../../settings"
import {DEFEAT_MESSAGE} from "../../settings"

describe('WordleBoard', () => {
  let wordOfTheDay= "TESTS"
  let wrapper: ReturnType<typeof mount>;
 
  beforeEach(() =>{
        //Arrange phase
      wrapper= mount(WordleBoard, {props: {wordOfTheDay}})
  })

  async function playerSubmitsGuess(guess: string){
    //Act phase, player interacts with the game
    const guessInput= wrapper.find("input[type=text]")
    await guessInput.setValue(guess)
    await guessInput.trigger("keydown.enter")
  }

  test("a victory message appears when the user makes a guess that matches the word of the day", async() => {
   await playerSubmitsGuess(wordOfTheDay)
    //Assert 
    expect(wrapper.text()).toContain(VICTORY_MESSAGE)
  })
  //testing languages let us set future tests we wanna do:
  test("a defeat message appears if the user makes an incorrect guess", async() =>{
    await playerSubmitsGuess("WRONG")
    //Assert 
    expect(wrapper.text()).toContain(DEFEAT_MESSAGE)
  })

  test("no end-of-game message appears if the user hes not yet made a guess", async()=> {
    // //Arrange phase
    // const wrapper= mount(WordleBoard, {props: {wordOfTheDay}})
    expect(wrapper.text()).not.toContain(VICTORY_MESSAGE)
    expect(wrapper.text()).not.toContain(DEFEAT_MESSAGE)
  })
})
