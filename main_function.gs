function regElemntDwC(){
  //Se verifica el idioma, de acuerdo a la propiedad del script
  //Language is checked according to the property of the script
  var lgSel=parseInt(ScriptProperties.getProperty('lgSel'));
  //Read the spreadsheeet
  var spSheetDnC=SpreadsheetApp.getActiveSpreadsheet();
  var sheetDnC=spSheetDnC.getSheetByName(nameOfSheet[lgSel]);
  
  //Browser.msgBox((nameOfSheet[lgSel]));
  if(sheetDnC!=null){
    //Read the range of cells 
    var rangeData = sheetDnC.getDataRange();
    rangeData.setNumberFormat('@STRING@');
    var data = rangeData.getValues();
    
    //array for the names of the fields to validate
    var dwCElements=new Array();
    //array for the names of the fields to validate for errors
    var dwCFieldsErrors=new Array();
    //arreglo para los errores de los c�digos respecto a otros
    var rangesErrorCod= new Array();
    //array for the types of validations
    var validations= new Array();
    //array for index of the column with name of the field.
    var index=new Array(); 
    //array for the cell with errors of validation
    var rangesError= new Array(); 
    //errores en la validaci�n de indentificador
    var rangesError2=new Array();
    //Arreglo para las celdas sin vocabulario controlado
    var rangesNoVocC= new Array(); 
    //arreglo para los errores por caracteres an�malos
    var rangesErrorCharacters=new Array();
    //array for the number of errors for each type of validation
    var countE=new Array();
    //areglo para guardar el vocabulario controlado para un elemento
    var vOC=new Array();
    
    //variable for the name of the field to validate
    //var fiedlToVal="";
    //is true if is more column with the same element
    //se establece como verdadera si existe m�s de una columna con el mismo elemento
    var repeatedElements=false;
    //se establece como verdadera si no se encontr� columna con el elemento
    var ElementsNotFound=false;
    //se establece como verdera si existe la hoja con vocabulario controlados
    var ExistSheetVC=false;
    //se estable como verdera si no se encontr� vocabulario controlado para el elemento
    var controlledVocabularyNotFound=false;
    //se establece verdadera si no se encontr� vocabulario incluido para el elemento
    var wordListNotFound=false;
    //data from the sheet with controlled vocabulary
    var dataControlledV=getDataCV();
    
    if(dataControlledV!==undefined){
      ExistSheetVC=true;
    }
    
    //*********
    //Tipo (Elementos de Registro)
    validations=new Array();
    //validacion de no vacio
    //validations.push(1);
    //validacion vocabulario controlado
    validations.push(2);
    //dwCElements["Tipo"]=validations;
    dwCElements[type[lgSel]]=validations;
    //**********
    //Modificado (Elementos de Registro)
    validations=new Array();
    //validacion de no vacio
    //validations.push(1);
    //validacion de fecha ISO 
    //validation of ISO date
    //Fecha inv�lida o en formato incorrecto
    validations.push(3);
    dwCElements[modified[lgSel]]=validations;
    //************
    //Titular de los Derechos (Elementos de Registro)
    validations=new Array();
    //validacion de no vacio
    //validations.push(1);
    //validacion de texto 
    //Texto con caracteres an�malos
    validations.push(7);
    //dwCElements["Titular de los Derechos"]=validations;
    dwCElements[rightsHolder[lgSel]]=validations;
    //************
    //C�digo de la Instituci�n (Elementos de Registro)
    validations=new Array();
    //validacion de no vacio
    validations.push(1);
    //validacion codigo instituci�n, colecci�n
    validations.push(9);
    //dwCElements["C�digo de la Instituci�n"]=validations;
    dwCElements[institutionCode[lgSel]]=validations;
    var erInstCod= new Array(); 
    var CodIPos=-1;
    //************
    //C�digo de la Colecci�n (Elementos de Registro)
    validations=new Array();
    //validacion de no vacio
    validations.push(1);
    //validacion codigo instituci�n, colecci�n
    validations.push(9);
    //validacion institucion unica por coleccion 
    validations.push(8);
    dwCElements[collectionCode[lgSel]]=validations;
    var erColCod= new Array();
    var CodColPos=-1;
    //**********
    //ID de la Instituci�n (Elementos de Registro)
    validations=new Array();
    //validacion de no vacio
    validations.push(1);
    //validacion de formato para identificador
    validations.push(5);
    //validaci�n c�digo-id instituci�n
    validations.push(10);
    //dwCElements["ID de la Instituci�n"]=validations;
    dwCElements[institutionID[lgSel]]=validations;
    var idIPos=-1; 
    var erInstId=new Array();
    //**********
    //ID de la Colecci�n (Elementos de Registro)
    validations=new Array();
    //validacion de no vacio
    validations.push(1);
    //validacion de formato para identificador
    validations.push(5);
    //validaci�n c�digo-id coleccion
    validations.push(11);
    dwCElements[collectionID[lgSel]]=validations;
    var idColPos=-1;
    var erColId=new Array(); 
    //************
    //Nombre del Conjunto de Datos (Elementos de Registro)
    validations=new Array();
    //validacion de no vacio
    //validations.push(1);
    //validacion de texto 
    validations.push(7);
    dwCElements[datasetName[lgSel]]=validations;
    //**********
    //Base del Registro (Elementos de Registro)
    validations=new Array();
    //validacion de no vacio
    //Sin contenido
    validations.push(1);
    //validacion vocabulario controlado
    //Contenido no acorde con el vocabulario controlados.
    validations.push(2);
    dwCElements[basisOfRecord[lgSel]]=validations;
    //**********
    //N�mero de Cat�logo (Registro Biol�gico)
    validations=new Array();
    //validacion de no vacio
    validations.push(1);
    //validacion de formato para identificador
    validations.push(5);
    //validacion catalogo unica por coleccion 
    validations.push(12);
    dwCElements[catalogNumber[lgSel]]=validations;
    var erNumCat= new Array();

    for(var l in dwCElements){
      if(dwCElements.hasOwnProperty(l)){
        //fiedlToVal=l;  //campo a validar es igual l
        index=new Array();
        for(var k=0;k<data[0].length;k++){
          if(l==data[0][k]){
            //if exist the field column, insert the ranges (cells) with the name of the fields
            index.push(k);
          }
        }
        
        if(index.length>1){
          repeatedElements=true;
          messageA[lgSel]=messageA[lgSel]+" "+l+", ";
          for(var lc=1;lc<index.length;lc++){
            var columnsR=sheetDnC.getRange(2, index[lc]+1, data.length-1, 1); //row, column, numrows, numcolumns
            columnsR.setBackgroundColor("#ffff99"); //Establece el color de las columnas con nombre de elemento repetido
          }
        }
        if(index.length==0){
          ElementsNotFound=true;
          message1[lgSel]=message1[lgSel]+" "+l+", "; //No se encontr� el elemento
        }else{
          var countE=new Array();
          
          if(l==institutionCode[lgSel]){
            CodIPos=index[0];
          }
          
          //se guarda la posici�n de la columna para los campos indicados
          
          if(l==institutionID[lgSel]){
            idIPos=index[0];
          }
          
          if(l==collectionID[lgSel]){
            idColPos=index[0];
          }
          if(l==decimalLatitude[lgSel]){
            latDecColPos=index[0];
          }
          
          if(l==decimalLongitude[lgSel]){
            lonDecColPos=index[0];
          }
          if(l==collectionCode[lgSel]){
            CodColPos=index[0];
          }
          
          
          //Se recorre el arreglo donde se guardaron los tipos de validaciones para el elemento
          for(var m=0;m<dwCElements[l].length;m++){
            //validaci�n 1
            if(dwCElements[l][m]==1){
              countE[dwCElements[l][m]-1]=0;
              //Browser.msgBox("1");
              var column1=index[0];
              //recorrer cada registro de la columna
              for(var g=1;g<data.length;g++){
                if(!validateNoEmpty(data[g][column1].toString())){
                  //se agrega la celda que est� vacia
                  rangesError.push(rangeData.getCell(g+1, column1+1));
                  //se suma un error al contador de errores para esta validaci�n
                  countE[(dwCElements[l][m])-1]++;
                  if(l==institutionID[lgSel]){      
                    erInstId[g]=0;
                  }
                  if(l==collectionID[lgSel]){
                    erColId[g]=0;
                  }
                  if(l==institutionCode[lgSel]){
                    erInstCod[g]=0;
                  }
                  if(l==collectionCode[lgSel]){
                    erColCod[g]=0;
                  }
                  if(l==catalogNumber[lgSel]){
                    erNumCat[g]=0;
                  }
                }
              }
            }
            //validacion 2
            if(dwCElements[l][m]==2){
              //Si existe la hoja de vocabularios controlados
              if(ExistSheetVC){
                //se obtiene el vocabulario controlado para este elemento. Se pasa como par�metro el elemento y la matriz de datos
                vOC=getCV(l,dataControlledV);
                //Si el vocabulario controlado no tiene elementos
                if(vOC.length==0){
                  controlledVocabularyNotFound=true;
                  messageNoContVoc[lgSel]=messageNoContVoc[lgSel]+" "+l+", ";
                  //se agrega la celdas que no tienen el vocabulairo controlado (para despu�s se marcadas con el color espec�fico) 
                  rangesNoVocC.push(rangeData.offset(1, index[0],data.length-1,1));
                }else{
                  countE[dwCElements[l][m]-1]=0;
                  var column1=index[0];
                  //recorrer cada registro de la columna
                  for(var g=1;g<data.length;g++){
                    //si la validaci�n de la celda da false
                    if(!valControlledVocabulary(data[g][column1].toString(), vOC)){
                      rangesError.push(rangeData.getCell(g+1, column1+1));
                      //se suma un error al contador de errores para esta validaci�n
                      countE[(dwCElements[l][m])-1]++;
                    }
                  }
                }
              }else{
                rangesNoVocC.push(rangeData.offset(1, index[0],data.length-1,1));
              }
            }
            
            
            //validacion 3
            //Fecha inv�lida o en formato incorrecto: Validaci�n de ISO:8601
            if(dwCElements[l][m]==3){
              //Browser.msgBox("3");
              countE[dwCElements[l][m]-1]=0;
              var column1=index[0];
              for(var g=1;g<data.length;g++){
                if(!validateDateISO(data[g][column1].toString())){
                  rangesError.push(rangeData.getCell(g+1, column1+1));
                  countE[(dwCElements[l][m])-1]++;
                }
              }
            }
            
            //validaci�n 5
            if(dwCElements[l][m]==5){
              //Browser.msgBox("5");
              //for number of rows with data
              countE[dwCElements[l][m]-1]=0;
              var column1=index[0];
              //for recorre los datos en la columna
              for(var g=1;g<data.length;g++){
                //validaci�n de formato identificador
                if(!validateFIdentificador(data[g][column1].toString())){
                  //se agrega la celda para marcarla
                  rangesError.push(rangeData.getCell(g+1, column1+1));
                  //se aumenta el conteo de errores
                  countE[(dwCElements[l][m])-1]++;
                  if(l==institutionID[lgSel]){
                    erInstId[g]=0; //si la celda de es erronea se marca con 0 en este arreglo
                  }
                  if(l==institutionCode[lgSel]){
                    erInstCod[g]=0;
                  }
                  if(l==collectionCode[lgSel]){
                    erColCod[g]=0;
                  }
                  /*
                  if(l==collectionID[lgSel]){
                    erColId[g]=0;
                  }
                  
                  */
                }
              }
            }
            
            
            //Texto con caracteres an�malos
            if(dwCElements[l][m]==7){
              //Browser.msgBox("7");
              countE[dwCElements[l][m]-1]=0;
              var column1=index[0];
              for(var g=1;g<data.length;g++){
                if(!valTxt(data[g][column1].toString())){
                  rangesError.push(rangeData.getCell(g+1, column1+1));
                  //se guarda en el arreglo de errores de caracteres
                  rangesErrorCharacters.push(rangeData.getCell(g+1, column1+1).getA1Notation());
                  countE[(dwCElements[l][m])-1]++;
                }
              }
            }
            
            //validacion institucion unica por c�digo de coleccion
            if(dwCElements[l][m]==8){
              //Browser.msgBox("8");
              countE[dwCElements[l][m]-1]=0;
              var column1=index[0];
              var arrayCodC=new Array();
              //se recorre cada columna
              for(var g=1;g<data.length;g++){
                //posici�n de la columna con el c�digo de la instituci�n
                if(CodIPos!=-1){
                  //si el elemento est� vacio
                  if(data[g][column1].toString()==""){
                    continue;
                  }else if(((data[g][CodIPos].toString()!="")&&(erInstCod[g]!=0))&&(erColCod[g]!=0)){ //si el c�digo no esta vacio, y no hay error e el c�digo de la instituci�n y en el c�digo de la colecci�n
                    //si el arreglo no tiene la instituci�n (dado por el �ndice del arreglo)
                    if(!arrayCodC.hasOwnProperty(data[g][column1].toString())){
                      //En el arreglo de c�digo de colecciones, para el c�digo que se esta validando, se establece el c�digo de la colecci�n (una colecci�n solo puede tener una instituci�n)
                      arrayCodC[data[g][column1].toString()]=data[g][CodIPos].toString();
                    }else{
                      //Si el codigo de la instituci�n, no es el mismo que tiene el c�digo de la colecci�n
                      if(arrayCodC[data[g][column1].toString()]!=data[g][CodIPos].toString()){
                        rangesErrorCod.push(rangeData.getCell(g+1, column1+1));
                        countE[(dwCElements[l][m])-1]++;
                        erColCod[g]=0;
                      }
                    }
                  }else{
                    rangesErrorCod.push(rangeData.getCell(g+1, column1+1));
                    countE[(dwCElements[l][m])-1]++;
                    erColCod[g]=0;
                  }
                }else{
                  rangesErrorCod.push(rangeData.getCell(g+1, column1+1));
                  countE[(dwCElements[l][m])-1]++;
                  erColCod[g]=0;
                }
              }
            }
            
            //validacion codigo instituci�n, colecci�n. Si el c�digo es v�lido de acuerdo a lo espec�ficado para el DwC
            if(dwCElements[l][m]==9){
              //Browser.msgBox("9");
              countE[dwCElements[l][m]-1]=0;
              var column1=index[0];
              for(var g=1;g<data.length;g++){
                //funci�n de validaci�n
                if(!valCod(data[g][column1].toString())){
                  rangesError.push(rangeData.getCell(g+1, column1+1));
                  countE[(dwCElements[l][m])-1]++;
                  //si el codigo de la instituci�n o colecci�n tiene error
                  if(l==institutionCode[lgSel]){
                    erInstCod[g]=0;
                  }
                  if(l==collectionCode[lgSel]){
                    erColCod[g]=0;
                  }
                }
              }
            }
            
            
            //validaci�n c�digo-id instituci�n
            if(dwCElements[l][m]==10){
              //Browser.msgBox("10");
              countE[dwCElements[l][m]-1]=0;
              var column1=index[0];
              var arrayiC=new Array();
              for(var g=1;g<data.length;g++){
                //posici�n de la columna con el c�digo de la instituci�n
                if(CodIPos!=-1){
                  if(((data[g][CodIPos].toString()!="")&&(erInstId[g]!=0))&&(erInstCod[g]!=0)){//si el c�digo no esta vacio, y no hay error en el id de la instituci�n y en el c�digo de la instituci�n
                    if(!arrayiC.hasOwnProperty(data[g][column1].toString())){//array para el c�digo de la instituci�n. Se mira si se tiene el �ndice con el c�digo de instituci�n
                      if(Object.keys(arrayiC).length>0){ //si tiene elementos 
                        for(var pl in arrayiC){
                          if(arrayiC[pl]==data[g][CodIPos].toString()){//Si ya ha sido asignado un c�digo de instituci�n
                            rangesErrorCod.push(rangeData.getCell(g+1, column1+1));
                            countE[(dwCElements[l][m])-1]++;
                          }else{
                            arrayiC[data[g][column1].toString()]=data[g][CodIPos].toString();
                          }
                        }
                      }else{
                        arrayiC[data[g][column1].toString()]=data[g][CodIPos].toString();
                      }
                    }else{
                      if(arrayiC[data[g][column1].toString()]!=data[g][CodIPos].toString()){
                        rangesErrorCod.push(rangeData.getCell(g+1, column1+1));
                        countE[(dwCElements[l][m])-1]++;
                      }
                    }
                  }else{
                    rangesErrorCod.push(rangeData.getCell(g+1, column1+1));
                    countE[(dwCElements[l][m])-1]++;
                  }
                }else{
                  rangesErrorCod.push(rangeData.getCell(g+1, column1+1));
                  countE[(dwCElements[l][m])-1]++;
                }
              }
            }
            
            //Para id de de la coleccion
            //validaci�n c�digo-id coleccion
            if(dwCElements[l][m]==11){
              //Browser.msgBox("11");
              countE[dwCElements[l][m]-1]=0;
              var column1=index[0];
              var arrayCI=new Array();
              for(var g=1;g<data.length;g++){
                if(CodColPos!=-1){ //posici�n de la columna con el c�digo de la coleccion
                  if(((data[g][CodColPos].toString()!="")&&(erColId[g]!=0))&&(erColCod[g]!=0)){ //si el c�digo de la colecci�n no esta vacio, y no hay error en id de la coleccion, y en el c�digo de la coleccion
                    if(!arrayCI.hasOwnProperty(data[g][column1].toString())){ //si el arreglo tiene el respectivo id de la colecci�n
                       if(Object.keys(arrayCI).length>0){
                         for(var pl in arrayCI){
                           if(arrayCI[pl]==data[g][CodColPos].toString()){ //si ese id de colecci�n ya tiene ese c�digo de colecci�n 
                             //Browser.msgBox("4 "+data[g][column1].toString());
                             rangesErrorCod.push(rangeData.getCell(g+1, column1+1));
                             countE[(dwCElements[l][m])-1]++;
                           }else{
                             arrayCI[data[g][column1].toString()]=data[g][CodColPos].toString();
                           }
                         }
                       }else{
                         arrayCI[data[g][column1].toString()]=data[g][CodColPos].toString();
                       }
                    }else{
                      if(arrayCI[data[g][column1].toString()]!=data[g][CodColPos].toString()){
                        //Browser.msgBox("3 "+data[g][column1].toString());
                        rangesErrorCod.push(rangeData.getCell(g+1, column1+1));
                        countE[(dwCElements[l][m])-1]++;
                      }
                    }
                  }else{
                    //Browser.msgBox("2 "+data[g][column1].toString());
                    rangesErrorCod.push(rangeData.getCell(g+1, column1+1));
                    countE[(dwCElements[l][m])-1]++;
                  }
                }else{
                  //Browser.msgBox("1 "+data[g][column1].toString());
                  rangesErrorCod.push(rangeData.getCell(g+1, column1+1));
                  countE[(dwCElements[l][m])-1]++;
                }
              }
            }
            
            //N�mero de cat�logo �nico por colecci�n
            if(dwCElements[l][m]==12){
              //Browser.msgBox("12");
              countE[dwCElements[l][m]-1]=0;
              var column1=index[0];
              var arrayNC=new Array();
              for(var g=1;g<data.length;g++){
                if(CodColPos!=-1){
                  if(data[g][column1].toString()==""){
                    continue;
                  }else if(((data[g][CodColPos].toString()!="")&&(erColCod[g]!=0))&&(erNumCat[g]!=0)){
                    if(arrayNC.hasOwnProperty(data[g][CodColPos].toString())){
                      for(var nl in arrayNC){
                        if(arrayNC[nl]==data[g][column1].toString()){
                          rangesErrorCod.push(rangeData.getCell(g+1, column1+1));
                          countE[(dwCElements[l][m])-1]++;
                        }
                      }
                    }else{
                      arrayNC[data[g][CodColPos].toString()]=data[g][column1].toString();
                    }
                  }else{
                    rangesErrorCod.push(rangeData.getCell(g+1, column1+1));
                    countE[(dwCElements[l][m])-1]++;
                  }
                }else{
                  rangesErrorCod.push(rangeData.getCell(g+1, column1+1));
                  countE[(dwCElements[l][m])-1]++;
                }
              }
            }
             
          }//fin del for que recorre de las validaciones del elemento
        }
        //Los errores para el elemento seg�n cada tipo de validaci�n
        dwCFieldsErrors[l]=countE;
      }
    } //fin del for que recorre los elementos   
    
    //mensaje que se muestra si existen elementos repetidos
    if(repeatedElements){
      Browser.msgBox(messageA[lgSel].substring(0, messageA[lgSel].length-2)+messageB[lgSel]);  
    }
    //mensaje que se muestra si no se encontr� un elemento en la hoja
    if(ElementsNotFound){
      Browser.msgBox(message1[lgSel].substring(0, message1[lgSel].length-2)+".");
    }
    
    if(controlledVocabularyNotFound){
        Browser.msgBox(messageNoContVoc[lgSel].substring(0, messageNoContVoc[lgSel].length-2)+messageNoContVocB[lgSel]);
    }
    
    
    //se establecen los colores de las colores de las columnas
    for(var k=0;k<rangesError2.length;k++){
      rangesError2[k].setBackgroundColor("#CC6699"); //validacion identificador �nico
    }
    
    for(var k=0;k<rangesError.length;k++){
      rangesError[k].setBackgroundColor("#ea5b6e");  //errores en la validaci�n de la celda
    }
    
    
    for(var k=0;k<rangesErrorCod.length;k++){
      rangesErrorCod[k].setBackgroundColor("#ED8947");  //errores en la valdidaci�n entre celdas
    }
    
    
    for(var k=0;k<rangesNoVocC.length;k++){
      rangesNoVocC[k].setBackgroundColor("#E6E6E6"); //errores en la validaci�n, no se enecontr� vocabulario controlado
    }
    
    //ScriptProperties.setProperty('aChars', rangesErrorCharacters.toString());
    ScriptProperties.setProperty('errorCIndex', '0');
    ScriptProperties.setProperty('errorRIndex', '0');
    //ScriptProperties.setProperty('isValidate', '1'); 
    ScriptProperties.setProperty('isValidateRegEl', '1');
    
    showErrors(dwCFieldsErrors);
    Browser.msgBox(messageEndOfVal[lgSel]);
    sheetDnC.activate();
    
  }else{
    Browser.msgBox(messageNoPSheet[lgSel]);
  }
 spSheetDnC.setActiveSheet(spSheetDnC.getSheetByName(nameOfSheet[lgSel])); 
 return 0;
};


