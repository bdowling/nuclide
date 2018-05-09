'use strict';var _asyncToGenerator = _interopRequireDefault(require('async-to-generator'));let connectToService = (() => {var _ref = (0, _asyncToGenerator.default)(


































  function* (
  connection)
  {
    const cssLSPService = (0, (_nuclideRemoteConnection || _load_nuclideRemoteConnection()).getServiceByConnection)(
    SERVICE_NAME,
    connection);


    const [fileNotifier, host] = yield Promise.all([
    (0, (_nuclideOpenFiles || _load_nuclideOpenFiles()).getNotifierByConnection)(connection),
    (0, (_nuclideLanguageService || _load_nuclideLanguageService()).getHostServices)()]);


    const lspService = yield cssLSPService.initializeLsp(
    ['.arcconfig', '.flowconfig', '.hg', '.git'],
    ['.css', '.less', '.scss'],
    (_featureConfig || _load_featureConfig()).default.get('nuclide-css-lsp-client.logLevel'),
    fileNotifier,
    host,
    {} // initializationOptions
    );
    return lspService || new (_nuclideLanguageServiceRpc || _load_nuclideLanguageServiceRpc()).NullLanguageService();
  });return function connectToService(_x) {return _ref.apply(this, arguments);};})();var _createPackage;function _load_createPackage() {return _createPackage = _interopRequireDefault(require('nuclide-commons-atom/createPackage'));}var _nuclideLanguageService;function _load_nuclideLanguageService() {return _nuclideLanguageService = require('../../nuclide-language-service');}var _nuclideLanguageServiceRpc;function _load_nuclideLanguageServiceRpc() {return _nuclideLanguageServiceRpc = require('../../nuclide-language-service-rpc');}var _nuclideOpenFiles;function _load_nuclideOpenFiles() {return _nuclideOpenFiles = require('../../nuclide-open-files');}var _nuclideRemoteConnection;function _load_nuclideRemoteConnection() {return _nuclideRemoteConnection = require('../../nuclide-remote-connection');}var _featureConfig;function _load_featureConfig() {return _featureConfig = _interopRequireDefault(require('nuclide-commons-atom/feature-config'));}var _DashProjectSymbolProvider;function _load_DashProjectSymbolProvider() {return _DashProjectSymbolProvider = _interopRequireDefault(require('./DashProjectSymbolProvider'));}function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     * Copyright (c) 2015-present, Facebook, Inc.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     * All rights reserved.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     * This source code is licensed under the license found in the LICENSE file in
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     * the root directory of this source tree.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     * 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     * @format
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     */ // $FlowFB
const SERVICE_NAME = 'CSSLSPService';function createLanguageService() {return new (_nuclideLanguageService || _load_nuclideLanguageService()).AtomLanguageService(connectToService, { name: 'CSSLSPService', grammars: ['source.css', 'source.css.less', 'source.css.scss'], autocomplete: { inclusionPriority: 1, // Suggestions from the server are more relevant than snippets.
      suggestionPriority: 3, disableForSelector: null, excludeLowerPriority: false,
      autocompleteCacherConfig: {
        updateResults: (_nuclideLanguageService || _load_nuclideLanguageService()).updateAutocompleteResults,
        updateFirstResults: (_nuclideLanguageService || _load_nuclideLanguageService()).updateAutocompleteFirstResults },

      analytics: {
        eventName: 'cssLSP.autocomplete',
        shouldLogInsertedSuggestion: true },

      supportsResolve: false },

    codeAction: {
      version: '0.1.0',
      priority: 1,
      analyticsEventName: 'cssLSP.codeAction',
      applyAnalyticsEventName: 'cssLSP.applyCodeAction' },

    definition: {
      version: '0.1.0',
      priority: 20,
      definitionEventName: 'cssLSP.get-definition' },

    findReferences: {
      version: '0.1.0',
      analyticsEventName: 'cssLSP.findReferences' },

    highlight: {
      version: '0.1.0',
      priority: 1,
      analyticsEventName: 'cssLSP.codehighlight' },

    outline: {
      version: '0.1.0',
      priority: 1,
      analyticsEventName: 'cssLSP.outline' } });


}

class Activation {


  constructor() {
    this._languageService = createLanguageService();
    this._languageService.activate();
  }

  provideProjectSymbolSearch() {
    return new (_DashProjectSymbolProvider || _load_DashProjectSymbolProvider()).default(this._languageService);
  }

  dispose() {
    this._languageService.dispose();
  }}


(0, (_createPackage || _load_createPackage()).default)(module.exports, Activation);