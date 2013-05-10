var type=["type","Tipo"];
var modified=["modified","Modificado"]; 
var rightsHolder=["rightsHolder","Titular de los Derechos"];
var institutionID=["institutionID","ID de la Institución"];
var collectionID=["collectionID","ID de la Colección"];
var institutionCode=["institutionCode","Código de la Institución"];
var collectionCode=["collectionCode","Código de la Colección"];
var datasetName=["datasetName","Nombre del Conjunto de Datos"];
var basisOfRecord=["basisOfRecord","Base del Registro"];

var occurrenceID=["occurrenceID","ID del Registro Biológico"];
var catalogNumber=["catalogNumber","Número de Catálogo"];
var recordedBy=["recordedBy","Registrado por"];
var individualCount=["individualCount","Conteo de Individuos"];
var sex=["sex","Sexo"];

var samplingProtocol=["samplingProtocol","Protocolo de Muestreo"];
var eventDate=["eventDate","Fecha del Evento"];
var eventTime=["eventTime","Hora del Evento"];
var habitat=["habitat","Hábitat"];
var fieldNumber=["fieldNumber","Número de Campo"];
var eventRemarks=["eventRemarks","Comentarios del Evento"];

var waterBody=["waterBody","Cuerpo de Agua"];
var country=["country","País"];
var stateProvince=["stateProvince","Departamento"];
var county=["county","Municipio"];
var minimumElevationInMeters=["minimumElevationInMeters","Elevación Mínima en metros"];
var maximumElevationInMeters=["minimumElevationInMeters","Elevación Máxima en metros"];
var minimumDepthInMeters=["minimumDepthInMeters","Profundidad Mínima en metros"];
var maximumDepthInMeters=["maximumDepthInMeters","Profundidad Máxima en metros"];
var decimalLatitude=["decimalLatitude","Latitud Decimal"];
var decimalLongitude=["decimalLongitude","Longitud Decimal"];
var coordinateUncertaintyInMeters=["coordinateUncertaintyInMeters","Incertidumbre de las Coordenadas en metros"];
var coordinatePrecision=["coordinatePrecision","Precisión de las Coordenadas"];

var identifiedBy=["identifiedBy","Identificado por"];
var dateIdentified=["dateIdentified","Fecha de Identificación"];

var scientificName=["scientificName","Nombre Científico"];
var scientificNameAuthorship=["scientificNameAuthorship","Autoría del Nombre Científico"];
var vernacularName=["vernacularName","Nombre Común"];
var kingdom=["kingdom","Reino"];
var phylum=["phylum","Filo"];
var class=["class","Clase"];
var order=["order","Orden"];
var family=["family","Familia"];
var genus=["genus","Género"];
var subgenus=["subgenus","Subgénero"];
var specificEpithet=["specificEpithet","Epíteto Específico"];

var messageA=["The following elements are present in more than one column: ","Los siguientes elementos están presentes en más de una columna: "];
var messageB=[". \n Only validated the first column with the name of the element, the others are marked with yellow",".\n Solo se validó la primera columna con el nombre del elemento, lás demás se marcaron con color amarillo"];
var message1=["Not match for these elements: ","No se encontraron los siguientes elementos: "];
var messageNoContVoc=["Not found controlled vocabularies for these elements: ","No se encontraron los vocabularios controlados para los siguientes elementos: "];
var messageNoContVocB=[".\n In the sheet of controlled vocabularies, enter values in column of the respective element, or in menu, option Generate sheet of controlled vocabularies.",".\n En la hoja de vocabularios controlados, ingrese los valores en la columna asociada al elemento, o en el menú la opción Generar vocabularios controlados."];
var messageNoWords=["Not found list of related words for these elements: ","No se encontraron listado de palabras relacionadas para los siguientes elementos: "];
var messageNoWordsB=[".\n In the sheet of controlled vocabularies, enter the associated words in column of the respective element, or in menu, option Generate sheet of controlled vocabularies.",".\n En la hoja de vocabularios controlados, ingrese las palabars en la columna asociada al elemento, o en el menú la opción Generar vocabularios controlados."];
var message2A=["Not found the controlled vocabulary for these elements: ","No se encontraron los vocabularios controlados para los siguientes elementos: "];
var message2B=[".\n In the controlled vocabularies sheet, enter the values in the column associated with the item, or in the menu option, generate controlled vocabulary.",".\n En la hoja de vocabularios controlados, ingrese los valores en la columna asociada al elemento, o en el menú la opción Generar vocabularios controlados"];
var message3=["Not exists controlled vocabulary sheet. In the menu, execute the function to create controlled vocabulary sheet. ","No existe hoja para el vocabulario controlado, debe ejecutar la función en el menu para crearla"];
var message4=["The following elements are present in more than one column: ","Los siguientes elementos están presentes en más de una columna: "];
var message5=["To execute this function, please validate the data previously.","Para ejecutar esta función, por favor previamente valide los datos."];
var message6=["Not exists in the sheet, decimalLatitude column. To make the validation, first create this columns and enter the data.","No se encuentra en la hoja la columna de Latitud Decimal. No se podrá realizar la validación hasta que sea creada e ingresados los datos"];
var message7=["Not exists in the sheet, decimalLongitude column. To make the validation, first create this columns and enter the data.","No se encuentra en la hoja la columna de Longitud Decimal. No se podrá realizar la validación hasta que sea creada e ingresados los datos"];  
var message8=["Not exists in the sheet, Country column. Possibly the result for the other data is inconsistent","No se encuentra en la hoja la columna de País. Posiblemente el resultado de la validación de los demás datos de localización no sea acorde a las coordenadas geográficas"];
var message9=["Not found in the sheet, the column ","No se encuentra en la hoja la columna de "];

