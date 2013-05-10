var type=["type","Tipo"];
var modified=["modified","Modificado"]; 
var rightsHolder=["rightsHolder","Titular de los Derechos"];
var institutionID=["institutionID","ID de la Instituci�n"];
var collectionID=["collectionID","ID de la Colecci�n"];
var institutionCode=["institutionCode","C�digo de la Instituci�n"];
var collectionCode=["collectionCode","C�digo de la Colecci�n"];
var datasetName=["datasetName","Nombre del Conjunto de Datos"];
var basisOfRecord=["basisOfRecord","Base del Registro"];

var occurrenceID=["occurrenceID","ID del Registro Biol�gico"];
var catalogNumber=["catalogNumber","N�mero de Cat�logo"];
var recordedBy=["recordedBy","Registrado por"];
var individualCount=["individualCount","Conteo de Individuos"];
var sex=["sex","Sexo"];

var samplingProtocol=["samplingProtocol","Protocolo de Muestreo"];
var eventDate=["eventDate","Fecha del Evento"];
var eventTime=["eventTime","Hora del Evento"];
var habitat=["habitat","H�bitat"];
var fieldNumber=["fieldNumber","N�mero de Campo"];
var eventRemarks=["eventRemarks","Comentarios del Evento"];

var waterBody=["waterBody","Cuerpo de Agua"];
var country=["country","Pa�s"];
var stateProvince=["stateProvince","Departamento"];
var county=["county","Municipio"];
var minimumElevationInMeters=["minimumElevationInMeters","Elevaci�n M�nima en metros"];
var maximumElevationInMeters=["minimumElevationInMeters","Elevaci�n M�xima en metros"];
var minimumDepthInMeters=["minimumDepthInMeters","Profundidad M�nima en metros"];
var maximumDepthInMeters=["maximumDepthInMeters","Profundidad M�xima en metros"];
var decimalLatitude=["decimalLatitude","Latitud Decimal"];
var decimalLongitude=["decimalLongitude","Longitud Decimal"];
var coordinateUncertaintyInMeters=["coordinateUncertaintyInMeters","Incertidumbre de las Coordenadas en metros"];
var coordinatePrecision=["coordinatePrecision","Precisi�n de las Coordenadas"];

var identifiedBy=["identifiedBy","Identificado por"];
var dateIdentified=["dateIdentified","Fecha de Identificaci�n"];

var scientificName=["scientificName","Nombre Cient�fico"];
var scientificNameAuthorship=["scientificNameAuthorship","Autor�a del Nombre Cient�fico"];
var vernacularName=["vernacularName","Nombre Com�n"];
var kingdom=["kingdom","Reino"];
var phylum=["phylum","Filo"];
var class=["class","Clase"];
var order=["order","Orden"];
var family=["family","Familia"];
var genus=["genus","G�nero"];
var subgenus=["subgenus","Subg�nero"];
var specificEpithet=["specificEpithet","Ep�teto Espec�fico"];

var messageA=["The following elements are present in more than one column: ","Los siguientes elementos est�n presentes en m�s de una columna: "];
var messageB=[". \n Only validated the first column with the name of the element, the others are marked with yellow",".\n Solo se valid� la primera columna con el nombre del elemento, l�s dem�s se marcaron con color amarillo"];
var message1=["Not match for these elements: ","No se encontraron los siguientes elementos: "];
var messageNoContVoc=["Not found controlled vocabularies for these elements: ","No se encontraron los vocabularios controlados para los siguientes elementos: "];
var messageNoContVocB=[".\n In the sheet of controlled vocabularies, enter values in column of the respective element, or in menu, option Generate sheet of controlled vocabularies.",".\n En la hoja de vocabularios controlados, ingrese los valores en la columna asociada al elemento, o en el men� la opci�n Generar vocabularios controlados."];
var messageNoWords=["Not found list of related words for these elements: ","No se encontraron listado de palabras relacionadas para los siguientes elementos: "];
var messageNoWordsB=[".\n In the sheet of controlled vocabularies, enter the associated words in column of the respective element, or in menu, option Generate sheet of controlled vocabularies.",".\n En la hoja de vocabularios controlados, ingrese las palabars en la columna asociada al elemento, o en el men� la opci�n Generar vocabularios controlados."];
var message2A=["Not found the controlled vocabulary for these elements: ","No se encontraron los vocabularios controlados para los siguientes elementos: "];
var message2B=[".\n In the controlled vocabularies sheet, enter the values in the column associated with the item, or in the menu option, generate controlled vocabulary.",".\n En la hoja de vocabularios controlados, ingrese los valores en la columna asociada al elemento, o en el men� la opci�n Generar vocabularios controlados"];
var message3=["Not exists controlled vocabulary sheet. In the menu, execute the function to create controlled vocabulary sheet. ","No existe hoja para el vocabulario controlado, debe ejecutar la funci�n en el menu para crearla"];
var message4=["The following elements are present in more than one column: ","Los siguientes elementos est�n presentes en m�s de una columna: "];
var message5=["To execute this function, please validate the data previously.","Para ejecutar esta funci�n, por favor previamente valide los datos."];
var message6=["Not exists in the sheet, decimalLatitude column. To make the validation, first create this columns and enter the data.","No se encuentra en la hoja la columna de Latitud Decimal. No se podr� realizar la validaci�n hasta que sea creada e ingresados los datos"];
var message7=["Not exists in the sheet, decimalLongitude column. To make the validation, first create this columns and enter the data.","No se encuentra en la hoja la columna de Longitud Decimal. No se podr� realizar la validaci�n hasta que sea creada e ingresados los datos"];  
var message8=["Not exists in the sheet, Country column. Possibly the result for the other data is inconsistent","No se encuentra en la hoja la columna de Pa�s. Posiblemente el resultado de la validaci�n de los dem�s datos de localizaci�n no sea acorde a las coordenadas geogr�ficas"];
var message9=["Not found in the sheet, the column ","No se encuentra en la hoja la columna de "];

