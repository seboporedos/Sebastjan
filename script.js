// 1️⃣ Popravljena inicializacija Supabase
const { createClient } = window.supabase; // ✅ Dodaj "window."

const supabaseUrl = "https://iutiuedygqhofbwdrkzv.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml1dGl1ZWR5Z3Fob2Zid2Rya3p2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDAzODM0MjMsImV4cCI6MjA1NTk1OTQyM30.-pYn9koN-clGMuUalQHi3t0g5N2sEjIbvkrCyHz1FSI"; // Tvoj API ključ
const supabase = createClient(supabaseUrl, supabaseKey);

console.log(supabase); // Preveri, ali je Supabase pravilno inicializiran

// 2️⃣ Prepreči osvežitev obrazca in poveži gumb s funkcijo
document
  .getElementById("orderForm")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // ⚠️ Prepreči osvežitev strani
    shraniNarocilo(); // Kliči funkcijo za shranjevanje
  });

// 3️⃣ Funkcija za shranjevanje podatkov v Supabase
async function shraniNarocilo() {
  console.log("Funkcija shraniNarocilo se je poklicala");

  // Pridobi vrednosti iz input polj
  const ime = document.querySelector("#ime").value.trim();
  const priimek = document.querySelector("#priimek").value.trim();
  const datum_rojstva = document.querySelector("#datum_rojstva").value;
  const email = document.querySelector("#email").value.trim();
  const telefon = document.querySelector("#telefon").value.trim();

  if (!ime || !priimek || !datum_rojstva || !email || !telefon) {
    console.error("Napaka: Manjkajo podatki!");
    alert("Prosim, izpolni vsa polja!");
    return;
  }

  console.log("Podatki:", { ime, priimek, datum_rojstva, email, telefon });

  // Pošlji podatke v Supabase
  const { data, error } = await supabase
    .from("narocila") // ⚠️ Preveri, ali je ime tabele pravilno
    .insert([{ ime, priimek, datum_rojstva, email, telefon }]);

  if (error) {
    console.error("Napaka pri shranjevanju:", error.message);
    alert("Prišlo je do napake pri shranjevanju.");
    return;
  }

  console.log("Naročilo uspešno shranjeno!", data);

  // Prikaz sporočila o uspehu
  let sporocilo = document.querySelector("#sporocilo");
  if (!sporocilo) {
    sporocilo = document.createElement("p");
    sporocilo.id = "sporocilo";
    document.body.appendChild(sporocilo);
  }
  sporocilo.textContent = "Naročilo uspešno shranjeno!";
  sporocilo.style.color = "green";

  // Po uspešnem shranjevanju počisti obrazec
  document.getElementById("orderForm").reset();
}

function prikaziObrazec(program) {
  var urlObrazca;
  if (program === "premium") {
    urlObrazca = "obrazec-premium.html";
  } else if (program === "basic") {
    urlObrazca = "obrazec-basic.html";
  }

  window.open(urlObrazca, "_blank");
}

function prikaziObrazec(program) {
  // Določi URL obrazca glede na izbrani program
  var urlObrazca;
  if (program === "premium") {
    urlObrazca = "obrazec-premium.html";
  } else if (program === "basic") {
    urlObrazca = "obrazec-basic.html";
  }

  // Odpri obrazec v novem zavihku
  window.open(urlObrazca, "_blank");
}