var message11=["For some cells no matches found or has exceeded the query limit","Para algunas celdas no se encontró resultado o se ha excedido el límite de consultas"];
var message12=["Not exists in the sheet, Decimal Latitude column. To make the validation, first create this columns and enter the data.","No se encuentra en la hoja la columna de Latitud Decimal. Cree una columna para ingresar los datos respectivos"];
var message13=["Not exists in the sheet, Decimal Longitude column. To make the validation, first create this columns and enter the data.","No se encuentra en la hoja la columna de Longitud Decimal. Cree una columna para ingresar los datos respectivos"];
var message14=["Not exists in the sheet, Country column. Possibly the result for the other data is inconsistent","No se encuentra en la hoja la columna de País. Posiblemente las coordenadas obtenidas no sean acordes con los demás datos del registro."];
var messageNoPSheet=["Not found sheet with name ElementsDwC. To make the validations, you must change the name of the sheet with the data","No se encontró hoja con el nombre ElementosDwC. Para ejecutar la validación, cambie el nombre de la hoja donde tiene los registros"];
var messageEndOfVal=["End of validations","Fin de las validaciones"];
var messageNoFoRes=["No matches found or has exceeded the query limit","No se encontró resultado o se ha excedido el límite de consultas"];
var messageEndCoord=["Have been entered the coordinates according to the most probable location","Se han ingresados las coordenadas más probables de acuerdo a la ubicación"];
var messageEndOfValGeo=["End of validations for location data","Final de la validación de los datos de localización"];
var messageEndOfValC=["End of validations for coordinates","Final de la validación de coordendas"];
var messageNoValSheet=["Not exist sheet with name ElementsDwC","No existe hoja con el nombre ElementosDwC"];
var messageRepScfName=["The element scientificName is in more than one column. Will be validated the first column found.","El elemento Nombre Científico, se encuentra en más de una columna. Solo se validará la primera columna encontrada para el elemento"];
var messageNoRegVal=["To execute this validation, please validate the data previously in DarwinCore","Para poder realizar esta validación, previamente debe validar los registros en DarwinCore"];
var messageScEndVal=["End of validation catalogue of life","Fin de la validación con catalogue of life"];
var nameOfSheet=["ElementsDwC","ElementosDwC"];
var cVocSheet=["Controlled vocabularies","Vocabularios Controlados"];
var errorSheet=["Errors in validations","Errores en las validaciones"];

var menuValFunc=["Validation functions","Funciones de validación"];
var menuValDC=["Validate Darwin Core records","Validar registros Darwin Core"];
var menuValAD=["Validate administrative data","Validar datos administrativos"];
var menuValCoordDec=["Validate decimal latitude and decimal longitude","Validar latitud decimal y longitud decimal"];
var menuValScfName=["Validate scientificName with catalogue of life","Validar nombre científico con catalogue of life"];
var menuGSCVoc=["Generate sheet of controlled vocabularies","Generar hoja de vocabularios controlados"];
var menuCorFunc=["Correction functions","Funciones de correción"];
var menuAnCha=["Remove abnormal characters in the cells","Reemplazar caracteres anómalos en celdas"];
var menuSearchCellE=["Find cell marked with error","Buscar celda con marca de error"];
var menuObCoord=["Get latitude and longitude decimal coordinates","Obtener coordenadas de latitud decimal y longitud decimal"];
var menuCleanSheet=["Set the sheet without error marks.","Limpiar hoja de marcas de error"];
var menuLanSelect=["Validations in english","Validaciones en español"]; 
var messageScColor=["The cells with a valor for scientificName not according with catalogue of life","Las celdas que tienen un valor de nombre científico sin resultado en catalogue of life, se marcarán con color verde"];
var messageNoScfName=["Not found column for the element scientificName, validation of specificEpithet","No se encontró columna para el elemento Nombre científico, en la validación del epiteto específico"];
var menuLan=["Languages", "Idiomas"];