function regBioDwC(){
  //Language is checked according to the property of the script
  var lgSel=parseInt(ScriptProperties.getProperty('lgSel'));
  //Read the spreadsheeet
  var spSheetDnC=SpreadsheetApp.getActiveSpreadsheet();
  var sheetDnC=spSheetDnC.getSheetByName(nameOfSheet[lgSel]);
  
  //Browser.msgBox((nameOfSheet[lgSel]));
  if(sheetDnC!=null){
    //Read the range of cells 
    var rangeData = sheetDnC.getDataRange();
    rangeData.setNumberFormat('@STRING@');
    var data = rangeData.getValues();
    
    //array for the names of the fields to validate
    var dwCElements=new Array();
    //array for the names of the fields to validate for errors
    var dwCFieldsErrors=new Array();
    //arreglo para los errores de los c�digos respecto a otros
    var rangesErrorCod= new Array();
    //array for the types of validations
    var validations= new Array();
    //array for index of the column with name of the field.
    var index=new Array(); 
    //array for the cell with errors of validation
    var rangesError= new Array(); 
    //errores en la validaci�n de indentificador
    var rangesError2=new Array();
    //Arreglo para las celdas sin vocabulario controlado
    var rangesNoVocC= new Array(); 
    //arreglo para los errores por caracteres an�malos
    var rangesErrorCharacters=new Array();
    //array for the number of errors for each type of validation
    var countE=new Array();
    //areglo para guardar el vocabulario controlado para un elemento
    var vOC=new Array();
    
    //variable for the name of the field to validate
    //var fiedlToVal="";
    //is true if is more column with the same element
    //se establece como verdadera si existe m�s de una columna con el mismo elemento
    var repeatedElements=false;
    //se establece como verdadera si no se encontr� columna con el elemento
    var ElementsNotFound=false;
    //se establece como verdera si existe la hoja con vocabulario controlados
    var ExistSheetVC=false;
    //se estable como verdera si no se encontr� vocabulario controlado para el elemento
    var controlledVocabularyNotFound=false;
    //se establece verdadera si no se encontr� vocabulario incluido para el elemento
    var wordListNotFound=false;
    //data from the sheet with controlled vocabulary
    var dataControlledV=getDataCV();
    
    if(dataControlledV!==undefined){
      ExistSheetVC=true;
    }
    
    
    //*********
    //ID del Registro Biol�gico (Registro Biol�gico)
    validations=new Array(); //inicializo el arreglo vacio
    //validacion de no vacio
    //No empty cell
    validations.push(1);
    //validacion de formato para identificador
    //Identificador con caracteres an�malos
    validations.push(5);
    //validacion de identificador �nico
    //Identificador repetido
    validations.push(6);
    //El �ndice de cada elemento en dwCElements ser� el elemento a validar en el idioma seleccionado
    dwCElements[occurrenceID[lgSel]]=validations;  
    //************
    //Registrado por (Registro Biol�gico)
    validations=new Array();
    //validacion de no vacio
    //validations.push(1);
    //Validacion lista punto y coma
    validations.push(13);
    dwCElements[recordedBy[lgSel]]=validations;
    //************
    //Conteo de Individuos (Registro Biol�gico)
    validations=new Array();
    //validacion de no vacio
    //validations.push(1);
    //validacion n�mero entero
    validations.push(14);
    dwCElements[individualCount[lgSel]]=validations;
    //************
    //Sexo (Registro Biol�gico)
    validations=new Array();
    //validacion de no vacio
    //validations.push(1);
    //validacion vocabulario controlado
    validations.push(2);
    dwCElements[sex[lgSel]]=validations;
    
    
    for(var l in dwCElements){
      if(dwCElements.hasOwnProperty(l)){
        //fiedlToVal=l;  //campo a validar es igual l
        index=new Array();
        
        for(var k=0;k<data[0].length;k++){
          if(l==data[0][k]){
            //if exist the field column, insert the ranges (cells) with the name of the fields
            index.push(k);
          }
        }
        
        if(index.length>1){
          repeatedElements=true;
          messageA[lgSel]=messageA[lgSel]+" "+l+", ";
          for(var lc=1;lc<index.length;lc++){
            var columnsR=sheetDnC.getRange(2, index[lc]+1, data.length-1, 1); //row, column, numrows, numcolumns
            columnsR.setBackgroundColor("#ffff99"); //Establece el color de las columnas con nombre de elemento repetido
          }
        }
        if(index.length==0){
          ElementsNotFound=true;
          message1[lgSel]=message1[lgSel]+" "+l+", "; //No se encontr� el elemento
        }else{
          var countE=new Array();
          
          if(l==institutionCode[lgSel]){
            CodIPos=index[0];
          }
          
          //Se recorre el arreglo donde se guardaron los tipos de validaciones para el elemento
          for(var m=0;m<dwCElements[l].length;m++){
            //validaci�n 1
            if(dwCElements[l][m]==1){
              countE[dwCElements[l][m]-1]=0;
              //Browser.msgBox("1");
              var column1=index[0];
              //recorrer cada registro de la columna
              for(var g=1;g<data.length;g++){
                if(!validateNoEmpty(data[g][column1].toString())){
                  //se agrega la celda que est� vacia
                  rangesError.push(rangeData.getCell(g+1, column1+1));
                  //se suma un error al contador de errores para esta validaci�n
                  countE[(dwCElements[l][m])-1]++;
                }
              }
            }
            //validacion 2
            if(dwCElements[l][m]==2){
              //Si existe la hoja de vocabularios controlados
              if(ExistSheetVC){
                //se obtiene el vocabulario controlado para este elemento. Se pasa como par�metro el elemento y la matriz de datos
                vOC=getCV(l,dataControlledV);
                //Si el vocabulario controlado no tiene elementos
                if(vOC.length==0){
                  controlledVocabularyNotFound=true;
                  messageNoContVoc[lgSel]=messageNoContVoc[lgSel]+" "+l+", ";
                  //se agrega la celdas que no tienen el vocabulairo controlado (para despu�s se marcadas con el color espec�fico) 
                  rangesNoVocC.push(rangeData.offset(1, index[0],data.length-1,1));
                }else{
                  countE[dwCElements[l][m]-1]=0;
                  var column1=index[0];
                  //recorrer cada registro de la columna
                  for(var g=1;g<data.length;g++){
                    //si la validaci�n de la celda da false
                    if(!valControlledVocabulary(data[g][column1].toString(), vOC)){
                      rangesError.push(rangeData.getCell(g+1, column1+1));
                      //se suma un error al contador de errores para esta validaci�n
                      countE[(dwCElements[l][m])-1]++;
                    }
                  }
                }
              }else{
                rangesNoVocC.push(rangeData.offset(1, index[0],data.length-1,1));
              }
            }
            
            //validaci�n 5
            if(dwCElements[l][m]==5){
              //Browser.msgBox("5");
              //for number of rows with data
              countE[dwCElements[l][m]-1]=0;
              var column1=index[0];
              //for recorre los datos en la columna
              for(var g=1;g<data.length;g++){
                //validaci�n de formato identificador
                if(!validateFIdentificador(data[g][column1].toString())){
                  //se agrega la celda para marcarla
                  rangesError.push(rangeData.getCell(g+1, column1+1));
                  //se aumenta el conteo de errores
                  countE[(dwCElements[l][m])-1]++;
                  if(l==institutionID[lgSel]){
                    erInstId[g]=0; //si la celda de es erronea se marca con 0 en este arreglo
                  }
                  if(l==institutionCode[lgSel]){
                    erInstCod[g]=0;
                  }
                  if(l==collectionCode[lgSel]){
                    erColCod[g]=0;
                  }
                  /*
                  if(l==collectionID[lgSel]){
                    erColId[g]=0;
                  }
                  
                  */
                }
              }
            }
            
            //validacion 6
            //Identificador repetido
            if(dwCElements[l][m]==6){
              //Browser.msgBox("6");
              countE[dwCElements[l][m]-1]=0;
              var column1=index[0];
              //for recorre los datos en la columna
              for(var g=1;g<data.length;g++){
                if(data[g][column1].toString()==""){
                  continue;
                }else{
                  var temp=data[g][column1].toString();
                  //se compara el valor con los anteriores
                  for(var lg=1;lg<g;lg++){
                    if(temp==data[lg][column1].toString()){
                      rangesError.push(rangeData.getCell(g+1, column1+1));
                      countE[(dwCElements[l][m])-1]++;
                      break;
                    }
                  }
                }
              }
            }
            
            //Texto con caracteres an�malos
            if(dwCElements[l][m]==7){
              //Browser.msgBox("7");
              countE[dwCElements[l][m]-1]=0;
              var column1=index[0];
              for(var g=1;g<data.length;g++){
                if(!valTxt(data[g][column1].toString())){
                  rangesError.push(rangeData.getCell(g+1, column1+1));
                  //se guarda en el arreglo de errores de caracteres
                  rangesErrorCharacters.push(rangeData.getCell(g+1, column1+1).getA1Notation());
                  countE[(dwCElements[l][m])-1]++;
                }
              }
            }
            
            
            
            //Validaci�n de una lista separada por ;
            if(dwCElements[l][m]==13){
              //Browser.msgBox("13");
              countE[dwCElements[l][m]-1]=0;
              var column1=index[0];
              for(var g=1;g<data.length;g++){
                if(!valListSemicolon(data[g][column1].toString())){
                  rangesError.push(rangeData.getCell(g+1, column1+1));
                  countE[(dwCElements[l][m])-1]++;
                }
              }
            }
            
            //validaci�n de n�mero entero
            if(dwCElements[l][m]==14){
              //Browser.msgBox("14");
              countE[dwCElements[l][m]-1]=0;
              var column1=index[0];
              for(var g=1;g<data.length;g++){
                if(!validateIntNum(data[g][column1].toString())){
                  rangesError.push(rangeData.getCell(g+1, column1+1));
                  countE[(dwCElements[l][m])-1]++;
                }
              }
            }
            
           
          }//fin del for que recorre de las validaciones del elemento
        }
        //Los errores para el elemento seg�n cada tipo de validaci�n
        dwCFieldsErrors[l]=countE;
      }
    } //fin del for que recorre los elementos   
    
    //mensaje que se muestra si existen elementos repetidos
    if(repeatedElements){
      Browser.msgBox(messageA[lgSel].substring(0, messageA[lgSel].length-2)+messageB[lgSel]);  
    }
    //mensaje que se muestra si no se encontr� un elemento en la hoja
    if(ElementsNotFound){
      Browser.msgBox(message1[lgSel].substring(0, message1[lgSel].length-2)+".");
    }
    
    if(controlledVocabularyNotFound){
        Browser.msgBox(messageNoContVoc[lgSel].substring(0, messageNoContVoc[lgSel].length-2)+messageNoContVocB[lgSel]);
    }
    
    //se establecen los colores de las colores de las columnas
    for(var k=0;k<rangesError2.length;k++){
      rangesError2[k].setBackgroundColor("#CC6699"); //validacion identificador �nico
    }
    
    for(var k=0;k<rangesError.length;k++){
      rangesError[k].setBackgroundColor("#ea5b6e");  //errores en la validaci�n de la celda
    }
    
    
    for(var k=0;k<rangesErrorCod.length;k++){
      rangesErrorCod[k].setBackgroundColor("#ED8947");  //errores en la valdidaci�n entre celdas
    }
    
    
    for(var k=0;k<rangesNoVocC.length;k++){
      rangesNoVocC[k].setBackgroundColor("#E6E6E6"); //errores en la validaci�n, no se enecontr� vocabulario controlado
    }
    
    //ScriptProperties.setProperty('aChars', rangesErrorCharacters.toString());
    ScriptProperties.setProperty('errorCIndex', '0');
    ScriptProperties.setProperty('errorRIndex', '0');
    //ScriptProperties.setProperty('isValidate', '1');  
    ScriptProperties.setProperty('isValidateRegBio', '1');
    
    showErrors(dwCFieldsErrors);
    Browser.msgBox(messageEndOfVal[lgSel]);
    sheetDnC.activate();
    
  }else{
    Browser.msgBox(messageNoPSheet[lgSel]);
  }
 spSheetDnC.setActiveSheet(spSheetDnC.getSheetByName(nameOfSheet[lgSel])); 
 return 0;
};


