   function validateNoEmpty(cellToVal){
  var val=true;
  if(cellToVal==""){
    val=false;
  }
  return val;
};


function valControlledVocabulary(cellToVal, vocType){
  var val=false;
  var ln1=vocType.length;
  if(cellToVal!=""){
    for (var j=0;j<ln1;j++){
      if (cellToVal==vocType[j]){
        val=true;
        break;
      }
    }
  }else{
  val=true;
  }
  return val;
};


function validateFIdentificador(cellToVal){
 var vald=true;
 var regexi=/^[a-zA-Z0-9,:;\-\.]+$/
 var len=cellToVal.length;
 if(cellToVal!=""){
   if((cellToVal.length>=2)&&(cellToVal.length<=50)){
    if((cellToVal[0]!=' ')&&(cellToVal[len-1]!=' ')){
      if(cellToVal.search(regexi)==-1){
        vald=false;
      }
    }else{
      vald=false;
    }
   }else{
     vald=false;
   }
 }
 return vald; 
};


function valTxt(cellToVal){
  var vald=true;
  var regexi=/^[a-zA-Z0-9,:;óíáéúñ()\-\.\s]+$/
  var len=cellToVal.length;
  if(cellToVal!=""){
    if((cellToVal.length>=2)&&(cellToVal.length<=500)){
      if((cellToVal[0]!=' ')&&(cellToVal[len-1]!=' ')){
        if(cellToVal.search(regexi)==-1){
          vald=false;
        }
    }else{
      vald=false;
    }
    }else{
      vald=false;
    }
  }
return vald;
};


function valCod(cellToVal){
  var vald=true;
  var regexi=/^[a-zA-Z0-9\.\-\s]+$/
  var len=cellToVal.length;
  if(cellToVal!=""){
    if((cellToVal.length>=2)&&(cellToVal.length<=100)){
      if((cellToVal[0]!=' ')&&(cellToVal[len-1]!=' ')){
        if(cellToVal.search(regexi)==-1){
          vald=false;
        }
    }else{
      vald=false;
    }
    }else{
      vald=false;
    }
  }
return vald;
};


function valListSemicolon(cellToVal){
  var vald=true;
  var regexi=/^[A-Z][a-zA-Z,:;óíáéúñ\-\.\s]+$/;
  var len=cellToVal.length;
  if(cellToVal!=""){
    if((cellToVal.length>=2)&&(cellToVal.length<=500)){
      if((cellToVal[0]!=' ')&&(cellToVal[len-1]!=' ')){
        if(cellToVal.search(regexi)==-1){
          vald=false;
        }else if((cellToVal[0]==';'||cellToVal[len-1]==';')||cellToVal.indexOf(";;")!=-1){
          vald=false;
        }
    }else{
      vald=false;
    }
    }else{
      vald=false;
    }
  }
  return vald;
};


function validateIntNum(cellToVal){
  var vald=true;
  var regexNum=/^[0-9]+$/;
  if(cellToVal!=""){
    if(cellToVal.search(regexNum)!=-1){
      if(isNaN(parseInt(cellToVal))){
        vald=false;
      }
    }else{
      vald=false;
    };
  }
  return vald;
};


function validateMeters(cellToVal,max,min){
  var vald=true;
  var regexM=/^(\+|-)?[0-9]+$/;
  if(cellToVal!=""){
    if(cellToVal.search(regexM)!=-1){
      if(isNaN(parseInt(cellToVal))){
        vald=false;
      }else if(!((cellToVal>=parseInt(min))&&(cellToVal<=parseInt(max)))){
        vald=false;
      }
    }else{
      vald=false;
    };
  }
  return vald;
};


function validateDecimalLatitude(cellToVal){
  var vald=true;
  var regexDL=/^(\+|-)?([1-8]?[0-9]\.{1}\d{1,9}$|90\.{1}0{1,9}$)/;
  if(cellToVal!=""){
    if(cellToVal.search(regexDL)==-1){
      vald=false;
    }
  }
  return vald;
};


