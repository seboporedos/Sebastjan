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

// Inicializacija Supabase klienta
const supabaseUrl = "https://iutiuedygqhofbwdrkzv.supabase.co"; // Zamenjajte z vašim URL-jem
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml1dGl1ZWR5Z3Fob2Zid2Rya3p2Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0MDM4MzQyMywiZXhwIjoyMDU1OTU5NDIzfQ.GFlAtyDTSSbaLTbM17-Fnm5Iiq5Civ5R9AEfa8pJr5Q"; // Zamenjajte z vašim API ključem
const supabase = supabase.createClient(supabaseUrl, supabaseKey);

// Funkcija za shranjevanje podatkov v bazo podatkov
async function shraniNarocilo(event) {
  event.preventDefault(); // Prepreči privzeto pošiljanje obrazca
  console.log("Funkcija shraniNarocilo se je poklicala");

  // Pridobitev podatkov iz obrazca
  const form = document.querySelector("#orderForm"); // Zajame glavni obrazec
  const ime = document.querySelector("#ime").value;
  const priimek = document.querySelector("#priimek").value;
  const datumRojstva = document.querySelector("#datum_rojstva").value;
  const email = document.querySelector("#email").value;
  const telefon = document.querySelector("#telefon").value;
  const program = document.querySelector('input[name="program"]').value;

  console.log("Podatki iz obrazca:", {
    ime,
    priimek,
    datumRojstva,
    email,
    telefon,
    program,
  });

  // Shranjevanje podatkov v bazo podatkov
  const { data, error } = await supabase
    .from("narocila")
    .insert([
      { ime, priimek, datum_rojstva: datumRojstva, email, telefon, program },
    ]);

  if (error) {
    console.error("Napaka pri shranjevanju naročila:", error);
    alert("Prišlo je do napake. Prosimo, poskusite znova.");
  } else {
    console.log("Naročilo uspešno shranjeno:", data);
    alert("Naročilo uspešno oddano!");
    form.reset(); // Po uspešnem vnosu počisti obrazec
  }
}

// Dodajanje dogodka na gumb "POTRDI"
document.addEventListener("DOMContentLoaded", function () {
  document
    .querySelector("#submitBtn")
    .addEventListener("click", shraniNarocilo);
});
