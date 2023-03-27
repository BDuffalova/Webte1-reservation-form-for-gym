/*
const BuildingsDict = {
    mala : 100,
    velka: 200,
    ihrisko: 50
};

const nacinie = {
    lopta : 0.5,
    korcula : 2
};

var text = "velka"
var nac = "lopta"

console.log(BuildingsDict[text] + nacinie[nac]);*/

var cennik = {
    "velka-telocvicna" : 25,
    "mala-telocvicna" : 15,
    "ihrisko" : 20,
    "nic" : 0,
    "lopta" : 2,
    "rozlisovacky" : 5,
    "kuzele" : 3,
    "siet" : 5,
    "hokejky" : 1,
    "lopticka" : 0.5,
    "karimatky" : 2,
    "cinky" : 2,
    "fitlopty" : 3,
    "lopticky" : 2,
    "rakety" : 5,
    "kosiky" : 2
  };



function poNacitani() {

radioButtons = document.querySelectorAll('input[name="button-prieskum"]');
radioButtons.forEach(radio => {
  radio.addEventListener('click', handleRadioClick);
});

var meno = document.getElementById("meno");
meno.addEventListener("blur", validaciaMeno);
meno.addEventListener("keyup", pocetZnakov);

var priezvisko = document.getElementById("priezvisko");
priezvisko.addEventListener("blur", validaciaPriezvisko);
priezvisko.addEventListener("keyup", pocetZnakov);

var vek = document.getElementById("vek");
vek.addEventListener("blur", validaciaVek);

var mail = document.getElementById("mail");
mail.addEventListener("blur", validaciaMail);
mail.addEventListener("keyup", pocetZnakov);

var miestnost = document.getElementById("miestnost");
miestnost.addEventListener("change", retazenieSelektov1);

var htmlCollection = document.getElementsByName('sport');  
var arr = Array.from(htmlCollection);     //od ECMAScript 2015 (ed 6)       
//arr.shift();        
arr.forEach(function(element){ element.addEventListener("change",retazenieSelektov2) });

var box = document.getElementById("skusenost-ine");
box.addEventListener("change", zobrazenieIne);

var btnUdaje = document.getElementById("tajne-tlacidlo");
btnUdaje.addEventListener("click", function(event){
    event.preventDefault();
    var text = document.getElementById("tajne-udaje");
    if(text.innerHTML == "Barbora Duffalová"){
        text.innerHTML = "";
    }
    else {
        text.innerHTML = "Barbora Duffalová";

    }

});
var odosli = document.getElementById("odosli");
odosli.addEventListener("click", function(event){
    event.preventDefault();
    if(validacia()){
        var meno = document.getElementById("meno");
        var priezvisko = document.getElementById("priezvisko");
        var mail = document.getElementById("mail");
        var miestnost = document.getElementById("miestnost");   
        var sport = document.getElementById(miestnost.value);    //od ECMAScript 2015 (ed 6)
        var nacinie = document.getElementById(sport.value);
        var cas = document.getElementById("cas");
        var pocet = document.getElementById("pocet");              
        arr.forEach(function(element){ 
            if(element.style.display == "block"){
                var aktualny = element;
            }
    });  
        
        var closeBtn = document.createElement("span");
        closeBtn.classList.add("close");
        closeBtn.innerHTML = "&times";

        var nadpis = document.createElement("h1");
        nadpis.innerHTML = "Súhrn objednávky";

        var udaje = document.createElement("p");
        udaje.innerHTML = "Meno a priezvisko zákazníka: " + meno.value + " " + priezvisko.value;

        var kontakt = document.createElement("p");
        kontakt.innerHTML = "Mail zákazníka: " + mail.value;

        var vybranaMiestnost = document.createElement("p");
        vybranaMiestnost.innerHTML = "Zvolená miestnosť: " + miestnost.value;

        var vybrateNacinie = document.createElement("p");
        vybrateNacinie.innerHTML = "Zvolené náčinie: " + nacinie.value;

        var casAPocet = document.createElement("p");
        casAPocet.innerHTML = "Čas prenájmu a počet ľudí: " + cas.value + " hodín" + " " + pocet.value + " ľudí";

        var suma = document.createElement("p");
        suma.innerHTML = "Celková suma: " + (cennik[miestnost.value] + (cennik[nacinie.value]*pocet.value))*cas.value;

        var btnOk = document.createElement("button")
        btnOk.innerHTML = "Potvrdzujem"


        var modalContent = document.createElement("div");
        modalContent.classList.add("modal-content");
    
        var vrstvaNad = document.getElementById("modal");
        vrstvaNad.innerHTML = "";
        modalContent.appendChild(closeBtn);
        modalContent.appendChild(nadpis);
        modalContent.appendChild(udaje);
        modalContent.appendChild(kontakt);
        modalContent.appendChild(vybranaMiestnost);
        modalContent.appendChild(vybrateNacinie);
        modalContent.appendChild(casAPocet);
        modalContent.appendChild(suma);
        modalContent.appendChild(btnOk);
        vrstvaNad.appendChild(modalContent);
        
        vrstvaNad.style.display = "block";
        closeBtn.addEventListener("click", function(){
            vrstvaNad.style.display = "none";
        })

        btnOk.addEventListener("click", function(){
            document.getElementById("dotaznik").submit();
        })
        document.getElementById("upozornenie").innerHTML = ""
        
    }
    else{
        document.getElementById("upozornenie").innerHTML = "Zle vyplnený dotazník!"
    }
})
var resetuj = document.getElementById("resetuj");
resetuj.addEventListener("click", function(event){
    location.reload();
    document.getElementById("valMeno").classList.remove("validacia");
    document.getElementById("valMeno").innerHTML = ""
    document.getElementById("valPriezvisko").classList.remove("validacia");
    document.getElementById("valPriezvisko").innerHTML = ""
    document.getElementById("valVek").classList.remove("validacia");
    document.getElementById("valVek").innerHTML = "";
    document.getElementById("valMail").classList.remove("validacia");
    document.getElementById("valMail").innerHTML = "";
    document.getElementById("upozornenie").innerHTML = ""
})

var ine = document.getElementById("ine-text");
ine.addEventListener("keyup", pocetZnakov);

var poznamka = document.getElementById("poznamka");
poznamka.addEventListener("keyup", pocetZnakov);

/////////

}




