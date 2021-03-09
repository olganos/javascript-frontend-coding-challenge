# test
test 

# Solution Docs

New API:
Autocomplete contructor passes:
1. Container for a new autocomplete 
2. Function onSelect for handling a result of selection in the list
   onSelect: (selectedValue) 
3. Function getListItems for getting items from a datasourse
   getListItems: (query)

Client:
For creating a new autocomplete, I used a kind of strategy pattern. These are two classes which have a function 
async getResults(query, numOfResults)
the Function returns items for autocomplete list as an array of objects 
{
    text: state.name,
    value: state.abbreviation
}

Notes:
I had not time for implementing navigation by arrows better.
It needs some improvements:
1. When the list has vertical scroll, navigation via arrows have to move selected <li> into visible area.
2. Navigation via arrows and mouse have to be synchronised.
