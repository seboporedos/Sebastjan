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
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXpaYmFzZSIsInJlZiI6Iml1dGl1ZWR5Z3Fob2Zid2Rya3p2Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0MDM4MzQyMywiZXhwIjoyMDU1OTU5NDIzfQ.GFlAtyDTSSbaLTbM17-Fnm5Iiq5Civ5R9AEfa8pJr5Q"; // Zamenjajte z vašim API ključem
const supabase = supabase.createClient(supabaseUrl, supabaseKey);

// Funkcija za shranjevanje podatkov v bazo podatkov
async function shraniNarocilo(event) {
  console.log("Funkcija shraniNarocilo se je poklicala");
  event.preventDefault(); // Prepreči privzeto pošiljanje obrazca

  // Branje podatkov iz obrazca
  const form = event.target;
  const ime = form.querySelector("#ime").value;
  const priimek = form.querySelector("#priimek").value;
  const datumRojstva = form.querySelector("#datum_rojstva").value;
  const email = form.querySelector("#email").value;
  const telefon = form.querySelector("#telefon").value;
  const program = form.querySelector('input[name="program"]').value;

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

  console.log("Odziv iz Supabase:", { data, error });

  if (error) {
    console.error("Napaka pri shranjevanju naročila:", error);
    alert("Prišlo je do napake. Prosimo, poskusite znova.");
  } else {
    console.log("Naročilo uspešno shranjeno:", data);
    alert("Naročilo uspešno oddano!");
    // Po želji lahko preusmerite uporabnika na drugo stran
  }
}

// Dodajanje dogodka za pošiljanje obrazca
const forms = document.querySelectorAll("form");
forms.forEach((form) => {
  form.addEventListener("submit", shraniNarocilo);
});