function handleRadioClick() {
    var btnAno = document.getElementById("ano")
    var prieskumAno = document.getElementById("volba-ano");
    var prieskumNie = document.getElementById("volba-nie");
    
    if (btnAno.checked) {
        prieskumAno.style.display = "block";
        prieskumNie.style.display = "none";
        console.log("ano");
      } 
    else {
        prieskumAno.style.display = "none";
        prieskumNie.style.display = "block";
      }
}

function validacia() {
    var meno = validaciaMeno()
    var priezvisko = validaciaPriezvisko()
    var vek = validaciaVek();
    var mail = validaciaMail();
    return meno&&priezvisko&&vek&&mail
    
    
}

function validaciaMeno() {
    var meno = document.getElementById("meno");
    if(meno.value=="") {
        document.getElementById("valMeno").classList.add("validacia");
        meno.classList.add("chyba");
        document.getElementById("valMeno").innerHTML = "Chýba meno!"
        return false;
    }
    else{
        document.getElementById("valMeno").classList.remove("validacia");
        meno.classList.remove("chyba")
        document.getElementById("valMeno").innerHTML = ""
        return true;
    }
}

function validaciaPriezvisko() {
    var priezvisko = document.getElementById("priezvisko");
    if(priezvisko.value=="") {
        document.getElementById("valPriezvisko").classList.add("validacia");
        priezvisko.classList.add("chyba");
        document.getElementById("valPriezvisko").innerHTML = "Chýba priezvisko!"
        return false;
    }
    else{
        document.getElementById("valPriezvisko").classList.remove("validacia");
        priezvisko.classList.remove("chyba");
        document.getElementById("valPriezvisko").innerHTML = ""
        return true;
    }
}

function validaciaVek() {
    var datumNarodenia = document.getElementById("datum-narodenia");
    var datumNarodeniaVal = new Date(datumNarodenia.value);
    var vek = document.getElementById("vek").value;
    var dnesnyDatum = new Date();
    var rozdiel = parseInt((dnesnyDatum-datumNarodeniaVal)/1000/3600/24/365);
    if(rozdiel!=vek){
        document.getElementById("valVek").classList.add("validacia");
        document.getElementById("vek").classList.add("chyba");
        document.getElementById("valVek").innerHTML = "Nesprávne zadaný vek!"
        return false;
    }
    else{
        document.getElementById("valVek").classList.remove("validacia");
        document.getElementById("vek").classList.remove("chyba");
        document.getElementById("valVek").innerHTML = "";
        return true;
    }
}

