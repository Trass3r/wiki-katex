function handleWikiMath(mathspan)
{
	// TODO: fix
	// var isDisplayMath = mathspan.hasClass("mwe-math-fallback-source-display");
	var isDisplayMath = false;
	var katexElement = document.createElement(isDisplayMath ? "div" : "span");
	katexElement.setAttribute("class", isDisplayMath ? "equation" : "inline-equation");
	var tex = mathspan.find("annotation").text();
	katex.render(tex, katexElement, {displayMode: isDisplayMath, throwOnError: false});
	mathspan.empty();
	mathspan.append(katexElement);
}

findEquations();
function findEquations()
{
	// bail out if MathJax is alreaady used
	if (window.MathJax !== undefined || (window.unsafeWindow !== undefined && window.unsafeWindow.MathJax !== undefined))
		return;

	var mathElements = $("span.mwe-math-element");
	if (mathElements.length > 0)
	{
		mathElements.each(function() {
			handleWikiMath($(this));
		});
	}
}