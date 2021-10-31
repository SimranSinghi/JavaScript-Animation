# JavaScript-Animation
 JavaScript project that moves a number of photos around a court window. The photos bounce on the court borders and on each other
 
initialize: initialize the animation
resumeAction: it starts, suspends, and resumes the animation (when you click the mouse inside the court)
The court is 1000x600px and the photos have height 80px, but you should make your program work for any size of court, and any number and size of photos. The initial position of each photo is a random place inside the court. When you click on the court, photos will start moving in random directions and random speeds. The photos bounce on the court sides and on each other. When you click on the court again, the animation is suspended, when you click again, the animation resumes, etc. So each time you click, it suspends or resumes.



The position of any element is dictated by the three style properties: position, left, and top. If an element is nested inside another and its position is "relative", the top and left properties are relative to the enclosing element.
<p id="x" style="position: relative; left: 50px; top: 100px;"> ... </p>
To move this element, just change the left/top attributes using code:
document.getElementById("x").style.top = "10px";
Note that the values that you set the left/top attributes must have units (e.g., "10px"). It will not work if you set them to numbers.
You can get the top coordinate of a regular element x (such as, the court) using x.getBoundingClientRect().top (also: left, width, and height).
To animate an element, it must be moved by small amounts, many times, in rapid succession. For example, you can use setTimeout("fun()", n) that calls fun() after a delay of n milliseconds (you have to put it in a loop or use recursion).
You need to define a time period (the "tick") dt to calculate the new x/y coordinates from the current.
The speed coordinates vx/vy are determined when  a photo is kick-started. The new position x of a photo is x+vx*dt, but if the new value is beyond the right border, then the photo must be bounced by setting vx = -vx and x = 2*width-x, assuming that the court x-coordinates are from 0 to width. You do something similar for the left, top, and, bottom borders.
When two photos touch (their frames intersect), then they bounce by exchanging their vx and their vy.