function validaciaMail() {
    var mail = document.getElementById("mail").value;
    var arr = mail.split("@");
    var meno = arr[0];
    if(mail == ""){
        document.getElementById("mail").classList.add("chyba");
        document.getElementById("valMail").classList.add("validacia");
        document.getElementById("valMail").innerHTML = "Chýba mail!";
        return false;
    }
    if(arr.length>=2){
        var arrDomeny = arr[1].split(".");
        var dlzka = arrDomeny.length;
    }
    else{
        document.getElementById("mail").classList.add("chyba");
        document.getElementById("valMail").classList.add("validacia");
        document.getElementById("valMail").innerHTML = "Nesprávne zadaná emailová adresa! Správny formát: xxx@xxxx.xx";
        return false;
    }

    if(meno.length<3){
        document.getElementById("mail").classList.add("chyba");
        document.getElementById("valMail").classList.add("validacia");
        document.getElementById("valMail").innerHTML = "Prvá časť emailovej adresy musí mať aspoň 3 znaky!";
        return false;
    }

    if(dlzka < 2) {
        document.getElementById("mail").classList.add("chyba");
        document.getElementById("valMail").classList.add("validacia");
        document.getElementById("valMail").innerHTML = "Email musí obsahovať aspoň 2 domény!";
        return false;
    }

    if(arrDomeny[dlzka-1].length<2 || arrDomeny[dlzka-1].length>4) {
        document.getElementById("mail").classList.add("chyba");
        document.getElementById("valMail").classList.add("validacia");
        document.getElementById("valMail").innerHTML = "Hlavná doména musí mať 2-4 znaky!";
        return false;
    }
    document.getElementById("mail").classList.remove("chyba");
    document.getElementById("valMail").classList.remove("validacia");
    document.getElementById("valMail").innerHTML = "";
    return true;



}

function retazenieSelektov1() {
        
    //var miestnost = document.getElementById('miestnost');
    var htmlCollection = document.getElementsByClassName('sport');  
    var sport = document.getElementById(this.value);   
    var arr = Array.from(htmlCollection);     //od ECMAScript 2015 (ed 6)       
    //arr.shift();        
    arr.forEach(function(element){ 
        element.style.display = 'none';
        element.name = "" });  
    sport.style.display = 'inline';
    sport.name= "sport";

    htmlCollection = document.getElementsByClassName('nacinie');     
    arr = Array.from(htmlCollection);     //od ECMAScript 2015 (ed 6)       
    //arr.shift();        
    arr.forEach(function(element){ 
        element.style.display = 'none';
        element.name = ""
 });
    var nacinie = document.getElementById(sport.value);
    nacinie.style.display = 'inline';
    nacinie.name = "nacinie"
  
}

function retazenieSelektov2() {
        
    //var miestnost = document.getElementById('sport');
    var htmlCollection = document.getElementsByClassName('nacinie');  
    var nacinie = document.getElementById(this.value);   
    var arr = Array.from(htmlCollection);     //od ECMAScript 2015 (ed 6)       
    //arr.shift();        
    arr.forEach(function(element){ 
        element.style.display = 'none';
        element.name = ""
    });  
    nacinie.style.display = 'inline';
    nacinie.name = "nacinie"
  
    
  
}

function zobrazenieIne() {
    var box = document.getElementById("skusenost-ine");
    var text = document.getElementById("ine");
    if(box.checked){
        text.style.display = "block";
    }
    else{
        text.style.display = "none";
    }
}

function odkryUdaje() {
    var text = document.getElementById("tajne-udaje");
    if(text.innerHTML == "Barbora Duffalová"){
        text.innerHTML = "";
    }
    else {
        text.style.display = "Barbora Duffalová";

    }
}

function pocetZnakov() {
    var pocetZnakov = this.value.length;
    var surodenec = this.nextElementSibling;
    if(pocetZnakov > 128){
        this.value = this.value.substring(0,128);
    }
    
    else{
       surodenec.innerHTML = pocetZnakov + "/128" 
    }
    
}