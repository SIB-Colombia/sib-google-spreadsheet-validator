/*
*Función para llenar la hoja con los vocabularios controlados
*Function to fill the columns with the controlled vocabulary.
*/
function fillSheetCV() {
  var lgSel=parseInt(ScriptProperties.getProperty('lgSel'));
  var cVocabulary=new Array();
  var index=new Array();
  var fieldToFill="";
  var nl=0;
  var sheetDnC = SpreadsheetApp.getActiveSpreadsheet();
  var sheetCV=sheetDnC.getSheetByName(cVocSheet[lgSel]);
  
  if(sheetCV==null){
    sheetCV=sheetDnC.insertSheet(cVocSheet[lgSel]);
  }else{
    sheetCV.clear();
  }
  
  var fields=[type[lgSel], basisOfRecord[lgSel], sex[lgSel], waterBody[lgSel], country[lgSel], stateProvince[lgSel], county[lgSel], kingdom[lgSel], phylum[lgSel], class[lgSel], order[lgSel], family[lgSel], genus[lgSel], subgenus[lgSel]];
  
  var fieldsR=sheetCV.getRange(1, 1, 1, fields.length);
  for(var f=0;f<fields.length;f++){
    fieldsR.getCell(1, f+1).setValue(fields[f]);
    fieldsR.getCell(1, f+1).setFontWeight("bold");
  }
  
  /*Probar
  Browser.msgBox("prueba");
  fieldsR.setValues(fields);
  fieldsR.setFontWeight("bold");
  */
  
  var rangeData = sheetCV.getDataRange();
  var data = rangeData.getValues();
  var columnTitles=data[0];
  
   //Tipo
   //controlled vocabulary 
  cVocabulary[type[lgSel]]=typeVc[type[lgSel]];
  
  //Base del Registro 
  //controlled vocabulary 
  cVocabulary[basisOfRecord[lgSel]]=basisOfRecordVc[basisOfRecord[lgSel]];
  
  //Sexo
  //controlled vocabulary
  cVocabulary[sex[lgSel]]=sexVc[sex[lgSel]]
  
  //Cuerpo de Agua
  //controlled vocabulary
  cVocabulary[waterBody[lgSel]]=["Lago de Tota", "Lago Chingaza", "Embalse del Neusa"];
  
  //País
  //controlled vocabulary
  cVocabulary[country[lgSel]]=["Colombia", "Perú", "Argentina", "Bolivia", "Chile"];
  
  //Departamento
  //controlled vocabulary
  cVocabulary[stateProvince[lgSel]]=["Amazonas", "Bolívar", "Caquetá", "Sucre", "Vichada", "Cundinamarca", "Bogotá", "Boyacá", "Lima"];
  
  //Municipio
  //controlled vocabulary
  cVocabulary[county[lgSel]]=["Suesca", "Nilo", "Ricaurte", "Tocaima", "Cajica", "Chía", "Suba"];
  
  //Reino
  //controlled vocabulary
  cVocabulary[kingdom[lgSel]]=["Plantae", "Animalia", "Fungi", "Monera", "Virus", "Viruses", "Archaea", "Chromista", "Protozoa","Bacteria"];
  
  //Filo
  //controlled vocabulary
  cVocabulary[phylum[lgSel]]=["Acoelomorpha", "Chordata", "Arthropoda"];
  
  //Clase
  //controlled vocabulary
  cVocabulary[class[lgSel]]=["Amphibia", "Reptilia", "Mammalia"];
  
  //Orden
  //controlled vocabulary
  cVocabulary[order[lgSel]]=["Rodentia", "Carnivora"];
  
  //Familia
  //controlled vocabulary
  cVocabulary[family[lgSel]]=["Canidae", "Felidae"];
  
  //Género
  //controlled vocabulary
  cVocabulary[genus[lgSel]]=["Canis", "Felis"];
  
  //Subgénero
  //controlled vocabulary
  cVocabulary[subgenus[lgSel]]=["Canis lupus", "Felis catus"];
  
  //for the elements in array cVocabulary
  for(var l in cVocabulary){
    if(cVocabulary.hasOwnProperty(l)){
      fieldToFill=l;
      index=new Array();
      nl=0;
      for(var k=0;k<columnTitles.length;k++){
        if(fieldToFill==columnTitles[k].toString()){
          //insert the ranges (cells) with the name of the fields
          index.push(rangeData.getCell(1, k+1));
          nl++;
        }
      }
      
      if(index.length==1){
        var column1=index[0].getColumnIndex();
        var rangeToFill=sheetCV.getRange(2, column1, cVocabulary[l].length);
        for(var p=0;p<cVocabulary[l].length;p++){
          rangeToFill.getCell(p+1, 1).setValue(cVocabulary[l][p]);
        }
      }
    }
  }
};