var message11=["For some cells no matches found or has exceeded the query limit","Para algunas celdas no se encontr� resultado o se ha excedido el l�mite de consultas"];
var message12=["Not exists in the sheet, Decimal Latitude column. To make the validation, first create this columns and enter the data.","No se encuentra en la hoja la columna de Latitud Decimal. Cree una columna para ingresar los datos respectivos"];
var message13=["Not exists in the sheet, Decimal Longitude column. To make the validation, first create this columns and enter the data.","No se encuentra en la hoja la columna de Longitud Decimal. Cree una columna para ingresar los datos respectivos"];
var message14=["Not exists in the sheet, Country column. Possibly the result for the other data is inconsistent","No se encuentra en la hoja la columna de Pa�s. Posiblemente las coordenadas obtenidas no sean acordes con los dem�s datos del registro."];
var messageNoPSheet=["Not found sheet with name ElementsDwC. To make the validations, you must change the name of the sheet with the data","No se encontr� hoja con el nombre ElementosDwC. Para ejecutar la validaci�n, cambie el nombre de la hoja donde tiene los registros"];
var messageEndOfVal=["End of validations","Fin de las validaciones"];
var messageNoFoRes=["No matches found or has exceeded the query limit","No se encontr� resultado o se ha excedido el l�mite de consultas"];
var messageEndCoord=["Have been entered the coordinates according to the most probable location","Se han ingresados las coordenadas m�s probables de acuerdo a la ubicaci�n"];
var messageEndOfValGeo=["End of validations for location data","Final de la validaci�n de los datos de localizaci�n"];
var messageEndOfValC=["End of validations for coordinates","Final de la validaci�n de coordendas"];
var messageNoValSheet=["Not exist sheet with name ElementsDwC","No existe hoja con el nombre ElementosDwC"];
var messageRepScfName=["The element scientificName is in more than one column. Will be validated the first column found.","El elemento Nombre Cient�fico, se encuentra en m�s de una columna. Solo se validar� la primera columna encontrada para el elemento"];
var messageNoRegVal=["To execute this validation, please validate the data previously in DarwinCore","Para poder realizar esta validaci�n, previamente debe validar los registros en DarwinCore"];
var messageScEndVal=["End of validation catalogue of life","Fin de la validaci�n con catalogue of life"];
var nameOfSheet=["ElementsDwC","ElementosDwC"];
var cVocSheet=["Controlled vocabularies","Vocabularios Controlados"];
var errorSheet=["Errors in validations","Errores en las validaciones"];

var menuValFunc=["Validation functions","Funciones de validaci�n"];
var menuValDC=["Validate Darwin Core records","Validar registros Darwin Core"];
var menuValAD=["Validate administrative data","Validar datos administrativos"];
var menuValCoordDec=["Validate decimal latitude and decimal longitude","Validar latitud decimal y longitud decimal"];
var menuValScfName=["Validate scientificName with catalogue of life","Validar nombre cient�fico con catalogue of life"];
var menuGSCVoc=["Generate sheet of controlled vocabularies","Generar hoja de vocabularios controlados"];
var menuCorFunc=["Correction functions","Funciones de correci�n"];
var menuAnCha=["Remove abnormal characters in the cells","Reemplazar caracteres an�malos en celdas"];
var menuSearchCellE=["Find cell marked with error","Buscar celda con marca de error"];
var menuObCoord=["Get latitude and longitude decimal coordinates","Obtener coordenadas de latitud decimal y longitud decimal"];
var menuCleanSheet=["Set the sheet without error marks.","Limpiar hoja de marcas de error"];
var menuLanSelect=["Validations in english","Validaciones en espa�ol"]; 
var messageScColor=["The cells with a valor for scientificName not according with catalogue of life","Las celdas que tienen un valor de nombre cient�fico sin resultado en catalogue of life, se marcar�n con color verde"];
var messageNoScfName=["Not found column for the element scientificName, validation of specificEpithet","No se encontr� columna para el elemento Nombre cient�fico, en la validaci�n del epiteto espec�fico"];
var menuLan=["Languages", "Idiomas"];

