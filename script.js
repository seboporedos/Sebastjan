document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("successModal").style.display = "none";
});

// 1️⃣ Popravljena inicializacija Supabase
const { createClient } = window.supabase; // ✅ Dodaj "window."

const supabaseUrl = "https://iutiuedygqhofbwdrkzv.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml1dGl1ZWR5Z3Fob2Zid2Rya3p2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDAzODM0MjMsImV4cCI6MjA1NTk1OTQyM30.-pYn9koN-clGMuUalQHi3t0g5N2sEjIbvkrCyHz1FSI"; // Tvoj API ključ
const supabase = createClient(supabaseUrl, supabaseKey);

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

  const ime = document.querySelector("#ime").value.trim();
  const priimek = document.querySelector("#priimek").value.trim();
  const datum_rojstva = document.querySelector("#datum_rojstva").value;
  const email = document.querySelector("#email").value.trim();
  const telefon = document.querySelector("#telefon").value.trim();
  const program = document.querySelector("input[name='program']").value.trim();

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

  const { data, error } = await supabase
    .from("narocila")
    .insert([{ ime, priimek, datum_rojstva, email, telefon, program }]);

  if (error) {
    console.error("Napaka pri shranjevanju:", error.message);
    alert("Prišlo je do napake pri shranjevanju.");
    return;
  }

  console.log("Naročilo uspešno shranjeno!", data);

  // Prikaži modalno okno samo ob uspešnem shranjevanju
  document.getElementById("successModal").style.display = "flex";

  // Po uspešnem shranjevanju počisti obrazec
  document.getElementById("orderForm").reset();

  // Doda funkcionalnost gumba za vrnitev
  document.getElementById("backToStart").addEventListener("click", function () {
    document.getElementById("successModal").style.display = "none";
    window.location.href = "index.html";
  });
}

function prikaziObrazec(program) {
  // Določi URL obrazca glede na izbrani program
  var urlObrazca;
  if (program === "premium") {
    urlObrazca = "obrazec-premium.html";
  } else if (program === "basic") {
    urlObrazca = "obrazec-basic.html";
  }

  window.location.href = urlObrazca;
}