function getCV(field, data){
  var index=new Array();
  var result=new Array();
  for(var kl=0;kl<data[0].length;kl++){
    if(field==data[0][kl]){
      //insert the ranges (cells) with the name of the fields
      index.push(kl); 
    }
  }
  if(index.length>=1){
    for(var il=0;il<index.length;il++){
    var column=index[il];
    for(var lv=1;lv<data.length;lv++){
      var valuef=data[lv][column];     
      if(valuef==""){   
        continue;
      }else{
        result.push(valuef);
      }
    }
   } 
  }
  return result;
};

//function to clean the principal spreadsheet.
function clearSheet(){
  var lgSel=parseInt(ScriptProperties.getProperty('lgSel'));
  var spSheetDnC=SpreadsheetApp.getActiveSpreadsheet();
  var sheetDnC=spSheetDnC.getSheetByName(nameOfSheet[lgSel]);
  if(sheetDnC==null){
    Browser.msgBox(messageNoValSheet[lgSel]);
    throw messageNoValSheet[lgSel];  //***funciona mostrando errores en la hoja ********
  }
  var rangeData = sheetDnC.getDataRange();
  var numrow=rangeData.getNumRows();
  var numcol=rangeData.getNumColumns();
  var rangeCL=sheetDnC.getRange(2, 1, numrow-1, numcol);
  rangeCL.setBackgroundColor("white");
  ScriptProperties.setProperty('isValidate', '0');
};

function trim(valueC){
  valueC=valueC.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
  return valueC;
};

function showErrors(countE){
  var lgSel=parseInt(ScriptProperties.getProperty('lgSel'));
  var pos =1;
  var sheetDnC = SpreadsheetApp.getActiveSpreadsheet();
  var sheetOE=sheetDnC.getSheetByName(errorSheet[lgSel]);
  var columnE=2;
  if(null == sheetOE){
    sheetOE=sheetDnC.insertSheet(errorSheet[lgSel]);
  }else{
    sheetOE.clear();
  }
  var len=Object.keys(countE).length;
  if(len==0){
    Browser.msgBox("Error"); ///**********
  }else{
    var fieldsE=sheetOE.getRange(pos, 1, len+1, tValidation[lgSel].length+1); //row, column, numrows, numcolumns
    for (var kl=0;kl<tValidation[lgSel].length;kl++){
      fieldsE.getCell(1,kl+2).setValue(tValidation[lgSel][kl]);
      fieldsE.getCell(1,kl+2).setFontWeight("bold");
    }
    for(var t in countE){
      if(countE.hasOwnProperty(t)){
      fieldsE.getCell(columnE, 1).setValue(t);  
      fieldsE.getCell(columnE, 1).setFontWeight("bold");
        for(var r=0;r<tValidation[lgSel].length;r++){
          if(countE[t][r]!=undefined){
            fieldsE.getCell(columnE,r+2).setValue(countE[t][r]);
          }
        }
        pos=pos+3;
      }
      columnE++;
    }
  }
};

function setLanguageEn(){
  ScriptProperties.setProperty('lgSel', '0');
}

function setLanguageEs(){
  ScriptProperties.setProperty('lgSel', '1');
}