function eventDwC(){
  //Se verifica el idioma, de acuerdo a la propiedad del script
  //Language is checked according to the property of the script
  var lgSel=parseInt(ScriptProperties.getProperty('lgSel'));
  //Read the spreadsheeet
  var spSheetDnC=SpreadsheetApp.getActiveSpreadsheet();
  var sheetDnC=spSheetDnC.getSheetByName(nameOfSheet[lgSel]);
  
  //Browser.msgBox((nameOfSheet[lgSel]));
  if(sheetDnC!=null){
    //Read the range of cells 
    var rangeData = sheetDnC.getDataRange();
    rangeData.setNumberFormat('@STRING@');
    var data = rangeData.getValues();
    
    //array for the names of the fields to validate
    var dwCElements=new Array();
    //array for the names of the fields to validate for errors
    var dwCFieldsErrors=new Array();
    //arreglo para los errores de los c�digos respecto a otros
    var rangesErrorCod= new Array();
    //array for the types of validations
    var validations= new Array();
    //array for index of the column with name of the field.
    var index=new Array(); 
    //array for the cell with errors of validation
    var rangesError= new Array(); 
    //errores en la validaci�n de indentificador
    var rangesError2=new Array();
    //Arreglo para las celdas sin vocabulario controlado
    var rangesNoVocC= new Array(); 
    //arreglo para los errores por caracteres an�malos
    var rangesErrorCharacters=new Array();
    //array for the number of errors for each type of validation
    var countE=new Array();
    //areglo para guardar el vocabulario controlado para un elemento
    var vOC=new Array();
    
    //variable for the name of the field to validate
    //var fiedlToVal="";
    //is true if is more column with the same element
    //se establece como verdadera si existe m�s de una columna con el mismo elemento
    var repeatedElements=false;
    //se establece como verdadera si no se encontr� columna con el elemento
    var ElementsNotFound=false;
    //se establece como verdera si existe la hoja con vocabulario controlados
    var ExistSheetVC=false;
    //se estable como verdera si no se encontr� vocabulario controlado para el elemento
    var controlledVocabularyNotFound=false;
    //se establece verdadera si no se encontr� vocabulario incluido para el elemento
    var wordListNotFound=false;
    //data from the sheet with controlled vocabulary
    var dataControlledV=getDataCV();
    
    if(dataControlledV!==undefined){
      ExistSheetVC=true;
    }
    
    //************
    //Protocolo de Muestreo (Evento)
    validations=new Array();
    //validacion de no vacio
    //validations.push(1);
    //validacion de texto 
    validations.push(7);
    dwCElements[samplingProtocol[lgSel]]=validations;
    //************
    //Fecha del Evento (Evento)
    validations=new Array();
    //validacion de no vacio
    //validations.push(1);
    //validacion de fecha ISO
    validations.push(3);
    dwCElements[eventDate[lgSel]]=validations;
    //************
    //Hora del Evento (Evento)
    validations=new Array();
    //validacion de no vacio
    //validations.push(1);
    //validacion de hora ISO
    validations.push(26);
    dwCElements[eventTime[lgSel]]=validations;
    //************
    //H�bitat (Evento)
    validations=new Array();
    //validacion de no vacio
    //validations.push(1);
    //validacion de texto 
    validations.push(7);
    dwCElements[habitat[lgSel]]=validations;
    //************
    //N�mero de Campo (Evento)
    validations=new Array();
    //validacion de no vacio
    //validations.push(1);
    //validacion de texto 
    validations.push(7);
    dwCElements[fieldNumber[lgSel]]=validations;
    //************
    //Comentarios del Evento (Evento)
    validations=new Array();
    //validacion de no vacio
    //validations.push(1);
    //validacion de texto 
    validations.push(7);
    dwCElements[eventRemarks[lgSel]]=validations;
    
    for(var l in dwCElements){
      if(dwCElements.hasOwnProperty(l)){
        //fiedlToVal=l;  //campo a validar es igual l
        index=new Array();
        
        for(var k=0;k<data[0].length;k++){
          if(l==data[0][k]){
            //if exist the field column, insert the ranges (cells) with the name of the fields
            index.push(k);
          }
        }
        
        if(index.length>1){
          repeatedElements=true;
          messageA[lgSel]=messageA[lgSel]+" "+l+", ";
          for(var lc=1;lc<index.length;lc++){
            var columnsR=sheetDnC.getRange(2, index[lc]+1, data.length-1, 1); //row, column, numrows, numcolumns
            columnsR.setBackgroundColor("#ffff99"); //Establece el color de las columnas con nombre de elemento repetido
          }
        }
        if(index.length==0){
          ElementsNotFound=true;
          message1[lgSel]=message1[lgSel]+" "+l+", "; //No se encontr� el elemento
        }else{
          var countE=new Array();
          
          
          //Se recorre el arreglo donde se guardaron los tipos de validaciones para el elemento
          for(var m=0;m<dwCElements[l].length;m++){
            //validaci�n 1
            if(dwCElements[l][m]==1){
              countE[dwCElements[l][m]-1]=0;
              //Browser.msgBox("1");
              var column1=index[0];
              //recorrer cada registro de la columna
              for(var g=1;g<data.length;g++){
                if(!validateNoEmpty(data[g][column1].toString())){
                  //se agrega la celda que est� vacia
                  rangesError.push(rangeData.getCell(g+1, column1+1));
                  //se suma un error al contador de errores para esta validaci�n
                  countE[(dwCElements[l][m])-1]++;
                }
              }
            }
            //validacion 2
            if(dwCElements[l][m]==2){
              //Si existe la hoja de vocabularios controlados
              if(ExistSheetVC){
                //se obtiene el vocabulario controlado para este elemento. Se pasa como par�metro el elemento y la matriz de datos
                vOC=getCV(l,dataControlledV);
                //Si el vocabulario controlado no tiene elementos
                if(vOC.length==0){
                  controlledVocabularyNotFound=true;
                  messageNoContVoc[lgSel]=messageNoContVoc[lgSel]+" "+l+", ";
                  //se agrega la celdas que no tienen el vocabulairo controlado (para despu�s se marcadas con el color espec�fico) 
                  rangesNoVocC.push(rangeData.offset(1, index[0],data.length-1,1));
                }else{
                  countE[dwCElements[l][m]-1]=0;
                  var column1=index[0];
                  //recorrer cada registro de la columna
                  for(var g=1;g<data.length;g++){
                    //si la validaci�n de la celda da false
                    if(!valControlledVocabulary(data[g][column1].toString(), vOC)){
                      rangesError.push(rangeData.getCell(g+1, column1+1));
                      //se suma un error al contador de errores para esta validaci�n
                      countE[(dwCElements[l][m])-1]++;
                    }
                  }
                }
              }else{
                rangesNoVocC.push(rangeData.offset(1, index[0],data.length-1,1));
              }
            }
            
            
            //validacion 3
            //Fecha inv�lida o en formato incorrecto: Validaci�n de ISO:8601
            if(dwCElements[l][m]==3){
              //Browser.msgBox("3");
              countE[dwCElements[l][m]-1]=0;
              var column1=index[0];
              for(var g=1;g<data.length;g++){
                if(!validateDateISO(data[g][column1].toString())){
                  rangesError.push(rangeData.getCell(g+1, column1+1));
                  countE[(dwCElements[l][m])-1]++;
                }
              }
            }
            
            //Texto con caracteres an�malos
            if(dwCElements[l][m]==7){
              //Browser.msgBox("7");
              countE[dwCElements[l][m]-1]=0;
              var column1=index[0];
              for(var g=1;g<data.length;g++){
                if(!valTxt(data[g][column1].toString())){
                  rangesError.push(rangeData.getCell(g+1, column1+1));
                  //se guarda en el arreglo de errores de caracteres
                  rangesErrorCharacters.push(rangeData.getCell(g+1, column1+1).getA1Notation());
                  countE[(dwCElements[l][m])-1]++;
                }
              }
            }
              
            //validaci�n hora, intervalo hora
            if(dwCElements[l][m]==26){
              //Browser.msgBox("26");
              countE[dwCElements[l][m]-1]=0;
              var column1=index[0];
              for(var g=1;g<data.length;g++){
                if(!validateIntHour(data[g][column1].toString())){ 
                  rangesError.push(rangeData.getCell(g+1, column1+1));
                  countE[(dwCElements[l][m])-1]++;
                }
              }
            }
            
            
          }//fin del for que recorre de las validaciones del elemento
        }
        //Los errores para el elemento seg�n cada tipo de validaci�n
        dwCFieldsErrors[l]=countE;
      }
    } //fin del for que recorre los elementos   
    
    //mensaje que se muestra si existen elementos repetidos
    if(repeatedElements){
      Browser.msgBox(messageA[lgSel].substring(0, messageA[lgSel].length-2)+messageB[lgSel]);  
    }
    //mensaje que se muestra si no se encontr� un elemento en la hoja
    if(ElementsNotFound){
      Browser.msgBox(message1[lgSel].substring(0, message1[lgSel].length-2)+".");
    }
    
    if(controlledVocabularyNotFound){
        Browser.msgBox(messageNoContVoc[lgSel].substring(0, messageNoContVoc[lgSel].length-2)+messageNoContVocB[lgSel]);
    }
    
    //se establecen los colores de las colores de las columnas
    for(var k=0;k<rangesError2.length;k++){
      rangesError2[k].setBackgroundColor("#CC6699"); //validacion identificador �nico
    }
    
    for(var k=0;k<rangesError.length;k++){
      rangesError[k].setBackgroundColor("#ea5b6e");  //errores en la validaci�n de la celda
    }
    
    
    for(var k=0;k<rangesErrorCod.length;k++){
      rangesErrorCod[k].setBackgroundColor("#ED8947");  //errores en la valdidaci�n entre celdas
    }
    
    
    for(var k=0;k<rangesNoVocC.length;k++){
      rangesNoVocC[k].setBackgroundColor("#E6E6E6"); //errores en la validaci�n, no se enecontr� vocabulario controlado
    }
    
    //ScriptProperties.setProperty('aChars', rangesErrorCharacters.toString());
    ScriptProperties.setProperty('errorCIndex', '0');
    ScriptProperties.setProperty('errorRIndex', '0');
    //ScriptProperties.setProperty('isValidate', '1'); //event
    ScriptProperties.setProperty('isValidateEvent', '1');
    
    showErrors(dwCFieldsErrors);
    Browser.msgBox(messageEndOfVal[lgSel]);
    sheetDnC.activate();
    
  }else{
    Browser.msgBox(messageNoPSheet[lgSel]);
  }
 spSheetDnC.setActiveSheet(spSheetDnC.getSheetByName(nameOfSheet[lgSel])); 
 return 0;
};

 
function locIdDwC(){
  //Se verifica el idioma, de acuerdo a la propiedad del script
  //Language is checked according to the property of the script
  var lgSel=parseInt(ScriptProperties.getProperty('lgSel'));
  //Read the spreadsheeet
  var spSheetDnC=SpreadsheetApp.getActiveSpreadsheet();
  var sheetDnC=spSheetDnC.getSheetByName(nameOfSheet[lgSel]);
  
  //Browser.msgBox((nameOfSheet[lgSel]));
  if(sheetDnC!=null){
    //Read the range of cells 
    var rangeData = sheetDnC.getDataRange();
    rangeData.setNumberFormat('@STRING@');
    var data = rangeData.getValues();
    
    //array for the names of the fields to validate
    var dwCElements=new Array();
    //array for the names of the fields to validate for errors
    var dwCFieldsErrors=new Array();
    //arreglo para los errores de los c�digos respecto a otros
    var rangesErrorCod= new Array();
    //array for the types of validations
    var validations= new Array();
    //array for index of the column with name of the field.
    var index=new Array(); 
    //array for the cell with errors of validation
    var rangesError= new Array(); 
    //errores en la validaci�n de indentificador
    var rangesError2=new Array();
    //Arreglo para las celdas sin vocabulario controlado
    var rangesNoVocC= new Array(); 
    //arreglo para los errores por caracteres an�malos
    var rangesErrorCharacters=new Array();
    //array for the number of errors for each type of validation
    var countE=new Array();
    //areglo para guardar el vocabulario controlado para un elemento
    var vOC=new Array();
    
    //variable for the name of the field to validate
    //var fiedlToVal="";
    //is true if is more column with the same element
    //se establece como verdadera si existe m�s de una columna con el mismo elemento
    var repeatedElements=false;
    //se establece como verdadera si no se encontr� columna con el elemento
    var ElementsNotFound=false;
    //se establece como verdera si existe la hoja con vocabulario controlados
    var ExistSheetVC=false;
    //se estable como verdera si no se encontr� vocabulario controlado para el elemento
    var controlledVocabularyNotFound=false;
    //se establece verdadera si no se encontr� vocabulario incluido para el elemento
    var wordListNotFound=false;
    //data from the sheet with controlled vocabulary
    var dataControlledV=getDataCV();
    
    if(dataControlledV!==undefined){
      ExistSheetVC=true;
    }
    
    //************
    //Cuerpo de Agua (Ubicaci�n)
    validations=new Array();
    //validacion de no vacio
    //validations.push(1);
    //validacion vocabulario controlado
    validations.push(24);
    dwCElements[waterBody[lgSel]]=validations;
    //************
    //Latitud Decimal
    validations=new Array();
    //validacion de no vacio
    //validations.push(1);
    //validacion latitud decimal
    validations.push(17);
    dwCElements[decimalLatitude[lgSel]]=validations;
    var latDecColPos=-1;   
    var erLatDec=new Array();
    //************
    //Longitud Decimal
    validations=new Array();
    //validacion de no vacio
    //validations.push(1);
    //valiaci�n longitud decimal
    validations.push(18);
    dwCElements[decimalLongitude[lgSel]]=validations;
    var lonDecColPos=-1;
    var erLotDec=new Array();
    var location=new Array();
    
    //************
    //Pa�s (Ubicaci�n)
    validations=new Array();
    //validacion de no vacio
    //validations.push(1);
    //validacion vocabulario controlado
    validations.push(2);
    //validacion localizaci�n
    //validations.push(23);
    dwCElements[country[lgSel]]=validations;
    //************
    //Departamento (Ubicaci�n)
    validations=new Array();
    //validacion de no vacio
    //validations.push(1);
    //validacion vocabulario controlado
    validations.push(2);
    //validacion localizaci�n
    //validations.push(23);
    dwCElements[stateProvince[lgSel]]=validations;
    //************
    //Municipio (Ubicaci�n)
    validations=new Array();
    //validacion de no vacio
    //validations.push(1);
    //validacion de texto 
    validations.push(2);
    //validacion localizaci�n
    //validations.push(23);
    dwCElements[county[lgSel]]=validations;
    //************
    //Elevaci�n M�nima en metros (Ubicaci�n)
    validations=new Array();
    //validacion de no vacio
    //validations.push(1);
    //validacion metros
    validations.push(15);
    //rangos para los valores de elevaci�n m�nima y m�xima
    var maxElv=8000;
    var minElv=-100;
    dwCElements[minimumElevationInMeters[lgSel]]=validations;
    //************
    //Elevaci�n M�xima en metros (Ubicaci�n)
    validations=new Array();
    //validacion de no vacio
    //validations.push(1);
    //validacion metros
    validations.push(15);
    dwCElements[maximumElevationInMeters[lgSel]]=validations;
    //************
    //Profundidad M�nima en metros (Ubicaci�n)
    validations=new Array();
    //validacion de no vacio
    //validations.push(1);
    //validacion metros
    validations.push(16);
    //rangos para los valores
    var maxPro=900;
    var minPro=-100;
    dwCElements[minimumDepthInMeters[lgSel]]=validations;
    //************
    //Profundidad M�xima en metros (Ubicaci�n)
    validations=new Array();
    //validacion de no vacio
    //validations.push(1);
    //validacion metros
    validations.push(16);
    //rangos para los valores
    var maxPro=900;
    var minPro=-100;
    dwCElements[maximumDepthInMeters[lgSel]]=validations;
    //************
    //Incertidumbre de las Coordenadas en metros (Ubicaci�n)
    validations=new Array();
    //validacion de no vacio
    //validations.push(1);
    //validaci�n incertidumbre coordenadas
    validations.push(19);
    dwCElements[coordinateUncertaintyInMeters[lgSel]]=validations;
    //************
    //Precisi�n de las Coordenadas (Ubicaci�n)
    validations=new Array();
    //validacion de no vacio
    //validations.push(1);
    //validaci�n de la precisi�n
    validations.push(20);
    //rangos para los valores
    var maxPre=80000;
    var minPre=0;
    dwCElements[coordinatePrecision[lgSel]]=validations;
    //************
    //Identificado por (Identificaci�n)
    validations=new Array();
    //validacion de no vacio
    //validations.push(1);
    //Validacion lista punto y coma
    validations.push(13);
    dwCElements[identifiedBy[lgSel]]=validations;
    //************
    //Fecha de Identificaci�n (Identificaci�n)
    validations=new Array();
    //validacion de no vacio
    //validations.push(1);
    //validacion de fecha ISO
    validations.push(3);
    dwCElements[dateIdentified[lgSel]]=validations;

    for(var l in dwCElements){
      if(dwCElements.hasOwnProperty(l)){
        //fiedlToVal=l;  //campo a validar es igual l
        index=new Array();
        
        for(var k=0;k<data[0].length;k++){
          if(l==data[0][k]){
            //if exist the field column, insert the ranges (cells) with the name of the fields
            index.push(k);
          }
        }
        
        if(index.length>1){
          repeatedElements=true;
          messageA[lgSel]=messageA[lgSel]+" "+l+", ";
          for(var lc=1;lc<index.length;lc++){
            var columnsR=sheetDnC.getRange(2, index[lc]+1, data.length-1, 1); //row, column, numrows, numcolumns
            columnsR.setBackgroundColor("#ffff99"); //Establece el color de las columnas con nombre de elemento repetido
          }
        }
        if(index.length==0){
          ElementsNotFound=true;
          message1[lgSel]=message1[lgSel]+" "+l+", "; //No se encontr� el elemento
        }else{
          var countE=new Array();
          
          //se guarda la posici�n de la columna para los campos indicados
          if(l==decimalLatitude[lgSel]){
            latDecColPos=index[0];
          }
          
          if(l==decimalLongitude[lgSel]){
            lonDecColPos=index[0];
          }
          
          //Se recorre el arreglo donde se guardaron los tipos de validaciones para el elemento
          for(var m=0;m<dwCElements[l].length;m++){
            //validaci�n 1
            if(dwCElements[l][m]==1){
              countE[dwCElements[l][m]-1]=0;
              //Browser.msgBox("1");
              var column1=index[0];
              //recorrer cada registro de la columna
              for(var g=1;g<data.length;g++){
                if(!validateNoEmpty(data[g][column1].toString())){
                  //se agrega la celda que est� vacia
                  rangesError.push(rangeData.getCell(g+1, column1+1));
                  //se suma un error al contador de errores para esta validaci�n
                  countE[(dwCElements[l][m])-1]++;
                }
              }
            }
            //validacion 2
            if(dwCElements[l][m]==2){
              //Si existe la hoja de vocabularios controlados
              if(ExistSheetVC){
                //se obtiene el vocabulario controlado para este elemento. Se pasa como par�metro el elemento y la matriz de datos
                vOC=getCV(l,dataControlledV);
                //Si el vocabulario controlado no tiene elementos
                if(vOC.length==0){
                  controlledVocabularyNotFound=true;
                  messageNoContVoc[lgSel]=messageNoContVoc[lgSel]+" "+l+", ";
                  //se agrega la celdas que no tienen el vocabulairo controlado (para despu�s se marcadas con el color espec�fico) 
                  rangesNoVocC.push(rangeData.offset(1, index[0],data.length-1,1));
                }else{
                  countE[dwCElements[l][m]-1]=0;
                  var column1=index[0];
                  //recorrer cada registro de la columna
                  for(var g=1;g<data.length;g++){
                    //si la validaci�n de la celda da false
                    if(!valControlledVocabulary(data[g][column1].toString(), vOC)){
                      rangesError.push(rangeData.getCell(g+1, column1+1));
                      //se suma un error al contador de errores para esta validaci�n
                      countE[(dwCElements[l][m])-1]++;
                    }
                  }
                }
              }else{
                rangesNoVocC.push(rangeData.offset(1, index[0],data.length-1,1));
              }
            }
            
            //Validaci�n de una lista separada por ;
            if(dwCElements[l][m]==13){
              //Browser.msgBox("13");
              countE[dwCElements[l][m]-1]=0;
              var column1=index[0];
              for(var g=1;g<data.length;g++){
                if(!valListSemicolon(data[g][column1].toString())){
                  rangesError.push(rangeData.getCell(g+1, column1+1));
                  countE[(dwCElements[l][m])-1]++;
                }
              }
            }
            
            //Elevaci�n M�xima en metros
            if(dwCElements[l][m]==15){
              //Browser.msgBox("15");
              countE[dwCElements[l][m]-1]=0;
              var column1=index[0];
              for(var g=1;g<data.length;g++){
                if(!validateMeters(data[g][column1].toString(),maxElv,minElv)){
                  rangesError.push(rangeData.getCell(g+1, column1+1));
                  countE[(dwCElements[l][m])-1]++;
                }
              }
            }
            
            //Profundidad M�nima en metros
            if(dwCElements[l][m]==16){
              //Browser.msgBox("16");
              countE[dwCElements[l][m]-1]=0;
              var column1=index[0];
              for(var g=1;g<data.length;g++){
                if(!validateMeters(data[g][column1].toString(),maxPro,minPro)){
                  rangesError.push(rangeData.getCell(g+1, column1+1));
                  countE[(dwCElements[l][m])-1]++;
                }
              }
            }
            
            //validacion latitud decimal
            if(dwCElements[l][m]==17){
              //Browser.msgBox("17");
              countE[dwCElements[l][m]-1]=0;
              var column1=index[0];
              for(var g=1;g<data.length;g++){
                if(!validateDecimalLatitude(data[g][column1].toString())){
                  rangesError.push(rangeData.getCell(g+1, column1+1));
                  countE[(dwCElements[l][m])-1]++;
                  erLatDec[g]=0;
                }
              }
            }
            
            //valiaci�n longitud decimal
            if(dwCElements[l][m]==18){
              // Browser.msgBox("18");
              countE[dwCElements[l][m]-1]=0;
              var column1=index[0];
              for(var g=1;g<data.length;g++){
                if(!validateDecimalLongitude(data[g][column1].toString())){
                  rangesError.push(rangeData.getCell(g+1, column1+1));
                  countE[(dwCElements[l][m])-1]++;
                  erLotDec[g]=0;
                }
              }
            }
            
            //validaci�n incertidumbre coordenadas
            if(dwCElements[l][m]==19){
              //Browser.msgBox("19");
              countE[dwCElements[l][m]-1]=0; 
              var column1=index[0];
              for(var g=1;g<data.length;g++){
                if(!validateUM(data[g][column1].toString(),maxPre,maxPre)){
                  rangesError.push(rangeData.getCell(g+1, column1+1));
                  countE[(dwCElements[l][m])-1]++;
                }
              }
            }
            
            //validaci�n de la precisi�n
            if(dwCElements[l][m]==20){
              //Browser.msgBox("20");
              countE[dwCElements[l][m]-1]=0;
              var column1=index[0];
              for(var g=1;g<data.length;g++){
                if(!validatePrecision(data[g][column1].toString(),maxPre,maxPre)){
                  rangesError.push(rangeData.getCell(g+1, column1+1));
                  countE[(dwCElements[l][m])-1]++;
                }
              }
            }
            
            
            
            //validacion localizaci�n
            if(dwCElements[l][m]==23){
              //Browser.msgBox("23");
              countE[dwCElements[l][m]-1]=0;
              var column1=index[0];
              for(var g=1;g<data.length;g++){
                if((erLatDec[g]!=0)&&(erLotDec[g]!=0)){
                  if(!validateLocation(data[g][column1].toString(),location[g])){
                    rangesError2.push(rangeData.getCell(g+1, column1+1));
                    countE[(dwCElements[l][m])-1]++;
                  }
                }else{
                  rangesError2.push(rangeData.getCell(g+1, column1+1));
                  countE[(dwCElements[l][m])-1]++;
                }
              }
            }
           
            //validaci�n lenguaje contenido
            //validacion 24
            if(dwCElements[l][m]==24){
              //Si existe la hoja de vocabularios controlados
              if(ExistSheetVC){
                //se obtiene el vocabulario controlado para este elemento. Se pasa como par�metro el elemento y la matriz de datos
                vOC=getCV(l,dataControlledV);
                //Si el vocabulario controlado no tiene elementos
                if(vOC.length==0){
                  wordListNotFound=true;
                  messageNoWords[lgSel]=messageNoWords[lgSel]+" "+l+", ";
                  //se agrega la celdas que no tienen el vocabulairo controlado (para despu�s se marcadas con el color espec�fico) 
                  rangesNoVocC.push(rangeData.offset(1, index[0],data.length-1,1));
                }else{
                  countE[dwCElements[l][m]-1]=0;
                  var column1=index[0];
                  //recorrer cada registro de la columna
                  for(var g=1;g<data.length;g++){
                    //si la validaci�n de la celda da false
                    if(!valContentVocabulary(data[g][column1].toString(), vOC)){
                      rangesError.push(rangeData.getCell(g+1, column1+1));
                      //se suma un error al contador de errores para esta validaci�n
                      countE[(dwCElements[l][m])-1]++;
                    }
                  }
                }
              }else{
                rangesNoVocC.push(rangeData.offset(1, index[0],data.length-1,1));
              }
            }
            
            
            
          }//fin del for que recorre de las validaciones del elemento
        }
        //Los errores para el elemento seg�n cada tipo de validaci�n
        dwCFieldsErrors[l]=countE;
      }
    } //fin del for que recorre los elementos   
    
    //mensaje que se muestra si existen elementos repetidos
    if(repeatedElements){
      Browser.msgBox(messageA[lgSel].substring(0, messageA[lgSel].length-2)+messageB[lgSel]);  
    }
    //mensaje que se muestra si no se encontr� un elemento en la hoja
    if(ElementsNotFound){
      Browser.msgBox(message1[lgSel].substring(0, message1[lgSel].length-2)+".");
    }
    
    if(controlledVocabularyNotFound){
        Browser.msgBox(messageNoContVoc[lgSel].substring(0, messageNoContVoc[lgSel].length-2)+messageNoContVocB[lgSel]);
    }
    
    //se establecen los colores de las colores de las columnas
    for(var k=0;k<rangesError2.length;k++){
      rangesError2[k].setBackgroundColor("#CC6699"); //validacion identificador �nico
    }
    
    for(var k=0;k<rangesError.length;k++){
      rangesError[k].setBackgroundColor("#ea5b6e");  //errores en la validaci�n de la celda
    }
    
    
    for(var k=0;k<rangesErrorCod.length;k++){
      rangesErrorCod[k].setBackgroundColor("#ED8947");  //errores en la valdidaci�n entre celdas
    }
    
    
    for(var k=0;k<rangesNoVocC.length;k++){
      rangesNoVocC[k].setBackgroundColor("#E6E6E6"); //errores en la validaci�n, no se enecontr� vocabulario controlado
    }
    
    //ScriptProperties.setProperty('aChars', rangesErrorCharacters.toString());
    ScriptProperties.setProperty('errorCIndex', '0');
    ScriptProperties.setProperty('errorRIndex', '0');
    //ScriptProperties.setProperty('isValidate', '1'); //locId
    ScriptProperties.setProperty('isValidateLocId', '1');
    ScriptProperties.setProperty('posRowCoord', '1');
    ScriptProperties.setProperty('posRowLoc', '1');    
    ScriptProperties.setProperty('posCor', '1');
    showErrors(dwCFieldsErrors);
    Browser.msgBox(messageEndOfVal[lgSel]);
    sheetDnC.activate();
    
  }else{
    Browser.msgBox(messageNoPSheet[lgSel]);
  }//cierre del condicional de existencia de la hoja
 spSheetDnC.setActiveSheet(spSheetDnC.getSheetByName(nameOfSheet[lgSel]));
 return 0;
};

 
function taxonDwC(){
  //Se verifica el idioma, de acuerdo a la propiedad del script
  //Language is checked according to the property of the script
  var lgSel=parseInt(ScriptProperties.getProperty('lgSel'));
  //Read the spreadsheeet
  var spSheetDnC=SpreadsheetApp.getActiveSpreadsheet();
  var sheetDnC=spSheetDnC.getSheetByName(nameOfSheet[lgSel]);
  
  //Browser.msgBox((nameOfSheet[lgSel]));
  if(sheetDnC!=null){
    //Read the range of cells 
    var rangeData = sheetDnC.getDataRange();
    rangeData.setNumberFormat('@STRING@');
    var data = rangeData.getValues();
    
    //array for the names of the fields to validate
    var dwCElements=new Array();
    //array for the names of the fields to validate for errors
    var dwCFieldsErrors=new Array();
    //arreglo para los errores de los c�digos respecto a otros
    var rangesErrorCod= new Array();
    //array for the types of validations
    var validations= new Array();
    //array for index of the column with name of the field.
    var index=new Array(); 
    //array for the cell with errors of validation
    var rangesError= new Array(); 
    //errores en la validaci�n de indentificador
    var rangesError2=new Array();
    //Arreglo para las celdas sin vocabulario controlado
    var rangesNoVocC= new Array(); 
    //arreglo para los errores por caracteres an�malos
    var rangesErrorCharacters=new Array();
    //array for the number of errors for each type of validation
    var countE=new Array();
    //areglo para guardar el vocabulario controlado para un elemento
    var vOC=new Array();
    
    //variable for the name of the field to validate
    //var fiedlToVal="";
    //is true if is more column with the same element
    //se establece como verdadera si existe m�s de una columna con el mismo elemento
    var repeatedElements=false;
    //se establece como verdadera si no se encontr� columna con el elemento
    var ElementsNotFound=false;
    //se establece como verdera si existe la hoja con vocabulario controlados
    var ExistSheetVC=false;
    //se estable como verdera si no se encontr� vocabulario controlado para el elemento
    var controlledVocabularyNotFound=false;
    //se establece verdadera si no se encontr� vocabulario incluido para el elemento
    var wordListNotFound=false;
    //data from the sheet with controlled vocabulary
    var dataControlledV=getDataCV();
    
    if(dataControlledV!==undefined){
      ExistSheetVC=true;
    }
    
    //************
    //Nombre Cient�fico (Tax�n)
    validations=new Array();
    //validacion de no vacio
    //validations.push(1);
    //validaci�n nombre cient�fico
    validations.push(21);
    dwCElements[scientificName[lgSel]]=validations;
    var sciNamePos=-1;
    var erSciName=new Array();
    //************
    //Autor�a del Nombre Cient�fico (Tax�n)
    validations=new Array();
    //validacion de no vacio
    validations.push(1);
    //validacion de nombre autor�a cient�fica
    validations.push(22);
    dwCElements[scientificNameAuthorship[lgSel]]=validations;
    
    //************
    //Nombre Com�n (Tax�n)
    validations=new Array();
    //validacion de no vacio
    //validations.push(1);
    //validacion de texto 
    validations.push(7);
    dwCElements[vernacularName[lgSel]]=validations;
    
    //************
    //Reino (Tax�n)
    validations=new Array();
    //validacion de no vacio
    //validations.push(1);
    //validacion vocabulario controlado
    validations.push(2);
    dwCElements[kingdom[lgSel]]=validations;
    
    //************
    //Filo (Tax�n)
    validations=new Array();
    //validacion de no vacio
    //validations.push(1);
    //validacion de texto 
    validations.push(2);
    dwCElements[phylum[lgSel]]=validations;
    
    //************
    //Clase (Tax�n)
    validations=new Array();
    //validacion de no vacio
    //validations.push(1);
    //validacion de texto 
    validations.push(2);
    dwCElements[class[lgSel]]=validations;
    
    //************
    //Orden (Tax�n)
    validations=new Array();
    //validacion de no vacio
    //validations.push(1);
    //validacion de texto 
    validations.push(2);
    dwCElements[order[lgSel]]=validations;
    
    //************
    //Familia (Tax�n)
    validations=new Array();
    //validacion de no vacio
    //validations.push(1);
    //validacion de texto 
    validations.push(2);
    dwCElements[family[lgSel]]=validations;
    
    //************
    //G�nero (Tax�n)
    validations=new Array();
    //validacion de no vacio
    //validations.push(1);
    //validacion de texto 
    validations.push(2);
    dwCElements[genus[lgSel]]=validations;
    
    //************
    //Subg�nero (Tax�n)
    validations=new Array();
    //validacion de no vacio
    //validations.push(1);
    //validacion de texto 
    validations.push(2);
    dwCElements[subgenus[lgSel]]=validations;
    
    //************
    //Ep�teto Espec�fico (Tax�n)
    validations=new Array();
    //validacion de no vacio
    //validations.push(1);
    //validacion de texto 
    validations.push(7);
    //validaci�n de ep�eto acorde con el nombre cient�fico
    validations.push(25);
    dwCElements[specificEpithet[lgSel]]=validations;
    
    for(var l in dwCElements){
      if(dwCElements.hasOwnProperty(l)){
        //fiedlToVal=l;  //campo a validar es igual l
        index=new Array();
        
        for(var k=0;k<data[0].length;k++){
          if(l==data[0][k]){
            //if exist the field column, insert the ranges (cells) with the name of the fields
            index.push(k);
          }
        }
        
        if(index.length>1){
          repeatedElements=true;
          messageA[lgSel]=messageA[lgSel]+" "+l+", ";
          for(var lc=1;lc<index.length;lc++){
            var columnsR=sheetDnC.getRange(2, index[lc]+1, data.length-1, 1); //row, column, numrows, numcolumns
            columnsR.setBackgroundColor("#ffff99"); //Establece el color de las columnas con nombre de elemento repetido
          }
        }
        if(index.length==0){
          ElementsNotFound=true;
          message1[lgSel]=message1[lgSel]+" "+l+", "; //No se encontr� el elemento
        }else{
          var countE=new Array();
          
          if(l==scientificName[lgSel]){
            sciNamePos=index[0];
          }
          
          
          //Se recorre el arreglo donde se guardaron los tipos de validaciones para el elemento
          for(var m=0;m<dwCElements[l].length;m++){
            //validaci�n 1
            if(dwCElements[l][m]==1){
              countE[dwCElements[l][m]-1]=0;
              //Browser.msgBox("1");
              var column1=index[0];
              //recorrer cada registro de la columna
              for(var g=1;g<data.length;g++){
                if(!validateNoEmpty(data[g][column1].toString())){
                  //se agrega la celda que est� vacia
                  rangesError.push(rangeData.getCell(g+1, column1+1));
                  //se suma un error al contador de errores para esta validaci�n
                  countE[(dwCElements[l][m])-1]++;
                }
              }
            }
            //validacion 2
            if(dwCElements[l][m]==2){
              //Si existe la hoja de vocabularios controlados
              if(ExistSheetVC){
                //se obtiene el vocabulario controlado para este elemento. Se pasa como par�metro el elemento y la matriz de datos
                vOC=getCV(l,dataControlledV);
                //Si el vocabulario controlado no tiene elementos
                if(vOC.length==0){
                  controlledVocabularyNotFound=true;
                  messageNoContVoc[lgSel]=messageNoContVoc[lgSel]+" "+l+", ";
                  //se agrega la celdas que no tienen el vocabulairo controlado (para despu�s se marcadas con el color espec�fico) 
                  rangesNoVocC.push(rangeData.offset(1, index[0],data.length-1,1));
                }else{
                  countE[dwCElements[l][m]-1]=0;
                  var column1=index[0];
                  //recorrer cada registro de la columna
                  for(var g=1;g<data.length;g++){
                    //si la validaci�n de la celda da false
                    if(!valControlledVocabulary(data[g][column1].toString(), vOC)){
                      rangesError.push(rangeData.getCell(g+1, column1+1));
                      //se suma un error al contador de errores para esta validaci�n
                      countE[(dwCElements[l][m])-1]++;
                    }
                  }
                }
              }else{
                rangesNoVocC.push(rangeData.offset(1, index[0],data.length-1,1));
              }
            }
            
            //Texto con caracteres an�malos
            if(dwCElements[l][m]==7){
              //Browser.msgBox("7");
              countE[dwCElements[l][m]-1]=0;
              var column1=index[0];
              for(var g=1;g<data.length;g++){
                if(!valTxt(data[g][column1].toString())){
                  rangesError.push(rangeData.getCell(g+1, column1+1));
                  //se guarda en el arreglo de errores de caracteres
                  rangesErrorCharacters.push(rangeData.getCell(g+1, column1+1).getA1Notation());
                  countE[(dwCElements[l][m])-1]++;
                }
              }
            }
            
            //validaci�n nombre cient�fico
            if(dwCElements[l][m]==21){
              //Browser.msgBox("21");
              countE[dwCElements[l][m]-1]=0;
              var column1=index[0];
              for(var g=1;g<data.length;g++){
                if(!validateScientificName(data[g][column1].toString())){
                  rangesError.push(rangeData.getCell(g+1, column1+1));
                  countE[(dwCElements[l][m])-1]++;
                  //Browser.msgBox(data[g][column1].toString()+" I ");
                  erSciName[g]=0;
                  erSciName[g]=0;
                }
              }
            }
            
            
            //Validaci�n nombre autor�a cient�fica
            if(dwCElements[l][m]==22){
              //Browser.msgBox("22");
              countE[dwCElements[l][m]-1]=0;
              var column1=index[0];
              for(var g=1;g<data.length;g++){
                if(!validateScientificNameAuthorship(data[g][column1].toString())){
                  rangesError.push(rangeData.getCell(g+1, column1+1));
                  countE[(dwCElements[l][m])-1]++;
                }
              }
            }
            
            //validaci�n epiteto
            if(dwCElements[l][m]==25){
              //Browser.msgBox("25");
              countE[dwCElements[l][m]-1]=0;
              var column1=index[0];
              if(sciNamePos!=-1){
                for(var g=1;g<data.length;g++){
                  if((data[g][column1].toString()!="")&&(data[g][sciNamePos].toString()!="")){
                    if(erSciName[g]!==0){
                        if(!validateSpecificEpithet(data[g][column1].toString().replace(" ",""),data[g][sciNamePos].toString())){
                        rangesError.push(rangeData.getCell(g+1, column1+1));
                        countE[(dwCElements[l][m])-1]++;
                        }
                    }else{
                      rangesError.push(rangeData.getCell(g+1, column1+1));
                      countE[(dwCElements[l][m])-1]++;
                    }
                  }
                }
              }
            }
            
            
          }//fin del for que recorre de las validaciones del elemento
        }
        //Los errores para el elemento seg�n cada tipo de validaci�n
        dwCFieldsErrors[l]=countE;
      }
    } //fin del for que recorre los elementos   
    
    //mensaje que se muestra si existen elementos repetidos
    if(repeatedElements){
      Browser.msgBox(messageA[lgSel].substring(0, messageA[lgSel].length-2)+messageB[lgSel]);  
    }
    //mensaje que se muestra si no se encontr� un elemento en la hoja
    if(ElementsNotFound){
      Browser.msgBox(message1[lgSel].substring(0, message1[lgSel].length-2)+".");
    }
    
    if(controlledVocabularyNotFound){
        Browser.msgBox(messageNoContVoc[lgSel].substring(0, messageNoContVoc[lgSel].length-2)+messageNoContVocB[lgSel]);
    }
    
    if(sciNamePos==-1){
      Browser.msgBox(messageNoScfName[lgSel]);
    }
    
    //se establecen los colores de las colores de las columnas
    for(var k=0;k<rangesError2.length;k++){
      rangesError2[k].setBackgroundColor("#CC6699"); //validacion identificador �nico
    }
    
    for(var k=0;k<rangesError.length;k++){
      rangesError[k].setBackgroundColor("#ea5b6e");  //errores en la validaci�n de la celda
    }
    
    
    for(var k=0;k<rangesErrorCod.length;k++){
      rangesErrorCod[k].setBackgroundColor("#ED8947");  //errores en la valdidaci�n entre celdas
    }
    
    
    for(var k=0;k<rangesNoVocC.length;k++){
      rangesNoVocC[k].setBackgroundColor("#E6E6E6"); //errores en la validaci�n, no se enecontr� vocabulario controlado
    }
    
    //ScriptProperties.setProperty('aChars', rangesErrorCharacters.toString());
    ScriptProperties.setProperty('errorCIndex', '0');
    ScriptProperties.setProperty('errorRIndex', '0');
    //ScriptProperties.setProperty('isValidate', '1'); //taxon
    ScriptProperties.setProperty('isValidateTaxon', '1');
    
    showErrors(dwCFieldsErrors);
    Browser.msgBox(messageEndOfVal[lgSel]);
    sheetDnC.activate();
    
  }else{
    Browser.msgBox(messageNoPSheet[lgSel]);
  }//cierre del condicional de existencia de la hoja
 spSheetDnC.setActiveSheet(spSheetDnC.getSheetByName(nameOfSheet[lgSel]));
 return 0;
};


