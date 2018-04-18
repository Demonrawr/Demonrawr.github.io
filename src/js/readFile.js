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
        
				controls.getObject().position.x = parseInt(textByLine[0]);
				controls.getObject().position.y = parseInt(textByLine[1]);
				controls.getObject().position.z = parseInt(textByLine[2]);
            }
        }
    }
    rawFile.send(null);
}