var menuDwCOp=["Validations DarwinCore","Validaciones de DarwinCore"];
var menuRegElemntDwC=["Basic record elements","Elementos de registro b�sico y n�mero de catalogo"];
var menuRegBioDwC=["Biological record elements","Elementos de registro biol�gico"];
var menuEventDwC=["Event record elements","Elementos de evento"];
var menuLocIdDwC=["Location record elements","Elementos de ubicaci�n"];
var menuTaxonDwC=["Taxon record elements","Elementos de taxon"];

var messageCoordEst=["Coordinates established","Coordenadas establecidas"];
var messageNoService=["No service, try at a later time.","No hay servicio, intente en un momento"];

var typeVc=new Array();
typeVc[type[0]]=["StillImage", "MovingImage", "Sound", "PhysicalObject", "Event"];
typeVc[type[1]]=["Objeto F�sico","Imagen Est�tica", "Imagen Movimiento", "Sonido", "Evento"];

var basisOfRecordVc=new Array();
basisOfRecordVc[basisOfRecord[0]]=["Occurrence", "Event", "Location", "Taxon", "PreservedSpecimen", "FossilSpecimen", "LivingSpecimen", "HumanObservation", "MachineObservation", "NomenclaturalChecklist"];
basisOfRecordVc[basisOfRecord[1]]=["Registro Biol�gico", "Evento", "Ubicaci�n", "Tax�n", "Esp�cimen Preservado", "Esp�cimen Fosilizado", "Esp�cimen Vivo", "Observaci�n Humana", "Observaci�n con M�quina", "Lista Chequeo Nomenclatural"];

var sexVc=new Array();
sexVc[sex[0]]=["unknowable", "undetermined", "female", "male", "hermaphrodite"];
sexVc[sex[1]]=["Desconocido", "Indeterminado", "Hembra", "Macho", "Hermafrodita"];

var waterBodyVc= new Array();
waterBodyVc[waterBody[0]]=["ocean","sea","river","lagoon", "lake", "drainage basin", "wetland", "swamp", "canal", "creek"];
waterBodyVc[waterBody[1]]=["oc�ano","mar","r�o","laguna", "lago","cuenca", "humedal", "ci�naga", "canal", "quebrada", "riachuelo"];


var tValidation=new Array();
tValidation[0]=["Without content","Content inconsistent with the controlled vocabulary","Date invalid or malformed","Time invalid or malformed","Anomalous characters in the Identifier","Repeated Identifier","Anomalous characters in the text","Different institution identifiers, for the same collection", "Anomalous characters in the code", "Different institution codes for the same institution identifier", "Different institution codes for the same collection identifier", "Different catalog numbers for the same collection", "Invalid or anomalous characters in the list separated for ;", "Not is a positive integer", "There is integer or not in the acceptable range: Elevation", "There is integer or not in the acceptable range: Depth", "Not corresponds to a decimal latitude", "Not corresponds to a decimal longitude", "Invalid uncertainty value", "The value for precision in coordinates not is valid", "Not corresponds with the scientific name format", "Anomalous characters in authorship of  scientific name", "The geographic location not correspond to the entered coordinates", "Content don't have words related to the element", "specificEpithet not according with the value entered for the scientificName", "Time invalid or malformed"];
tValidation[1]=["Sin contenido","Contenido no acorde con el vocabulario controlado","Fecha inv�lida o en formato incorrecto", "Hora inv�lida o en formato incorrecto", "Identificador con caracteres an�malos o de un solo d�gito", "Identificador repetido", "Texto con caracteres an�malos", "Identificadores de instituci�n diferentes para una misma colecci�n", "C�digos con caracteres an�malos", "C�digos de instituci�n diferentes para un mismo identificador de instituci�n",  "C�digos de colecci�n diferentes para un mismo identificador de colecci�n", "N�meros de cat�logos diferentes para una misma colecci�n", "No v�lido o con caracteres an�malos en listado separado por ;", "No es un n�mero entero positivo", "No es n�mero entero, o no est� en el intervalo de valores v�lido: Elevaci�n", "No es n�mero entero, o no est� en el intervalo de valores v�lido: Profundidad", "No corresponde a una latitud en decimal", "No corresponde a una longitud en decimal", "Valor de la incertidumbre no v�lido", "El valor en la precisi�n de las coordenadas no es v�lido", "No corresponde con el formato de nombre cient�fico", "Autor�a del Nombre Cient�fico con caracteres an�malos", "Localizaci�n geogr�fica no acorde a las coordenadas ingresadas", "El contenido ingresado no tiene palabras palabras relacionadas con el elemento", "Ep�teto Espec�fico no acorde con el valor ingresado para el nombre cient�fico", "Hora Inv�lida"];