function replaceChars(){
  var lgSel=parseInt(ScriptProperties.getProperty('lgSel'));
  var spSheetDnC=SpreadsheetApp.getActiveSpreadsheet();
  var sheetDnC=spSheetDnC.getSheetByName(nameOfSheet[lgSel]);
  var rangeData = sheetDnC.getDataRange();
  var properties = ScriptProperties.getProperties();
  var lValue = ScriptProperties.getProperty('aChars');
  lValue=lValue.split(',');
  var regexR1=/[^a-zA-Z0-9,:;�����()\-\.\s]+/g;
  for(var k=0;k<lValue.length;k++){
    var valcell=sheetDnC.getRange(lValue[k]).getValues().toString();
    valcell=valcell.replace(regexR1,'').replace(/\s+/g," ");
    var lns=valcell.length;
    if(valcell[0]==" "){
      valcell=valcell.substring(1,lns);
    }
    if(valcell[lns-1]==" "){
      valcell=valcell.substring(0,lns-1);
    }
    sheetDnC.getRange(lValue[k]).setValue(valcell);
  }
};


function replaceAChars(){
  var lgSel=parseInt(ScriptProperties.getProperty('lgSel'));
  var spSheetDnC=SpreadsheetApp.getActiveSpreadsheet();
  var sheetDnC=spSheetDnC.getSheetByName(nameOfSheet[lgSel]);  
  var rangeR=spSheetDnC.getActiveSelection();
  var rowsR=rangeR.getNumRows();  
  var columnsR=rangeR.getNumColumns();
  var dataR=rangeR.getValues();
  var regexR1=/[^a-zA-Z0-9,:;�����()\-\.\s]+/g;
  for (var c=1;c<=columnsR;c++){
    for(var r=1;r<=rowsR;r++){
      var valcell=rangeR.getCell(r, c).getValue();
      valcell=valcell.replace(regexR1,'').replace(/\s+/g," ");
      var lns=valcell.length;
      if(valcell[0]==" "){
        valcell=valcell.substring(1,lns);
      }
      if(valcell[lns-1]==" "){
        valcell=valcell.substring(0,lns-1);
      }
      rangeR.getCell(r, c).setValue(valcell);
    }
  } 
};

