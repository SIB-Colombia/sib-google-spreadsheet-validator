function onOpen() {
  var lgSel=parseInt(ScriptProperties.getProperty('lgSel'));
  if(isNaN(lgSel)){
    ScriptProperties.setProperty('lgSel', '0');
  }
  var ss = SpreadsheetApp.getActiveSpreadsheet();
 //var menuEntries1 = [ {name: menuValDC[lgSel], functionName: "validationsDwC"}, {name: menuValAD[lgSel], functionName: "validateLoc"}, {name: menuValCoordDec[lgSel], functionName: "validateCoordenates"}, {name: menuValScfName[lgSel], functionName: "validateCatLifeWS"}, {name: menuGSCVoc[lgSel], functionName: "fillSheetCV"}]; 
  var menuEntries1 = [ {name: menuRegElemntDwC[lgSel], functionName: "regElemntDwC"}, {name: menuRegBioDwC[lgSel], functionName: "regBioDwC"}, {name: menuEventDwC[lgSel], functionName: "eventDwC"},  {name: menuLocIdDwC[lgSel], functionName: "locIdDwC"}, {name: menuTaxonDwC[lgSel], functionName: "taxonDwC"}];
  ss.addMenu(menuDwCOp[lgSel], menuEntries1);
  var menuEntries2 = [ {name: menuValAD[lgSel], functionName: "validateLoc"}, {name: menuValCoordDec[lgSel], functionName: "validateCoordenates"},  {name: menuGSCVoc[lgSel], functionName: "fillSheetCV"}];
  ss.addMenu(menuValFunc[lgSel], menuEntries2);
  var menuEntries3 = [ {name: menuAnCha[lgSel], functionName: "replaceAChars"}, {name: menuSearchCellE[lgSel], functionName: "showErrorNext"}, {name: menuObCoord[lgSel], functionName: "getCoordenates"}, {name: menuCleanSheet[lgSel], functionName: "clearSheet"}];
  ss.addMenu(menuCorFunc[lgSel], menuEntries3);
  var menuEntries4 = [ {name: "Validations in english", functionName: "setLanguageEn"}, {name: "Validaciones en español", functionName: "setLanguageEs"}];
  ss.addMenu(menuLan[lgSel], menuEntries4);
};