function validateDecimalLongitude(cellToVal){
  var vald=true;
  var regexDLO=/^(\+|-)?([0-1]?[0-7]?[0-9]\.{1}\d{1,9}$|180\.{1}0{1,9}$)/;
  if(cellToVal!=""){
    if(cellToVal.search(regexDLO)==-1){
      vald=false;
    }
  }
  return vald;
};



function validateUM(cellToVal,max,min){
  var vald=true;
  var regexM=/^(\+|-)?[0-9]+$/;
  if(cellToVal!=""){
    if(cellToVal!="0"){
      if(cellToVal.search(regexM)!=-1){
        if(isNaN(parseInt(cellToVal))){
          vald=false;
        }else if(!((cellToVal>=parseInt(min))&&(cellToVal<=parseInt(max)))){
          vald=false;
        }
      }else{
        vald=false;
      }
    }else{
      vald=false;
    }
  }
  return vald;
};


function validatePrecision(cellToVal,max,min){
  var vald=true;
  var regexM=/^(\+|-)?[1]?[0-9]?[0-9]\.{1}\d{1,6}$/;
  if(cellToVal!=""){
    if(cellToVal.search(regexM)!=-1){
      if(!((cellToVal>=parseInt(min))&&(cellToVal<=parseInt(max)))){
        vald=false;
      }
    }else{
      vald=false;
    }
  }
  return vald;
};


function validateScientificName(cellToVal){
  var regxMa=/^[A-Z][a-zA-Z0-9:;óíáéúñ()\.\s]+$/;
  var regNN=/^[a-zA-Z]+$/;
  var vald=true;
  var len=cellToVal.length;
  if(cellToVal!=""){
    if((cellToVal.length>=2)&&(cellToVal.length<=100)){
        if((cellToVal[0]!=' ')&&(cellToVal[len-1]!=' ')){
          if(cellToVal.search(regxMa)==-1){
            vald=false;
          }else if(cellToVal.indexOf("  ")!=-1){
            vald=false;
          }else if(((cellToVal.indexOf("(")!=-1)&&(cellToVal.indexOf(")")==-1))||((cellToVal.indexOf(")")!=-1)&&(cellToVal.indexOf("(")==-1))){
            vald=false;
          }
          if((cellToVal.split(' ').length>1)&&(cellToVal.split(' ').length<6)){
            if((cellToVal.split(' ')[0].search(regNN)==-1)||(cellToVal.split(' ')[1].search(regNN)==-1)){
              vald=false;
            }
          }else{
            vald=false;
          }
        }else{
          vald=false;
        }
    }else{
      vald=false;
    }
  }
  return vald;
};



function validateHour(cellToVal){
  var regHour=/^(2[0-3]|[01][0-9])(:([0-5][0-9])(:([0-5][0-9]))?)?(Z|[+-](?:2[0-3]|[01][0-9])(?::?(?:[0-5][0-9]))?)?$/;
  var vald=true;
  if(cellToVal!=""){
    if(cellToVal.search(regHour)==-1){
      vald=false;
    }
  }
  return vald;
};


function validateLocation(cellToVal, location){
  var vald=true;
  if(cellToVal!=""){
    if (location.indexOf(cellToVal)==-1){
      vald=false;
    }
  }
  return vald;
};

function getCrd(localization){
 var result=Maps.newGeocoder().geocode(localization);
 var lng="";
 var lat="";
 var status=result.status;
  if(status=="OK"){
    lng=result.results[0].geometry.location.lng;
    lat=result.results[0].geometry.location.lat;
    return (lat+";"+lng);
  }else{
    return message11;
  }
 
};


