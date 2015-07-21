(function () {
    "use strict";
    function createSearchInput() {
        function createSearchLabel() {
            var searchLabel = document.createElement('label');
            searchLabel.setAttribute('for', 'cruksearchwidget-edit-keyword');
            searchLabel.appendChild(document.createTextNode('Search by cancer type, drug name, trial name, or '));

            var chooseLink = document.createElement('a');
            chooseLink.setAttribute('href', 'http://www.cancerresearchuk.org/about-cancer/find-a-clinical-trial/clinical-trials-search?Tbrowser=open&search_api_aggregation_1=5f510abh&amp;f%5B0%5D=field_trial_status%253A422');
            chooseLink.appendChild(document.createTextNode('choose from a list of cancer types'));
            searchLabel.appendChild(chooseLink);
            return searchLabel; }

        function createSearchBox() {
            var searchBox = document.createElement('input');
            searchBox.setAttribute('type', 'text');
            searchBox.setAttribute('id', 'cruksearchwidget-edit-keyword');
            searchBox.setAttribute('name', 'keyword');
            searchBox.setAttribute('size', '30');
            searchBox.setAttribute('maxlength', '128');
            searchBox.setAttribute('class', 'form-autocomplete');
            searchBox.setAttribute('autocomplete', 'OFF');
            searchBox.setAttribute('aria-autocomplete', 'list');
            return searchBox; }

        function createAutoComplete() {
            var input = document.createElement('input');
            input.setAttribute('type', 'hidden');
            input.setAttribute('id', 'cruksearchwidget-edit-keyword-autocomplete');
            input.setAttribute('value', 'http://www.cancerresearchuk.org/about-cancer/find-a-clinical-trial/clinical-trials-search');
            input.setAttribute('disabled', 'disabled');
            input.setAttribute('class', 'autocomplete autocomplete-processed');
            return input; }

        function createAriaSpan() {
            var span = document.createElement('span');
            span.setAttribute('class', 'element-invisible');
            span.setAttribute('aria-live', 'assertive');
            span.setAttribute('id', 'cruksearchwidget-edit-keyword-autocomplete-aria-live');
            return span; }

        var container = document.createElement('div');
        container.appendChild(createSearchLabel());
        container.appendChild(createSearchBox());
        container.appendChild(createAutoComplete());
        container.appendChild(createAriaSpan());
        return container; }

    function createHiddenFormBuildId() {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                    .toString(16)
                    .substring(1); }
        var guid = s4() + s4() + s4() + s4() + s4() + s4() + s4() + s4() + s4() + s4() + s4();
        var input = document.createElement('input');
        input.setAttribute('type', 'hidden');
        input.setAttribute('name', 'form_build_id');
        input.setAttribute('value', 'form-' + guid);
        return input; }

    function createHiddenFormId() {
        var input = document.createElement('input');
        input.setAttribute('type', 'hidden');
        input.setAttribute('name', 'form_id');
        input.setAttribute('value', 'get_cruk_clinical_trial_search');
        return input; }

    function createCheckboxOptions() {
        function createCheckbox(value, checked, text) {
            var container = document.createElement('div');
            var id = 'cruksearchwidget-edit-trial-checkboxes-' + value.toLowerCase();

            var checkbox = document.createElement('input');
            checkbox.setAttribute('type', 'checkbox');
            checkbox.setAttribute('id', id);
            checkbox.setAttribute('name', 'trial_checkboxes[' + value + ']');
            checkbox.setAttribute('value', value);
            if (checked) {
                    checkbox.setAttribute('checked', 'checked');
            }

            var label = document.createElement('label');
            label.setAttribute('for', id);
            label.appendChild(document.createTextNode(text));

            container.appendChild(checkbox);
            container.appendChild(label);
            return container; }

        var fieldset = document.createElement('fieldset');
        fieldset.setAttribute('id', 'cruksearchwidget-edit-trial-select');

        var legend = document.createElement('legend');
        legend.appendChild(document.createTextNode('Include trials that'));

        var wrapper = document.createElement('div');
        wrapper.setAttribute('class', 'cruksearchwidget-fieldset-wrapper');

        var description = document.createElement('div');
        description.setAttribute('class', 'cruksearchwidget-fieldset-description');
        description.appendChild(document.createTextNode('(select all that apply)'));

        var checkboxContainer = document.createElement('div');
        checkboxContainer.setAttribute('id', 'cruksearchwidget-edit-trial-checkboxes');
        checkboxContainer.setAttribute('class', 'cruksearchwidget-form-checkboxes');
        checkboxContainer.appendChild(createCheckbox('Open', true, 'Are currently recruiting people'));
        checkboxContainer.appendChild(createCheckbox('Closed', false, 'Are closed to recruitment but are ongoing'));
        checkboxContainer.appendChild(createCheckbox('Results', false, 'Have results available'));

        wrapper.appendChild(description);
        wrapper.appendChild(checkboxContainer);

        fieldset.appendChild(legend);
        fieldset.appendChild(wrapper);
        return fieldset; }

    function createSearchButton() {
        var searchButton = document.createElement('input');
        searchButton.setAttribute('class', 'cruksearchwidget-result-button');
        searchButton.setAttribute('type', 'submit');
        searchButton.setAttribute('id', 'cruksearchwidget-edit-submit--2');
        searchButton.setAttribute('name', 'op');
        searchButton.setAttribute('value', 'Search');
        return searchButton; }

    var container = document.getElementById('cancerresearch-search-widget');

    var pane = document.createElement('div');
    pane.setAttribute('class', 'cruksearchwidget-pane');

    var paneHeader = document.createElement('h2');
    paneHeader.setAttribute('class', 'cruksearchwidget-pane-title');
    paneHeader.appendChild(document.createTextNode('Find a trial'));
        
    var paneContent = document.createElement('div');
    paneContent.setAttribute('class', 'cruksearchwidget-pane-content');

    var searchFieldsContainer = document.createElement('div');
    searchFieldsContainer.setAttribute('class', 'cruksearchwidget-search-fields');

    var form = document.createElement('form');
    form.setAttribute('method', 'post');
    form.setAttribute('action', 'http://www.cancerresearchuk.org/about-cancer/find-a-clinical-trial');
    form.setAttribute('id', 'cruksearchwidget-form');
    form.setAttribute('accept-charset', 'UTF-8');
    form.setAttribute('autocomplete', 'on');

    var div = document.createElement('div');
    div.setAttribute('class', 'cruksearchwidget-search-options');

    container.appendChild(pane);
    pane.appendChild(paneHeader);
    pane.appendChild(paneContent);
    paneContent.appendChild(form);
    form.appendChild(div);
    div.appendChild(createSearchInput());
    div.appendChild(createHiddenFormBuildId());
    div.appendChild(createHiddenFormId());
    div.appendChild(createCheckboxOptions());
    form.appendChild(createSearchButton());
})();
