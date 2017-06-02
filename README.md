# Blackham's Quiz

@TODO: add some description here.

## Navigation map

```
/start
/questions/:question (1, 2, 3, 4, 5, ...)
/questions/:question/result
/results
```
## Tasks for STATE
- [x] colors (list)
- [x] correct answer text
- [x] incorrect answer text
- [x] current score
- [x] current question count
- [x] current page
- [x] last correct answer (boolean)
- [ ] randomly chosen color (color to guess - default = false)
- [ ] randomly chosen color (for 2 extra options)

## Tasks

- [ ] render application
  - [x] create a function that says which section we are currently on
  - [x] set the current page to start (on load)
  - [x] this is based off of the currentPage object that gets assigned depending on which number we are on
  - [ ] call a function for what happens on each page depending on the currentPage object
- [ ] start Quiz
  - [x] background color change
  - [x] pulsing button
  - [ ] start button click
    - [ ] home screen fades out and question section appears
    - [x] header gets smaller and goes to top of page
    - [x] add class "active" to header
    - [x] remove class "home" from body
    - [ ] pager appears
- [ ] questions
  - [ ] randomly choose a color to guess from state
  - [ ] add this value to question and to one randomly chosen input (1 of 3)
  - [ ] randomly choose 2 other RGB values and add to remaining inputs
  - [ ] submit question on button click
  - [ ] check if answer is correct
- [ ] answer screen
  - [ ] generate correct or wrong screen with text and correct answer
  - [ ] add right or wrong styling to pager
  - [ ] keep track of right/wrong answers
  - [ ] add "current" class to the current number pager that correlates to current question
- [ ] advance to new question
  - [ ] if questionCount !== 5
  - [ ] add ++ to questionCount
  - [ ] add right or wrong to pager
- [ ] final result page
  - [ ] appears after question count === 5
  - [ ] shows number right vs wrongText
- [ ] restart
  - [ ] click on "start over" and go back to home and set all state objects back to defaults