function validateScientificNameAuthorship(cellToVal){
  var regxMa=/^[A-Z][a-zA-Z0-9:;,óíáéúý()\.\s]+$/;
  var vald=true;
  if(cellToVal!=""){
   if((cellToVal.length>=2)&&(cellToVal.length<=100)){
     if(cellToVal[0]=="("){
       if(cellToVal.indexOf(")")==-1){
         vald=false;
       }else{
        if(cellToVal.substring(1).search(regxMa)==-1){
          vald=false;
        }
       }
     }else{
      if(cellToVal.search(regxMa)==-1){
        vald=false;
      }else{
       if(cellToVal.indexOf(")")!=-1){
         vald=false;
       }
      }
     }
   }else{
     vald=false;
   }
  }
  return vald;
};

function getLocation(latDc,lonDc){
  var urlp1="http://maps.googleapis.com/maps/api/geocode/json?latlng=";
  var urlp2="&sensor=true&language=es-419";
  var url=urlp1+latDc+","+lonDc+urlp2;
  var JSON_response =UrlFetchApp.fetch(url).getContentText();
  var geoJSON = eval( '(' + JSON_response + ')' );
  var locationS=JSON.stringify(geoJSON);
  return locationS;
};

//3
function validateDateISO(dateV){
  var formats= new Array();
  var formats1= new Array();
  var formats2= new Array();
  var formats3= new Array();
  var formats4= new Array();
  var parts1= new Array();
  var parts2= new Array();
  var dateTV=new Array(3);
  var valT=true;
  var val1,val2=true;
  var type1="";
  var type2="";
  formats["rge1"]=/^([0-9]{4})[-](1[0-2]|0[1-9])[-](3[0-1]|0[1-9]|[1-2][0-9])T(2[0-3]|[01][0-9])(:([0-5][0-9])(:([0-5][0-9]))?)?(Z|[+-](?:2[0-3]|[01][0-9])(?::?(?:[0-5][0-9]))?)?$/;
  formats["rge2"]=/^([0-9]{4})-(1[0-2]|0[1-9])-(3[0-1]|0[1-9]|[1-2][0-9])$/;
  formats["rge3"]=/^([0-9]{4})-(1[0-2]|0[1-9])$/;
  formats["rge4"]=/^([0-9]{4})$/;
  
  //Year, month, day, time (optional time zone)
  formats1["rge1"]=/^([0-9]{4})[-](1[0-2]|0[1-9])[-](3[0-1]|0[1-9]|[1-2][0-9])T(2[0-3]|[01][0-9])(:([0-5][0-9])(:([0-5][0-9]))?)?(Z|[+-](?:2[0-3]|[01][0-9])(?::?(?:[0-5][0-9]))?)?$/;
  //Month, day, time (optional time zone)
  formats1["rge1a"]=/^(1[0-2]|0[1-9])[-](3[0-1]|0[1-9]|[1-2][0-9])T(2[0-3]|[01][0-9])(:([0-5][0-9])(:([0-5][0-9]))?)?(Z|[+-](?:2[0-3]|[01][0-9])(?::?(?:[0-5][0-9]))?)?$/;
  //Day, time (optional time zone)
  formats1["rge1b"]=/^(3[0-1]|0[1-9]|[1-2][0-9])T(2[0-3]|[01][0-9])(:([0-5][0-9])(:([0-5][0-9]))?)?(Z|[+-](?:2[0-3]|[01][0-9])(?::?(?:[0-5][0-9]))?)?$/;
  //Time (hour minute seconds)
  formats1["rge1c"]=/^(2[0-3]|[01][0-9])(:([0-5][0-9])(:([0-5][0-9]))?)?(Z|[+-](?:2[0-3]|[01][0-9])(?::?(?:[0-5][0-9])))?$/;
  //*********
  //Year, month and day
  formats2["rge2"]=/^([0-9]{4})-(1[0-2]|0[1-9])-(3[0-1]|0[1-9]|[1-2][0-9])$/;
  //Month and day
  formats2["rge2a"]=/^(1[0-2]|0[1-9])-(3[0-1]|0[1-9]|[1-2][0-9])$/;
  //Only day
  formats2["rge2b"]=/^(3[0-1]|0[1-9]|[1-2][0-9])$/;
  //**********
  //Year and month
  formats3["rge3"]=/^([0-9]{4})-(1[0-2]|0[1-9])$/;
  formats3["rge3a"]=/^(1[0-2]|0[1-9])$/;
  //**********
  //Only year
  formats4["rge4"]=/^([0-9]{4})$/;
  
  if(dateV!=""){
  var startEnd=dateV.split('/');
  if(!((startEnd.length>=1)&&(startEnd.length<=2))){
    valT=false;
  }else{
    //validacion del formato
    for(var k in formats){
      if(formats.hasOwnProperty(k)){
        if(startEnd[0].search(formats[k])!=-1){
          type1=k;
          valT=true;
          break;
        }else{
          valT=false;
        }
      }
    }
    //Validacion de la fecha 
    if(valT){
      if((type1.indexOf("1")!=-1)||(type1.indexOf("2")!=-1)){
        parts1=partitions(type1, startEnd[0]);
        valT=validMonthDay(parts1);
      }
    }
    if((type1.indexOf("3")!=-1)||(type1.indexOf("4")!=-1)){
      parts1=partitions(type1, startEnd[0]);
    }
    //Si se tiene dos fechas y la primera tuvo un formato correcto en los especificados
    if((startEnd.length==2)&&(valT)){
      //de acuerdo al formato de la primera fecha
      if(type1=="rge1"){
        for(var n in formats1){
          if(formats1.hasOwnProperty(n)){
            if(startEnd[1].search(formats1[n])!=-1){
              type2=n;
              valT=true;
              break;
            }else{
              valT=false;
            }
          }
        }
        if(valT){
          //Si la segunda fecha es de tipo 1
          parts2=partitions(type2, startEnd[1]);
          if(type2=="rge1"){
            //validacion de correctitud segunda fecha
            valT=validMonthDay(parts2);
          }
          if(type2=="rge1a"){
            dateTV[0]=parts1[0];
            dateTV[1]=parts2[1];
            dateTV[2]=parts2[2];
            //validacion de correctitud fecha construida
            valT=validMonthDay(dateTV);
          }
          if(type2=="rge1b"){
            dateTV[0]=parts1[0];
            dateTV[1]=parts1[1];
            dateTV[2]=parts2[2];
            //validacion de correctitud fecha construida
            valT=validMonthDay(dateTV);
          }
          if(valT){
            valT=comparisons(parts1,parts2);
          }
        }
      }else if(type1=="rge2"){
        for(var n in formats2){
          if(formats2.hasOwnProperty(n)){
            if(startEnd[1].search(formats2[n])!=-1){
              type2=n;
              valT=true;
              break;
            }else{
              valT=false;
            }
          }
        }
        if(valT){
          //Si la segunda fecha es de tipo 2
          parts2=partitions(type2, startEnd[1]);
          if(type2=="rge2"){
            //var parts2=partitions(type, startEnd[1]);
            valT=validMonthDay(parts2);
          }
          if(type2=="rge2a"){
            //var parts2=partitions(type1, startEnd[0]);
            dateTV[0]=parts1[0];
            dateTV[1]=parts2[1];
            dateTV[2]=parts2[2];
            valT=validMonthDay(dateTV);
          }
          if(type2=="rge2b"){
            dateTV[0]=parts1[0];
            dateTV[1]=parts1[1];
            dateTV[2]=parts2[2];
            valT=validMonthDay(dateTV);
          }
          if(valT){
            valT=comparisons(parts1,parts2);
          }
        }
      }else if(type1=="rge3"){
        for(var n in formats3){
          if(formats3.hasOwnProperty(n)){
            if(startEnd[1].search(formats3[n])!=-1){
              type2=n;
              valT=true;
              break;
            }else{
              valT=false;
            }
          }
        }
        if(valT){
          //si la segunda fecha es de tipo 3
          parts2=partitions(type2, startEnd[1]);
          //comparaciones
          if(valT){
            valT=comparisons(parts1,parts2);
          }
        }
      }else if(type1=="rge4"){
        for(var n in formats4){
          if(formats4.hasOwnProperty(n)){
            if(startEnd[1].search(formats4[n])!=-1){
              type2=n;
              valT=true;
              break;
            }else{
              valT=false;
            }
          }
        }
        if(valT){
          //si la segunda fecha es de tipo 4
          parts2=partitions(type2, startEnd[1]);
          //comparaciones
          if(valT){
            valT=comparisons(parts1,parts2);
          }
        }
      }
    }
  }
  }else{
    valT=true;
  }
  return valT;
};


