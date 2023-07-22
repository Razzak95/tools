$(document).ready(function () {

    let fields = [];
    let index = 0;

    $('#add-new-field').click(function () {
        let fieldHtml = `

            <div id="field-${index}" class="wrapper-field" style="display: none;">

                <div>
                    <div class="field-label">Name</div>
                    <input id="field-name-${index}" type="text" class="form-text" value="sample" />
                </div>

                <div>
                    <div class="field-label">Type</div>
                    <select id="field-type-${index}" class="form-text">
                        <option value="char">Char</option>
                        <option value="text">Text</option>
                        <option value="boolean">Boolean</option>
                        <option value="integer">Integer</option>
                        <option value="float">Float</option>
                        <option value="monetary">Monetary</option>
                        <option value="date">Date</option>
                        <option value="datetime">DateTime</option>
                        <option value="binary">Binary</option>
                        <option value="selection">Selection</option>
                        <option value="many2one">Many2one</option>
                        <option value="one2many">One2many</option>
                        <option value="many2many">Many2many</option>
                        <option value="html">Html</option>
                        <option value="reference">Reference</option>
                        <option value="related">Related</option>
                        <option value="function">Function</option>
                        <option value="serialized">Serialized</option>
                        <option value="color">Color</option>
                        <option value="image">Image</option>
                    </select>
                </div>
                
                <!--<div>
                    <div class="field-label">String</div>
                    <input id="field-string-${index}" type="text" class="form-text" />
                </div>

                <div>
                    <div class="field-label">widget</div>
                    <select id="field-widget-${index}" class="form-text">
                        <option value=""></option>
                        <option value="char">Char</option>
                        <option value="text">Text</option>
                        <option value="html">HTML</option>
                        <option value="checkbox">Checkbox</option>
                        <option value="date">Date</option>
                        <option value="datetime">Datetime</option>
                        <option value="float_time">Float Time</option>
                        <option value="progressbar">Progress Bar</option>
                        <option value="selection">Selection</option>
                        <option value="many2one">Many2one</option>
                        <option value="many2many_tags">Many2many Tags</option>
                        <option value="many2many">Many2many</option>
                        <option value="one2many">One2many</option>
                        <option value="radio">Radio</option>                    
                    </select>
                </div>
                
                <div>
                    <div class="field-label">Required</div>
                    <input id="field-required-${index}" type="checkbox" class="form-text2" />
                    <label for="field-required-${index}">Required</label><br>
                </div>
                
                <div>
                    <div class="field-label">Readonly</div>
                    <input id="field-readonly-${index}" type="checkbox" class="form-text2" />
                    <label for="field-readonly-${index}">Readonly</label><br>
                </div>

                <div>
                    <div class="field-label">Record Name (_rec_name)</div>
                    <input id="field-rec-name-${index}" type="checkbox" name="ddd" />
                    <label for="field-rec-name-${index}">Use this field as record name</label><br>
                </div>-->
                
                <div class="wrapper-btn-remove-field">
                    <button id="btn-remove-field-${index}" data-field-index="${index}" class="btn-remove-field mbtn mt-2"> <i class="fa fa-trash"></i> </button>
                </div>

            </div>

        `;

        $('.fields').append(fieldHtml);
        $('#field-' + index).slideDown(300);

        let field = {
            index: index,
            name: $('#field-name-' + index).val(),
            type: $('#field-type-' + index).val()
        }
        fields.push(field);
        index++;
        console.log('Field added', field);

    });

    // Remove field
    $(document).on("click", ".btn-remove-field", function (e) {
        let dataFieldIndex = $(this).attr('data-field-index');
        $('#field-' + dataFieldIndex).slideUp(300);

        for (let field of fields) {
            if (field.index == dataFieldIndex) {
                let fieldIndex = fields.indexOf(field);
                fields.splice(fieldIndex, 1);
            }
        }

        console.log(fields);

    });

    // Generate code
    $(document).on("click", "#save-fields", function () {

        // Validation
        let mdlName = $('#model-name').val();
        if (mdlName.length <= 1) {
            alert('Enter a model name');
            return;
        }
        if (!mdlName.includes('.')) {
            alert('Enter a valid model name (not recommended without ".")');
            return;
        }

        // Store inputs to array objects
        for (let field of fields) {
            let index = field.index;
            field.name = $('#field-name-' + index).val();
            field.type = $('#field-type-' + index).val();
        }
        console.log('Saved:', fields);

        // Generate code
        let code = '';
        let PythonCode = '';
        let modelDotName = $('#model-name').val();  // Original model input
        let model_Name = modelDotName.replace('.', '_');
        let modelName = modelDotName.replace('.', '-');

        let modelParts = modelDotName.split('.');
        let pythonClass = '';
        let capitalizedModelName = '';
        for (let modelPart of modelParts) {
            pythonClass += modelPart.charAt(0).toUpperCase() + modelPart.slice(1);
            capitalizedModelName += modelPart.charAt(0).toUpperCase() + modelPart.slice(1) + ' ';
        }

        capitalizedModelName.trim();

        let currentDate = new Date();
        let options = { day: 'numeric', month: 'long', year: 'numeric' };
        let formattedDate = new Intl.DateTimeFormat('en-US', options).format(currentDate);



        PythonCode += `class ${pythonClass}(models.Model):\n`;
        PythonCode += `    _name = '${modelDotName}'\n`;
        PythonCode += `    _description = '${modelDotName}'`;
        PythonCode += `\n\n`;

        // Field view
        let fieldViews = '';
        let fieldViewsForm = '';

        for (let _field of fields) {

            let fieldType = _field.type.charAt(0).toUpperCase() + _field.type.slice(1);

            if (_field.type == 'image') {

                console.log('found image');
                let original_image_field = `${_field.name}_1920`;
                PythonCode += `    ${_field.name}_1920 = fields.Image("Image", max_width=1920, max_height=1920)\n`;
                PythonCode += `    ${_field.name}_1024 = fields.Image("Image 1024", related="${original_image_field}", max_width=1024, max_height=1024, store=True)\n`;
                PythonCode += `    ${_field.name}_512 = fields.Image("Image 512", related="${original_image_field}", max_width=512, max_height=512, store=True)\n`;
                PythonCode += `    ${_field.name}_256 = fields.Image("Image 256", related="${original_image_field}", max_width=256, max_height=256, store=True)\n`;
                PythonCode += `    ${_field.name}_128 = fields.Image("Image 128", related="${original_image_field}", max_width=128, max_height=128, store=True)\n`;

            } else {
                PythonCode += `    ${_field.name} = fields.${fieldType}()\n`;
            }

            fieldViews += `<field name="${_field.name}"/>\n            `;
            fieldViewsForm += `<field name="${_field.name}"/>\n                       `;

        }
        PythonCode += `\n`;


        code += `<!-- ${modelDotName}, generated on ${formattedDate} -->\n`;
        code += `<!-- Tree view of ${modelDotName} -->\n`;
        code += `<record model="ir.ui.view" id="${model_Name}_tree_id">\n`;
        code += `    <field name="name">${capitalizedModelName}</field>\n`;
        code += `    <field name="model">${modelDotName}</field>\n`;
        code += `    <field name="arch" type="xml">\n`;
        code += `        <tree>\n`;
        code += `            ${fieldViews}\n`;
        code += `        </tree>\n`;
        code += `    </field>\n`;
        code += `</record>`;

        code += `\n\n`;

        code += `<!-- Form view of ${modelDotName} -->\n`;
        code += `<record model="ir.ui.view" id="${model_Name}_form_id">\n`;
        code += `    <field name="name">${capitalizedModelName}</field>\n`;
        code += `    <field name="model">${modelDotName}</field>\n`;
        code += `    <field name="arch" type="xml">\n`;
        code += `        <form>\n`;
        code += `            <sheet>\n`;
        code += `                <group>\n`;
        code += `                    <group>\n`;
        code += `                       ${fieldViewsForm}\n`;
        code += `                    </group>\n`;
        code += `                    <group>\n`;
        code += `                    </group>\n`;
        code += `                </group>\n`;
        code += `            </sheet>\n`;
        code += `        </form>\n`;
        code += `    </field>\n`;
        code += `</record>`;

        code += `\n\n`;
        code += `<!-- Action view of ${modelDotName} -->\n`;
        code += `<record model="ir.actions.act_window" id="${model_Name}_action_id">\n`;
        code += `    <field name="name">${capitalizedModelName}</field>\n`;
        code += `    <field name="res_model">${modelDotName}</field>\n`;
        code += `    <field name="view_mode">tree,form</field>\n`;
        code += `</record>`;

        code += `\n\n`;
        code += `<menuitem id="${model_Name}_menu_id"\n`;
        code += `    name="${capitalizedModelName}"\n`;
        code += `    parent="SET_YOUR_PARENT_MENU"\n`;
        code += `    sequence="SET_YOUR_SEQUENCE"\n`;
        code += `    action="${model_Name}_action_id"/>`;

        code += `\n\n`;
        code += `<!-- Security of ${modelDotName} -->\n`;
        code += `${model_Name},${model_Name},model_${model_Name},,1,1,1,1`;

        $('.wrapper-generated').show();

        var editor = CodeMirror.fromTextArea(document.getElementById("generated-code"), {
            lineNumbers: true,
            mode: "xml",
            theme: "default"
        });

        var content = editor.getValue();
        content += code;
        editor.setValue(content);

        // PythonCode
        var pythonEditor = CodeMirror.fromTextArea(document.getElementById("generated-python-code"), {
            lineNumbers: true,
            mode: "python",
            theme: "default"
        });

        var PythonContent = pythonEditor.getValue();
        PythonContent += PythonCode;
        pythonEditor.setValue(PythonContent);

        /*$('#copy-generated-python-code').click(function () {
            pythonEditor.toTextArea(); // Copy contents to the textarea element
            document.getElementById("generated-python-code").select(); // Select the contents of the textarea element
            document.execCommand('copy'); // Copy the selected contents to the clipboard
            pythonEditor.focus(); // Return focus to the editor
        });*/

    });

    $('input[type="textarea"]').on('copy', function () {
        alert('Text copied!');
    });





});