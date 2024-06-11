// import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import WordleBoard from '../WordleBoard.vue'
import {VICTORY_MESSAGE} from "../../settings"
import {DEFEAT_MESSAGE} from "../../settings"
import {WORD_SIZE} from "../../settings"
import exp from 'constants'

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
  
  describe("End-of-game messages", ()=>{
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


  describe("Rules for defining word of the day", ()=> {
    beforeEach(()=>{
      console.warn= vi.fn()
    })
    test.each(
      [
        {wordOfTheDay: "FLY", reason:"Word of the day must have 5 characters"},
        {wordOfTheDay: "words", reason:"Word of the day must be in uppercase"},
        {wordOfTheDay: "GIBBR", reason:"Word of the day must be a real English word"}
      ]
    )("Since $reason: $wordOfTheDay is invlaid, therefore a warning must be issued", async(wordOfTheDay) =>{
      mount(WordleBoard, {props:{wordOfTheDay}})
      
      expect(console.warn).toHaveBeenCalled() 
    })
    
    test("no warning if the word of the day is a real 5 letter English word in uppercase", async()=>{
      mount(WordleBoard, {props:{wordOfTheDay:"TESTS"}})
      
      expect(console.warn).not.toHaveBeenCalled() 
    })

  })

  describe("Player input", ()=>{

    test(`player guesses are limited to ${WORD_SIZE} letters`, async () =>{
      await playerSubmitsGuess(wordOfTheDay + "EXTRA")
      expect(wrapper.text()).toContain(VICTORY_MESSAGE)
    })

    test("player guesses can only be submitted if they are real words", async()=>{
      await playerSubmitsGuess("GIBBR")
      expect(wrapper.text()).not.toContain(VICTORY_MESSAGE)
      expect(wrapper.text()).not.toContain(DEFEAT_MESSAGE)
    }) 
    test("player guesses are not case-sensitive", async()=>{
      await playerSubmitsGuess(wordOfTheDay.toLowerCase())
      expect(wrapper.text()).toContain(VICTORY_MESSAGE)
    })
    test("player guesses can only contain letters", async()=>{
      await playerSubmitsGuess("J3J3M")

      expect(wrapper.find<HTMLInputElement>('input[type=text]').element.value).toEqual('JJM')
    })
    test("non-letter characters do not render on the screen while being typed", async()=>{
      await playerSubmitsGuess("333")
      expect(wrapper.find<HTMLInputElement>('input[type=text]').element.value).toEqual('')
    })
  })

  
})