function showPropertiesScript(){
  var properties = ScriptProperties.getKeys();
  Browser.msgBox(properties);

};

function showErrorNext(){
  var state=false;
  var lgSel=parseInt(ScriptProperties.getProperty('lgSel'));
  var spSheetDnC=SpreadsheetApp.getActiveSpreadsheet();
  var sheetDnC=spSheetDnC.getSheetByName(nameOfSheet[lgSel]);
  var rangeData = sheetDnC.getDataRange();
  var colorData=rangeData.getBackgroundColors();
  var rowsR=rangeData.getNumRows();  
  var columnsR=rangeData.getNumColumns();
  var errorCI = parseInt(ScriptProperties.getProperty('errorCIndex'));
  var errorRI = parseInt(ScriptProperties.getProperty('errorRIndex'));
  if(errorCI=="0"){
    for (var cn=0;cn<columnsR;cn++){
      if(state){
        break;
      }
      for(var rn=0;rn<rowsR;rn++){
        if((colorData[rn][cn]=="#ea5b6e")||(colorData[rn][cn]=="#ED8947")){
          sheetDnC.setActiveCell(rangeData.getCell(rn+1, cn+1).getA1Notation());
          state=true;
          ScriptProperties.setProperty('errorCIndex', (cn+1).toString());
          ScriptProperties.setProperty('errorRIndex', (rn+1).toString());
          break;
        }
      }
    }
  }else{
    if(errorRI==rowsR){
      errorRI=0;
      errorCI=errorCI+1;
    }
    for(var cn=errorCI-1;cn<columnsR;cn++){
      if(state){
        break;
      }
      for(var rn=errorRI;rn<rowsR;rn++){
        if(colorData[rn][cn]=="#ea5b6e"){
          sheetDnC.setActiveCell(rangeData.getCell(rn+1, cn+1).getA1Notation());
          state=true;
          ScriptProperties.setProperty('errorCIndex', (cn+1).toString());
          ScriptProperties.setProperty('errorRIndex', (rn+1).toString());
          break;
        }
        if(rn==rowsR-1){
          errorRI=0;
        }
      }
    }
  }
};