var menuDwCOp=["Validations DarwinCore","Validaciones de DarwinCore"];
var menuRegElemntDwC=["Basic record elements","Elementos de registro básico y número de catalogo"];
var menuRegBioDwC=["Biological record elements","Elementos de registro biológico"];
var menuEventDwC=["Event record elements","Elementos de evento"];
var menuLocIdDwC=["Location record elements","Elementos de ubicación"];
var menuTaxonDwC=["Taxon record elements","Elementos de taxon"];

var messageCoordEst=["Coordinates established","Coordenadas establecidas"];
var messageNoService=["No service, try at a later time.","No hay servicio, intente en un momento"];

var typeVc=new Array();
typeVc[type[0]]=["StillImage", "MovingImage", "Sound", "PhysicalObject", "Event"];
typeVc[type[1]]=["Objeto Físico","Imagen Estática", "Imagen Movimiento", "Sonido", "Evento"];

var basisOfRecordVc=new Array();
basisOfRecordVc[basisOfRecord[0]]=["Occurrence", "Event", "Location", "Taxon", "PreservedSpecimen", "FossilSpecimen", "LivingSpecimen", "HumanObservation", "MachineObservation", "NomenclaturalChecklist"];
basisOfRecordVc[basisOfRecord[1]]=["Registro Biológico", "Evento", "Ubicación", "Taxón", "Espécimen Preservado", "Espécimen Fosilizado", "Espécimen Vivo", "Observación Humana", "Observación con Máquina", "Lista Chequeo Nomenclatural"];

var sexVc=new Array();
sexVc[sex[0]]=["unknowable", "undetermined", "female", "male", "hermaphrodite"];
sexVc[sex[1]]=["Desconocido", "Indeterminado", "Hembra", "Macho", "Hermafrodita"];

var waterBodyVc= new Array();
waterBodyVc[waterBody[0]]=["ocean","sea","river","lagoon", "lake", "drainage basin", "wetland", "swamp", "canal", "creek"];
waterBodyVc[waterBody[1]]=["océano","mar","río","laguna", "lago","cuenca", "humedal", "ciénaga", "canal", "quebrada", "riachuelo"];


var tValidation=new Array();
tValidation[0]=["Without content","Content inconsistent with the controlled vocabulary","Date invalid or malformed","Time invalid or malformed","Anomalous characters in the Identifier","Repeated Identifier","Anomalous characters in the text","Different institution identifiers, for the same collection", "Anomalous characters in the code", "Different institution codes for the same institution identifier", "Different institution codes for the same collection identifier", "Different catalog numbers for the same collection", "Invalid or anomalous characters in the list separated for ;", "Not is a positive integer", "There is integer or not in the acceptable range: Elevation", "There is integer or not in the acceptable range: Depth", "Not corresponds to a decimal latitude", "Not corresponds to a decimal longitude", "Invalid uncertainty value", "The value for precision in coordinates not is valid", "Not corresponds with the scientific name format", "Anomalous characters in authorship of  scientific name", "The geographic location not correspond to the entered coordinates", "Content don't have words related to the element", "specificEpithet not according with the value entered for the scientificName", "Time invalid or malformed"];
tValidation[1]=["Sin contenido","Contenido no acorde con el vocabulario controlado","Fecha inválida o en formato incorrecto", "Hora inválida o en formato incorrecto", "Identificador con caracteres anómalos o de un solo dígito", "Identificador repetido", "Texto con caracteres anómalos", "Identificadores de institución diferentes para una misma colección", "Códigos con caracteres anómalos", "Códigos de institución diferentes para un mismo identificador de institución",  "Códigos de colección diferentes para un mismo identificador de colección", "Números de catálogos diferentes para una misma colección", "No válido o con caracteres anómalos en listado separado por ;", "No es un número entero positivo", "No es número entero, o no está en el intervalo de valores válido: Elevación", "No es número entero, o no está en el intervalo de valores válido: Profundidad", "No corresponde a una latitud en decimal", "No corresponde a una longitud en decimal", "Valor de la incertidumbre no válido", "El valor en la precisión de las coordenadas no es válido", "No corresponde con el formato de nombre científico", "Autoría del Nombre Científico con caracteres anómalos", "Localización geográfica no acorde a las coordenadas ingresadas", "El contenido ingresado no tiene palabras palabras relacionadas con el elemento", "Epíteto Específico no acorde con el valor ingresado para el nombre científico", "Hora Inválida"];
