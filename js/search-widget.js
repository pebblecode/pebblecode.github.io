(function () {
    "use strict";
    function createWidget() {
        function createIntroText() {
            var container = document.createElement('div');
            container.setAttribute('id', 'cruksearchwidget-intro');
            var textA = document.createElement('p');
            textA.appendChild(document.createTextNode('Clinical trials are medical research studies that involve people.\n\r'));
            var textB = document.createElement('p');
            textB.appendChild(document.createTextNode('Search our database of cancer clinical trials to see if there are open trials for you to join.'));
            container.appendChild(textA);
            container.appendChild(textB);
            return container; }

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
                return searchBox; }

            var container = document.createElement('div');
            container.appendChild(createSearchLabel());
            container.appendChild(createSearchBox());
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

        function createSearchButton() {
            var searchButton = document.createElement('input');
            searchButton.setAttribute('class', 'cruksearchwidget-result-button');
            searchButton.setAttribute('type', 'submit');
            searchButton.setAttribute('id', 'cruksearchwidget-edit-submit--2');
            searchButton.setAttribute('name', 'op');
            searchButton.setAttribute('value', 'Search');
            return searchButton; }

        function createCrukLogo() {
            var logo = document.createElement('img');
            logo.setAttribute('class', 'cruksearchwidget-logo');
            logo.setAttribute('src', '../img/cruk-clinical-trials/cruk-logo.png');
            logo.setAttribute('alt', 'CRUK logo');
            logo.setAttribute('width', '200');
            return logo;
        }

        function addAutocomplete() {
            var availableTags = ["All cancer types","Brain (and spinal cord) tumours","Cancer spread to the brain","Adrenal gland cancer","Bile duct cancer","Gallbladder cancer","Bladder cancer","Bone sarcoma","Ewing\u0027s sarcoma","Cancer spread to the bone","Bowel (colorectal) cancer","Anal cancer","Breast cancer","Cervical cancer","Children\u0027s cancers","Gestational trophoblastic tumour","Choriocarcinoma","Head and neck cancers","Ear cancer","Eye cancer","Retinoblastoma","Mouth (oral) cancer","Nasal and paranasal sinus cancer","Nasopharyngeal cancer","Pharyngeal cancer","Salivary gland cancer","Kidney cancer","Renal cell carcinoma","Wilms\u0027 tumour","Laryngeal cancer","Leukaemia","Acute leukaemia","Chronic leukaemia","Chronic lymphocytic leukaemia (CLL)","Chronic myeloid leukaemia (CML)","Liver cancer","Lung cancer","Non small cell lung cancer","Small cell lung cancer","Lymphoma","Non-Hodgkin lymphoma","Hodgkin lymphoma","Mesothelioma","Myeloma","Neuroblastoma","Neuroendocrine tumour (NET)","Carcinoid","Oesophageal cancer","Ovarian cancer","Pancreatic cancer","Penis cancer","Prostate cancer","Skin cancer","Melanoma","Non melanoma skin cancer","Basal cell skin cancer","Squamous cell skin cancer","Sarcoma","Soft tissue sarcoma","Stomach cancer","Testicular cancer","Thyroid cancer","Cancer of unknown primary (CUP)","Vaginal cancer","Vulval cancer","Womb (uterine or endometrial) cancer","Cancer spread to the liver","Cancer spread to the lung","Hairy cell leukaemia","Acute lymphoblastic leukaemia (ALL)","Acute myeloid leukaemia (AML)","Myelodysplastic syndrome (MDS)","Myelofibrosis","Polycythaemia","Thrombocythaemia","Transitional cell cancer","High grade lymphoma","Low grade lymphoma","Secondary cancers","Colon cancer","Rectal cancer","Small bowel cancer"];
            $('#cruksearchwidget-edit-keyword').autocomplete({ source: availableTags });
        }

        var container = document.getElementById('cancerresearch-search-widget');

        var pane = document.createElement('div');
        pane.setAttribute('class', 'cruksearchwidget-pane');

        var paneHeader = document.createElement('h2');
        paneHeader.setAttribute('class', 'cruksearchwidget-pane-title');
        paneHeader.appendChild(document.createTextNode('Find a cancer clinical trial'));

        var paneContent = document.createElement('div');
        paneContent.setAttribute('class', 'cruksearchwidget-pane-content');

        var searchFieldsContainer = document.createElement('div');
        searchFieldsContainer.setAttribute('class', 'cruksearchwidget-search-fields');

        var form = document.createElement('form');
        form.setAttribute('method', 'post');
        form.setAttribute('action', 'http://www.cancerresearchuk.org/about-cancer/find-a-clinical-trial/clinical-trials-search');
        form.setAttribute('id', 'cruksearchwidget-form');
        form.setAttribute('accept-charset', 'UTF-8');
        form.setAttribute('autocomplete', 'on');

        var div = document.createElement('div');
        div.setAttribute('class', 'cruksearchwidget-search-options');

        container.appendChild(pane);
        pane.appendChild(paneHeader);
        pane.appendChild(paneContent);
        paneContent.appendChild(form);
        form.appendChild(createIntroText());
        form.appendChild(div);
        div.appendChild(createSearchInput());
        div.appendChild(createHiddenFormBuildId());
        div.appendChild(createHiddenFormId());
        div.appendChild(createSearchButton());
        form.appendChild(createCrukLogo());
        addAutocomplete();
    }

    function loadAutocompleteStyling(callback) {
        var link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = '//code.jquery.com/ui/1.11.4/themes/smoothness/jquery-ui.css';
        link.onload = callback;
        var head = document.getElementsByTagName('head')[0].appendChild(link);
    }

    function loadLibrary(src, callback) {
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = src;
        script.onload = callback;
        var head = document.getElementsByTagName('head')[0].appendChild(script);
    }

    function loadJqueryUi(callback) {
      if (typeof jQueryUi == 'undefined') {
        loadLibrary('//code.jquery.com/ui/1.11.4/jquery-ui.js', callback);
      } else {
        callback();
      }
    }

    function loadJquery(callback) {
      if (typeof jQuery == 'undefined') {
        loadLibrary('//code.jquery.com/jquery-1.10.2.js', callback);
      } else {
        callback();
      }
    }

    loadJquery(
        function() { loadJqueryUi(
            function() { loadAutocompleteStyling(
                createWidget)})});
})();
