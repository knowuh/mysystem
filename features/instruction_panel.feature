Feature: Instruction panel
  In order to keep the big picture in mind while constructing a MySystem
  As a student
  I want to see the instruction panel on the screen
  
  @javascript
  Scenario: Showing instruction panel when MySystem Editor is loaded
    When I am on the MySystem page
    Then I should see "Make a MySystem to explain" on the screen within "#goal_panel"
