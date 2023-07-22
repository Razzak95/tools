$(document).ready(function () {

    $('#btn-generate-string').click(function () {
        /* -------------------------------------------------
            string
            param: From raw string generate different versions of strings
        ---------------------------------------------------- */
        // String validation
        let string = $('#string').val();
        if (!string) {
            return
        }

        let allResult = '';
        let resultUnderscore = '';
        let resultLower = '';
        let resultUpper = '';
        let dashedLine = '----------------------------------------';
        let newLine = '\n';

        // Split the string into an array of lines
        var lines = string.split('\n');

        // Iterate over each line using forEach
        for (let line of lines) {
            lineTrimmed = line.trim();
            let lineLower = lineTrimmed.toLowerCase();
            let lineUpper = lineTrimmed.toUpperCase();
            let lineUnderscore = lineLower.replace(/ /g, "_");
            lineUnderscore = lineUnderscore.replace(/'/g, "_");
            resultUnderscore += `${lineUnderscore}\n`;
            resultLower += `${lineLower}\n`;
            resultUpper += `${lineUpper}\n`;
        }

        resultUnderscore += dashedLine + newLine;
        resultLower += dashedLine + newLine;
        resultUpper += dashedLine + newLine;
        allResult = resultUnderscore + resultLower + resultUpper
        $('#string-result').val(allResult);
    });

    /* -------------------------------------------------
       option-string
       param: Strings will be natural string of lines
    ---------------------------------------------------- */
    $('#btn-generate-option-string').click(function () {
        // String validation
        let optionString = $('#option-string').val();
        if (!optionString) {
            return
        }

        optionString = optionString.trim();
        let optionStringLower = optionString.toLowerCase();
        let optionHtml = ``;

        // Split the string into an array of lines
        var lines = optionString.split('\n');
        console.log('lines', lines);

        // Iterate over each line using forEach
        optionHtml += `<select id="ID-HERE" name="NAME-HERE">\n`;
        for (let line of lines) {
            console.log(line);
            line = line.trim();
            let lineLower = line.toLowerCase();
            let lineUnderscore = lineLower.replace(/ /g, "_");
            optionHtml += `    <option value="${lineUnderscore}">${line}</option>\n`;
        }
        optionHtml += `</select>`;

        // Show in result
        $('#option-result').html(optionHtml);
    });

    /*
       Break line into list
    */
    $('#sf__btn-break-line').click(function () {

        let sfSeparator = $('#sf__separator').val();
        if (!sfSeparator) {
            alert('Separator not specified');
            return
        }

        if (sfSeparator.length > 1) {
            alert('Separator will not be more than 1 character');
            return
        }

        // Split the string into an array of lines
        let string = $('#string').val();
        if (!string) {
            alert('string is empty');
            return
        }
        // let lines = string.split(' ');
        // for (let line of lines) {
        //     console.log('line', line);

        // }
        let separatorVal = $('#sf__separator').val();
        console.log('separatorVal', separatorVal);
        let separator = separatorVal;
        let regex = new RegExp(separator, "g");
        let stringList = string.replace(regex, "\n");
        console.log(stringList);
        $('#string').val(stringList);

        /*
        let space = " "; // or any other variable containing the space character
        let regex = new RegExp(space, "g");

        let string2 = "This is a sample string with spaces.";
        let stringB = string2.replace(regex, "\n");
        console.log(stringB);
        */
    });

    $('#sf__separator').on('input', function () {
        var inputValue = $(this).val();

        if (inputValue.length > 1) {
            $(this).val(inputValue.charAt(0));
        }
    });

});