function getDataCV(){
  var lgSel=parseInt(ScriptProperties.getProperty('lgSel'));
  var sheetDnC = SpreadsheetApp.getActiveSpreadsheet();
  var sheetCV=sheetDnC.getSheetByName(cVocSheet[lgSel]);
  if(sheetCV==null){
    Browser.msgBox(message3[lgSel]);
    var dataCV = undefined;
  }else{
    var rangeDataCV = sheetCV.getDataRange();
    var dataCV = rangeDataCV.getValues();
  }
  //Browser.msgBox(dataCV);
  return dataCV;
};



function validateCoordenates(){
  var lgSel=parseInt(ScriptProperties.getProperty('lgSel'));
  //Read the spreadsheet
  var spSheetDnC=SpreadsheetApp.getActiveSpreadsheet();
  var sheetDnC=spSheetDnC.getSheetByName(nameOfSheet[lgSel]);
  //Read the range of cells 
  var rangeData = sheetDnC.getDataRange();
  //Number of rows with data
  var numRows = rangeData.getNumRows();
  var data = rangeData.getValues();
  var repeatedElements=false;
  var index=new Array();
  var dwCGeo=new Array();
  var rangeECoord=new Array();
  var location=new Array();
  var geoRef=[decimalLatitude[lgSel],decimalLongitude[lgSel],country[lgSel],stateProvince[lgSel],county[lgSel]];
  //var isValid=ScriptProperties.getProperty('isValidate'); 
  var isValid=ScriptProperties.getProperty('isValidateLocId'); 
  var localization="";
  var noService=false;
  var coordP=parseInt(ScriptProperties.getProperty('posCor'));
  
  if(isValid=="1"){
    for(var l=0;l<geoRef.length;l++){
      index=new Array();
      for(var k=0;k<data[0].length;k++){
        if(geoRef[l]==data[0][k]){
          index.push(k); 
        }
      }
      if(index.length>1){
        repeatedElements=true;
        message4[lgSel]=message4[lgSel]+" "+l+", "; 
      }
      if(index.length==0){
        Browser.msgBox(message9[lgSel]+geoRef[l]);
      }else{
        dwCGeo[geoRef[l]]=index[0];
      }
    }
    
    if((dwCGeo[decimalLatitude[lgSel]]!==undefined)&&(dwCGeo[decimalLongitude[lgSel]]!==undefined)){
      for(var g=coordP;g<data.length;g++){
        if(((data[g][dwCGeo[decimalLatitude[lgSel]]].toString()!="")&&(data[g][dwCGeo[decimalLongitude[lgSel]]].toString()!=""))&&((rangeData.getCell(g+1,dwCGeo[decimalLatitude[lgSel]]+1).getBackgroundColor()!="#ea5b6e")&&(rangeData.getCell(g+1,dwCGeo[decimalLongitude[lgSel]]+1).getBackgroundColor()!="#ea5b6e"))){
          localization="";
          for(var k=2;k<geoRef.length;k++){
            if(dwCGeo[geoRef[k]]!==undefined){
              localization=localization+" "+data[g][dwCGeo[geoRef[k]]].toString(); 
              location[g]=getCrd(localization);
              if(location[g].length>1){
                var cordG=location[g].split(";"); //coordenadas
                //latitud
                var latG=cordG[0];
                var latS=data[g][dwCGeo[decimalLatitude[lgSel]]].toString();
                //si la coordenada recibida tiene signo -
                if(latG[0]=='-'){
                  //si la coordenada en la hoja tiene signo -
                  if(latS[0]=='-'){
                    rangeECoord.push(rangeData.getCell(g+1, dwCGeo[decimalLatitude[lgSel]]+1));
                  }else{
                    rangeECoord.push(rangeData.getCell(g+1, dwCGeo[decimalLatitude[lgSel]]+1));
                  }
                }
                if(latG[0]!='-'){
                  if(latS[0]!='-'){
                    if(latS[0]=='+'){
                      if((latG.split(".")[0]!=latS.split(".")[0].substring(1))||(latG.split(".")[1][0]!=latS.split(".")[1][0])){
                        rangeECoord.push(rangeData.getCell(g+1, dwCGeo[decimalLatitude[lgSel]]+1));
                      }
                    }else{
                      if((latG.split(".")[0]!=latS.split(".")[0])||(latG.split(".")[1][0]!=latS.split(".")[1][0])){
                        rangeECoord.push(rangeData.getCell(g+1, dwCGeo[decimalLatitude[lgSel]]+1));
                      }
                    }
                  }else{
                    rangeECoord.push(rangeData.getCell(g+1, dwCGeo[decimalLatitude[lgSel]]+1));
                  }
                }
                
                //longitud
                var lngG=cordG[1];
                var lngS=data[g][dwCGeo[decimalLongitude[lgSel]]].toString();
                
                //si la coordenada recibida tiene signo -
                if(lngG[0]=='-'){
                  //si la coordenada en la hoja tiene signo -
                  if(lngS[0]=='-'){
                    rangeECoord.push(rangeData.getCell(g+1, dwCGeo[decimalLongitude[lgSel]]+1));
                  }else{
                    rangeECoord.push(rangeData.getCell(g+1, dwCGeo[decimalLongitude[lgSel]]+1));
                  }
                }
                if(lngG[0]!='-'){
                  if(lngS[0]!='-'){
                    if(lngS[0]=='+'){
                      if((lngG.split(".")[0]!=lngS.split(".")[0].substring(1))||(lngG.split(".")[1][0]!=lngS.split(".")[1][0])){
                        rangeECoord.push(rangeData.getCell(g+1, dwCGeo[decimalLongitude[lgSel]]+1));
                      }
                    }else{
                      if((lngG.split(".")[0]!=lngS.split(".")[0])||(lngG.split(".")[1][0]!=lngS.split(".")[1][0])){
                        rangeECoord.push(rangeData.getCell(g+1, dwCGeo[decimalLongitude[lgSel]]+1));
                      }
                    }
                  }else{
                    rangeECoord.push(rangeData.getCell(g+1, dwCGeo[decimalLongitude[lgSel]]+1));
                  }
                }
                 
              }else{
                noService=true;
                ScriptProperties.setProperty('posCor', g);
              }
            }
          }
        }
        if(g==500-1){
          ScriptProperties.setProperty('posCor', g);
          break;
        }
      }
    }
    for(var k=0;k<rangeECoord.length;k++){
      rangeECoord[k].setBackgroundColor("#1F78D7");
    }
    if(noService){
      Browser.msgBox("No service");
    }
  }else{
    Browser.msgBox(message5[lgSel]);
  }
  Browser.msgBox("End of validations");
};

