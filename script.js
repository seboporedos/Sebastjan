// Inicializacija emailJS za pošiljanje e-pošte
emailjs.init("tsW2nGJcWF_L58Yzq");
document.addEventListener("DOMContentLoaded", function () {
  // Skrij potrditveno okno ob nalaganju strani
  document.getElementById("uspesnoOkence").style.display = "none";
});

// 1 Inicializacija Supabase za shranjevanje podatkov
const { createClient } = window.supabase;
const supabaseUrl = "https://iutiuedygqhofbwdrkzv.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml1dGl1ZWR5Z3Fob2Zid2Rya3p2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDAzODM0MjMsImV4cCI6MjA1NTk1OTQyM30.-pYn9koN-clGMuUalQHi3t0g5N2sEjIbvkrCyHz1FSI"; // Tvoj API ključ
const supabase = createClient(supabaseUrl, supabaseKey);

// 2️ Prepreči osvežitev obrazca ob oddaji in kliči funkcijo za shranjevanje
document
  .getElementById("orderForm")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // ⚠️ Prepreči osvežitev strani
    shraniNarocilo(); // Kliči funkcijo za shranjevanje
  });

// 3️ Funkcija za shranjevanje podatkov v Supabase
async function shraniNarocilo() {
  console.log("Funkcija shraniNarocilo se je poklicala");

  // Preberi podatke iz obrazca
  const ime = document.querySelector("#ime").value.trim();
  const priimek = document.querySelector("#priimek").value.trim();
  const datum_rojstva = document.querySelector("#datum_rojstva").value;
  const email = document.querySelector("#email").value.trim();
  const telefon = document.querySelector("#telefon").value.trim();
  const program = document.querySelector("input[name='program']").value.trim();

  // Preveri, če so vsa polja izpolnjena
  if (!ime || !priimek || !datum_rojstva || !email || !telefon || !program) {
    console.error("Napaka: Manjkajo podatki!");
    alert("Prosim, izpolni vsa polja!");
    return;
  }

  console.log("Podatki:", {
    ime,
    priimek,
    datum_rojstva,
    email,
    telefon,
    program,
  });

  // Shranjevanje podatkov v bazo
  const { data, error } = await supabase
    .from("narocila")
    .insert([{ ime, priimek, datum_rojstva, email, telefon, program }]);

  if (error) {
    console.error("Napaka pri shranjevanju:", error.message);
    alert("Prišlo je do napake pri shranjevanju.");
    return;
  }

  console.log("Naročilo uspešno shranjeno!", data);

  // Prikaži potrditveno okno
  document.getElementById("uspesnoOkence").style.display = "flex";

  // Pošlji potrditveni e-mail uporabniku
  posljiPotrdilo(email, ime);

  // Po uspešnem shranjevanju počisti obrazec
  document.getElementById("orderForm").reset();

  // Dodaj funkcionalnost gumba za vrnitev na začetno stran
  document.getElementById("backToStart").addEventListener("click", function () {
    document.getElementById("uspesnoOkence").style.display = "none";
    window.location.href = "index.html";
  });
}

// Funkcija za filtriranje, da lahko uporabnik vpiše samo številke v polje telefona
function filterNumbers(event) {
  const input = event.target;
  input.value = input.value.replace(/[^0-9+]/g, ""); // Odstrani vse, kar ni številka ali znak +
}

// Funkcija za preverjanje, da datum rojstva ni v prihodnosti
document
  .getElementById("datum_rojstva")
  .addEventListener("change", function () {
    let vnos = new Date(this.value);
    let danes = new Date();

    if (vnos > danes) {
      alert("Datum rojstva ne more biti v prihodnosti!");
      this.value = ""; // Počisti polje
    }
  });

// Funkcija za preverjanje pravilnosti e-mail naslova
document.getElementById("email").addEventListener("input", function () {
  let regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (!regex.test(this.value)) {
    this.setCustomValidity(
      "Vnesite veljaven e-mail naslov (npr. uporabnik@example.com)"
    );
  } else {
    this.setCustomValidity("");
  }
});

// Funkcija za pošiljanje potrditvenega e-maila
async function posljiPotrdilo(email, ime) {
  const templateParams = {
    to_email: email, // E-mail prejemnika (uporabnika)
    to_name: ime, // Ime prejemnika
    message: `Pozdravljeni ${ime},\n\nVaše naročilo je bilo uspešno oddano! Hvala, ker ste se prijavili.\n\nLep pozdrav,\nEkipa fitnesa`,
  };

  try {
    let response = await emailjs.send(
      "service_sebo",
      "template_oxgj9st",
      templateParams
    );
    console.log("Email poslan:", response);
  } catch (error) {
    console.error("Napaka pri pošiljanju e-maila:", error);
  }
}

// Funkcija za prikaz obrazca glede na izbran program
function prikaziObrazec(program) {
  // Nastavi URL obrazca glede na izbran program
  var urlObrazca;
  if (program === "premium") {
    urlObrazca = "obrazec-premium.html";
  } else if (program === "basic") {
    urlObrazca = "obrazec-basic.html";
  }

  // Preusmeri uporabnika na ustrezno stran
  window.location.href = urlObrazca;
}
