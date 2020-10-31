#griddyup

tracks - columns and rows

grid-gap -> margin in between tracks

fr unit => replaces the need for % units most of the time

auto -> gets all the extra space
		-> fluid


repeat(5, 100px) -> repeat itself 5 times, 100px each

if grid-template-column / row not defined
it will be assumed as one big chunk

e.g. 

/* each rows takes full width, 1st 200px high, 2nd 100px high,
	rest goes with default height */
grid-template-rows: 200px 100px;
/* grid-template-columns */

===
4 - Firefox dev tools

tracks - the lines that start/finish a column or row
(so if two columns, there's 3 tracks, numbered 1, 2, 3)

explicit grid boundaries - solid line
explicit - heavy dashed lines
implicit - lighter dotted lines
===

grid-auto-rows - extra rows are implicitly created

grid-auto-columns
- define size of implicitly created columns

but how do you get extra columns?
- by default, top-to-bottom flow 
-> you define columns, then extra elements become rows
 i.e. automatically wrapped to next row

-> grid-auto-flow (default row: top to bottom)
	column: (left-to-right)
	- instead of automatically getting rows, we get extra columns
	- e.g. horizontally scrolling elements

grid-auto-flow is like flex-direction
- column or row direction