function validateLoc(){
  //Read the spreadsheet
  var lgSel=parseInt(ScriptProperties.getProperty('lgSel'));
  var spSheetDnC=SpreadsheetApp.getActiveSpreadsheet();
  var sheetDnC=spSheetDnC.getSheetByName(nameOfSheet[lgSel]);
  //Read the range of cells 
  var rangeData = sheetDnC.getDataRange();
  //Number of rows with data
  var numRows = rangeData.getNumRows();
  var data = rangeData.getValues();
  var repeatedElements=false;
  var index=new Array();
  var dwCGeo=new Array();
  var rangeEGeo=new Array();
  var location=new Array();
  var geoRef=[decimalLatitude[lgSel],decimalLongitude[lgSel],country[lgSel],stateProvince[lgSel],county[lgSel]];
  //var isValid=ScriptProperties.getProperty('isValidate'); 
  var isValid=ScriptProperties.getProperty('isValidateLocId');
  var posLoc=parseInt(ScriptProperties.getProperty('posRowLoc'));
  var noService=false;
  
  if(isValid=="1"){
    for(var l=0;l<geoRef.length;l++){
      index=new Array();
      //por cada fila
      for(var k=0;k<data[0].length;k++){
        if(geoRef[l]==data[0][k]){
          index.push(k); 
        }
      }
      if(index.length>1){
        repeatedElements=true;
        message4[lgSel]=message4[lgSel]+" "+l+", "; 
      }
      
      if(index.length==0){
        Browser.msgBox(message9[lgSel]+geoRef[l]);
      }else{
        dwCGeo[geoRef[l]]=index[0];
      }
    }
    
    if((dwCGeo[decimalLatitude[lgSel]]!==undefined)&&(dwCGeo[decimalLongitude[lgSel]]!==undefined)){
      for(var k=2;k<geoRef.length;k++){
        //si existe columna para pa�s, dep, mun
        if(dwCGeo[geoRef[k]]!==undefined){
          //para cada fila
          for(var g=posLoc;g<data.length;g++){
            if(((rangeData.getCell(g+1,dwCGeo[decimalLatitude[lgSel]]+1).getValue().toString()!="")&&(rangeData.getCell(g+1,dwCGeo[decimalLongitude[lgSel]]+1).getValue().toString()!=""))&&((rangeData.getCell(g+1,dwCGeo[decimalLatitude[lgSel]]+1).getBackgroundColor()!="#ea5b6e")&&(rangeData.getCell(g+1,dwCGeo[decimalLongitude[lgSel]]+1).getBackgroundColor()!="#ea5b6e"))){
              location[g]=getLocation(data[g][dwCGeo[decimalLatitude[lgSel]]].toString(),data[g][dwCGeo[decimalLongitude[lgSel]]].toString()); //******
              if(location[g].length>1){
                if(rangeData.getCell(g+1,dwCGeo[geoRef[k]]+1).getBackgroundColor()!="#ea5b6e"){
                  if(!validateLocation(data[g][dwCGeo[geoRef[k]]].toString(),location[g])){ //*******
                    rangeEGeo.push(rangeData.getCell(g+1, dwCGeo[geoRef[k]]+1)); 
                  }
                }
              }else{
                noService=true;
                ScriptProperties.setProperty('posRowLoc', g);
                break;
              }
            }
            if(g==500-1){
              ScriptProperties.setProperty('posRowLoc', g);
              break;
            }
          }
        }
      }
    }
    for(var k=0;k<rangeEGeo.length;k++){
      rangeEGeo[k].setBackgroundColor("#1F78D7"); //1F78D7 CC6699
    }
    if(noService){
      Browser.msgBox("No service");
    }
  }else{
    Browser.msgBox(message5[lgSel]);
  }
  Browser.msgBox("End of validations");
};


