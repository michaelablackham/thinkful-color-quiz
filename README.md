# Blackham's Quiz

@TODO: add some description here.

## Navigation map

```
/start
/questions/:question (1, 2, 3, 4, 5, ...)
/questions/:question/result
/results
```

## Tasks

- [ ] start Quiz
  - [ ] home screen fades out and first question appears on button click
  - [ ] add class "active" to header
  - [ ] remove class "home" from body
- [ ] questions
  - [ ] randomly generate a RGB() color code to guess
  - [ ] add this value to question and to one input
  - [ ] randomly generate 2 other RGB values and add to inputs
  - [ ] submit question on button click
  - [ ] check if answer is correct
  - [ ] generate correct or wrong screen with correct answer
  - [ ] add right or wrong styling to pager
  - [ ] keep track of right/wrong answers
  - [ ] add "current" class to the current number pager that correlates to current question
- [ ] restart
  - [ ] click on "start over" and go back to home and erase all answers
  - [ ] this should work on every screen
