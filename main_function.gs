//Función principal, realiza las validaciones de los elementos en la hoja
//Main function, performs the validation of the elements in the sheet. 
function validationsDwC(){
  //Browser.msgBox("inicio");
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
    //array for the types of validations
    var validations= new Array();
    //array for index of the column with name of the field.
    var index=new Array(); 
    //array for the cell with errors of validation
    var rangesError= new Array(); 
    //Arreglo para las celdas sin vocabulario controlado
    var rangesNoVocC= new Array(); 
    //arreglo para los errores por caracteres anómalos
    var rangesErrorCharacters=new Array();
    //array for the number of errors for each type of validation
    var countE=new Array();
    //areglo para guardar el vocabulario controlado para un elemento
    var vOC=new Array();
    
    //variable for the name of the field to validate
    //var fiedlToVal="";
    //is true if is more column with the same element
    //se establece como verdadera si existe más de una columna con el mismo elemento
    var repeatedElements=false;
    //se establece como verdadera si no se encontró columna con el elemento
    var ElementsNotFound=false;
    //se establece como verdera si existe la hoja con vocabulario controlados
    var ExistSheetVC=false;
    //se estable como verdera si no se encontró vocabulario controlado para el elemento
    var controlledVocabularyNotFound=false;
    //data from the sheet with controlled vocabulary
    var dataControlledV=getDataCV();
    
    if(dataControlledV!==undefined){
      ExistSheetVC=true;
    }
    

    //*********
    //ID del Registro Biológico
    validations=new Array(); //inicializo el arreglo vacio
    //validacion de no vacio
    //No empty cell
    validations.push(1);
    //validacion de formato para identificador
    //Identificador con caracteres anómalos
    validations.push(5);
    //validacion de identificador único
    //Identificador repetido
    validations.push(6);
    //El índice de cada elemento en dwCElements será el elemento a validar en el idioma seleccionado
    dwCElements[occurrenceID[lgSel]]=validations;
    //**********
    //Tipo
    validations=new Array();
    //validacion de no vacio
    //validations.push(1);
    //validacion vocabulario controlado
    validations.push(2);
    //dwCElements["Tipo"]=validations;
    dwCElements[type[lgSel]]=validations;
    //**********
    //Base del Registro
    validations=new Array();
    //validacion de no vacio
    //Sin contenido
    validations.push(1);
    //validacion vocabulario controlado
    //Contenido no acorde con el vocabulario controlados.
    validations.push(2);
    dwCElements[basisOfRecord[lgSel]]=validations;
    //**********
    //Modificado
    validations=new Array();
    //validacion de no vacio
    //validations.push(1);
    //validacion de fecha ISO 
    //validation of ISO date
    //Fecha inválida o en formato incorrecto
    validations.push(3);
    dwCElements[modified[lgSel]]=validations;
    //************
    //Titular de los Derechos
    validations=new Array();
    //validacion de no vacio
    //validations.push(1);
    //validacion de texto 
    //Texto con caracteres anómalos
    validations.push(7);
    //dwCElements["Titular de los Derechos"]=validations;
    dwCElements[rightsHolder[lgSel]]=validations;
    //***********
    //Código de la Institución
    validations=new Array();
    //validacion de no vacio
    validations.push(1);
    //validacion codigo institución, colección
    validations.push(9);
    //dwCElements["Código de la Institución"]=validations;
    dwCElements[institutionCode[lgSel]]=validations;
    var erInstCod= new Array(); //***************
    var CodIPos=-1;
    //************
    //Código de la Colección
    validations=new Array();
    //validacion de no vacio
    validations.push(1);
    //validacion codigo institución, colección
    validations.push(9);
    //validacion institucion unica por coleccion 
    validations.push(8);
    dwCElements[collectionCode[lgSel]]=validations;
    var erColCod= new Array();
    var CodColPos=-1;
    //**********
    //ID de la Institución
    validations=new Array();
    //validacion de no vacio
    validations.push(1);
    //validacion de formato para identificador
    validations.push(5);
    //validación código-id institución
    validations.push(10);
    //dwCElements["ID de la Institución"]=validations;
    dwCElements[institutionID[lgSel]]=validations;
    var idIPos=-1; 
    var erInstId=new Array();
    //**********
    //ID de la Colección
    validations=new Array();
    //validacion de no vacio
    validations.push(1);
    //validacion de formato para identificador
    validations.push(5);
    //validación código-id coleccion
    validations.push(11);
    dwCElements[collectionID[lgSel]]=validations;
    var idColPos=-1;
    var erColId=new Array(); 
    //************
    //Número de Catálogo
    validations=new Array();
    //validacion de no vacio
    validations.push(1);
    //validacion de formato para identificador
    validations.push(5);
    //validacion catalogo unica por coleccion 
    validations.push(12);
    dwCElements[catalogNumber[lgSel]]=validations;
    var erNumCat= new Array();  
    //************
    //Nombre del Conjunto de Datos
    validations=new Array();
    //validacion de no vacio
    //validations.push(1);
    //validacion de texto 
    validations.push(7);
    dwCElements[datasetName[lgSel]]=validations;
    //************
    //Registrado por
    validations=new Array();
    //validacion de no vacio
    //validations.push(1);
    //Validacion lista punto y coma
    validations.push(13);
    dwCElements[recordedBy[lgSel]]=validations;
    //************
    //Conteo de Individuos
    validations=new Array();
    //validacion de no vacio
    //validations.push(1);
    //validacion número entero
    validations.push(14);
    dwCElements[individualCount[lgSel]]=validations;
    //************
    //Sexo
    validations=new Array();
    //validacion de no vacio
    //validations.push(1);
    //validacion vocabulario controlado
    validations.push(2);
    dwCElements[sex[lgSel]]=validations;
    //************
    //Protocolo de Muestreo
    validations=new Array();
    //validacion de no vacio
    //validations.push(1);
    //validacion de texto 
    validations.push(7);
    dwCElements[samplingProtocol[lgSel]]=validations;
    //************
    //Fecha del Evento
    validations=new Array();
    //validacion de no vacio
    //validations.push(1);
    //validacion de fecha ISO
    validations.push(3);
    dwCElements[eventDate[lgSel]]=validations; 
    //************
    //Hora del Evento
    validations=new Array();
    //validacion de no vacio
    //validations.push(1);
    //validacion de hora ISO
    validations.push(4);
    dwCElements[eventTime[lgSel]]=validations;
    //************
    //Hábitat
    validations=new Array();
    //validacion de no vacio
    //validations.push(1);
    //validacion de texto 
    validations.push(7);
    dwCElements[habitat[lgSel]]=validations;
    //************
    //Número de Campo
    validations=new Array();
    //validacion de no vacio
    //validations.push(1);
    //validacion de texto 
    validations.push(7);
    dwCElements[fieldNumber[lgSel]]=validations;
    //************
    //Comentarios del Evento
    validations=new Array();
    //validacion de no vacio
    //validations.push(1);
    //validacion de texto 
    validations.push(7);
    dwCElements[eventRemarks[lgSel]]=validations;
    //************
    //Cuerpo de Agua
    validations=new Array();
    //validacion de no vacio
    //validations.push(1);
    //validacion vocabulario controlado
    validations.push(2);
    dwCElements[waterBody[lgSel]]=validations;
    
    //************
    //Latitud Decimal
    validations=new Array();
    //validacion de no vacio
    //validations.push(1);
    //validacion latitud decimal
    validations.push(17);
    dwCElements[decimalLatitude[lgSel]]=validations;
    var latDecColPos=-1;   //*************** 
    var erLatDec=new Array();
    
    //************
    //Longitud Decimal
    validations=new Array();
    //validacion de no vacio
    //validations.push(1);
    //valiación longitud decimal
    validations.push(18);
    dwCElements[decimalLongitude[lgSel]]=validations;
    var lonDecColPos=-1;
    var erLotDec=new Array();
    var location=new Array();
    
    //************
    //País
    validations=new Array();
    //validacion de no vacio
    //validations.push(1);
    //validacion vocabulario controlado
    validations.push(2);
    //validacion localización
    //validations.push(23);
    dwCElements[country[lgSel]]=validations;
    
    //************
    //Departamento
    validations=new Array();
    //validacion de no vacio
    //validations.push(1);
    //validacion vocabulario controlado
    validations.push(2);
    //validacion localización
    //validations.push(23);
    dwCElements[stateProvince[lgSel]]=validations;
    //************
    //Municipio
    validations=new Array();
    //validacion de no vacio
    //validations.push(1);
    //validacion de texto 
    validations.push(2);
    //validacion localización
    //validations.push(23);
    dwCElements[county[lgSel]]=validations;
    
    //************
    //Elevación Mínima en metros
    validations=new Array();
    //validacion de no vacio
    //validations.push(1);
    //validacion metros
    validations.push(15);
    //rangos para los valores de elevación mínima y máxima
    var maxElv=8000;
    var minElv=-100;
    dwCElements[minimumElevationInMeters[lgSel]]=validations;
    
    //************
    //Elevación Máxima en metros
    validations=new Array();
    //validacion de no vacio
    //validations.push(1);
    //validacion metros
    validations.push(15);
    dwCElements[maximumElevationInMeters[lgSel]]=validations;
    
    //************
    //Profundidad Mínima en metros
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
    //Profundidad Máxima en metros
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
    //Incertidumbre de las Coordenadas en metros
    validations=new Array();
    //validacion de no vacio
    //validations.push(1);
    //validación incertidumbre coordenadas
    validations.push(19);
    dwCElements[coordinateUncertaintyInMeters[lgSel]]=validations;
    
    //************
    //Precisión de las Coordenadas
    validations=new Array();
    //validacion de no vacio
    //validations.push(1);
    //validación de la precisión
    validations.push(20);
    //rangos para los valores
    var maxPre=80000;
    var minPre=0;
    dwCElements[coordinatePrecision[lgSel]]=validations;
    
    //************
    //Identificado por
    validations=new Array();
    //validacion de no vacio
    //validations.push(1);
    //Validacion lista punto y coma
    validations.push(13);
    dwCElements[identifiedBy[lgSel]]=validations;
    
    //************
    //Fecha de Identificación
    validations=new Array();
    //validacion de no vacio
    //validations.push(1);
    //validacion de fecha ISO
    validations.push(3);
    dwCElements[dateIdentified[lgSel]]=validations;
    
    //************
    //Nombre Científico
    validations=new Array();
    //validacion de no vacio
    //validations.push(1);
    //validación nombre científico
    validations.push(21);
    dwCElements[scientificName[lgSel]]=validations;
    
    //************
    //Autoría del Nombre Científico
    validations=new Array();
    //validacion de no vacio
    validations.push(1);
    //validacion de nombre autoría científica
    validations.push(22);
    dwCElements[scientificNameAuthorship[lgSel]]=validations;
    
    //************
    //Nombre Común
    validations=new Array();
    //validacion de no vacio
    //validations.push(1);
    //validacion de texto 
    validations.push(7);
    dwCElements[vernacularName[lgSel]]=validations;
    
    //************
    //Reino
    validations=new Array();
    //validacion de no vacio
    //validations.push(1);
    //validacion vocabulario controlado
    validations.push(2);
    dwCElements[kingdom[lgSel]]=validations;
    
    //************
    //Filo
    validations=new Array();
    //validacion de no vacio
    //validations.push(1);
    //validacion de texto 
    validations.push(2);
    dwCElements[phylum[lgSel]]=validations;
    
    //************
    //Clase
    validations=new Array();
    //validacion de no vacio
    //validations.push(1);
    //validacion de texto 
    validations.push(2);
    dwCElements[class[lgSel]]=validations;
    
    //************
    //Orden
    validations=new Array();
    //validacion de no vacio
    //validations.push(1);
    //validacion de texto 
    validations.push(2);
    dwCElements[order[lgSel]]=validations;
    
    //************
    //Familia
    validations=new Array();
    //validacion de no vacio
    //validations.push(1);
    //validacion de texto 
    validations.push(2);
    dwCElements[family[lgSel]]=validations;
    
    //************
    //Género
    validations=new Array();
    //validacion de no vacio
    //validations.push(1);
    //validacion de texto 
    validations.push(2);
    dwCElements[genus[lgSel]]=validations;
    
    //************
    //Subgénero
    validations=new Array();
    //validacion de no vacio
    //validations.push(1);
    //validacion de texto 
    validations.push(2);
    dwCElements[subgenus[lgSel]]=validations;
 
 
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
          message1[lgSel]=message1[lgSel]+" "+l+", "; //No se encontró el elemento
        }else{
          var countE=new Array();
          //se guarda la posición de la columna para los campos indicados
          /*
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
          if(l==institutionCode[lgSel]){
            CodIPos=index[0];
          }
          
          if(l==collectionCode[lgSel]){
            CodColPos=index[0];
          }
          */
          
          //Se recorre el arreglo donde se guardaron los tipos de validaciones para el elemento
          for(var m=0;m<dwCElements[l].length;m++){
            //validación 1
            if(dwCElements[l][m]==1){
              countE[dwCElements[l][m]-1]=0;
              //Browser.msgBox("1");
              var column1=index[0];
              //recorrer cada registro de la columna
              for(var g=1;g<data.length;g++){
                if(!validateNoEmpty(data[g][column1].toString())){
                  //se agrega la celda que está vacia
                  rangesError.push(rangeData.getCell(g+1, column1+1));
                  //se suma un error al contador de errores para esta validación
                  countE[(dwCElements[l][m])-1]++;
                }
              }
            }
            //validacion 2
            if(dwCElements[l][m]==2){
              //Si existe la hoja de vocabularios controlados
              if(ExistSheetVC){
                countE[dwCElements[l][m]-1]=0;
                //se obtiene el vocabulario controlado para este elemento. Se pasa como parámetro el elemento y la matriz de datos
                vOC=getCV(l,dataControlledV);
                //Si el vocabulario controlado no tiene elementos
                if(vOC.length==0){
                  controlledVocabularyNotFound=true;
                  message2[lgSel]=message2[lgSel]+" "+l+", ";
                  //se agrega la celdas que no tienen el vocabulairo controlado (para después se marcadas con el color específico) 
                  rangesNoVocC.push(rangeData.offset(1, index[0],data.length-1,1));
                }else{
                  var column1=index[0];
                  //recorrer cada registro de la columna
                  for(var g=1;g<data.length;g++){
                    //si la validación de la celda da false
                    if(!valControlledVocabulary(data[g][column1].toString(), vOC)){
                      rangesError.push(rangeData.getCell(g+1, column1+1));
                      //se suma un error al contador de errores para esta validación
                      countE[(dwCElements[l][m])-1]++;
                    }
                  }
                }
              }else{
                rangesNoVocC.push(rangeData.offset(1, index[0],data.length-1,1));
              }
            }
            
            
            //validacion 3
            //Fecha inválida o en formato incorrecto: Validación de ISO:8601
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
            
            //validacion 4
            //Hora del evento
            if(dwCElements[l][m]==4){
              //Browser.msgBox("4");
              countE[dwCElements[l][m]-1]=0;
              var column1=index[0];
              for(var g=1;g<data.length;g++){
                if(!validateDateISO(data[g][column1].toString())){ //if(!validateHour(data[g][column1].toString())){
                  rangesError.push(rangeData.getCell(g+1, column1+1));
                  countE[(dwCElements[l][m])-1]++;
                }
              }
            }
            
            //validación 5
            if(dwCElements[l][m]==5){
              //Browser.msgBox("5");
              //for number of rows with data
              countE[dwCElements[l][m]-1]=0;
              var column1=index[0];
              //for recorre los datos en la columna
              for(var g=1;g<data.length;g++){
                //validación de formato identificador
                if(!validateFIdentificador(data[g][column1].toString())){
                  //se agrega la celda para marcarla
                  rangesError.push(rangeData.getCell(g+1, column1+1));
                  //se aumenta el conteo de errores
                  countE[(dwCElements[l][m])-1]++;
                  if(l==institutionID[lgSel]){
                    erInstId[g]=0; //si la celda de es erronea se marca con 0 en este arreglo
                  }
                  /*
                  if(l==collectionID[lgSel]){
                    erColId[g]=0;
                  }
                  if(l==institutionCode[lgSel]){
                    erInstCod[g]=0;
                  }
                  if(l==collectionCode[lgSel]){
                    erColCod[g]=0;
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
            
            //Texto con caracteres anómalos
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
            
          }//fin del for que recorre de las validaciones del elemento
        }
        //Los errores para el elemento según cada tipo de validación
        dwCFieldsErrors[l]=countE;
      }
    } //fin del for que recorre los elementos   
    
    //mensaje que se muestra si existen elementos repetidos
    if(repeatedElements){
      Browser.msgBox(messageA[lgSel].substring(0, messageA[lgSel].length-2)+messageB[lgSel]);  
    }
    //mensaje que se muestra si no se encontró un elemento en la hoja
    if(ElementsNotFound){
      Browser.msgBox(message1[lgSel].substring(0, message1[lgSel].length-2)+".");
    }
    
    //se establecen los colores de las colores de las columnas
    /*
    for(var k=0;k<rangesError2.length;k++){
      rangesError2[k].setBackgroundColor("#CC6699"); //validacion identificador único
    }
    */
    
    for(var k=0;k<rangesError.length;k++){
      rangesError[k].setBackgroundColor("#ea5b6e");  //errores en la validación de la celda
    }
    
    /*
    for(var k=0;k<rangesErrorCod.length;k++){
      rangesErrorCod[k].setBackgroundColor("#ED8947");  //errores en la valdidación entre celdas
    }
    */
    
    
    for(var k=0;k<rangesNoVocC.length;k++){
      rangesNoVocC[k].setBackgroundColor("#E6E6E6"); //errores en la validación, no se enecontró vocabulario controlado
    }
    
    //ScriptProperties.setProperty('aChars', rangesErrorCharacters.toString());
    ScriptProperties.setProperty('errorCIndex', '0');
    ScriptProperties.setProperty('errorRIndex', '0');
    ScriptProperties.setProperty('isValidate', '1');
    
    showErrors(dwCFieldsErrors);
    Browser.msgBox(messageEndOfVal[lgSel]);
    
  }else{
    Browser.msgBox(messageNoPSheet[lgSel]);
  }//cierre del condicional de existencia de la hoja
 
};


function replaceChars(){
  var lgSel=parseInt(ScriptProperties.getProperty('lgSel'));
  var spSheetDnC=SpreadsheetApp.getActiveSpreadsheet();
  var sheetDnC=spSheetDnC.getSheetByName(nameOfSheet[lgSel]);
  var rangeData = sheetDnC.getDataRange();
  var properties = ScriptProperties.getProperties();
  var lValue = ScriptProperties.getProperty('aChars');
  lValue=lValue.split(',');
  var regexR1=/[^a-zA-Z0-9,:;óíáéú()\-\.\s]+/g;
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
  var regexR1=/[^a-zA-Z0-9,:;óíáéú()\-\.\s]+/g;
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
  var isValid=ScriptProperties.getProperty('isValidate'); 
  
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
         if(geoRef[l]==decimalLatitude[lgSel]){
           Browser.msgBox(message6[lgSel]);
         }
         if(geoRef[l]==decimalLongitude[lgSel]){
           Browser.msgBox(message7[lgSel]);
         } 
         if(geoRef[l]==country[lgSel]){
           Browser.msgBox(message8[lgSel]);
         }else{
           Browser.msgBox(message9[lgSel]+geoRef[l]);
         }
      }else{
         dwCGeo[geoRef[l]]=index[0];
      }
    }
   
    
    if((dwCGeo[decimalLatitude[lgSel]]!=undefined)&&(dwCGeo[decimalLongitude[lgSel]]!=undefined)){
      for(var k=2;k<geoRef.length;k++){
       if(dwCGeo[geoRef[k]]!=undefined){
       for(var g=1;g<data.length;g++){
         if(((rangeData.getCell(g+1,dwCGeo[decimalLatitude[lgSel]]+1).getValue().toString()!="")&&(rangeData.getCell(g+1,dwCGeo[decimalLongitude[lgSel]]+1).getValue().toString()!=""))&&((rangeData.getCell(g+1,dwCGeo[decimalLatitude[lgSel]]+1).getBackgroundColor()!="#ea5b6e")&&(rangeData.getCell(g+1,dwCGeo[decimalLongitude[lgSel]]+1).getBackgroundColor()!="#ea5b6e"))){
           location[g]=getLocation(data[g][dwCGeo[decimalLatitude[lgSel]]].toString(),data[g][dwCGeo[decimalLongitude[lgSel]]].toString());
           if(rangeData.getCell(g+1,dwCGeo[geoRef[k]]+1).getBackgroundColor()!="#ea5b6e"){
             if(!validateLocation(data[g][dwCGeo[geoRef[k]]].toString(),location[g])){
               rangeEGeo.push(rangeData.getCell(g+1, dwCGeo[geoRef[k]]+1)); 
             }
           }
         }else{
           //
         }
       }
      }
    }
  }
    
  for(var k=0;k<rangeEGeo.length;k++){
    rangeEGeo[k].setBackgroundColor("#CC6699");
  }  
    
  }else{
    Browser.msgBox(message5[lgSel]);
  }
  
  Browser.msgBox(messageEndOfValGeo[lgSel]);
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
  var isValid=ScriptProperties.getProperty('isValidate'); 
  var localization="";
  
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
         if(geoRef[l]==decimalLatitude[lgSel]){
           Browser.msgBox(message6[lgSel]);
         }
         if(geoRef[l]==decimalLongitude[lgSel]){
           Browser.msgBox(message7[lgSel]);
         } 
         if(geoRef[l]==country[lgSel]){
           Browser.msgBox(message8[lgSel]);
         }else{
           Browser.msgBox(message9[lgSel]+geoRef[l]);
         }
      }else{
         dwCGeo[geoRef[l]]=index[0];
      }
    }
    
   if((dwCGeo[decimalLatitude[lgSel]]!=undefined)&&(dwCGeo[decimalLongitude[lgSel]]!=undefined)){
    for(var g=1;g<data.length;g++){
      if(((data[g][dwCGeo[decimalLatitude[lgSel]]].toString()!="")&&(data[g][dwCGeo[decimalLongitude[lgSel]]].toString()!=""))&&((rangeData.getCell(g+1,dwCGeo[decimalLatitude[lgSel]]+1).getBackgroundColor()!="#ea5b6e")&&(rangeData.getCell(g+1,dwCGeo[decimalLongitude[lgSel]]+1).getBackgroundColor()!="#ea5b6e"))){
        localization=""; 
        for(var k=2;k<geoRef.length;k++){
          if(dwCGeo[geoRef[k]]!=undefined){
            localization=localization+" "+data[g][dwCGeo[geoRef[k]]].toString(); 
          }
        }
        location[g]=getCrd(localization);
        var cordG=location[g].split(";");  
        var latG=cordG[0];
        var latS=data[g][dwCGeo[decimalLatitude[lgSel]]].toString();
          
        if(latG[0]=='-'){
          if(latS[0]=='-'){
            if((latG.split(".")[0]!=latS.split(".")[0])||(latG.split(".")[1][0]!=latS.split(".")[1][0])){
              rangeECoord.push(rangeData.getCell(g+1, dwCGeo[decimalLatitude[lgSel]]+1));
            }
          }else{
            rangeECoord.push(rangeData.getCell(g+1, dwCGeo[decimalLatitude[lgSel]]+1));
          }
        }
        
        if(latG[0]=='+'){
          if(latS[0]=='-'){
            rangeECoord.push(rangeData.getCell(g+1, dwCGeo[decimalLatitude[lgSel]]+1));
          }else{
            if(latS[0]=='+'){
              if((latG.split(".")[0]!=latS.split(".")[0])||(latG.split(".")[1][0]!=latS.split(".")[1][0])){
                rangeECoord.push(rangeData.getCell(g+1, dwCGeo[decimalLatitude[lgSel]]+1));
              }
            }else{
              if((latG.split(".")[0].substring(1)!=latS.split(".")[0])||(latG.split(".")[1][0]!=latS.split(".")[1][0])){
                rangeECoord.push(rangeData.getCell(g+1, dwCGeo[decimalLatitude[lgSel]]+1));
              }
            } 
          }
        }
        
        if((latG[0]!='-')&&(latG[0]!='+')){
          if(latS[0]=='-'){
            rangeECoord.push(rangeData.getCell(g+1, dwCGeo[decimalLatitude[lgSel]]+1));
          }else{
            if(latS[0]=='+'){
              if((latG.split(".")[0]!=latS.split(".")[0].substring(1))||(latG.split(".")[1][0]!=latS.split(".")[1][0])){
                rangeECoord.push(rangeData.getCell(g+1, dwCGeo[decimalLatitude[lgSel]]+1));
              }
            }else{
              if((latG.split(".")[0]!=latS.split(".")[0])||(latG.split(".")[1][0]!=latS.split(".")[1][0])){
                rangeECoord.push(rangeData.getCell(g+1, dwCGeo[decimalLatitude[lgSel]]+1));
              }
            }
          }
        }
        
        //****
        var lngG=cordG[1];
        var lngS=data[g][dwCGeo[decimalLongitude[lgSel]]].toString();
        if(lngG[0]=='-'){
          if(lngS[0]=='-'){
            if((lngG.split(".")[0]!=lngS.split(".")[0])||(lngG.split(".")[1][0]!=lngS.split(".")[1][0])){
              rangeECoord.push(rangeData.getCell(g+1, dwCGeo[decimalLongitude[lgSel]]+1));
            }
          }else{
            rangeECoord.push(rangeData.getCell(g+1, dwCGeo[decimalLongitude[lgSel]]+1));
          }
        }
        
        if(lngG[0]=='+'){
          if(lngS[0]=='-'){
            rangeECoord.push(rangeData.getCell(g+1, dwCGeo[decimalLongitude[lgSel]]+1));
          }else{
            if(lngS[0]=='+'){
              if((lngG.split(".")[0]!=lngS.split(".")[0])||(lngG.split(".")[1][0]!=lngS.split(".")[1][0])){
                rangeECoord.push(rangeData.getCell(g+1, dwCGeo[decimalLongitude[lgSel]]+1));
              }
            }else{
              if((lngG.split(".")[0].substring(1)!=lngS.split(".")[0])||(lngG.split(".")[1][0]!=lngS.split(".")[1][0])){
                rangeECoord.push(rangeData.getCell(g+1, dwCGeo[decimalLongitude[lgSel]]+1));
              }
            } 
          }
        }
        
        if((lngG[0]!='-')&&(lngG[0]!='+')){
          if(lngS[0]=='-'){
            rangeECoord.push(rangeData.getCell(g+1, dwCGeo[decimalLongitude[lgSel]]+1));
          }else{
            if(lngS[0]=='+'){
              if((lngG.split(".")[0]!=lngS.split(".")[0].substring(1))||(lngG.split(".")[1][0]!=lngS.split(".")[1][0])){
                rangeECoord.push(rangeData.getCell(g+1, dwCGeo[decimalLongitude[lgSel]]+1));
              }
            }else{
              if((lngG.split(".")[0]!=lngS.split(".")[0])||(lngG.split(".")[1][0]!=lngS.split(".")[1][0])){
                rangeECoord.push(rangeData.getCell(g+1, dwCGeo[decimalLongitude[lgSel]]+1));
              }
            }
          }
        }
         
      }
    }  
  }
   for(var k=0;k<rangeECoord.length;k++){
    rangeECoord[k].setBackgroundColor("#CC6699");
  }  
    
  }else{
    Browser.msgBox(message5[lgSel]);
  }
  Browser.msgBox(messageEndOfValC);
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
  
   for(var l=0;l<geoRef.length;l++){
      index=new Array();
      for(var k=0;k<data[0].length;k++){
          if(geoRef[l]==data[0][k]){
            index.push(k); 
          }
        }  
      if(index.length>1){
          repeatedElements=true;
       }
       
       if(index.length==0){ 
         if(geoRef[l]==decimalLatitude[lgSel]){
           Browser.msgBox(message12[lgSel]);
         }
         if(geoRef[l]==decimalLongitude[lgSel]){
           Browser.msgBox(message13[lgSel]);
         } 
         if(geoRef[l]==country[lgSel]){
           Browser.msgBox(message14[lgSel]);
         }else{
           Browser.msgBox(message9[lgSel]+geoRef[l]);
         }
      }else{
         dwCGeo[geoRef[l]]=index[0];
      }
    }
  
  
  if((dwCGeo[decimalLatitude[lgSel]]!=undefined)&&(dwCGeo[decimalLongitude[lgSel]]!=undefined)){
    for(var g=1;g<data.length;g++){
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
      if(local[g]!=message11[lgSel]){      
        var cordG=local[g].split(";");  
        var latG=cordG[0];
        var lngG=cordG[1];
        
      rangeData.getCell(g+1,dwCGeo[decimalLatitude[lgSel]]+1).setBackground("white").setValue(cordG[0].split(".")[0]+"."+cordG[0].split(".")[1].substring(0,6));
      rangeData.getCell(g+1,dwCGeo[decimalLongitude[lgSel]]+1).setBackground("white").setValue(cordG[1].split(".")[0]+"."+cordG[0].split(".")[1].substring(0,6));
      }
      }
      }
    }
  }
  
  Browser.msgBox(messageEndCoord[lgSel]);  
};