function getCoordenates(){
  var lgSel=parseInt(ScriptProperties.getProperty('lgSel'));
  //Read the spreadsheet
  var spSheetDnC=SpreadsheetApp.getActiveSpreadsheet();
  var sheetDnC=spSheetDnC.getSheetByName(nameOfSheet[lgSel]);
  //Read the range of cells 
  var rangeData = sheetDnC.getDataRange();
  //Number of rows with data
  var numRows = rangeData.getNumRows();
  var data = rangeData.getValues();
  var dataColors = rangeData.getBackgroundColors();
  var repeatedElements=false;
  var index=new Array();
  var dwCGeo=new Array();
  var rangeEGeo=new Array();
  var local=new Array();
  var geoRef=[decimalLatitude[lgSel],decimalLongitude[lgSel],country[lgSel],stateProvince[lgSel],county[lgSel]];
  var loc="";
  var noService=false;
  var posRow=parseInt(ScriptProperties.getProperty('posRowCoord'));
  
  for(var l=0;l<geoRef.length;l++){
    index=new Array();
    for(var k=0;k<data[0].length;k++){
      if(geoRef[l]==data[0][k]){
        index.push(k); 
      }
    }
    if(index.length>1){
      repeatedElements=true;
      message4[lgSel]=message4[lgSel]+" "+l+", "; 
    }
    if(index.length==0){
      Browser.msgBox(message9[lgSel]+geoRef[l]);
    }else{
      dwCGeo[geoRef[l]]=index[0];
    }
  }
  
  if((dwCGeo[decimalLatitude[lgSel]]!==undefined)&&(dwCGeo[decimalLongitude[lgSel]]!==undefined)){
    for(var g=posRow;g<dataLen;g++){
      if(((data[g][dwCGeo[decimalLatitude[lgSel]]].toString()=="")||(data[g][dwCGeo[decimalLongitude[lgSel]]].toString()==""))||((dataColors[g][dwCGeo[decimalLatitude[lgSel]]]=="#ea5b6e")||(dataColors[g][dwCGeo[decimalLongitude[lgSel]]]=="#ea5b6e"))||((dataColors[g][dwCGeo[decimalLatitude[lgSel]]]=="#CC6699")||(dataColors[g][dwCGeo[decimalLongitude[lgSel]]]=="#CC6699"))){
        loc="";
        for(var k=2;k<geoRef.length;k++){
          if(dwCGeo[geoRef[k]]!=undefined){
            if(rangeData.getCell(g+1,dwCGeo[geoRef[k]]+1).getBackgroundColor()!="#ea5b6e"){
              loc=loc+" "+data[g][dwCGeo[geoRef[k]]].toString(); 
            }
          }
        }
        loc=loc.replace(/\s+/g," ");
        if(loc!=" "){
          local[g]=getCrd(loc.toString()); 
          if(local[g].length>1){
            var cordG=local[g].split(";");  
            var latG=cordG[0];
            var lngG=cordG[1];
            rangeData.getCell(g+1,dwCGeo[decimalLatitude[lgSel]]+1).setBackground("white").setValue(cordG[0].split(".")[0]+"."+cordG[0].split(".")[1].substring(0,6));
            rangeData.getCell(g+1,dwCGeo[decimalLongitude[lgSel]]+1).setBackground("white").setValue(cordG[1].split(".")[0]+"."+cordG[0].split(".")[1].substring(0,6));
          }else{
            ScriptProperties.setProperty('posRowCoord', g);
            noService=true;
            break;
          }
        }
      }
      if(g==500-1){
        ScriptProperties.setProperty('posRowCoord', g);
        break;
      }
    } 
  }
  
  if(noService){
    Browser.msgBox(messageNoService[lgSel]);
  }
  Browser.msgBox(messageCoordEst[lgSel]);
};



