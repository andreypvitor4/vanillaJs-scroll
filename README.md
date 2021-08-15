## [`Click here to see the result`](https://portfolio-av.vercel.app/projetos/vanillaScroll)

## Mobile horizontal scroll script

Description: A function to transform your div in a swipeable row.

## How to use it

To get started you will need two divs in your html:
ex: 
<pre>
< div class="list">
  < div class="row">
    Here you can insert whatever you want
  < /div>
< /div>
</pre>

And some css style:

<pre>
.list { 
  width: 100%;
  overflow: hidden;
} 
.row { 
  display: flex; 
  justify-content: center; 
  width: <the width you choose>px; 
}
</pre>

Then you import the function from the index.js and call it.

## Config

The function receives 3 required parameters:
  - the list div
  - the row div
  - the width of the entire row

And a optional parameter:
  - a object that receives two parameters:
    - velocity: the velocity of the rolling (the default value is 50)
    - rollingTime: the rolling time (the default value is 12)

### To a better understanding look at the html and css examples
