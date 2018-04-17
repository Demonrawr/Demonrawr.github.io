function readTextFile(file)
{
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                var allText = rawFile.responseText;
				var textByLine = allText.split("\n");
                //alert(textByLine[0]);
				controls.getObject().position.x = parseInt(textByLine[1]);
            }
        }
    }
    rawFile.send(null);
}