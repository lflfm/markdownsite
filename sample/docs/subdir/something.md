# something
  
do links to and from subdirs work?  
Go back to [readme (relative)](../README.md) or [readme (absolute)](/README.md) to find out...  
Also, click [click on this link](#my-multi-word-header) to try in-document links
---  
**The quick brown [fox][1], jumped over the lazy [dog][2].**  
  
[1]: https://en.wikipedia.org/wiki/Fox "Wikipedia: Fox"  
[2]: https://en.wikipedia.org/wiki/Dog "Wikipedia: Dog"  
  
## code checks
meybe we check how code renders...
```javascript
console.log('this is some javascript code');
function test(argument) {
	console.log(`Saying ${argument} should be good enough.`);
}
```
  
maybe some more?  
```php
echo "this is some php";
function someFunction($argument = null)
{
	$newargument = new makeArgument($argument);
	echo "This is an argument: " . $newargument;
}
```
  
```java
System.out.println("maybe java?");
```

## my multi word header
[back top top](#)  
text text text text  
text text text text  
text text text text  
text text text text  
text text text text  
text text text text  
text text text text  
text text text text  
text text text text  
text text text text  
text text text text  
text text text text  
text text text text  

## unsupported stuff
these sintaxes don't seem to be supported by marked, we can implement something later for them:
\~\~deleted words\~\~ ==highlighted words== \*escaped asterisks without formatting\*  

The quick brown fox[^1] jumped over the lazy dog[^2].

[^1]: Foxes are red
[^2]: Dogs are usually not red
