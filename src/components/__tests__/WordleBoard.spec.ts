// import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import WordleBoard from '../WordleBoard.vue'
import {VICTORY_MESSAGE} from "../../settings"

describe('WordleBoard', () => {
  test("a victory message appears when the user makes a guess that matches the word of the day", async() => {
    //Arrange phase
    const wrapper= mount(WordleBoard, {props: {wordOfTheDay: "TESTS"}})

    //Act phase, player interacts with the game
    const guessInput= wrapper.find("input[type=text]")
    await guessInput.setValue("TESTS")
    await guessInput.trigger("keydown.enter")

    //Assert 
    expect(wrapper.text()).toContain(VICTORY_MESSAGE)
  })
  //testing languages let us set future tests we wanna do:
  test("a defeat message appears if the user makes an incorrect guess", async() =>{
        //Arrange phase
        const wrapper= mount(WordleBoard, {props: {wordOfTheDay: "TESTS"}})

        //Act phase, player interacts with the game
        const guessInput= wrapper.find("input[type=text]")
        await guessInput.setValue("WRONG")
        await guessInput.trigger("Better luck next time!")
    
        //Assert 
        expect(wrapper.text()).toContain("Better luck next time!")
  })
  test.todo("no end-of-game message appears if the user hes not yet made a guess")
})
