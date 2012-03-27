// Copyright 2011 Plannow Technologies
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

Tapestry.editor = {
	formEventHandlers : {}
};

Tapestry.Initializer.initCKEditor = function(textareaId, textareaName, editorInitJSON) {

    /*
     * If the textarea with id=ckeditorId cannot be found (probably because if
     * tapestry zone update), than destroy it's corresponding ckeditor instance.
     */
    for (var editorId in CKEDITOR.instances) {
        if ($(editorId) == undefined) {
            // destroy the ckeditor instance without updating the textarea
            CKEDITOR.instances[editorId].destroy(true);
        }
    }

	// init CKEditor for the given textarea
	CKEDITOR.replace(textareaName, editorInitJSON);

	Tapestry.editor.formEventHandlers[textareaId] = function() {
		/*
		 * if the ckeditor instance with id=textareaId cannot be found, than it
		 * has been destroyed so remove the corresponding eventHandler listening
		 * on FORM_PREPARE_FOR_SUBMIT_EVENT,
		 *
		 * else update the textarea before the form is submitted so that the
		 * corresponding server side property is updated.
		 */
		var editor = CKEDITOR.instances[textareaId];
		if (editor == undefined) {
            $("#" + textareaId).unbind(Tapestry.FORM_PREPARE_FOR_SUBMIT_EVENT,
                Tapestry.editor.formEventHandlers[textareaId]);
        }
		else {
            editor.updateElement();
        }
	};

    $("#" + textareaId).bind(Tapestry.FORM_PREPARE_FOR_SUBMIT_EVENT,
        Tapestry.editor.formEventHandlers[textareaId]);


};