function validMonthDay(dateLY){
  var vald=true;
  var dateT= new Array();
  dateT=dateLY; 
  var mDay=dateT[1]+"-"+dateT[2]; //**** Si se ejecuta directamente genera error TypeError: Cannot read property "1" from undefined. (line 459)
  var rge2a=/^(((0[1,3,5,7,8]|12)-(31|0[1-9]|[1-2][0-9]))|((0[4,6,9]|11)-(30|0[1-9]|[1-2][0-9]))|(02-(0[1-9]|[1-2][0-9])))$/;
  var isLeapYear = (((Number(dateLY[0]) % 4 == 0) && (Number(dateLY[0]) % 100 != 0))|| (Number(dateLY[0]) % 400 == 0)) ? true : false;
  
  if(mDay.search(rge2a)!=-1){
    if((!isLeapYear)&&((dateLY[1]=="02")&&(Number(dateLY[2])>28))){
      vald=false;
    }
  }else{
    vald=false;
  }
  return vald;
};

//comparisons
function comparisons(isoDate1, isoDate2){
  var vald=true;
  for(k=0;k<isoDate1.length-1;k++){
    if((Number(isoDate2[k]))>(Number(isoDate1[k]))){
      break;
    }
    if(((Number(isoDate2[k]))==(Number(isoDate1[k])))||(typeof isoDate2[k]==="undefined")){
      continue;
    }
    if((Number(isoDate2[k]))<(Number(isoDate1[k]))){
      vald=false;
      break;
    }
  }
  if((isoDate2[6]!=isoDate1[6])&&((!(typeof isoDate2[6]==="undefined"))&&(!(typeof isoDate1[6]==="undefined")))){
    vald=false;
  }
  return vald;
};


function partitions(type, datISO){
  var parts=new Array(7);
  if(((type=="rge1")||(type=="rge1a"))||(type=="rge1b")){
    //Year, month, day, time (optional time zone)   //1
    if(type=="rge1"){
      parts[0]=datISO.split('T')[0].split('-')[0];
      parts[1]=datISO.split('T')[0].split('-')[1];
      parts[2]=datISO.split('T')[0].split('-')[2];
    }
    //Month, day, time (optional time zone)         //1a
    if(type=="rge1a"){
      parts[1]=datISO.split('T')[0].split('-')[0];
      parts[2]=datISO.split('T')[0].split('-')[1];
    }
    //Day, time (optional time zone)  //  1b
    if(type=="rge1b"){
      parts[2]=datISO.split('T')[0].split('-')[0];
    }
    
    //Time
    if(((datISO.split('T')[1].indexOf("Z")==-1)&&(datISO.split('T')[1].indexOf("+")==-1))&&(datISO.split('T')[1].indexOf("-")==-1)){
      var hms=datISO.split('T')[1].split(':');
      parts[3]=hms[0];
      //If have minutes
      if(hms.length==2){
        parts[4]=hms[1];
      }
      //If have seconds
      if(hms.length==3){
        parts[4]=hms[1];
        parts[5]=hms[2];
      }
    }else{
      //UTC
      if(datISO.split('T')[1].indexOf("Z")!=-1){
        var hms=datISO.split('T')[1].split('Z')[0].split(':');
        parts[3]=hms[0];
        //If have minutes
        if(hms.length==2){
          parts[4]=hms[1];
        }
        //If have seconds
        if(hms.length==3){
          parts[4]=hms[1];
          parts[5]=hms[2];
        }
        parts[6]="Z"+datISO.split('T')[1].split('Z')[1];
      }
      
      //+UTC
      if(datISO.split('T')[1].indexOf("+")!=-1){
        var hms=datISO.split('T')[1].split('+')[0].split(':');
        parts[3]=hms[0];
        //If have minutes
        if(hms.length==2){
          parts[4]=hms[1];
        }
        //If have seconds
        if(hms.length==3){
          parts[4]=hms[1];
          parts[5]=hms[2];
        }
        parts[6]="+"+datISO.split('T')[1].split('+')[1];
      }
      
      //-UTC
      if(datISO.split('T')[1].indexOf("-")!=-1){
        var hms=datISO.split('T')[1].split('-')[0].split(':');
        parts[3]=hms[0];
        //If have minutes
        if(hms.length==2){
          parts[4]=hms[1];
        }
        //If have seconds
        if(hms.length==3){
          parts[4]=hms[1];
          parts[5]=hms[2];
        }
        parts[6]="-"+datISO.split('T')[1].split('-')[1];
      }
    }
  }
  
  if(type=="rge1c"){
    if(((datISO.indexOf("Z")==-1)&&(datISO.indexOf("+")==-1))&&(datISO.indexOf("-")==-1)){
      var hms=datISO.split(':');
      parts[3]=hms[0];
      //If have minutes
      if(hms.length==2){
        parts[4]=hms[1];
      }
      //If have seconds
      if(hms.length==3){
        parts[4]=hms[1];
        parts[5]=hms[2];
      }
    }else{
      //UTC
      if(datISO.indexOf("Z")!=-1){
        var hms=datISO.split('Z')[0].split(':');
        parts[3]=hms[0];
        //If have minutes
        if(hms.length==2){
          parts[4]=hms[1];
        }
        //If have seconds
        if(hms.length==3){
          parts[4]=hms[1];
          parts[5]=hms[2];
        }
        parts[6]="Z"+datISO.split('Z')[1];
      }
      
      //+UTC
      if(datISO.indexOf("+")!=-1){
        var hms=datISO.split('+')[0].split(':');
        parts[3]=hms[0];
        //If have minutes
        if(hms.length==2){
          parts[4]=hms[1];
        }
        //If have seconds
        if(hms.length==3){
          parts[4]=hms[1];
          parts[5]=hms[2];
        }
        parts[6]="+"+datISO.split('+')[1];
      }
      
      //-UTC
      if(datISO.indexOf("-")!=-1){
        var hms=datISO.split('-')[0].split(':');
        parts[3]=hms[0];
        //If have minutes
        if(hms.length==2){
          parts[4]=hms[1];
        }
        //If have seconds
        if(hms.length==3){
          parts[4]=hms[1];
          parts[5]=hms[2];
        }
        parts[6]="-"+datISO.split('-')[1];
      }
    }
  }
  
  //Year, month, day  //   2
  if(type=="rge2"){
    parts[0]=datISO.split('-')[0];
    parts[1]=datISO.split('-')[1];
    parts[2]=datISO.split('-')[2];
  }
  
  //Month, day  //2a
  if(type=="rge2a"){
    parts[1]=datISO.split('-')[0];
    parts[2]=datISO.split('-')[1];
  }
  
  //Day  //2b
  if(type=="rge2b"){
    parts[2]=datISO;
  }
  
  //Year, month   //3
  
  if(type=="rge3"){
    parts[0]=datISO.split('-')[0];
    parts[1]=datISO.split('-')[1];
  }
  
  //Month     //3a
  
  if(type=="rge3a"){
    parts[1]=datISO;
  }
  
  //Year   //4
  if(type=="rge4"){
    parts[0]=datISO;
  }
  
  return parts;
};  
